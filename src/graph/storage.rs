use serde::{Deserialize, Serialize};
use std::collections::HashMap;
#[cfg(not(target_arch = "wasm32"))]
use std::cell::RefCell;
#[cfg(not(target_arch = "wasm32"))]
use std::fs::File;
#[cfg(not(target_arch = "wasm32"))]
use std::io::Seek;

pub enum ItemStorage<T: Serialize + serde::de::DeserializeOwned + Clone> {
    Memory(Vec<T>),
    #[cfg(not(target_arch = "wasm32"))]
    Disk(DiskStorage<T>),
}

impl<T: Serialize + serde::de::DeserializeOwned + Clone> Serialize for ItemStorage<T> {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        match self {
            ItemStorage::Memory(vec) => vec.serialize(serializer),
            #[cfg(not(target_arch = "wasm32"))]
            ItemStorage::Disk(disk) => disk.to_vec().serialize(serializer),
        }
    }
}

impl<'de, T: Serialize + serde::de::DeserializeOwned + Clone> Deserialize<'de> for ItemStorage<T> {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        let vec = Vec::<T>::deserialize(deserializer)?;
        Ok(ItemStorage::Memory(vec))
    }
}

#[cfg(not(target_arch = "wasm32"))]
pub struct DiskStorage<T: Serialize + serde::de::DeserializeOwned + Clone> {
    pub file: RefCell<File>,
    pub cache: RefCell<HashMap<usize, T>>,
    pub access_tracker: RefCell<Vec<usize>>,
    pub offsets: RefCell<Vec<u64>>,
    pub capacity: usize,
}

#[cfg(not(target_arch = "wasm32"))]
impl<T: Serialize + serde::de::DeserializeOwned + Clone> DiskStorage<T> {
    pub fn to_vec(&self) -> Vec<T> {
        let offsets = self.offsets.borrow();
        let mut vec = Vec::with_capacity(offsets.len());
        for i in 0..offsets.len() {
            if let Some(item) = self.get(i) {
                vec.push(item);
            }
        }
        vec
    }

    pub fn get(&self, index: usize) -> Option<T> {
        let offsets = self.offsets.borrow();
        if index >= offsets.len() {
            return None;
        }
        let offset = offsets[index];
        drop(offsets);

        let mut cache = self.cache.borrow_mut();
        cache.entry(index).or_insert_with(|| {
            let mut file = self.file.borrow_mut();
            file.seek(std::io::SeekFrom::Start(offset)).unwrap();
            let item: T = bincode::deserialize_from(&mut *file).unwrap();
            item
        });
        cache.get(&index).cloned()
    }

    pub fn push(&mut self, item: T) {
        let mut offsets = self.offsets.borrow_mut();
        let index = offsets.len();
        let mut file = self.file.borrow_mut();
        let offset = file.seek(std::io::SeekFrom::End(0)).unwrap();
        bincode::serialize_into(&mut *file, &item).unwrap();
        file.sync_data().unwrap();
        offsets.push(offset);
        self.cache.borrow_mut().insert(index, item);
    }

    pub fn update(&mut self, index: usize, item: T) {
        let mut offsets = self.offsets.borrow_mut();
        if index >= offsets.len() {
            return;
        }
        let mut file = self.file.borrow_mut();
        let offset = file.seek(std::io::SeekFrom::End(0)).unwrap();
        bincode::serialize_into(&mut *file, &item).unwrap();
        file.sync_data().unwrap();
        offsets[index] = offset;
        self.cache.borrow_mut().insert(index, item);
    }

    pub fn len(&self) -> usize {
        self.offsets.borrow().len()
    }

    pub fn clear(&mut self) {
        self.cache.borrow_mut().clear();
        self.offsets.borrow_mut().clear();
        self.file.borrow_mut().set_len(0).unwrap();
    }
}

impl<T: Serialize + serde::de::DeserializeOwned + Clone> ItemStorage<T> {
    pub fn get_item(&self, index: usize) -> Option<T> {
        match self {
            ItemStorage::Memory(vec) => vec.get(index).cloned(),
            #[cfg(not(target_arch = "wasm32"))]
            ItemStorage::Disk(disk) => disk.get(index),
        }
    }

    pub fn with_item<R>(&self, index: usize, f: impl FnOnce(&T) -> R) -> Option<R> {
        match self {
            ItemStorage::Memory(vec) => vec.get(index).map(f),
            #[cfg(not(target_arch = "wasm32"))]
            ItemStorage::Disk(disk) => disk.get(index).map(|item| f(&item)),
        }
    }

    pub fn push_item(&mut self, item: T) {
        match self {
            ItemStorage::Memory(vec) => vec.push(item),
            #[cfg(not(target_arch = "wasm32"))]
            ItemStorage::Disk(disk) => disk.push(item),
        }
    }

    pub fn update_item(&mut self, index: usize, item: T) {
        match self {
            ItemStorage::Memory(vec) => {
                if index < vec.len() {
                    vec[index] = item;
                }
            }
            #[cfg(not(target_arch = "wasm32"))]
            ItemStorage::Disk(disk) => disk.update(index, item),
        }
    }

    /// ⚡ Bolt: Execute an in-place closure on an item to avoid cloning large structs (like properties/labels on Graph nodes).
    /// Reduces O(N) allocation mutations down to O(1) memory updates.
    pub fn with_mut_item<R>(&mut self, index: usize, f: impl FnOnce(&mut T) -> R) -> Option<R> {
        match self {
            ItemStorage::Memory(vec) => vec.get_mut(index).map(f),
            #[cfg(not(target_arch = "wasm32"))]
            ItemStorage::Disk(disk) => {
                if let Some(mut item) = disk.get(index) {
                    let result = f(&mut item);
                    disk.update(index, item);
                    Some(result)
                } else {
                    None
                }
            }
        }
    }

    pub fn len_items(&self) -> usize {
        match self {
            ItemStorage::Memory(vec) => vec.len(),
            #[cfg(not(target_arch = "wasm32"))]
            ItemStorage::Disk(disk) => disk.len(),
        }
    }

    pub fn clear_items(&mut self) {
        match self {
            ItemStorage::Memory(vec) => vec.clear(),
            #[cfg(not(target_arch = "wasm32"))]
            ItemStorage::Disk(disk) => disk.clear(),
        }
    }
}
