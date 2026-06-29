use serde::{Deserialize, Serialize};
use serde_json::{json, Value};
use std::collections::HashMap;
#[cfg(not(target_arch = "wasm32"))]
use std::fs::File;
#[cfg(not(target_arch = "wasm32"))]
use std::io::Seek;
#[cfg(not(target_arch = "wasm32"))]
use std::io::Write;

use std::borrow::Cow;

use crate::planner::{ExecutionStep, PlanNode, QueryPlanner};
use crate::{
    edge::Edge,
    node::Node,
    parser::{
        parse_query, CompareOp, Condition, Expression, NodePattern, Path, ProjectionItem,
        RelPattern,
    },
};

#[derive(Serialize, Deserialize, Debug, Clone, PartialEq)]
pub enum IndexType {
    Hash,
    BTree,
}

#[derive(Serialize, Deserialize, Debug)]
pub enum IndexMap {
    Hash(HashMap<crate::property::PropertyValue, Vec<usize>>),
    BTree(std::collections::BTreeMap<crate::property::PropertyValue, Vec<usize>>),
}

#[derive(Serialize, Deserialize, Debug)]
pub enum WalEntry {
    AddLabel {
        label: String,
    },
    AddNode {
        id: String,
        label: usize,
        properties: HashMap<String, crate::property::PropertyValue>,
    },
    AddEdge {
        id: String,
        start: usize,
        end: usize,
        labels: Vec<usize>,
        properties: HashMap<String, crate::property::PropertyValue>,
    },
    CreateIndex {
        label: usize,
        property: String,
        index_type: crate::graph::IndexType,
    },
    SetNodeProperty {
        node_id: usize,
        key: String,
        value: crate::property::PropertyValue,
    },
    DeleteNode { node_id: usize },
    DeleteEdge { edge_id: usize },
}

#[derive(Clone, Debug, PartialEq)]
pub enum GraphElement {
    Node(usize),
    Edge(usize),
    EdgeArray(Vec<usize>),
    Path(Vec<GraphElement>),
    List(Vec<GraphElement>),
    Map(HashMap<String, GraphElement>),
    Number(f64),
    String(String),
    Boolean(bool),
    Null,
}

pub type Environment = HashMap<String, GraphElement>;

#[derive(Clone, Default, Debug, PartialEq)]
pub struct ResultSet {
    pub columns: HashMap<String, Vec<GraphElement>>,
    pub rows: usize,
}

impl ResultSet {
    pub fn new() -> Self {
        Self {
            columns: HashMap::new(),
            rows: 0,
        }
    }

    pub fn get_row(&self, idx: usize) -> Environment {
        let mut env = HashMap::new();
        for (k, v) in &self.columns {
            let val = &v[idx];
            if !matches!(val, GraphElement::Null) {
                env.insert(k.clone(), val.clone());
            }
        }
        env
    }

    pub fn push_row(&mut self, env: &Environment) {
        let current_rows = self.rows;
        for (k, v) in env {
            if let Some(col) = self.columns.get_mut(k) {
                col.push(v.clone());
            } else {
                let mut col = vec![GraphElement::Null; current_rows];
                col.push(v.clone());
                self.columns.insert(k.clone(), col);
            }
        }
        self.rows += 1;
        for (_k, col) in self.columns.iter_mut() {
            if col.len() < self.rows {
                col.push(GraphElement::Null);
            }
        }
    }

    pub fn is_empty(&self) -> bool {
        self.rows == 0
    }

    pub fn get(&self, row_idx: usize, col_name: &str) -> Option<&GraphElement> {
        if let Some(col) = self.columns.get(col_name) {
            let val = &col[row_idx];
            if matches!(val, GraphElement::Null) {
                None
            } else {
                Some(val)
            }
        } else {
            None
        }
    }

    pub fn push_row_from<'a, K: AsRef<str> + 'a, I>(&mut self, other: &ResultSet, row_idx: usize, bindings: I)
    where I: IntoIterator<Item = &'a (K, GraphElement)> {
        let current_rows = self.rows;
        for (k, v) in &other.columns {
            let val = &v[row_idx];
            if !matches!(val, GraphElement::Null) {
                if let Some(col) = self.columns.get_mut(k) {
                    col.push(val.clone());
                } else {
                    let mut col = vec![GraphElement::Null; current_rows];
                    col.push(val.clone());
                    self.columns.insert(k.clone(), col);
                }
            }
        }
        for (k, v) in bindings {
            if let Some(col) = self.columns.get_mut(k.as_ref()) {
                if col.len() > current_rows {
                    col[current_rows] = v.clone();
                } else {
                    col.push(v.clone());
                }
            } else {
                let mut col = vec![GraphElement::Null; current_rows];
                if col.len() > current_rows {
                    col[current_rows] = v.clone();
                } else {
                    col.push(v.clone());
                }
                self.columns.insert(k.as_ref().to_string(), col);
            }
        }
        self.rows += 1;
        for (_k, col) in self.columns.iter_mut() {
            if col.len() < self.rows {
                col.push(GraphElement::Null);
            }
        }
    }

    pub fn push_merged_row(&mut self, left: &ResultSet, l_idx: usize, right: &ResultSet, r_idx: usize) {
        let current_rows = self.rows;
        for (k, v) in &left.columns {
            let val = &v[l_idx];
            if !matches!(val, GraphElement::Null) {
                if let Some(col) = self.columns.get_mut(k) {
                    col.push(val.clone());
                } else {
                    let mut col = vec![GraphElement::Null; current_rows];
                    col.push(val.clone());
                    self.columns.insert(k.clone(), col);
                }
            }
        }
        for (k, v) in &right.columns {
            let val = &v[r_idx];
            if !matches!(val, GraphElement::Null) {
                if let Some(col) = self.columns.get_mut(k) {
                    if col.len() > current_rows {
                        col[current_rows] = val.clone();
                    } else {
                        col.push(val.clone());
                    }
                } else {
                    let mut col = vec![GraphElement::Null; current_rows];
                    if col.len() > current_rows {
                        col[current_rows] = val.clone();
                    } else {
                        col.push(val.clone());
                    }
                    self.columns.insert(k.clone(), col);
                }
            }
        }
        self.rows += 1;
        for (_k, col) in self.columns.iter_mut() {
            if col.len() < self.rows {
                col.push(GraphElement::Null);
            }
        }
    }

}

#[cfg(not(target_arch = "wasm32"))]
use std::cell::RefCell;

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
        if !cache.contains_key(&index) {
            let mut file = self.file.borrow_mut();
            file.seek(std::io::SeekFrom::Start(offset)).unwrap();
            let item: T = bincode::deserialize_from(&mut *file).unwrap();
            cache.insert(index, item);
        }
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


#[derive(Serialize, Deserialize)]
pub struct Graph {
    pub nodes: ItemStorage<Node>,
    pub edges: ItemStorage<Edge>,
    pub labels: HashMap<String, usize>,
    pub indices: HashMap<usize, HashMap<String, IndexMap>>,
    #[serde(skip)]
    #[cfg(not(target_arch = "wasm32"))]
    pub wal_file: Option<File>,
}

#[cfg(not(target_arch = "wasm32"))]
use std::io::Read;

impl Graph {
    #[cfg(not(target_arch = "wasm32"))]
    pub fn load_or_create(snapshot_path: &str, wal_path: &str) -> Self {
        let mut graph = if let Ok(mut snapshot_file) = File::open(snapshot_path) {
            let mut buffer = Vec::new();
            snapshot_file.read_to_end(&mut buffer).unwrap();
            let mut g: Graph = bincode::deserialize(&buffer).unwrap();
            g.wal_file = None;
            g
        } else {
            Self::new()
        };

        let mut needs_snapshot = false;

        if let Ok(mut wal_file) = File::open(wal_path) {
            if wal_file.metadata().map(|m| m.len()).unwrap_or(0) > 0 {
                needs_snapshot = true;
            }
            loop {
                let mut len_buf = [0u8; 4];
                if wal_file.read_exact(&mut len_buf).is_err() {
                    break;
                }
                let len = u32::from_le_bytes(len_buf) as usize;
                let mut entry_buf = vec![0u8; len];
                if wal_file.read_exact(&mut entry_buf).is_err() {
                    break;
                }

                let entry: WalEntry = bincode::deserialize(&entry_buf).unwrap();
                match entry {
                    WalEntry::AddLabel { label } => {
                        let id = graph.labels.len();
                        graph.labels.insert(label, id);
                    }
                    WalEntry::AddNode { id, label, properties } => {
                        let node = Node::new(id.clone(), vec![label], vec![], properties.clone());
                        graph.nodes.push_item(node);
                        let node_id = graph.nodes.len_items() - 1;

                        // Update indices if any apply
                        if let Some(label_indices) = graph.indices.get_mut(&label) {
                            for (prop_key, prop_index) in label_indices.iter_mut() {
                                if let Some(prop_val) = properties.get(prop_key) {
                                    match prop_index {
                                        IndexMap::Hash(map) => {
                                            if let Some(vec) = map.get_mut(prop_val) {
                                            vec.push(node_id);
                                        } else {
                                            map.insert(prop_val.clone(), vec![node_id]);
                                        }
                                        }
                                        IndexMap::BTree(map) => {
                                            if let Some(vec) = map.get_mut(prop_val) {
                                            vec.push(node_id);
                                        } else {
                                            map.insert(prop_val.clone(), vec![node_id]);
                                        }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    WalEntry::AddEdge {
                        id,
                        start,
                        end,
                        labels,
                        properties,
                    } => {
                        let edge = Edge::new(id.clone(), labels, start, end, properties);
                        graph.edges.push_item(edge);
                        let edge_idx = graph.edges.len_items() - 1;
                        { let mut n = graph.nodes.get_item(start).unwrap(); n.edges.push(edge_idx); graph.nodes.update_item(start, n); }
                        { let mut n = graph.nodes.get_item(end).unwrap(); n.edges.push(edge_idx); graph.nodes.update_item(end, n); }
                    }
                    WalEntry::CreateIndex { label, property, index_type } => {
                        graph.create_index_internal(label, property, index_type);
                    }
                    WalEntry::SetNodeProperty {
                        node_id,
                        key,
                        value,
                    } => {
                        let mut __node = graph.nodes.get_item(node_id).unwrap();
                        let old_value = __node.properties.insert(key.clone(), value.clone());
                        graph.nodes.update_item(node_id, __node);
                        for (label_id, label_indices) in graph.indices.iter_mut() {
                            if graph.nodes.get_item(node_id).unwrap().labels.contains(label_id) {
                                if let Some(prop_index) = label_indices.get_mut(&key) {
                                    match prop_index {
                                        IndexMap::Hash(map) => {
                                            // Remove from old index
                                            if let Some(old_val) = &old_value {
                                                if let Some(vec) = map.get_mut(old_val) {
                                                    vec.retain(|&id| id != node_id);
                                                }
                                            }
                                            // Add to new index if not already present
                                            if let Some(entry_vec) = map.get_mut(&value) {
                                                if !entry_vec.contains(&node_id) {
                                                    entry_vec.push(node_id);
                                                }
                                            } else {
                                                map.insert(value.clone(), vec![node_id]);
                                            }
                                        }
                                        IndexMap::BTree(map) => {
                                            // Remove from old index
                                            if let Some(old_val) = &old_value {
                                                if let Some(vec) = map.get_mut(old_val) {
                                                    vec.retain(|&id| id != node_id);
                                                }
                                            }
                                            // Add to new index if not already present
                                            if let Some(entry_vec) = map.get_mut(&value) {
                                                if !entry_vec.contains(&node_id) {
                                                    entry_vec.push(node_id);
                                                }
                                            } else {
                                                map.insert(value.clone(), vec![node_id]);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    WalEntry::DeleteNode { node_id } => {
                        { let mut n = graph.nodes.get_item(node_id).unwrap(); n.deleted = true; graph.nodes.update_item(node_id, n); }
                        for (label_id, label_indices) in graph.indices.iter_mut() {
                            if graph.nodes.get_item(node_id).unwrap().labels.contains(label_id) {
                                for (_, prop_index) in label_indices.iter_mut() {
                                    match prop_index {
                                        IndexMap::Hash(map) => {
                                            for (_, vec) in map.iter_mut() {
                                                vec.retain(|&id| id != node_id);
                                            }
                                        }
                                        IndexMap::BTree(map) => {
                                            for (_, vec) in map.iter_mut() {
                                                vec.retain(|&id| id != node_id);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    WalEntry::DeleteEdge { edge_id } => {
                        { let mut e = graph.edges.get_item(edge_id).unwrap(); e.deleted = true; graph.edges.update_item(edge_id, e); }
                    }
                }
                needs_snapshot = true;
            }
        } else {
            needs_snapshot = true; // No wal implies we probably don't have a snapshot, create it
        }

        if needs_snapshot {
            let encoded = bincode::serialize(&graph).unwrap();
            let tmp_path = format!("{}.tmp", snapshot_path);
            let mut snapshot_file = std::fs::OpenOptions::new()
                .create(true)
                .write(true)
                .truncate(true)
                .open(&tmp_path)
                .unwrap();
            snapshot_file.write_all(&encoded).unwrap();
            snapshot_file.sync_data().unwrap();
            std::fs::rename(&tmp_path, snapshot_path).unwrap();
        }

        // If we created a new snapshot, truncate WAL to restart it
        if needs_snapshot {
            let wal_file = std::fs::OpenOptions::new()
                .create(true)
                .write(true)
                .truncate(true)
                .open(wal_path)
                .unwrap();
            wal_file.sync_data().unwrap();
        }

        graph.wal_file = Some(
            std::fs::OpenOptions::new()
                .create(true)
                .append(true)
                .open(wal_path)
                .unwrap(),
        );

        graph
    }

    pub fn element_to_json(&self, element: &GraphElement) -> Value {
        match element {
            GraphElement::Node(node_id) => {
                let node = self.nodes.get_item(*node_id).unwrap();
                let mut map = serde_json::Map::new();
                map.insert(
                    "labels".to_string(),
                    serde_json::to_value(&node.labels).unwrap(),
                );
                map.insert(
                    "edges".to_string(),
                    serde_json::to_value(&node.edges).unwrap(),
                );
                let mut props = serde_json::Map::new();
                for (k, v) in &node.properties {
                    props.insert(k.clone(), v.to_json_value());
                }
                map.insert("properties".to_string(), Value::Object(props));
                Value::Object(map)
            }
            GraphElement::Edge(edge_id) => {
                let edge = self.edges.get_item(*edge_id).unwrap();
                let mut map = serde_json::Map::new();
                map.insert(
                    "labels".to_string(),
                    serde_json::to_value(&edge.labels).unwrap(),
                );
                map.insert(
                    "start".to_string(),
                    serde_json::to_value(edge.start).unwrap(),
                );
                map.insert("end".to_string(), serde_json::to_value(edge.end).unwrap());
                let mut props = serde_json::Map::new();
                for (k, v) in &edge.properties {
                    props.insert(k.clone(), v.to_json_value());
                }
                map.insert("properties".to_string(), Value::Object(props));
                Value::Object(map)
            }
            GraphElement::EdgeArray(edge_ids) => {
                let edges_val: Vec<_> = edge_ids
                    .iter()
                    .map(|&id| self.element_to_json(&GraphElement::Edge(id)))
                    .collect();
                serde_json::to_value(&edges_val).unwrap()
            }
            GraphElement::Path(elements) => {
                let path_out: Vec<Value> =
                    elements.iter().map(|el| self.element_to_json(el)).collect();
                serde_json::to_value(&path_out).unwrap()
            }
            GraphElement::List(elements) => {
                let list_out: Vec<Value> =
                    elements.iter().map(|el| self.element_to_json(el)).collect();
                serde_json::to_value(&list_out).unwrap()
            }
            GraphElement::Map(map) => {
                let mut map_out = serde_json::Map::new();
                for (k, v) in map {
                    map_out.insert(k.clone(), self.element_to_json(v));
                }
                Value::Object(map_out)
            }
            GraphElement::Number(n) => json!(n),
            GraphElement::String(ref s) => json!(s),
            GraphElement::Boolean(b) => json!(b),
            GraphElement::Null => Value::Null,
        }
    }

    pub fn format_element(&self, element: &GraphElement) -> String {
        match element {
            GraphElement::Node(node_id) => format!("{:?}", self.nodes.get_item(*node_id).unwrap()),
            GraphElement::Edge(edge_id) => format!("{:?}", self.edges.get_item(*edge_id).unwrap()),
            GraphElement::EdgeArray(edge_ids) => {
                let edges: Vec<_> = edge_ids.iter().map(|&id| self.edges.get_item(id).unwrap()).collect();
                format!("{:?}", edges)
            }
            GraphElement::Path(elements) => {
                let mut path_out = Vec::new();
                for el in elements {
                    path_out.push(self.format_element(el));
                }
                format!("[{}]", path_out.join(", "))
            }
            GraphElement::List(elements) => {
                let mut list_out = Vec::new();
                for el in elements {
                    list_out.push(self.format_element(el));
                }
                format!("[{}]", list_out.join(", "))
            }
            GraphElement::Map(map) => {
                let mut map_out = Vec::new();
                for (k, v) in map {
                    map_out.push(format!("{}: {}", k, self.format_element(v)));
                }
                format!("{{{}}}", map_out.join(", "))
            }
            GraphElement::Number(n) => format!("{}", n),
            GraphElement::String(ref s) => format!("\"{}\"", s),
            GraphElement::Boolean(b) => format!("{}", b),
            GraphElement::Null => "null".to_string(),
        }
    }


    #[cfg(not(target_arch = "wasm32"))]
    pub fn enable_disk_storage(&mut self, nodes_path: &str, edges_path: &str) {
        let mut nodes_disk = DiskStorage {
            file: RefCell::new(std::fs::OpenOptions::new()
                .create(true)
                .read(true)
                .write(true)
                .truncate(true)
                .open(nodes_path)
                .unwrap()),
            cache: RefCell::new(HashMap::new()),
            access_tracker: RefCell::new(Vec::new()),
            offsets: RefCell::new(Vec::new()),
            capacity: 10000,
        };
        if let ItemStorage::Memory(vec) = &self.nodes {
            for node in vec {
                nodes_disk.push(node.clone());
            }
        }
        self.nodes = ItemStorage::Disk(nodes_disk);

        let mut edges_disk = DiskStorage {
            file: RefCell::new(std::fs::OpenOptions::new()
                .create(true)
                .read(true)
                .write(true)
                .truncate(true)
                .open(edges_path)
                .unwrap()),
            cache: RefCell::new(HashMap::new()),
            access_tracker: RefCell::new(Vec::new()),
            offsets: RefCell::new(Vec::new()),
            capacity: 10000,
        };
        if let ItemStorage::Memory(vec) = &self.edges {
            for edge in vec {
                edges_disk.push(edge.clone());
            }
        }
        self.edges = ItemStorage::Disk(edges_disk);
    }

    pub fn new() -> Self {
        Self {
            nodes: ItemStorage::Memory(Vec::new()),
            edges: ItemStorage::Memory(Vec::new()),
            labels: HashMap::new(),
            indices: HashMap::new(),
            #[cfg(not(target_arch = "wasm32"))]
            wal_file: None,
        }
    }

    pub fn clear(&mut self) {
        self.nodes.clear_items();
        self.edges.clear_items();
        self.labels.clear();
        self.indices.clear();
        #[cfg(not(target_arch = "wasm32"))]
        if let Some(file) = &mut self.wal_file {
            let _ = file.set_len(0);
            let _ = file.rewind();
        }
    }

    #[cfg(not(target_arch = "wasm32"))]
    fn log_wal(&mut self, entry: &WalEntry) {
        if let Some(file) = &mut self.wal_file {
            let encoded = bincode::serialize(entry).unwrap();
            let len = encoded.len() as u32;
            file.write_all(&len.to_le_bytes()).unwrap();
            file.write_all(&encoded).unwrap();
            file.sync_data().unwrap();
        }
    }

    #[cfg(target_arch = "wasm32")]
    fn log_wal(&mut self, _entry: &WalEntry) {}

    pub fn get_or_add_label(&mut self, label: &str) -> usize {
        if let Some(&id) = self.labels.get(label) {
            id
        } else {
            let id = self.labels.len();
            self.labels.insert(label.to_string(), id);
            self.log_wal(&WalEntry::AddLabel {
                label: label.to_string(),
            });
            id
        }
    }

    pub fn add_node(
        &mut self,
        label: usize,
        properties: HashMap<String, crate::property::PropertyValue>,
    ) -> usize {
        let id = uuid::Uuid::new_v4().to_string();
        let node = Node::new(id.clone(), vec![label], vec![], properties.clone());
        self.nodes.push_item(node);
        let node_id = self.nodes.len_items() - 1;

        // Update indices if any apply
        if let Some(label_indices) = self.indices.get_mut(&label) {
            for (prop_key, prop_index) in label_indices.iter_mut() {
                if let Some(prop_val) = properties.get(prop_key) {
                    match prop_index {
                        IndexMap::Hash(map) => {
                            if let Some(vec) = map.get_mut(prop_val) {
                                            vec.push(node_id);
                                        } else {
                                            map.insert(prop_val.clone(), vec![node_id]);
                                        }
                        }
                        IndexMap::BTree(map) => {
                            if let Some(vec) = map.get_mut(prop_val) {
                                            vec.push(node_id);
                                        } else {
                                            map.insert(prop_val.clone(), vec![node_id]);
                                        }
                        }
                    }
                }
            }
        }

        self.log_wal(&WalEntry::AddNode { id, label, properties });
        node_id
    }

    pub fn create_index(&mut self, label: usize, property: String, index_type: IndexType) {
        self.create_index_internal(label, property.clone(), index_type.clone());
        self.log_wal(&WalEntry::CreateIndex { label, property, index_type });
    }

    fn create_index_internal(&mut self, label: usize, property: String, index_type: IndexType) {
        if !self.indices.contains_key(&label) {
            self.indices.insert(label, HashMap::new());
        }
        let label_indices = self.indices.get_mut(&label).unwrap();
        if !label_indices.contains_key(&property) {
            let index_map = match index_type {
                IndexType::Hash => IndexMap::Hash(HashMap::new()),
                IndexType::BTree => IndexMap::BTree(std::collections::BTreeMap::new()),
            };
            label_indices.insert(property.clone(), index_map);
        }
        let property_index = label_indices.get_mut(&property).unwrap();

        // Populate index with existing nodes

        for node_id in 0..self.nodes.len_items() {
            let node = self.nodes.get_item(node_id).unwrap();
            if node.labels.contains(&label) {
                if let Some(value) = node.properties.get(&property) {
                    match property_index {
                        IndexMap::Hash(map) => {
                            if let Some(vec) = map.get_mut(value) {
                                            vec.push(node_id);
                                        } else {
                                            map.insert(value.clone(), vec![node_id]);
                                        }
                        }
                        IndexMap::BTree(map) => {
                            if let Some(vec) = map.get_mut(value) {
                                            vec.push(node_id);
                                        } else {
                                            map.insert(value.clone(), vec![node_id]);
                                        }
                        }
                    }
                }
            }
        }
    }

    pub fn add_edge(
        &mut self,
        start: usize,
        end: usize,
        labels: Vec<usize>,
        properties: HashMap<String, crate::property::PropertyValue>,
    ) -> usize {
        let id = uuid::Uuid::new_v4().to_string();
        let edge = Edge::new(id.clone(), labels.clone(), start, end, properties.clone());
        self.edges.push_item(edge);
        let edge_idx = self.edges.len_items() - 1;
        { let mut n = self.nodes.get_item(start).unwrap(); n.edges.push(edge_idx); self.nodes.update_item(start, n); }
        { let mut n = self.nodes.get_item(end).unwrap(); n.edges.push(edge_idx); self.nodes.update_item(end, n); }
        self.log_wal(&WalEntry::AddEdge {
            id,
            start,
            end,
            labels,
            properties,
        });
        edge_idx
    }

    #[cfg(not(target_arch = "wasm32"))]
    pub fn backup(&self) -> Result<Vec<u8>, String> {
        let encoded = bincode::serialize(self).map_err(|e| format!("Serialization error: {}", e))?;
        Ok(encoded)
    }

    pub fn execute(&mut self, query_str: &str) -> Result<String, String> {
        let (_, query) = parse_query(query_str).map_err(|e| format!("Parse error: {}", e))?;

        let mut output = String::new();
        let mut profile_out = if query.profile {
            Some(String::new())
        } else {
            None
        };

        // A single environment initially, representing the "root" row.
        let mut result_set = ResultSet::new();
        result_set.push_row(&HashMap::new());

        let plan = QueryPlanner::plan_query(query, &self.labels, &self.indices);

        for step in plan.steps {
            match step {
                ExecutionStep::Create(paths) => {
                    let mut new_result_set = ResultSet::new();
                    for i in 0..result_set.rows {
                        let mut bindings = Vec::new();
                        for path in &paths {
                            self.execute_create_path(path.clone(), &result_set, i, &mut bindings);
                        }
                        new_result_set.push_row_from(&result_set, i, &bindings);
                    }
                    result_set = new_result_set;
                }
                ExecutionStep::Match(plan_opt, paths, condition_opt, limit_opt) => {
                    if let Some(plan) = plan_opt {
                        let mut new_result_set = ResultSet::new();
                        let limit_for_plan = if condition_opt.is_none() { limit_opt.clone() } else { None };
                        self.execute_plan_and_bind_paths(
                            &plan,
                            &paths,
                            &result_set,
                            &mut new_result_set,
                            &mut profile_out,
                            limit_for_plan,
                        );

                        if let Some(cond) = &condition_opt {
                            let mut filtered = ResultSet::new();
                            for i in 0..new_result_set.rows {
                                if self.evaluate_condition(cond, &new_result_set, i) {
                                    filtered.push_row_from(&new_result_set, i, &[] as &[(&str, GraphElement)]);
                                    if let Some(limit) = limit_opt {
                                        if filtered.rows >= limit {
                                            break;
                                        }
                                    }
                                }
                            }
                            new_result_set = filtered;
                        } else if let Some(limit) = limit_opt {
                            new_result_set.truncate(limit);
                        }

                        result_set = new_result_set;
                        if result_set.is_empty() {
                            break;
                        }
                    }
                }
                ExecutionStep::Merge(planned_paths) => {
                    let mut new_result_set = ResultSet::new();
                    for i in 0..result_set.rows {
                        for (plan_opt, path) in &planned_paths {
                            if let Some(plan) = plan_opt {
                                let mut single_res = ResultSet::new();
                                single_res.push_row_from(&result_set, i, &[] as &[(&str, GraphElement)]);

                                let mut matches = ResultSet::new();
                                self.execute_plan_and_bind_paths(
                                    plan,
                                    &[path.clone()],
                                    &single_res,
                                    &mut matches,
                                    &mut profile_out,
                                    None,
                                );
                                if !matches.is_empty() {
                                    for m_idx in 0..matches.rows {
                                        new_result_set.push_row_from(&matches, m_idx, &[] as &[(&str, GraphElement)]);
                                    }
                                } else {
                                    let mut bindings = Vec::new();
                                    self.execute_create_path(path.clone(), &result_set, i, &mut bindings);
                                    new_result_set.push_row_from(&result_set, i, &bindings);
                                }
                            } else {
                                let mut bindings = Vec::new();
                                self.execute_create_path(path.clone(), &result_set, i, &mut bindings);
                                new_result_set.push_row_from(&result_set, i, &bindings);
                            }
                        }
                    }
                    result_set = new_result_set;
                }
                ExecutionStep::Set(var, key, value) => {
                    let mut updated_nodes = std::collections::HashSet::new();
                    for i in 0..result_set.rows {
                        if let Some(GraphElement::Node(node_id)) = result_set.get(i, &var) {
                            let node_id = *node_id;
                            if updated_nodes.insert(node_id) {
                                let mut __node = self.nodes.get_item(node_id).unwrap();
                                let old_value = __node.properties.insert(key.clone(), value.clone());
                                self.nodes.update_item(node_id, __node);

                                // Update indices if necessary
                                for (label_id, label_indices) in self.indices.iter_mut() {
                                    if self.nodes.get_item(node_id).unwrap().labels.contains(label_id) {
                                        if let Some(prop_index) = label_indices.get_mut(&key) {
                                            match prop_index {
                                                IndexMap::Hash(map) => {
                                                    // Remove from old index
                                                    if let Some(old_val) = &old_value {
                                                        if let Some(vec) = map.get_mut(old_val) {
                                                            vec.retain(|&id| id != node_id);
                                                        }
                                                    }
                                                    // Add to new index
                                                    if let Some(entry_vec) = map.get_mut(&value) {
                                                        if !entry_vec.contains(&node_id) {
                                                            entry_vec.push(node_id);
                                                        }
                                                    } else {
                                                        map.insert(value.clone(), vec![node_id]);
                                                    }
                                                }
                                                IndexMap::BTree(map) => {
                                                    // Remove from old index
                                                    if let Some(old_val) = &old_value {
                                                        if let Some(vec) = map.get_mut(old_val) {
                                                            vec.retain(|&id| id != node_id);
                                                        }
                                                    }
                                                    // Add to new index
                                                    if let Some(entry_vec) = map.get_mut(&value) {
                                                        if !entry_vec.contains(&node_id) {
                                                            entry_vec.push(node_id);
                                                        }
                                                    } else {
                                                        map.insert(value.clone(), vec![node_id]);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }

                                self.log_wal(&WalEntry::SetNodeProperty {
                                    node_id,
                                    key: key.clone(),
                                    value: value.clone(),
                                });
                            }
                        }
                    }
                }
                ExecutionStep::Delete(vars) => {
                    let mut nodes_to_delete = Vec::new();
                    let mut edges_to_delete = Vec::new();
                    for var in &vars {
                        for i in 0..result_set.rows {
                            if let Some(GraphElement::Node(node_id)) = result_set.get(i, var) {
                                if !nodes_to_delete.contains(node_id) {
                                    nodes_to_delete.push(*node_id);
                                }
                            } else if let Some(GraphElement::Edge(edge_id)) = result_set.get(i, var) {
                                if !edges_to_delete.contains(edge_id) {
                                    edges_to_delete.push(*edge_id);
                                }
                            }
                        }
                    }

                    for &edge_id in &edges_to_delete {
                        if !self.edges.get_item(edge_id).unwrap().deleted {
                            { let mut e = self.edges.get_item(edge_id).unwrap(); e.deleted = true; self.edges.update_item(edge_id, e); }
                            self.log_wal(&WalEntry::DeleteEdge { edge_id });
                        }
                    }

                    for &node_id in &nodes_to_delete {
                        if !self.nodes.get_item(node_id).unwrap().deleted {
                            { let mut n = self.nodes.get_item(node_id).unwrap(); n.deleted = true; self.nodes.update_item(node_id, n); }
                            for (label_id, label_indices) in self.indices.iter_mut() {
                                if self.nodes.get_item(node_id).unwrap().labels.contains(label_id) {
                                    for (_, prop_index) in label_indices.iter_mut() {
                                        match prop_index {
                                            IndexMap::Hash(map) => {
                                                for (_, vec) in map.iter_mut() {
                                                    vec.retain(|&id| id != node_id);
                                                }
                                            }
                                            IndexMap::BTree(map) => {
                                                for (_, vec) in map.iter_mut() {
                                                    vec.retain(|&id| id != node_id);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            self.log_wal(&WalEntry::DeleteNode { node_id });
                        }
                    }
                }
                ExecutionStep::Unwind(ref items) => {
                    let mut new_result_set = ResultSet::new();
                    for i in 0..result_set.rows {
                        for item in items.iter() {
                            match item {
                                ProjectionItem::Variable(var) => {
                                    if let Some(val) = result_set.get(i, var) {
                                        match val {
                                            GraphElement::List(v) => {
                                                for x in v {
                                                    new_result_set.push_row_from(&result_set, i, &[(var.as_str(), x.clone())] as &[(&str, GraphElement)]);
                                                }
                                            }
                                            _ => {}
                                        }
                                    }
                                }
                                ProjectionItem::Property(var, prop) => {
                                    if let Some(val) = self.get_property_as_element(&result_set, i, var, prop) {
                                        match val {
                                            GraphElement::List(v) => {
                                                for x in v {
                                                    let key = format!("{}.{}", var, prop);
                                                    new_result_set.push_row_from(&result_set, i, &[(key.as_str(), x.clone())] as &[(&str, GraphElement)]);
                                                }
                                            }
                                            _ => {}
                                        }
                                    }
                                }
                                ProjectionItem::AliasedProperty(var, prop, alias) => {
                                    if let Some(val) = self.get_property_as_element(&result_set, i, var, prop) {
                                        match val {
                                            GraphElement::List(v) => {
                                                for x in v {
                                                    new_result_set.push_row_from(&result_set, i, &[(alias.as_str(), x.clone())] as &[(&str, GraphElement)]);
                                                }
                                            }
                                            _ => {}
                                        }
                                    }
                                }
                                _ => {}
                            }
                        }
                    }
                    result_set = new_result_set;
                }
                ExecutionStep::With(ref items, ref order_by_opt, ref l) | ExecutionStep::Return(ref items, ref order_by_opt, ref l) => {
                    let mut is_return = false;
                    let limit = *l;
                    if let ExecutionStep::Return(..) = &step {
                        is_return = true;
                    }

                    // Handle Star conversion
                    let items: Vec<ProjectionItem> =
                        if items.len() == 1 && matches!(items[0], ProjectionItem::Star) {
                            let mut keys: Vec<String> = result_set.columns.keys()
                                .filter(|k| !k.starts_with("_anon_"))
                                .cloned()
                                .collect();
                            keys.sort();
                            keys.into_iter().map(ProjectionItem::Variable).collect()
                        } else {
                            items.clone()
                        };

                    let mut has_aggregate = false;
                    let mut grouping_items = Vec::new();

                    for item in &items {
                        match item {
                            ProjectionItem::Aggregate { .. } => has_aggregate = true,
                            ProjectionItem::Variable(_var) => grouping_items.push(item.clone()),
                            ProjectionItem::AliasedVariable(_var, _) => {
                                grouping_items.push(item.clone())
                            }
                            ProjectionItem::Property(_, _) | ProjectionItem::AliasedProperty(_, _, _) => {
                                grouping_items.push(item.clone())
                            }
                            ProjectionItem::Function { .. } => {
                                // Function without aggregate isn't an aggregate grouping key directly
                            }
                            ProjectionItem::Expression { expr: _, alias: _ } => {
                                grouping_items.push(item.clone())
                            }
                            ProjectionItem::Star => {} // Already handled above
                        }
                    }

                    let mut final_res = ResultSet::new();

                    if has_aggregate {
                        let mut groups: Vec<(Vec<Option<GraphElement>>, Vec<usize>)> = Vec::new();

                        for i in 0..result_set.rows {
                            let key: Vec<Option<GraphElement>> =
                                grouping_items.iter().map(|item| {
                                    match item {
                                        ProjectionItem::Variable(var) | ProjectionItem::AliasedVariable(var, _) => {
                                            result_set.get(i, var).cloned()
                                        }
                                        ProjectionItem::Property(var, prop) | ProjectionItem::AliasedProperty(var, prop, _) => {
                                            self.get_property_as_element(&result_set, i, var, prop)
                                        }
                                        _ => None
                                    }
                                }).collect();

                            if let Some((_, group_rows)) =
                                groups.iter_mut().find(|(k, _)| *k == key)
                            {
                                group_rows.push(i);
                            } else {
                                groups.push((key, vec![i]));
                            }
                        }

                        // Compute aggregates per group
                        for (_idx_group, (_group_key, group_rows)) in groups.into_iter().enumerate() {
                            let mut bindings = Vec::new();
                            for item in &items {
                                match item {
                                    ProjectionItem::Variable(var) => {
                                        if let Some(first_idx) = group_rows.first() {
                                            if let Some(val) = result_set.get(*first_idx, var) {
                                                bindings.push((var.clone(), val.clone()));
                                            }
                                        }
                                    }
                                    ProjectionItem::AliasedVariable(var, alias) => {
                                        if let Some(first_idx) = group_rows.first() {
                                            if let Some(val) = result_set.get(*first_idx, var) {
                                                bindings.push((alias.clone(), val.clone()));
                                            }
                                        }
                                    }
                                    ProjectionItem::Property(var, prop) => {
                                        if let Some(first_idx) = group_rows.first() {
                                            if let Some(val) = self.get_property_as_element(&result_set, *first_idx, var, prop) {
                                                bindings.push((format!("{}.{}", var, prop), val));
                                            }
                                        }
                                    }
                                    ProjectionItem::AliasedProperty(var, prop, alias) => {
                                        if let Some(first_idx) = group_rows.first() {
                                            if let Some(val) = self.get_property_as_element(&result_set, *first_idx, var, prop) {
                                                bindings.push((alias.clone(), val));
                                            }
                                        }
                                    }
                                    ProjectionItem::Expression { expr, alias } => {
                                        if let Some(first_idx) = group_rows.first() {
                                            let val = self.evaluate_expression_to_element(expr, &result_set, *first_idx);
                                            let out_key = alias.clone().unwrap_or_else(|| "expr".to_string());
                                            bindings.push((out_key, val));
                                        }
                                    }
                                    ProjectionItem::Aggregate { func, var, alias } => {
                                        let out_key = alias
                                            .clone()
                                            .unwrap_or_else(|| format!("{}({})", func, var));

                                        match func.as_str() {
                                            "COUNT" => {
                                                let count = if var == "*" {
                                                    group_rows.len()
                                                } else {
                                                    group_rows
                                                        .iter()
                                                        .filter(|&&i| result_set.get(i, var).is_some())
                                                        .count()
                                                };
                                                bindings.push((out_key, GraphElement::Number(count as f64)));
                                            }
                                            "COLLECT" => {
                                                let mut elements = Vec::new();
                                                for &i in &group_rows {
                                                    if let Some(val) = result_set.get(i, var) {
                                                        elements.push(val.clone());
                                                    }
                                                }
                                                bindings.push((out_key, GraphElement::List(elements)));
                                            }
                                            "UNIQUE" => {
                                                let mut elements = Vec::new();
                                                for &i in &group_rows {
                                                    if let Some(val) = result_set.get(i, var) {
                                                        if !elements.contains(val) {
                                                            elements.push(val.clone());
                                                        }
                                                    }
                                                }
                                                bindings.push((out_key, GraphElement::List(elements)));
                                            }
                                            _ => {}
                                        }
                                    }
                                    ProjectionItem::Function { func, args: _, alias } => {
                                        let out_key = alias
                                            .clone()
                                            .unwrap_or_else(|| format!("{}()", func));
                                        if func.eq_ignore_ascii_case("rand") {
                                            bindings.push((out_key, GraphElement::Number(0f64)));
                                        }
                                    }
                                    ProjectionItem::Star => {}
                                }
                            }
                            let bindings_ref: Vec<(&str, GraphElement)> = bindings.iter().map(|(k, v)| (k.as_str(), v.clone())).collect();
                            let empty_res = ResultSet::new();
                            final_res.push_row_from(&empty_res, 0, &bindings_ref as &[(&str, GraphElement)]);
                        }
                    } else {
                        // Simple projection without aggregation
                        for i in 0..result_set.rows {
                            let mut bindings = Vec::new();
                            for item in &items {
                                match item {
                                    ProjectionItem::Variable(var) => {
                                        if let Some(val) = result_set.get(i, var).cloned() {
                                            bindings.push((var.clone(), val));
                                        }
                                    }
                                    ProjectionItem::AliasedVariable(var, alias) => {
                                        if let Some(val) = result_set.get(i, var).cloned() {
                                            bindings.push((alias.clone(), val));
                                        }
                                    }
                                    ProjectionItem::Property(var, prop) => {
                                        if let Some(val) = self.get_property_as_element(&result_set, i, var, prop) {
                                            bindings.push((format!("{}.{}", var, prop), val));
                                        }
                                    }
                                    ProjectionItem::AliasedProperty(var, prop, alias) => {
                                        if let Some(val) = self.get_property_as_element(&result_set, i, var, prop) {
                                            bindings.push((alias.clone(), val));
                                        }
                                    }
                                    ProjectionItem::Function { func, args: _, alias } => {
                                        let out_key = alias
                                            .clone()
                                            .unwrap_or_else(|| format!("{}()", func));
                                        if func.eq_ignore_ascii_case("rand") {
                                            bindings.push((out_key, GraphElement::Number(0f64)));
                                        }
                                    }
                                    ProjectionItem::Expression { expr, alias } => {
                                        let val = self.evaluate_expression_to_element(expr, &result_set, i);
                                        let out_key = alias.clone().unwrap_or_else(|| "expr".to_string());
                                        bindings.push((out_key, val));
                                    }
                                    _ => {}
                                }
                            }
                            let bindings_ref: Vec<(&str, GraphElement)> = bindings.iter().map(|(k, v)| (k.as_str(), v.clone())).collect();
                            let empty_res = ResultSet::new();
                            final_res.push_row_from(&empty_res, 0, &bindings_ref as &[(&str, GraphElement)]);
                        }
                    }

                    if let Some(order_items) = order_by_opt {
                        let mut env_with_keys: Vec<(Vec<EvalValue>, usize)> = (0..final_res.rows).map(|i| {
                            let keys = order_items.iter().map(|item| {
                                self.evaluate_expression(&item.expr, &final_res, i)
                            }).collect();
                            (keys, i)
                        }).collect();

                        env_with_keys.sort_by(|a, b| {
                            for (idx, item) in order_items.iter().enumerate() {
                                let key_a = &a.0[idx];
                                let key_b = &b.0[idx];
                                let mut cmp = key_a.partial_cmp(key_b).unwrap_or(std::cmp::Ordering::Equal);
                                if !item.asc {
                                    cmp = cmp.reverse();
                                }
                                if cmp != std::cmp::Ordering::Equal {
                                    return cmp;
                                }
                            }
                            std::cmp::Ordering::Equal
                        });

                        let mut sorted_res = ResultSet::new();
                        for (_, original_idx) in env_with_keys {
                            sorted_res.push_row_from(&final_res, original_idx, &[] as &[(&str, GraphElement)]);
                        }
                        final_res = sorted_res;
                    }

                    if is_return {
                        let len = final_res.rows;
                        let iter = match limit {
                            Some(l) => 0..std::cmp::min(l, len),
                            None => 0..len,
                        };
                        let mut results_json = Vec::new();
                        for i in iter {
                            let mut row = serde_json::Map::new();
                            for item in &items {
                                let key = match item {
                                    ProjectionItem::Variable(var) => var.clone(),
                                    ProjectionItem::AliasedVariable(_, alias) => alias.clone(),
                                    ProjectionItem::Property(var, prop) => format!("{}.{}", var, prop),
                                    ProjectionItem::AliasedProperty(_, _, alias) => alias.clone(),
                                    ProjectionItem::Aggregate { func, var, alias } => alias
                                        .clone()
                                        .unwrap_or_else(|| format!("{}({})", func, var)),
                                    ProjectionItem::Function { func, args: _, alias } => alias
                                        .clone()
                                        .unwrap_or_else(|| format!("{}()", func)),
                                    ProjectionItem::Star => continue,
                                    ProjectionItem::Expression { alias, .. } => alias
                                        .clone()
                                        .unwrap_or_else(|| "expr".to_string()),
                                };
                                if let Some(element) = final_res.get(i, &key) {
                                    row.insert(key, self.element_to_json(element));
                                } else {
                                    row.insert(key, Value::Null);
                                }
                            }
                            if !row.is_empty() {
                                results_json.push(Value::Object(row));
                            }
                        }
                        if !results_json.is_empty() {
                            output = serde_json::to_string_pretty(&results_json).unwrap();
                        }
                    } else {
                        // WITH clause
                        result_set = final_res;
                        if let Some(l) = limit {
                            result_set.truncate(l);
                        }
                    }
                }
                ExecutionStep::CreateIndex { label, property, index_type } => {
                    let label_id = self.get_or_add_label(&label);
                    self.create_index(label_id, property, index_type);
                }
            }
        }

        if let Some(prof) = profile_out {
            let results_str = if output.is_empty() {
                "[]"
            } else {
                &output
            };
            let prof_json = serde_json::to_string(&prof).unwrap_or_else(|_| "\"\"".to_string());
            Ok(format!("{{\n  \"profile\": {},\n  \"results\": {}\n}}", prof_json, results_str))
        } else {
            if output.is_empty() {
                Ok("[]".to_string())
            } else {
                Ok(output)
            }
        }
    }

    fn execute_create_path(&mut self, path: Path, in_res: &ResultSet, row_idx: usize, bindings: &mut Vec<(String, GraphElement)>) {
        let mut path_elements = Vec::new();
        let start_id = self.create_node(&path.start, in_res, row_idx, bindings);
        path_elements.push(GraphElement::Node(start_id));
        let mut current_id = start_id;

        let bound_var = path.bound_variable.clone();
        for (rel, target_node) in path.edges {
            let next_id = self.create_node(&target_node, in_res, row_idx, bindings);
            let rel_id = self.create_rel(&rel, current_id, next_id);
            path_elements.push(GraphElement::Edge(rel_id));
            path_elements.push(GraphElement::Node(next_id));
            if let Some(var) = &rel.variable {
                bindings.push((var.clone(), GraphElement::Edge(rel_id)));
            }
            current_id = next_id;
        }

        if let Some(bv) = bound_var {
            bindings.push((bv, GraphElement::Path(path_elements)));
        }
    }

    fn create_node(&mut self, pattern: &NodePattern, in_res: &ResultSet, row_idx: usize, bindings: &mut Vec<(String, GraphElement)>) -> usize {
        if let Some(var) = &pattern.variable {
            if let Some(GraphElement::Node(id)) = in_res.get(row_idx, var) {
                return *id;
            }
            for (k, v) in bindings.iter() {
                if k == var {
                    if let GraphElement::Node(id) = v {
                        return *id;
                    }
                }
            }
        }

        let label_id = if let Some(label) = &pattern.label {
            self.get_or_add_label(label)
        } else {
            // using 0 as a default / generic label
            self.get_or_add_label("Node")
        };

        let node_id = self.add_node(label_id, pattern.properties.clone());

        if let Some(var) = &pattern.variable {
            bindings.push((var.clone(), GraphElement::Node(node_id)));
        }

        node_id
    }

    fn create_rel(&mut self, pattern: &RelPattern, start: usize, end: usize) -> usize {
        let label_id = if let Some(label) = &pattern.label {
            self.get_or_add_label(label)
        } else {
            self.get_or_add_label("Rel")
        };

        self.add_edge(start, end, vec![label_id], pattern.properties.clone())
    }

    pub fn execute_plan(
        &self,
        plan: &PlanNode,
        in_res: &ResultSet,
        out: &mut ResultSet,
        profile: &mut Option<String>,
        depth: usize,
        limit: Option<usize>,
    ) {
        let indent = "  ".repeat(depth);
        let op_name;

        let initial_rows = out.rows;

        match plan {
            PlanNode::FullNodeScan { pattern } => {
                op_name = "FullNodeScan".to_string();
                for i in 0..in_res.rows {
                    let nodes = self.find_nodes(pattern, in_res, i);
                    for node_id in nodes {
                        if let Some(var) = &pattern.variable {
                            out.push_row_from(in_res, i, &[(var.as_str(), GraphElement::Node(node_id))]);
                        } else {
                            out.push_row_from(in_res, i, &[] as &[(&str, GraphElement)]);
                        }
                        if limit.is_some_and(|l| out.rows >= l) { return; }
                    }
                }
            }
            PlanNode::NodeLabelLookup { label, pattern } => {
                op_name = format!("NodeLabelLookup({})", label);
                let mut matched_nodes = Vec::new();
                if let Some(label_id) = self.labels.get(label) {
                    for id in 0..self.nodes.len_items() {
                        if self.nodes.get_item(id).unwrap().labels.contains(label_id)
                            && self.node_matches(id, pattern)
                        {
                            matched_nodes.push(id);
                        }
                    }
                }

                for i in 0..in_res.rows {
                    for &node_id in &matched_nodes {
                        if let Some(var) = &pattern.variable {
                            out.push_row_from(in_res, i, &[(var.as_str(), GraphElement::Node(node_id))]);
                        } else {
                            out.push_row_from(in_res, i, &[] as &[(&str, GraphElement)]);
                        }
                        if limit.is_some_and(|l| out.rows >= l) { return; }
                    }
                }
            }
            PlanNode::NodeIndexLookup {
                label,
                property,
                value,
                pattern,
            } => {
                op_name = format!("NodeIndexLookup({}.{}='{:?}')", label, property, value);
                let mut matched_nodes = Vec::new();
                let mut candidate_ids = Vec::new();
                if let Some(label_id) = self.labels.get(label) {
                    if let Some(label_indices) = self.indices.get(label_id) {
                        if let Some(prop_index) = label_indices.get(property) {
                            let node_ids_opt = match prop_index {
                                IndexMap::Hash(map) => map.get(value),
                                IndexMap::BTree(map) => map.get(value),
                            };
                            if let Some(node_ids) = node_ids_opt {
                                candidate_ids.extend(node_ids.iter().copied());
                            }
                        }
                    }
                }
                for id in candidate_ids {
                    if self.node_matches(id, pattern) {
                        matched_nodes.push(id);
                    }
                }

                for i in 0..in_res.rows {
                    for &node_id in &matched_nodes {
                        if let Some(var) = &pattern.variable {
                            out.push_row_from(in_res, i, &[(var.as_str(), GraphElement::Node(node_id))]);
                        } else {
                            out.push_row_from(in_res, i, &[] as &[(&str, GraphElement)]);
                        }
                        if limit.is_some_and(|l| out.rows >= l) { return; }
                    }
                }
            }
            PlanNode::PathExpand {
                source,
                source_node_pattern,
                rel_pattern,
                target_node_pattern,
            } => {
                op_name = "PathExpand".to_string();
                let mut source_res = ResultSet::new();
                self.execute_plan(source, in_res, &mut source_res, profile, depth + 1, None);

                for i in 0..source_res.rows {
                    let mut source_node_ids = Vec::new();

                    if let Some(var) = &source_node_pattern.variable {
                        if let Some(GraphElement::Node(id)) = source_res.get(i, var) {
                            source_node_ids.push(*id);
                        }
                    }

                    if source_node_ids.is_empty() {
                        source_node_ids = self.find_nodes(source_node_pattern, &source_res, i);
                    }

                    for source_node_id in source_node_ids {
                        let edges = vec![(rel_pattern.clone(), target_node_pattern.clone())];
                        self.match_edges_recursive(
                            &edges,
                            0,
                            source_node_id,
                            &source_res,
                            i,
                            out,
                            limit,
                        );
                        if limit.is_some_and(|l| out.rows >= l) { return; }
                    }
                }
            }
            PlanNode::Intersect { left, right } => {
                op_name = "Intersect".to_string();
                let mut left_res = ResultSet::new();
                self.execute_plan(left, in_res, &mut left_res, profile, depth + 1, None);
                let mut right_res = ResultSet::new();
                self.execute_plan(right, in_res, &mut right_res, profile, depth + 1, None);

                for l_idx in 0..left_res.rows {
                    let mut found = false;
                    for r_idx in 0..right_res.rows {
                        let mut match_all = true;
                        for (k, l_col) in &left_res.columns {
                            if let Some(r_col) = right_res.columns.get(k) {
                                if l_col[l_idx] != r_col[r_idx] {
                                    match_all = false;
                                    break;
                                }
                            }
                        }
                        if match_all {
                            found = true;
                            break;
                        }
                    }
                    if found {
                        out.push_row_from(&left_res, l_idx, &[] as &[(&str, GraphElement)]);
                        if limit.is_some_and(|l| out.rows >= l) { return; }
                    }
                }
            }
            PlanNode::Union { left, right } => {
                op_name = "Union".to_string();
                self.execute_plan(left, in_res, out, profile, depth + 1, limit);
                if limit.is_some_and(|l| out.rows >= l) { return; }
                self.execute_plan(right, in_res, out, profile, depth + 1, limit);
            }
            PlanNode::CrossProduct { left, right } => {
                op_name = "CrossProduct".to_string();
                // To preserve incoming row associations correctly when cross joining independent paths
                // evaluated on the SAME incoming row, we process each incoming row separately for cross-product.
                for i in 0..in_res.rows {
                    let mut single_res = ResultSet::new();
                    single_res.push_row_from(in_res, i, &[] as &[(&str, GraphElement)]);

                    let mut left_res = ResultSet::new();
                    self.execute_plan(left, &single_res, &mut left_res, profile, depth + 1, None);

                    let mut right_prof = if profile.is_some() { Some(String::new()) } else { None };
                    let mut right_res = ResultSet::new();
                    self.execute_plan(right, &single_res, &mut right_res, &mut right_prof, depth + 1, None);

                    if let Some(prof) = profile {
                        if let Some(r_prof) = right_prof { prof.push_str(&r_prof); }
                    }

                    for l_idx in 0..left_res.rows {
                        for r_idx in 0..right_res.rows {
                            let mut valid = true;
                            for (k, r_col) in &right_res.columns {
                                if let Some(l_col) = left_res.columns.get(k) {
                                    if l_col[l_idx] != GraphElement::Null && r_col[r_idx] != GraphElement::Null && l_col[l_idx] != r_col[r_idx] {
                                        valid = false;
                                        break;
                                    }
                                }
                            }
                            if valid {
                                out.push_merged_row(&left_res, l_idx, &right_res, r_idx);
                                if limit.is_some_and(|l| out.rows >= l) { return; }
                            }
                        }
                    }
                }
            }
        };

        if let Some(prof) = profile {
            prof.push_str(&format!("{}{} ({} rows)\n", indent, op_name, out.rows - initial_rows));
        }
    }

    fn execute_plan_and_bind_paths(
        &self,
        plan: &PlanNode,
        paths: &[Path],
        in_res: &ResultSet,
        out: &mut ResultSet,
        profile: &mut Option<String>,
        limit: Option<usize>,
    ) {
        let initial_rows = out.rows;
        self.execute_plan(plan, in_res, out, profile, 0, limit);


        for path in paths {
            if let Some(bound_var) = &path.bound_variable {
                for i in initial_rows..out.rows {
                    let mut path_elements = Vec::new();
                    let start_var = path
                        .start
                        .variable
                        .clone()
                        .unwrap_or_else(|| "_anon_start".to_string());
                    if let Some(el) = out.get(i, &start_var) {
                        path_elements.push(el.clone());
                    }

                    for (idx, (rel, target)) in path.edges.iter().enumerate() {
                        let rel_var = rel
                            .variable
                            .clone()
                            .unwrap_or_else(|| format!("_anon_rel_{}", idx));
                        let target_var = target
                            .variable
                            .clone()
                            .unwrap_or_else(|| format!("_anon_node_{}", idx));

                        if let Some(el) = out.get(i, &rel_var) {
                            path_elements.push(el.clone());
                        }
                        if let Some(el) = out.get(i, &target_var) {
                            path_elements.push(el.clone());
                        }
                    }

                    let current_rows = out.rows;
                    if let Some(col) = out.columns.get_mut(bound_var) {
                        col[i] = GraphElement::Path(path_elements);
                    } else {
                        let mut col = vec![GraphElement::Null; current_rows];
                        col[i] = GraphElement::Path(path_elements);
                        out.columns.insert(bound_var.clone(), col);
                    }
                }
            }
        }
    }

    fn match_edges_recursive(
        &self,
        edges: &[(RelPattern, NodePattern)],
        edge_idx: usize,
        current_node_id: usize,
        in_res: &ResultSet,
        row_idx: usize,
        out: &mut ResultSet,
        limit: Option<usize>,
    ) {
        if limit.is_some_and(|l| out.rows >= l) { return; }
        if edge_idx >= edges.len() {
            out.push_row_from(in_res, row_idx, &[] as &[(&str, GraphElement)]);
            return;
        }

        let (rel_pattern, target_node_pattern) = &edges[edge_idx];

        if let Some((min_len, max_len)) = rel_pattern.length {
            if min_len != 1 || max_len != Some(1) {
                self.match_var_length_edges(
                    edges,
                    edge_idx,
                    current_node_id,
                    in_res,
                    row_idx,
                    out,
                    min_len,
                    max_len,
                    0,
                    Vec::new(),
                    limit,
                );
                return;
            }
        }

        let matches = self.find_edges_and_nodes(
            current_node_id,
            rel_pattern,
            target_node_pattern,
            in_res,
            row_idx,
        );

        for (next_node_id, edge_id) in matches {
            let mut single_res = ResultSet::new();
            let mut bindings = Vec::new();
            if let Some(var) = &rel_pattern.variable {
                bindings.push((var.as_str(), GraphElement::Edge(edge_id)));
            }
            if let Some(var) = &target_node_pattern.variable {
                bindings.push((var.as_str(), GraphElement::Node(next_node_id)));
            }
            single_res.push_row_from(in_res, row_idx, &bindings);

            self.match_edges_recursive(edges, edge_idx + 1, next_node_id, &single_res, 0, out, limit);
            if limit.is_some_and(|l| out.rows >= l) { return; }
        }
    }

    #[allow(clippy::too_many_arguments)]
    fn match_var_length_edges(
        &self,
        edges: &[(RelPattern, NodePattern)],
        edge_idx: usize,
        current_node_id: usize,
        in_res: &ResultSet,
        row_idx: usize,
        out: &mut ResultSet,
        min_len: usize,
        max_len: Option<usize>,
        current_depth: usize,
        path_edges: Vec<usize>,
        limit: Option<usize>,
    ) {
        if limit.is_some_and(|l| out.rows >= l) { return; }
        let (rel_pattern, target_node_pattern) = &edges[edge_idx];

        if current_depth >= min_len {
            let target_bound_id = if let Some(var) = &target_node_pattern.variable {
                if let Some(GraphElement::Node(id)) = in_res.get(row_idx, var) {
                    Some(*id)
                } else {
                    None
                }
            } else {
                None
            };

            let matches_target = if let Some(bound_id) = target_bound_id {
                current_node_id == bound_id
            } else {
                true
            } && self.node_matches(current_node_id, target_node_pattern);

            if matches_target {
                let mut single_res = ResultSet::new();
                let mut bindings = Vec::new();
                if let Some(var) = &rel_pattern.variable {
                    bindings.push((var.as_str(), GraphElement::EdgeArray(path_edges.clone())));
                }
                if let Some(var) = &target_node_pattern.variable {
                    bindings.push((var.as_str(), GraphElement::Node(current_node_id)));
                }
                single_res.push_row_from(in_res, row_idx, &bindings);

                self.match_edges_recursive(edges, edge_idx + 1, current_node_id, &single_res, 0, out, limit);
            }
        }

        if let Some(max) = max_len {
            if current_depth >= max {
                return;
            }
        }

        let start_node = self.nodes.get_item(current_node_id).unwrap();

        for &edge_id in &start_node.edges {
            let edge = self.edges.get_item(edge_id).unwrap();

            if edge.start == current_node_id {
                if path_edges.contains(&edge_id) {
                    continue;
                }

                if !self.edge_matches(edge_id, rel_pattern) {
                    continue;
                }

                let end_node_id = edge.end;

                let mut new_path_edges = path_edges.clone();
                new_path_edges.push(edge_id);

                self.match_var_length_edges(
                    edges,
                    edge_idx,
                    end_node_id,
                    in_res,
                    row_idx,
                    out,
                    min_len,
                    max_len,
                    current_depth + 1,
                    new_path_edges,
                    limit,
                );
                if limit.is_some_and(|l| out.rows >= l) { return; }
            }
        }
    }

    fn find_nodes(&self, pattern: &NodePattern, in_res: &ResultSet, row_idx: usize) -> Vec<usize> {
        // If node is already bound in env, return just that node if it matches the pattern
        if let Some(var) = &pattern.variable {
            if let Some(GraphElement::Node(id)) = in_res.get(row_idx, var) {
                if self.node_matches(*id, pattern) {
                    return vec![*id];
                } else {
                    return vec![];
                }
            }
        }

        // Try to use an index if one is available
        if let Some(label_name) = &pattern.label {
            if let Some(label_id) = self.labels.get(label_name) {
                if let Some(label_indices) = self.indices.get(label_id) {
                    for (prop_name, prop_value) in &pattern.properties {
                        if let Some(prop_index) = label_indices.get(prop_name) {
                            let node_ids_opt = match prop_index {
                                IndexMap::Hash(map) => map.get(prop_value),
                                IndexMap::BTree(map) => map.get(prop_value),
                            };
                            if let Some(node_ids) = node_ids_opt {
                                // We found an index match! Filter the indexed nodes just in case there are other constraints
                                let mut matched_nodes = Vec::new();
                                for &id in node_ids {
                                    if self.node_matches(id, pattern) {
                                        matched_nodes.push(id);
                                    }
                                }
                                return matched_nodes;
                            } else {
                                // The property is indexed, but this specific value isn't in it, so no nodes match
                                return vec![];
                            }
                        }
                    }
                }
            }
        }

        let mut matched_nodes = Vec::new();
        for id in 0..self.nodes.len_items() {
            if self.node_matches(id, pattern) {
                matched_nodes.push(id);
            }
        }
        matched_nodes
    }

    fn node_matches(&self, node_id: usize, pattern: &NodePattern) -> bool {
        let node = self.nodes.get_item(node_id).unwrap();
        if node.deleted { return false; }

        let label_id = if let Some(l) = &pattern.label {
            if let Some(id) = self.labels.get(l) {
                Some(*id)
            } else {
                return false; // label not even in graph
            }
        } else {
            None
        };

        if let Some(lid) = label_id {
            if !node.labels.contains(&lid) {
                return false;
            }
        }

        for (k, v) in &pattern.properties {
            if node.properties.get(k) != Some(v) {
                return false;
            }
        }

        true
    }

    fn find_edges_and_nodes(
        &self,
        start_id: usize,
        rel_pattern: &RelPattern,
        target_node_pattern: &NodePattern,
        in_res: &ResultSet,
        row_idx: usize,
    ) -> Vec<(usize, usize)> {
        let mut matches = Vec::new();
        let start_node = self.nodes.get_item(start_id).unwrap();

        // Pre-check if target is bound
        let target_bound_id = if let Some(var) = &target_node_pattern.variable {
            if let Some(GraphElement::Node(id)) = in_res.get(row_idx, var) {
                Some(*id)
            } else {
                None
            }
        } else {
            None
        };

        for &edge_id in &start_node.edges {
            let edge = self.edges.get_item(edge_id).unwrap();

            // Only consider outgoing edges from start_id
            if edge.start == start_id {
                // If edge variable is bound, ensure it's the same edge
                if let Some(var) = &rel_pattern.variable {
                    if let Some(GraphElement::Edge(eid)) = in_res.get(row_idx, var) {
                        if *eid != edge_id {
                            continue;
                        }
                    }
                }

                if !self.edge_matches(edge_id, rel_pattern) {
                    continue;
                }

                let end_node_id = edge.end;

                if let Some(bound_target) = target_bound_id {
                    if end_node_id != bound_target {
                        continue;
                    }
                }

                if self.node_matches(end_node_id, target_node_pattern) {
                    matches.push((end_node_id, edge_id));
                }
            }
        }

        matches
    }

    fn edge_matches(&self, edge_id: usize, pattern: &RelPattern) -> bool {
        let edge = self.edges.get_item(edge_id).unwrap();
        if edge.deleted { return false; }

        let label_id = if let Some(l) = &pattern.label {
            if let Some(id) = self.labels.get(l) {
                Some(*id)
            } else {
                return false;
            }
        } else {
            None
        };

        if let Some(lid) = label_id {
            if !edge.labels.contains(&lid) {
                return false;
            }
        }

        for (k, v) in &pattern.properties {
            if edge.properties.get(k) != Some(v) {
                return false;
            }
        }

        true
    }

    fn evaluate_condition(&self, condition: &Condition, in_res: &ResultSet, row_idx: usize) -> bool {
        match condition {
            Condition::And(left, right) => {
                self.evaluate_condition(left, in_res, row_idx) && self.evaluate_condition(right, in_res, row_idx)
            }
            Condition::Or(left, right) => {
                self.evaluate_condition(left, in_res, row_idx) || self.evaluate_condition(right, in_res, row_idx)
            }
            Condition::Not(inner) => !self.evaluate_condition(inner, in_res, row_idx),
            Condition::Compare { left, op, right } => {
                let l_val = self.evaluate_expression(left, in_res, row_idx);
                let r_val = self.evaluate_expression(right, in_res, row_idx);
                l_val.compare(&r_val, op)
            }
        }
    }

    fn get_property_as_element(&self, in_res: &ResultSet, row_idx: usize, var: &str, prop: &str) -> Option<GraphElement> {
        if let Some(element) = in_res.get(row_idx, var) {
            let prop_val = match element {
                GraphElement::Node(id) => self.nodes.get_item(*id).unwrap().properties.get(prop).cloned(),
                GraphElement::Edge(id) => self.edges.get_item(*id).unwrap().properties.get(prop).cloned(),
                _ => None,
            };
            match prop_val {
                Some(crate::property::PropertyValue::String(s)) => Some(GraphElement::String(s)),
                Some(crate::property::PropertyValue::Number(n)) => Some(GraphElement::Number(n)),
                Some(crate::property::PropertyValue::Boolean(b)) => Some(GraphElement::Boolean(b)),
                None => None,
            }
        } else {
            None
        }
    }

    fn evaluate_expression_to_element(&self, expr: &Expression, in_res: &ResultSet, row_idx: usize) -> GraphElement {
        match expr {
            Expression::StringLiteral(s) => GraphElement::String(s.clone()),
            Expression::NumberLiteral(n) => GraphElement::Number(*n),
            Expression::BooleanLiteral(b) => GraphElement::Boolean(*b),
            Expression::Variable(var) => {
                in_res.get(row_idx, var).cloned().unwrap_or(GraphElement::Null)
            }
            Expression::Function(func, _args) => {
                if func.eq_ignore_ascii_case("rand") {
                    GraphElement::Number(0f64)
                } else {
                    GraphElement::Null
                }
            }
            Expression::Property(var, prop) => {
                self.get_property_as_element(in_res, row_idx, var, prop).unwrap_or(GraphElement::Null)
            }
            Expression::List(elements) => {
                let lst: Vec<GraphElement> = elements.iter().map(|e| self.evaluate_expression_to_element(e, in_res, row_idx)).collect();
                GraphElement::List(lst)
            }
            Expression::Map(map) => {
                let mut result_map = HashMap::new();
                for (k, v) in map {
                    result_map.insert(k.clone(), self.evaluate_expression_to_element(v, in_res, row_idx));
                }
                GraphElement::Map(result_map)
            }
        }
    }

    fn evaluate_expression<'a>(&'a self, expr: &'a Expression, in_res: &'a ResultSet, row_idx: usize) -> EvalValue<'a> {
        match expr {
            Expression::StringLiteral(s) => EvalValue::String(Cow::Borrowed(s.as_str())),
            Expression::NumberLiteral(n) => EvalValue::Number(*n),
            Expression::BooleanLiteral(b) => EvalValue::Boolean(*b),
            Expression::Variable(var) => {
                if let Some(element) = in_res.get(row_idx, var) {
                    match element {
                        GraphElement::Number(n) => EvalValue::Number(*n),
            GraphElement::String(ref s) => EvalValue::String(Cow::Borrowed(s.as_str())),
            GraphElement::Boolean(b) => EvalValue::Boolean(*b),
            GraphElement::Null => EvalValue::Null,
                        GraphElement::Node(_) | GraphElement::Edge(_) | GraphElement::EdgeArray(_) | GraphElement::Path(_) | GraphElement::List(_) | GraphElement::Map(_) => {
                            EvalValue::String(Cow::Owned(self.format_element(element)))
                        }
                    }
                } else {
                    EvalValue::Null
                }
            }
            Expression::Function(func, _args) => {
                if func.eq_ignore_ascii_case("rand") {
                    EvalValue::Number(0f64)
                } else {
                    EvalValue::Null
                }
            }
            Expression::Property(var, prop) => {
                if let Some(element) = in_res.get(row_idx, var) {
                    let prop_val = match element {
                        GraphElement::Node(id) => self.nodes.get_item(*id).unwrap().properties.get(prop).cloned(),
                        GraphElement::Edge(id) => self.edges.get_item(*id).unwrap().properties.get(prop).cloned(),
                        _ => None,
                    };
                    match prop_val {
                        Some(crate::property::PropertyValue::String(s)) => {
                            EvalValue::String(Cow::Owned(s))
                        }
                        Some(crate::property::PropertyValue::Number(n)) => EvalValue::Number(n),
                        Some(crate::property::PropertyValue::Boolean(b)) => EvalValue::Boolean(b),
                        None => EvalValue::Null,
                    }
                } else {
                    EvalValue::Null
                }
            }
            Expression::List(_) => EvalValue::Null,
            Expression::Map(_) => EvalValue::Null,
        }
    }
}

#[derive(Clone, Debug)]
enum EvalValue<'a> {
    String(Cow<'a, str>),
    Number(f64),
    Boolean(bool),
    Null,
}

impl<'a> EvalValue<'a> {
    fn partial_cmp(&self, other: &EvalValue) -> Option<std::cmp::Ordering> {
        if let (EvalValue::Null, EvalValue::Null) = (self, other) {
            return Some(std::cmp::Ordering::Equal);
        }
        if let EvalValue::Null = self {
            return Some(std::cmp::Ordering::Less);
        }
        if let EvalValue::Null = other {
            return Some(std::cmp::Ordering::Greater);
        }

        match (self, other) {
            (EvalValue::Number(l), EvalValue::Number(r)) => l.partial_cmp(r),
            (EvalValue::String(l), EvalValue::String(r)) => l.partial_cmp(r),
            (EvalValue::Number(l), EvalValue::String(r)) => {
                if let Ok(r_num) = r.parse::<f64>() {
                    l.partial_cmp(&r_num)
                } else {
                    None
                }
            }
            (EvalValue::String(l), EvalValue::Number(r)) => {
                if let Ok(l_num) = l.parse::<f64>() {
                    l_num.partial_cmp(r)
                } else {
                    None
                }
            }
            _ => None,
        }
    }

    fn compare(&self, other: &EvalValue, op: &CompareOp) -> bool {
        if let (EvalValue::Null, _) | (_, EvalValue::Null) = (self, other) {
            return false;
        }
        match (self, other) {
            (EvalValue::Number(l), EvalValue::Number(r)) => Self::compare_f64(*l, *r, op),
            (EvalValue::String(l), EvalValue::String(r)) => Self::compare_str(l, r, op),
            (EvalValue::Number(l), EvalValue::String(r)) => {
                if let Ok(r_num) = r.parse::<f64>() {
                    Self::compare_f64(*l, r_num, op)
                } else {
                    false
                }
            }
            (EvalValue::String(l), EvalValue::Number(r)) => {
                if let Ok(l_num) = l.parse::<f64>() {
                    Self::compare_f64(l_num, *r, op)
                } else {
                    false
                }
            }
            (EvalValue::Boolean(l), EvalValue::Boolean(r)) => Self::compare_bool(*l, *r, op),
            _ => false,
        }
    }

    fn compare_bool(l: bool, r: bool, op: &CompareOp) -> bool {
        match op {
            CompareOp::Eq => l == r,
            CompareOp::Neq => l != r,
            CompareOp::Gt => l & !r,
            CompareOp::Gte => l >= r,
            CompareOp::Lt => !l & r,
            CompareOp::Lte => l <= r,
        }
    }

    fn compare_f64(l: f64, r: f64, op: &CompareOp) -> bool {
        match op {
            CompareOp::Eq => l == r,
            CompareOp::Neq => l != r,
            CompareOp::Gt => l > r,
            CompareOp::Gte => l >= r,
            CompareOp::Lt => l < r,
            CompareOp::Lte => l <= r,
        }
    }

    fn compare_str(l: &str, r: &str, op: &CompareOp) -> bool {
        match op {
            CompareOp::Eq => l == r,
            CompareOp::Neq => l != r,
            CompareOp::Gt => l > r,
            CompareOp::Gte => l >= r,
            CompareOp::Lt => l < r,
            CompareOp::Lte => l <= r,
        }
    }
}



impl ResultSet {
    pub fn truncate(&mut self, len: usize) {
        if len >= self.rows { return; }
        self.rows = len;
        for col in self.columns.values_mut() {
            col.truncate(len);
        }
    }
}
