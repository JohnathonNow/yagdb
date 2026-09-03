use serde::{Deserialize, Serialize};
use std::collections::HashMap;
#[cfg(not(target_arch = "wasm32"))]
use std::fs::File;
#[cfg(not(target_arch = "wasm32"))]
use std::io::Seek;

pub enum ItemStorage<T: Serialize + serde::de::DeserializeOwned + Clone> {
    Memory(parking_lot::RwLock<Vec<parking_lot::RwLock<T>>>),
    #[cfg(not(target_arch = "wasm32"))]
    Disk(parking_lot::RwLock<DiskStorage<T>>),
}

impl<T: Serialize + serde::de::DeserializeOwned + Clone> Serialize for ItemStorage<T> {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        match self {
            ItemStorage::Memory(vec) => {
                let vec = vec.read();
                let mut seq = serializer.serialize_seq(Some(vec.len()))?;
                for item in vec.iter() {
                    serde::ser::SerializeSeq::serialize_element(&mut seq, &*item.read())?;
                }
                serde::ser::SerializeSeq::end(seq)
            }
            #[cfg(not(target_arch = "wasm32"))]
            ItemStorage::Disk(disk) => disk.read().to_vec().serialize(serializer),
        }
    }
}

impl<'de, T: Serialize + serde::de::DeserializeOwned + Clone> Deserialize<'de> for ItemStorage<T> {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        let vec = Vec::<T>::deserialize(deserializer)?;
        let vec = vec.into_iter().map(parking_lot::RwLock::new).collect();
        Ok(ItemStorage::Memory(parking_lot::RwLock::new(vec)))
    }
}

#[cfg(not(target_arch = "wasm32"))]
pub struct DiskStorage<T: Serialize + serde::de::DeserializeOwned + Clone> {
    pub file: parking_lot::RwLock<File>,
    pub cache: parking_lot::RwLock<HashMap<usize, T>>,
    pub access_tracker: parking_lot::RwLock<Vec<usize>>,
    pub offsets: parking_lot::RwLock<Vec<u64>>,
    pub capacity: usize,
}

#[cfg(not(target_arch = "wasm32"))]
impl<T: Serialize + serde::de::DeserializeOwned + Clone> DiskStorage<T> {
    pub fn to_vec(&self) -> Vec<T> {
        let offsets = self.offsets.read();
        let mut vec = Vec::with_capacity(offsets.len());
        for i in 0..offsets.len() {
            if let Some(item) = self.get(i) {
                vec.push(item);
            }
        }
        vec
    }

    pub fn get(&self, index: usize) -> Option<T> {
        let offsets = self.offsets.read();
        if index >= offsets.len() {
            return None;
        }
        let offset = offsets[index];
        drop(offsets);

        let mut cache = self.cache.write();
        if !cache.contains_key(&index) {
            let mut file = self.file.write();
            file.seek(std::io::SeekFrom::Start(offset)).unwrap();
            let item: T = bincode::deserialize_from(&mut *file).unwrap();
            return Some(item);
        }
        cache.get(&index).cloned()
    }

    pub fn push(&mut self, item: T) {
        let mut offsets = self.offsets.write();
        let index = offsets.len();
        let mut file = self.file.write();
        let offset = file.seek(std::io::SeekFrom::End(0)).unwrap();
        bincode::serialize_into(&mut *file, &item).unwrap();
        file.sync_data().unwrap();
        offsets.push(offset);
        self.cache.write().insert(index, item);
    }

    pub fn update(&mut self, index: usize, item: T) {
        let mut offsets = self.offsets.write();
        if index >= offsets.len() {
            return;
        }
        let mut file = self.file.write();
        let offset = file.seek(std::io::SeekFrom::End(0)).unwrap();
        bincode::serialize_into(&mut *file, &item).unwrap();
        file.sync_data().unwrap();
        offsets[index] = offset;
        self.cache.write().insert(index, item);
    }

    pub fn len(&self) -> usize {
        self.offsets.read().len()
    }

    pub fn clear(&mut self) {
        self.cache.write().clear();
        self.offsets.write().clear();
        self.file.write().set_len(0).unwrap();
    }
}

impl<T: Serialize + serde::de::DeserializeOwned + Clone> ItemStorage<T> {
    pub fn get_item(&self, index: usize) -> Option<T> {
        match self {
            ItemStorage::Memory(vec) => vec.read().get(index).map(|l| l.read().clone()),
            #[cfg(not(target_arch = "wasm32"))]
            ItemStorage::Disk(disk) => disk.read().get(index),
        }
    }

    pub fn with_item<R>(&self, index: usize, f: impl FnOnce(&T) -> R) -> Option<R> {
        match self {
            ItemStorage::Memory(vec) => vec.read().get(index).map(|l| f(&*l.read())),
            #[cfg(not(target_arch = "wasm32"))]
            ItemStorage::Disk(disk) => disk.read().get(index).map(|item| f(&item)),
        }
    }

    pub fn push_item(&self, item: T) -> usize {
        match self {
            ItemStorage::Memory(vec) => {
                let mut v = vec.write();
                v.push(parking_lot::RwLock::new(item));
                v.len() - 1
            }
            #[cfg(not(target_arch = "wasm32"))]
            ItemStorage::Disk(disk) => {
                let mut d = disk.write();
                d.push(item);
                d.len() - 1
            }
        }
    }

    pub fn update_item(&self, index: usize, item: T) {
        match self {
            ItemStorage::Memory(vec) => {
                let vec = vec.read();
                if let Some(l) = vec.get(index) {
                    *l.write() = item;
                }
            }
            #[cfg(not(target_arch = "wasm32"))]
            ItemStorage::Disk(disk) => disk.write().update(index, item),
        }
    }

    /// ⚡ Bolt: Execute an in-place closure on an item to avoid cloning large structs (like properties/labels on Graph nodes).
    /// Reduces O(N) allocation mutations down to O(1) memory updates.
    pub fn with_mut_item<R>(&self, index: usize, f: impl FnOnce(&mut T) -> R) -> Option<R> {
        match self {
            ItemStorage::Memory(vec) => vec.read().get(index).map(|l| f(&mut *l.write())),
            #[cfg(not(target_arch = "wasm32"))]
            ItemStorage::Disk(disk) => {
                let mut disk_guard = disk.write();
                if let Some(mut item) = disk_guard.get(index) {
                    let result = f(&mut item);
                    disk_guard.update(index, item);
                    Some(result)
                } else {
                    None
                }
            }
        }
    }

    pub fn len_items(&self) -> usize {
        match self {
            ItemStorage::Memory(vec) => vec.read().len(),
            #[cfg(not(target_arch = "wasm32"))]
            ItemStorage::Disk(disk) => disk.read().len(),
        }
    }

    pub fn clear_items(&self) {
        match self {
            ItemStorage::Memory(vec) => vec.write().clear(),
            #[cfg(not(target_arch = "wasm32"))]
            ItemStorage::Disk(disk) => disk.write().clear(),
        }
    }

    pub fn replace_from(&self, other: Self) {
        match (self, other) {
            (ItemStorage::Memory(vec1), ItemStorage::Memory(vec2)) => {
                *vec1.write() = vec2.into_inner();
            }
            #[cfg(not(target_arch = "wasm32"))]
            (ItemStorage::Disk(disk1), ItemStorage::Disk(disk2)) => {
                *disk1.write() = disk2.into_inner();
            }
            _ => {}
        }
    }
}
