pub mod types;
pub mod element;
pub mod result_set;
pub mod storage;

pub use types::*;
pub use element::*;
pub use result_set::*;
pub use storage::*;

use serde::{Deserialize, Serialize};
use serde_json::{json, Value};
use std::collections::HashMap;
#[cfg(not(target_arch = "wasm32"))]

#[cfg(not(target_arch = "wasm32"))]
use std::fs::File;
#[cfg(not(target_arch = "wasm32"))]
use std::io::Seek;
#[cfg(not(target_arch = "wasm32"))]
use std::io::Write;

use std::borrow::Cow;
#[cfg(not(target_arch = "wasm32"))]
use std::sync::atomic::{AtomicBool, Ordering};
#[cfg(not(target_arch = "wasm32"))]
use std::sync::Arc;

#[cfg(not(target_arch = "wasm32"))]
fn default_cancel_flag() -> parking_lot::RwLock<Arc<AtomicBool>> {
    parking_lot::RwLock::new(Arc::new(AtomicBool::new(false)))
}

use crate::planner::{ExecutionStep, PlanNode, QueryPlanner};
use crate::{
    edge::Edge,
    node::Node,
    parser::{
        parse_query, Condition, Expression, NodePattern, Path, ProjectionItem,
        RelPattern,
    },
};

pub type CustomFunction = std::sync::Arc<dyn Fn(&[GraphElement]) -> Result<GraphElement, String> + Send + Sync>;

#[derive(Serialize, Deserialize)]
pub struct Graph {
    pub nodes: ItemStorage<Node>,
    pub edges: ItemStorage<Edge>,
    pub labels: parking_lot::RwLock<HashMap<String, usize>>,
    pub indices: parking_lot::RwLock<HashMap<usize, HashMap<String, IndexMap>>>,
    #[serde(skip)]
    #[cfg(not(target_arch = "wasm32"))]
    pub wal_file: parking_lot::Mutex<Option<File>>,
    #[serde(skip)]
    #[serde(default = "default_cancel_flag")]
    #[cfg(not(target_arch = "wasm32"))]
    pub cancel_flag: parking_lot::RwLock<Arc<AtomicBool>>,
    #[serde(skip)]
    pub next_txid: std::sync::atomic::AtomicU64,
    #[serde(skip)]
    pub functions: parking_lot::RwLock<HashMap<String, CustomFunction>>,
}

#[cfg(not(target_arch = "wasm32"))]
use std::io::Read;

impl Default for Graph {
    fn default() -> Self {
        Self::new()
    }
}

impl Graph {
    #[cfg(not(target_arch = "wasm32"))]
    pub fn load_or_create(snapshot_path: &str, wal_path: &str) -> Self {
        let mut graph = if let Ok(mut snapshot_file) = File::open(snapshot_path) {
            let mut buffer = Vec::new();
            snapshot_file.read_to_end(&mut buffer).unwrap();
            let mut g: Graph = bincode::deserialize(&buffer).unwrap();
            g.wal_file = parking_lot::Mutex::new(None);
            g.next_txid = std::sync::atomic::AtomicU64::new(1);
            g.register_default_functions();
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
                        let id = graph.labels.read().len();
                        graph.labels.write().insert(label, id);
                    }
                    WalEntry::AddNode { id, label, properties } => {
                        let node = Node::new(id.clone(), vec![label], vec![], properties.clone(), 0);
                        graph.nodes.push_item(node);
                        let node_id = graph.nodes.len_items() - 1;

                        // Update indices if any apply
                        if let Some(label_indices) = graph.indices.write().get_mut(&label) {
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
                        let edge = Edge::new(id.clone(), labels, start, end, properties, 0);
                        graph.edges.push_item(edge);
                        let edge_idx = graph.edges.len_items() - 1;
                        graph.nodes.with_mut_item(start, |n| n.edges.push(edge_idx)).unwrap();
                        graph.nodes.with_mut_item(end, |n| n.edges.push(edge_idx)).unwrap();
                    }
                    WalEntry::CreateIndex { label, property, index_type } => {
                        graph.create_index_internal(label, property, index_type);
                    }
                    WalEntry::DropIndex { label, property } => {
                        graph.drop_index_internal(label, property);
                    }
                    WalEntry::SetEdgeProperty {
                        edge_id,
                        key,
                        value,
                    } => {
                        graph.edges.with_mut_item(edge_id, |e| e.properties.insert(key.clone(), value.clone())).unwrap();
                    }
                    WalEntry::SetNodeProperty {
                        node_id,
                        key,
                        value,
                    } => {
                        // ⚡ Bolt: Use in-place mutation to update node property without cloning the entire node struct.
                        let (old_value, has_label) = graph.nodes.with_mut_item(node_id, |__node| {
                            (__node.properties.insert(key.clone(), value.clone()), __node.labels.clone())
                        }).unwrap();
                        for (label_id, label_indices) in graph.indices.write().iter_mut() {
                            if has_label.contains(label_id) {
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
                        // ⚡ Bolt: Use in-place mutation to soft-delete node without cloning the entire node struct.
                        let has_label = graph.nodes.with_mut_item(node_id, |n| {
                            n.deleted = true;
                            n.labels.clone()
                        }).unwrap();
                        for (label_id, label_indices) in graph.indices.write().iter_mut() {
                            if has_label.contains(label_id) {
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
                    WalEntry::RemoveNodeProperty { node_id, key } => {
                        let (old_value, has_label) = graph.nodes.with_mut_item(node_id, |n| {
                            (n.properties.remove(&key), n.labels.clone())
                        }).unwrap();

                        if let Some(old_val) = old_value {
                            for (label_id, label_indices) in graph.indices.write().iter_mut() {
                                if has_label.contains(label_id) {
                                    if let Some(prop_index) = label_indices.get_mut(&key) {
                                        match prop_index {
                                            IndexMap::Hash(map) => {
                                                if let Some(vec) = map.get_mut(&old_val) {
                                                    vec.retain(|&id| id != node_id);
                                                }
                                            }
                                            IndexMap::BTree(map) => {
                                                if let Some(vec) = map.get_mut(&old_val) {
                                                    vec.retain(|&id| id != node_id);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    WalEntry::RemoveNodeLabel { node_id, label_id } => {
                        let properties = graph.nodes.with_mut_item(node_id, |n| {
                            if let Some(pos) = n.labels.iter().position(|&l| l == label_id) {
                                n.labels.remove(pos);
                            }
                            n.properties.clone()
                        }).unwrap();

                        if let Some(label_indices) = graph.indices.write().get_mut(&label_id) {
                            for (key, val) in properties {
                                if let Some(prop_index) = label_indices.get_mut(&key) {
                                    match prop_index {
                                        IndexMap::Hash(map) => {
                                            if let Some(vec) = map.get_mut(&val) {
                                                vec.retain(|&id| id != node_id);
                                            }
                                        }
                                        IndexMap::BTree(map) => {
                                            if let Some(vec) = map.get_mut(&val) {
                                                vec.retain(|&id| id != node_id);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    WalEntry::DeleteEdge { edge_id } => {
                        graph.edges.with_mut_item(edge_id, |e| e.deleted = true).unwrap();
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

        graph.wal_file = parking_lot::Mutex::new(Some(
            std::fs::OpenOptions::new()
                .create(true)
                .append(true)
                .open(wal_path)
                .unwrap()
        ));

        graph
    }

    pub fn element_to_json(&self, element: &GraphElement) -> Value {
        match element {
            GraphElement::Node(node_id) => {
                self.nodes.with_item(*node_id, |node| {
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
                }).unwrap()
            }
            GraphElement::Edge(edge_id) => {
                self.edges.with_item(*edge_id, |edge| {
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
                }).unwrap()
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
            GraphElement::Date(d) => json!(d.to_string()),
            GraphElement::DateTime(dt) => json!(dt.to_rfc3339()),
            GraphElement::Null => Value::Null,
        }
    }

    pub fn format_element(&self, element: &GraphElement) -> String {
        match element {
            GraphElement::Node(node_id) => self.nodes.with_item(*node_id, |n| format!("{:?}", n)).unwrap(),
            GraphElement::Edge(edge_id) => self.edges.with_item(*edge_id, |e| format!("{:?}", e)).unwrap(),
            GraphElement::EdgeArray(edge_ids) => {
                let edges_str: Vec<_> = edge_ids.iter().map(|&id| self.edges.with_item(id, |e| format!("{:?}", e)).unwrap()).collect();
                format!("[{}]", edges_str.join(", "))
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
            GraphElement::Date(d) => format!("{}", d),
            GraphElement::DateTime(dt) => dt.to_rfc3339().to_string(),
            GraphElement::Null => "null".to_string(),
        }
    }

    #[cfg(not(target_arch = "wasm32"))]
    pub fn enable_disk_storage(&mut self, nodes_path: &str, edges_path: &str) {
        let mut nodes_disk = DiskStorage {
            file: parking_lot::RwLock::new(std::fs::OpenOptions::new()
                .create(true)
                .read(true)
                .write(true)
                .truncate(true)
                .open(nodes_path)
                .unwrap()),
            cache: parking_lot::RwLock::new(HashMap::new()),
            access_tracker: parking_lot::RwLock::new(Vec::new()),
            offsets: parking_lot::RwLock::new(Vec::new()),
            capacity: 10000,
        };
        if let ItemStorage::Memory(vec) = &self.nodes {
            let vec_guard = vec.read();
            for node in vec_guard.iter() {
                nodes_disk.push(node.read().clone());
            }
        }
        self.nodes = ItemStorage::Disk(parking_lot::RwLock::new(nodes_disk));

        let mut edges_disk = DiskStorage {
            file: parking_lot::RwLock::new(std::fs::OpenOptions::new()
                .create(true)
                .read(true)
                .write(true)
                .truncate(true)
                .open(edges_path)
                .unwrap()),
            cache: parking_lot::RwLock::new(HashMap::new()),
            access_tracker: parking_lot::RwLock::new(Vec::new()),
            offsets: parking_lot::RwLock::new(Vec::new()),
            capacity: 10000,
        };
        if let ItemStorage::Memory(vec) = &self.edges {
            let vec_guard = vec.read();
            for edge in vec_guard.iter() {
                edges_disk.push(edge.read().clone());
            }
        }
        self.edges = ItemStorage::Disk(parking_lot::RwLock::new(edges_disk));
    }

    pub fn new() -> Self {
        let g = Self {
            nodes: ItemStorage::Memory(parking_lot::RwLock::new(Vec::new())),
            edges: ItemStorage::Memory(parking_lot::RwLock::new(Vec::new())),
            labels: parking_lot::RwLock::new(HashMap::new()),
            indices: parking_lot::RwLock::new(HashMap::new()),
            #[cfg(not(target_arch = "wasm32"))]
            wal_file: parking_lot::Mutex::new(None),
            #[cfg(not(target_arch = "wasm32"))]
            cancel_flag: parking_lot::RwLock::new(Arc::new(AtomicBool::new(false))),
            next_txid: std::sync::atomic::AtomicU64::new(1),
            functions: parking_lot::RwLock::new(HashMap::new()),
        };
        g.register_default_functions();
        g
    }

    pub fn register_function(&self, name: &str, func: CustomFunction) {
        self.functions.write().insert(name.to_lowercase(), func);
    }

    fn register_default_functions(&self) {
        self.register_function("rand", std::sync::Arc::new(|_args| {
            // Note: In reality `rand` produces a float, but we keep compatibility with prior random 0f64 for simplicity right now
            Ok(GraphElement::Number(0f64))
        }));

        self.register_function("date", std::sync::Arc::new(|args| {
            if args.len() == 1 {
                if let GraphElement::String(s) = &args[0] {
                    if let Ok(d) = chrono::NaiveDate::parse_from_str(s, "%Y-%m-%d") {
                        return Ok(GraphElement::Date(d));
                    }
                }
            }
            Err("Invalid arguments to date()".to_string())
        }));

        self.register_function("datetime", std::sync::Arc::new(|args| {
            if args.len() == 1 {
                if let GraphElement::String(s) = &args[0] {
                    if let Ok(dt) = chrono::DateTime::parse_from_rfc3339(s) {
                        return Ok(GraphElement::DateTime(dt.with_timezone(&chrono::Utc)));
                    }
                }
            }
            Err("Invalid arguments to datetime()".to_string())
        }));

        self.register_function("tolower", std::sync::Arc::new(|args| {
            if args.len() == 1 {
                if let GraphElement::String(s) = &args[0] {
                    return Ok(GraphElement::String(s.to_lowercase()));
                }
            }
            Err("Invalid arguments to toLower()".to_string())
        }));

        self.register_function("toupper", std::sync::Arc::new(|args| {
            if args.len() == 1 {
                if let GraphElement::String(s) = &args[0] {
                    return Ok(GraphElement::String(s.to_uppercase()));
                }
            }
            Err("Invalid arguments to toUpper()".to_string())
        }));

        self.register_function("substring", std::sync::Arc::new(|args| {
            if args.len() == 3 {
                if let (GraphElement::String(s), GraphElement::Number(start), GraphElement::Number(length)) = (&args[0], &args[1], &args[2]) {
                    let start = *start as usize;
                    let length = *length as usize;
                    let chars_count = s.chars().count();
                    if start <= chars_count {
                        let sub: String = s.chars().skip(start).take(length).collect();
                        return Ok(GraphElement::String(sub));
                    } else {
                        return Ok(GraphElement::String("".to_string()));
                    }
                }
            }
            Err("Invalid arguments to substring()".to_string())
        }));

        self.register_function("abs", std::sync::Arc::new(|args| {
            if args.len() == 1 {
                if let GraphElement::Number(n) = &args[0] {
                    return Ok(GraphElement::Number(n.abs()));
                }
            }
            Err("Invalid arguments to abs()".to_string())
        }));

        self.register_function("round", std::sync::Arc::new(|args| {
            if args.len() == 1 {
                if let GraphElement::Number(n) = &args[0] {
                    return Ok(GraphElement::Number(n.round()));
                }
            }
            Err("Invalid arguments to round()".to_string())
        }));

        self.register_function("ceil", std::sync::Arc::new(|args| {
            if args.len() == 1 {
                if let GraphElement::Number(n) = &args[0] {
                    return Ok(GraphElement::Number(n.ceil()));
                }
            }
            Err("Invalid arguments to ceil()".to_string())
        }));

        self.register_function("floor", std::sync::Arc::new(|args| {
            if args.len() == 1 {
                if let GraphElement::Number(n) = &args[0] {
                    return Ok(GraphElement::Number(n.floor()));
                }
            }
            Err("Invalid arguments to floor()".to_string())
        }));

        self.register_function("id", std::sync::Arc::new(|args| {
            if args.len() == 1 {
                match &args[0] {
                    GraphElement::Node(id) => return Ok(GraphElement::Number(*id as f64)),
                    GraphElement::Edge(id) => return Ok(GraphElement::Number(*id as f64)),
                    _ => {}
                }
            }
            Err("Invalid arguments to id()".to_string())
        }));
    }

    pub fn clear(&self) {
        self.nodes.clear_items();
        self.edges.clear_items();
        self.labels.write().clear();
        self.indices.write().clear();
        #[cfg(not(target_arch = "wasm32"))]
        if let Some(file) = &mut *self.wal_file.lock() {
            let _ = file.set_len(0);
            let _ = file.rewind();
        }
    }

    #[cfg(not(target_arch = "wasm32"))]
    fn log_wal(&self, entry: &WalEntry) {
        if let Some(file) = &mut *self.wal_file.lock() {
            let encoded = bincode::serialize(entry).unwrap();
            let len = encoded.len() as u32;
            file.write_all(&len.to_le_bytes()).unwrap();
            file.write_all(&encoded).unwrap();
            file.sync_data().unwrap();
        }
    }

    #[cfg(target_arch = "wasm32")]
    fn log_wal(&self, _entry: &WalEntry) {}

    pub fn get_or_add_label(&self, label: &str) -> usize {
        if let Some(&id) = self.labels.read().get(label) {
            return id;
        }
        let mut labels_write = self.labels.write();
        if let Some(&id) = labels_write.get(label) {
            return id;
        }
        let id = labels_write.len();
        labels_write.insert(label.to_string(), id);
        self.log_wal(&WalEntry::AddLabel {
            label: label.to_string(),
        });
        id
    }

    pub fn add_node(
        &self,
        label: usize,
        properties: HashMap<String, crate::property::PropertyValue>,
        txid: u64,
    ) -> usize {
        let id = uuid::Uuid::new_v4().to_string();
        let node = Node::new(id.clone(), vec![label], vec![], properties.clone(), txid);
        let node_id = self.nodes.push_item(node);

        // Update indices if any apply
        if let Some(label_indices) = self.indices.write().get_mut(&label) {
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

    pub fn create_index(&self, label: usize, property: String, index_type: IndexType) {
        self.create_index_internal(label, property.clone(), index_type.clone());
        self.log_wal(&WalEntry::CreateIndex { label, property, index_type });
    }

    pub fn drop_index(&self, label: usize, property: String) {
        self.drop_index_internal(label, property.clone());
        self.log_wal(&WalEntry::DropIndex { label, property });
    }

    fn drop_index_internal(&self, label: usize, property: String) {
        let mut indices_guard = self.indices.write();
        if let Some(label_indices) = indices_guard.get_mut(&label) {
            label_indices.remove(&property);
            if label_indices.is_empty() {
                indices_guard.remove(&label);
            }
        }
    }

    fn create_index_internal(&self, label: usize, property: String, index_type: IndexType) {
        let mut indices_guard = self.indices.write();
        let label_indices = indices_guard.entry(label).or_insert_with(HashMap::new);
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
            self.nodes.with_item(node_id, |node| {
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
            });
        }
    }

    pub fn add_edge(
        &self,
        start: usize,
        end: usize,
        labels: Vec<usize>,
        properties: HashMap<String, crate::property::PropertyValue>,
        txid: u64,
    ) -> usize {
        let id = uuid::Uuid::new_v4().to_string();
        let edge = Edge::new(id.clone(), labels.clone(), start, end, properties.clone(), txid);
        let edge_idx = self.edges.push_item(edge);
        self.nodes.with_mut_item(start, |n| n.edges.push(edge_idx)).unwrap();
        self.nodes.with_mut_item(end, |n| n.edges.push(edge_idx)).unwrap();
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

    pub fn execute(&self, query_str: &str) -> Result<String, String> {
        let txid = self.next_txid.fetch_add(1, std::sync::atomic::Ordering::SeqCst);
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

        let plan = QueryPlanner::plan_query(query, &*self.labels.read(), &*self.indices.read());

        for step in plan.steps {
            #[cfg(not(target_arch = "wasm32"))]
            if self.cancel_flag.read().load(Ordering::Relaxed) {
                return Err("Query cancelled".to_string());
            }
            match step {
                ExecutionStep::Create(paths) => {
                    let mut new_result_set = ResultSet::new();
                    let mut bindings = Vec::new();
                    for i in 0..result_set.rows {
                        bindings.clear();
                        for path in &paths {
                            self.execute_create_path(path.clone(), &result_set, i, &mut bindings, txid);
                        }
                        new_result_set.push_row_from(&result_set, i, bindings.drain(..));
                    }
                    result_set = new_result_set;
                }
                ExecutionStep::Match(is_optional, box_plan_opt, paths, box_condition_opt, skip_opt, limit_opt) => {
                    let plan_opt = box_plan_opt.map(|b| *b);
                    let condition_opt = box_condition_opt.map(|b| *b);
                    if let Some(plan) = plan_opt {
                        let mut new_result_set = ResultSet::new();
                        let limit_for_plan = if condition_opt.is_none() {
                            if let (Some(l), Some(s)) = (limit_opt, skip_opt) {
                                Some(l + s)
                            } else {
                                limit_opt
                            }
                        } else { None };

                        if !is_optional {
                            self.execute_plan_and_bind_paths(
                                &plan,
                                &paths,
                                &result_set,
                                &mut new_result_set,
                                &mut profile_out,
                                limit_for_plan,
                                txid,
                            );

                            if let Some(cond) = &condition_opt {
                                let mut filtered = ResultSet::new();
                                let mut skipped = 0;
                                let skip = skip_opt.unwrap_or(0);
                                for i in 0..new_result_set.rows {
                                    if self.evaluate_condition(cond, &new_result_set, i) {
                                        if skipped < skip {
                                            skipped += 1;
                                            continue;
                                        }
                                        filtered.push_row_from(&new_result_set, i, std::iter::empty::<(&str, GraphElement)>());
                                        if let Some(limit) = limit_opt {
                                            if filtered.rows >= limit {
                                                break;
                                            }
                                        }
                                    }
                                }
                                new_result_set = filtered;
                            } else {
                                if let Some(skip) = skip_opt {
                                    new_result_set.skip(skip);
                                }
                                if let Some(limit) = limit_opt {
                                    new_result_set.truncate(limit);
                                }
                            }
                        } else {
                            // OPTIONAL MATCH
                            let mut overall_skipped = 0;
                            let overall_skip = skip_opt.unwrap_or(0);

                            // ⚡ Bolt: Reuse ResultSet allocations across iterations to avoid repeated memory allocations.
                            let mut single_res = ResultSet::new();
                            let mut matches = ResultSet::new();

                            for i in 0..result_set.rows {
                                single_res.clear();
                                single_res.push_row_from(&result_set, i, std::iter::empty::<(&str, GraphElement)>());

                                matches.clear();
                                self.execute_plan_and_bind_paths(
                                    &plan,
                                    &paths,
                                    &single_res,
                                    &mut matches,
                                    &mut profile_out,
                                    None,
                                    txid,
                                );

                                let mut found_match = false;
                                if !matches.is_empty() {
                                    for m_idx in 0..matches.rows {
                                        let condition_met = match &condition_opt {
                                            Some(cond) => self.evaluate_condition(cond, &matches, m_idx),
                                            None => true,
                                        };
                                        if condition_met {
                                            found_match = true;
                                            if overall_skipped < overall_skip {
                                                overall_skipped += 1;
                                                continue;
                                            }
                                            new_result_set.push_row_from(&matches, m_idx, std::iter::empty::<(&str, GraphElement)>());
                                            if let Some(limit) = limit_opt {
                                                if new_result_set.rows >= limit {
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                }

                                if !found_match {
                                    if overall_skipped < overall_skip {
                                        overall_skipped += 1;
                                        continue;
                                    }
                                    new_result_set.push_row_from(&result_set, i, std::iter::empty::<(&str, GraphElement)>());
                                }

                                if let Some(limit) = limit_opt {
                                    if new_result_set.rows >= limit {
                                        break;
                                    }
                                }
                            }
                        }

                        result_set = new_result_set;
                        if result_set.is_empty() {
                            break;
                        }
                    }
                }
                ExecutionStep::Merge(planned_paths) => {
                    let mut new_result_set = ResultSet::new();
                    let mut single_res = ResultSet::new();
                    let mut matches = ResultSet::new();
                    let mut bindings = Vec::new();
                    for i in 0..result_set.rows {
                        for (plan_opt, path) in &planned_paths {
                            if let Some(plan) = plan_opt {
                                single_res.clear();
                                single_res.push_row_from(&result_set, i, std::iter::empty::<(&str, GraphElement)>());

                                matches.clear();
                                self.execute_plan_and_bind_paths(
                                    plan,
                                    &[path.clone()],
                                    &single_res,
                                    &mut matches,
                                    &mut profile_out,
                                    None,
                                    txid,
                                );
                                if !matches.is_empty() {
                                    for m_idx in 0..matches.rows {
                                        new_result_set.push_row_from(&matches, m_idx, std::iter::empty::<(&str, GraphElement)>());
                                    }
                                } else {
                                    bindings.clear();
                                    self.execute_create_path(path.clone(), &result_set, i, &mut bindings, txid);
                                    new_result_set.push_row_from(&result_set, i, bindings.drain(..));
                                }
                            } else {
                                bindings.clear();
                                self.execute_create_path(path.clone(), &result_set, i, &mut bindings, txid);
                                new_result_set.push_row_from(&result_set, i, bindings.drain(..));
                            }
                        }
                    }
                    result_set = new_result_set;
                }
                ExecutionStep::Set(var, key, value_expr) => {
                    let mut updated_nodes = std::collections::HashSet::new();
                    let mut updated_edges = std::collections::HashSet::new();
                    for i in 0..result_set.rows {
                        if let Some(GraphElement::Node(node_id)) = result_set.get(i, &var) {
                            let node_id = *node_id;
                            let evaluated_value = self.evaluate_expression_to_element(&value_expr, &result_set, i);
                            if let Some(value) = evaluated_value.to_property_value() {
                                if updated_nodes.insert(node_id) {
                                    // ⚡ Bolt: Use in-place mutation to set property without allocating memory for cloning the node.
                                    let (old_value, has_label) = self.nodes.with_mut_item(node_id, |__node| {
                                        (__node.properties.insert(key.clone(), value.clone()), __node.labels.clone())
                                    }).unwrap();

                                    // Update indices if necessary
                                for (label_id, label_indices) in self.indices.write().iter_mut() {
                                    if has_label.contains(label_id) {
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
                        } else if let Some(GraphElement::Edge(edge_id)) = result_set.get(i, &var) {
                            let edge_id = *edge_id;
                            let evaluated_value = self.evaluate_expression_to_element(&value_expr, &result_set, i);
                            if let Some(value) = evaluated_value.to_property_value() {
                                if updated_edges.insert(edge_id) {
                                    self.edges.with_mut_item(edge_id, |e| {
                                        e.properties.insert(key.clone(), value.clone());
                                    }).unwrap();

                                    self.log_wal(&WalEntry::SetEdgeProperty {
                                        edge_id,
                                        key: key.clone(),
                                        value: value.clone(),
                                    });
                                }
                            }
                        }
                    }
                }
                ExecutionStep::Remove(items) => {
                    let mut updated_nodes = std::collections::HashSet::new();
                    for item in &items {
                        match item {
                            crate::parser::RemoveItem::Property(var, key) => {
                                for i in 0..result_set.rows {
                                    if let Some(GraphElement::Node(node_id)) = result_set.get(i, var) {
                                        let node_id = *node_id;
                                        if updated_nodes.insert((node_id, key.clone())) {
                                            let (old_value, has_label) = self.nodes.with_mut_item(node_id, |n| {
                                                (n.properties.remove(key), n.labels.clone())
                                            }).unwrap();

                                            if let Some(old_val) = old_value {
                                                // Update indices
                                                for (label_id, label_indices) in self.indices.write().iter_mut() {
                                                    if has_label.contains(label_id) {
                                                        if let Some(prop_index) = label_indices.get_mut(key) {
                                                            match prop_index {
                                                                IndexMap::Hash(map) => {
                                                                    if let Some(vec) = map.get_mut(&old_val) {
                                                                        vec.retain(|&id| id != node_id);
                                                                    }
                                                                }
                                                                IndexMap::BTree(map) => {
                                                                    if let Some(vec) = map.get_mut(&old_val) {
                                                                        vec.retain(|&id| id != node_id);
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }

                                                self.log_wal(&WalEntry::RemoveNodeProperty {
                                                    node_id,
                                                    key: key.clone(),
                                                });
                                            }
                                        }
                                    }
                                }
                            }
                            crate::parser::RemoveItem::Label(var, label) => {
                                let label_id_opt = self.labels.read().get(label).copied();
                                if let Some(label_id) = label_id_opt {
                                    for i in 0..result_set.rows {
                                        if let Some(GraphElement::Node(node_id)) = result_set.get(i, var) {
                                            let node_id = *node_id;

                                            // ⚡ Bolt: in-place mutation and extraction of removed condition to prevent cloning full node
                                            let (removed, properties) = self.nodes.with_mut_item(node_id, |n| {
                                                let mut removed = false;
                                                if let Some(pos) = n.labels.iter().position(|&l| l == label_id) {
                                                    n.labels.remove(pos);
                                                    removed = true;
                                                }
                                                (removed, if removed { Some(n.properties.clone()) } else { None })
                                            }).unwrap();

                                            if removed {
                                                // Remove from all indices for this label
                                                if let Some(label_indices) = self.indices.write().get_mut(&label_id) {
                                                    if let Some(props) = properties {
                                                        for (key, val) in props {
                                                            if let Some(prop_index) = label_indices.get_mut(&key) {
                                                                match prop_index {
                                                                    IndexMap::Hash(map) => {
                                                                        if let Some(vec) = map.get_mut(&val) {
                                                                            vec.retain(|&id| id != node_id);
                                                                        }
                                                                    }
                                                                    IndexMap::BTree(map) => {
                                                                        if let Some(vec) = map.get_mut(&val) {
                                                                            vec.retain(|&id| id != node_id);
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }

                                                self.log_wal(&WalEntry::RemoveNodeLabel {
                                                    node_id,
                                                    label_id,
                                                });
                                            }
                                        }
                                    }
                                }
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
                        // ⚡ Bolt: Mutate edge in-place to soft-delete instead of cloning and updating.
                        let was_deleted = self.edges.with_mut_item(edge_id, |e| {
                            if !e.deleted {
                                e.deleted = true;
                                e.deleted_by = Some(txid);
                                false
                            } else {
                                true
                            }
                        }).unwrap();
                        if !was_deleted {
                            self.log_wal(&WalEntry::DeleteEdge { edge_id });
                        }
                    }

                    for &node_id in &nodes_to_delete {
                        // ⚡ Bolt: Mutate node in-place to soft-delete and extract labels for index updates.
                        let labels = self.nodes.with_mut_item(node_id, |n| {
                            if !n.deleted {
                                n.deleted = true;
                                n.deleted_by = Some(txid);
                                Some(n.labels.clone())
                            } else {
                                None
                            }
                        }).unwrap();

                        if let Some(n_labels) = labels {
                            for (label_id, label_indices) in self.indices.write().iter_mut() {
                                if n_labels.contains(label_id) {
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
                                        if let GraphElement::List(v) = val {
                                            for x in v {
                                                new_result_set.push_row_from(&result_set, i, [(var.as_str(), x.clone())]);
                                            }
                                        }
                                    }
                                }
                                ProjectionItem::Property(var, prop) => {
                                    if let Some(val) = self.get_property_as_element(&result_set, i, var, prop) {
                                        if let GraphElement::List(v) = val {
                                            for x in v {
                                                let key = format!("{}.{}", var, prop);
                                                new_result_set.push_row_from(&result_set, i, [(key.as_str(), x.clone())]);
                                            }
                                        }
                                    }
                                }
                                ProjectionItem::AliasedProperty(var, prop, alias) => {
                                    if let Some(val) = self.get_property_as_element(&result_set, i, var, prop) {
                                        if let GraphElement::List(v) = val {
                                            for x in v {
                                                new_result_set.push_row_from(&result_set, i, [(alias.as_str(), x.clone())]);
                                            }
                                        }
                                    }
                                }
                                _ => {}
                            }
                        }
                    }
                    result_set = new_result_set;
                }
                ExecutionStep::With(ref items, ref order_by_opt, ref s, ref l) | ExecutionStep::Return(ref items, ref order_by_opt, ref s, ref l) => {
                    let mut is_return = false;
                    let skip = *s;
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
                    let empty_res = ResultSet::new();

                    if has_aggregate {
                        let mut groups: indexmap::IndexMap<Vec<Option<GraphElement>>, Vec<usize>> = indexmap::IndexMap::new();
                        // ⚡ BOLT: Reuse allocation buffer to avoid continuous vec creation during grouping.
                        let mut key_buf = Vec::with_capacity(grouping_items.len());

                        for i in 0..result_set.rows {
                            key_buf.clear();
                            for item in &grouping_items {
                                let element = match item {
                                    ProjectionItem::Variable(var) | ProjectionItem::AliasedVariable(var, _) => {
                                        result_set.get(i, var).cloned()
                                    }
                                    ProjectionItem::Property(var, prop) | ProjectionItem::AliasedProperty(var, prop, _) => {
                                        self.get_property_as_element(&result_set, i, var, prop)
                                    }
                                    _ => None
                                };
                                key_buf.push(element);
                            }

                            // ⚡ Bolt: Use IndexMap for O(1) hash-based grouping while preserving deterministic insertion order
                            // ⚡ BOLT: Avoid cloning the grouping key by bypassing HashMap::entry for cache hits.
                            if let Some(group) = groups.get_mut(&key_buf) {
                                group.push(i);
                            } else {
                                groups.insert(std::mem::replace(&mut key_buf, Vec::with_capacity(grouping_items.len())), vec![i]);
                            }
                        }

                        // Compute aggregates per group
                        let mut bindings = Vec::with_capacity(items.len());
                        for (_group_key, group_rows) in groups.into_iter() {
                            bindings.clear();
                            for item in &items {
                                match item {
                                    ProjectionItem::Variable(var) => {
                                        if let Some(_first_idx) = group_rows.first() {
                                            if let Some(val) = result_set.get(group_rows[0], var) {
                                                bindings.push((var.clone(), val.clone()));
                                            }
                                        }
                                    }
                                    ProjectionItem::AliasedVariable(var, alias) => {
                                        if let Some(_first_idx) = group_rows.first() {
                                            if let Some(val) = result_set.get(group_rows[0], var) {
                                                bindings.push((alias.clone(), val.clone()));
                                            }
                                        }
                                    }
                                    ProjectionItem::Property(var, prop) => {
                                        if let Some(_first_idx) = group_rows.first() {
                                            if let Some(val) = self.get_property_as_element(&result_set, group_rows[0], var, prop) {
                                                bindings.push((format!("{}.{}", var, prop), val));
                                            }
                                        }
                                    }
                                    ProjectionItem::AliasedProperty(var, prop, alias) => {
                                        if let Some(_first_idx) = group_rows.first() {
                                            if let Some(val) = self.get_property_as_element(&result_set, group_rows[0], var, prop) {
                                                bindings.push((alias.clone(), val));
                                            }
                                        }
                                    }
                                    ProjectionItem::Expression { expr, alias } => {
                                        if let Some(_first_idx) = group_rows.first() {
                                            let val = self.evaluate_expression_to_element(expr, &result_set, group_rows[0]);
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
                                    ProjectionItem::Function { func, args, alias } => {
                                        let out_key = alias
                                            .clone()
                                            .unwrap_or_else(|| format!("{}()", func));

                                        let eval_args: Vec<GraphElement> = args.iter().map(|arg| self.evaluate_expression_to_element(arg, &result_set, group_rows[0])).collect();
                                        if let Some(f) = self.functions.read().get(&func.to_lowercase()) {
                                            if let Ok(val) = f(&eval_args) {
                                                bindings.push((out_key, val));
                                            }
                                        } else if func.eq_ignore_ascii_case("rand") {
                                            bindings.push((out_key, GraphElement::Number(0f64)));
                                        }
                                    }
                                    ProjectionItem::Star => {}
                                }
                            }
                            final_res.push_row_from(&empty_res, 0, bindings.drain(..));
                        }
                    } else {
                        // Simple projection without aggregation
                        let mut bindings = Vec::with_capacity(items.len());
                        for i in 0..result_set.rows {
                            bindings.clear();
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
                                    ProjectionItem::Function { func, args, alias } => {
                                        let out_key = alias
                                            .clone()
                                            .unwrap_or_else(|| format!("{}()", func));

                                        let eval_args: Vec<GraphElement> = args.iter().map(|arg| self.evaluate_expression_to_element(arg, &result_set, i)).collect();
                                        if let Some(f) = self.functions.read().get(&func.to_lowercase()) {
                                            if let Ok(val) = f(&eval_args) {
                                                bindings.push((out_key, val));
                                            }
                                        } else if func.eq_ignore_ascii_case("rand") {
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
                            final_res.push_row_from(&empty_res, 0, bindings.drain(..));
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
                            sorted_res.push_row_from(&final_res, original_idx, std::iter::empty::<(&str, GraphElement)>());
                        }
                        final_res = sorted_res;
                    }

                    if let Some(s) = skip {
                        final_res.skip(s);
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
                ExecutionStep::DropIndex { label, property } => {
                    if let Some(label_id) = self.labels.read().get(&label).cloned() {
                        self.drop_index(label_id, property);
                    }
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

    fn execute_create_path(&self, path: Path, in_res: &ResultSet, row_idx: usize, bindings: &mut Vec<(String, GraphElement)>, txid: u64) {
        let mut path_elements = Vec::new();
        let start_id = self.create_node(&path.start, in_res, row_idx, bindings, txid);
        path_elements.push(GraphElement::Node(start_id));
        let mut current_id = start_id;

        let bound_var = path.bound_variable.clone();
        for (rel, target_node) in path.edges {
            let next_id = self.create_node(&target_node, in_res, row_idx, bindings, txid);
            let rel_id = self.create_rel(&rel, current_id, next_id, txid);
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

    fn create_node(&self, pattern: &NodePattern, in_res: &ResultSet, row_idx: usize, bindings: &mut Vec<(String, GraphElement)>, txid: u64) -> usize {
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

        let node_id = self.add_node(label_id, pattern.properties.clone(), txid);

        if let Some(var) = &pattern.variable {
            bindings.push((var.clone(), GraphElement::Node(node_id)));
        }

        node_id
    }

    fn create_rel(&self, pattern: &RelPattern, start: usize, end: usize, txid: u64) -> usize {
        let label_id = if let Some(label) = &pattern.label {
            self.get_or_add_label(label)
        } else {
            self.get_or_add_label("Rel")
        };

        self.add_edge(start, end, vec![label_id], pattern.properties.clone(), txid)
    }

    pub fn execute_plan(
        &self,
        plan: &PlanNode,
        in_res: &ResultSet,
        out: &mut ResultSet,
        profile: &mut Option<String>,
        depth: usize,
        limit: Option<usize>,
        txid: u64,
    ) {
        #[cfg(not(target_arch = "wasm32"))]
        if self.cancel_flag.read().load(Ordering::Relaxed) { return; }

        let indent = "  ".repeat(depth);
        let op_name;

        let initial_rows = out.rows;

        match plan {
            PlanNode::FullNodeScan { pattern } => {
                op_name = "FullNodeScan".to_string();
                for i in 0..in_res.rows {
                    let nodes = self.find_nodes(pattern, in_res, i, txid);
                    for node_id in nodes {
                        if let Some(var) = &pattern.variable {
                            out.push_row_from(in_res, i, [(var.as_str(), GraphElement::Node(node_id))]);
                        } else {
                            out.push_row_from(in_res, i, std::iter::empty::<(&str, GraphElement)>());
                        }
                        if limit.is_some_and(|l| out.rows >= l) { return; }
                    }
                }
            }
            PlanNode::NodeLabelLookup { label, pattern } => {
                op_name = format!("NodeLabelLookup({})", label);
                let mut matched_nodes = Vec::new();
                if let Some(label_id) = self.labels.read().get(label).copied() {
                    let pattern_label_id = self.resolve_node_label(pattern);
                    if let Some(pattern_label_id) = pattern_label_id {
                        for id in 0..self.nodes.len_items() {
                            self.nodes.with_item(id, |node| {
                                if node.labels.contains(&label_id)
                                    && self.node_matches(node, pattern, pattern_label_id, txid)
                                {
                                    matched_nodes.push(id);
                                }
                            }).unwrap();
                        }
                    }
                }

                for i in 0..in_res.rows {
                    for &node_id in &matched_nodes {
                        if let Some(var) = &pattern.variable {
                            out.push_row_from(in_res, i, [(var.as_str(), GraphElement::Node(node_id))]);
                        } else {
                            out.push_row_from(in_res, i, std::iter::empty::<(&str, GraphElement)>());
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
                if let Some(label_id) = self.labels.read().get(label) {
                    if let Some(label_indices) = self.indices.read().get(label_id) {
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

                if let Some(pattern_label_id) = self.resolve_node_label(pattern) {
                    for id in candidate_ids {
                        self.nodes.with_item(id, |node| {
                            if self.node_matches(node, pattern, pattern_label_id, txid) {
                                matched_nodes.push(id);
                            }
                        }).unwrap();
                    }
                }

                for i in 0..in_res.rows {
                    for &node_id in &matched_nodes {
                        if let Some(var) = &pattern.variable {
                            out.push_row_from(in_res, i, [(var.as_str(), GraphElement::Node(node_id))]);
                        } else {
                            out.push_row_from(in_res, i, std::iter::empty::<(&str, GraphElement)>());
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
                self.execute_plan(source, in_res, &mut source_res, profile, depth + 1, None, txid);

                for i in 0..source_res.rows {
                    let mut source_node_ids = Vec::new();

                    if let Some(var) = &source_node_pattern.variable {
                        if let Some(GraphElement::Node(id)) = source_res.get(i, var) {
                            source_node_ids.push(*id);
                        }
                    }

                    if source_node_ids.is_empty() {
                        source_node_ids = self.find_nodes(source_node_pattern, &source_res, i, txid);
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
                self.execute_plan(left, in_res, &mut left_res, profile, depth + 1, None, txid);
                let mut right_res = ResultSet::new();
                self.execute_plan(right, in_res, &mut right_res, profile, depth + 1, None, txid);

                let mut common_keys = Vec::new();
                for k in left_res.columns.keys() {
                    if right_res.columns.contains_key(k) {
                        common_keys.push(k.clone());
                    }
                }

                let mut right_hash = std::collections::HashSet::new();
                let mut key_buf = Vec::with_capacity(common_keys.len());
                for r_idx in 0..right_res.rows {
                    key_buf.clear();
                    for k in &common_keys {
                        key_buf.push(right_res.get(r_idx, k).cloned().unwrap_or(GraphElement::Null));
                    }
                    // ⚡ BOLT: Build hash set of right side to check for intersection efficiently O(N+M) instead of O(N*M).
                    right_hash.insert(key_buf.clone());
                }

                for l_idx in 0..left_res.rows {
                    key_buf.clear();
                    for k in &common_keys {
                        key_buf.push(left_res.get(l_idx, k).cloned().unwrap_or(GraphElement::Null));
                    }

                    if right_hash.contains(&key_buf) {
                        out.push_row_from(&left_res, l_idx, std::iter::empty::<(&str, GraphElement)>());
                        if limit.is_some_and(|l| out.rows >= l) { return; }
                    }
                }
            }
            PlanNode::Union { left, right } => {
                op_name = "Union".to_string();
                self.execute_plan(left, in_res, out, profile, depth + 1, limit, txid);
                if limit.is_some_and(|l| out.rows >= l) { return; }
                self.execute_plan(right, in_res, out, profile, depth + 1, limit, txid);
            }
            PlanNode::HashJoin { left, right, join_keys } => {
                op_name = "HashJoin".to_string();
                let mut single_res = ResultSet::new();
                let mut left_res = ResultSet::new();
                let mut right_res = ResultSet::new();
                for i in 0..in_res.rows {
                    single_res.clear();
                    single_res.push_row_from(in_res, i, std::iter::empty::<(&str, GraphElement)>());

                    left_res.clear();
                    self.execute_plan(left, &single_res, &mut left_res, profile, depth + 1, None, txid);

                    let mut right_prof = if profile.is_some() { Some(String::new()) } else { None };
                    right_res.clear();
                    self.execute_plan(right, &single_res, &mut right_res, &mut right_prof, depth + 1, None, txid);

                    if let Some(prof) = profile {
                        if let Some(r_prof) = right_prof { prof.push_str(&r_prof); }
                    }

                    // Build on the smaller result set, probe with the larger
                    let (build_res, probe_res, build_is_left) = if left_res.rows <= right_res.rows {
                        (&left_res, &right_res, true)
                    } else {
                        (&right_res, &left_res, false)
                    };

                    let mut hash_table: HashMap<Vec<GraphElement>, Vec<usize>> = HashMap::new();
                    // ⚡ BOLT: Reuse allocation buffer to avoid continuous vec creation in hash join.
                    let mut key_buf = Vec::with_capacity(join_keys.len());
                    for b_idx in 0..build_res.rows {
                        key_buf.clear();
                        for k in join_keys {
                            key_buf.push(build_res.get(b_idx, k).cloned().unwrap_or(GraphElement::Null));
                        }
                        // ⚡ BOLT: Avoid unconditional cloning of keys by bypassing HashMap::entry for cache hits.
                        if let Some(b_indices) = hash_table.get_mut(&key_buf) {
                            b_indices.push(b_idx);
                        } else {
                            hash_table.insert(key_buf.clone(), vec![b_idx]);
                        }
                    }

                    for p_idx in 0..probe_res.rows {
                        key_buf.clear();
                        for k in join_keys {
                            key_buf.push(probe_res.get(p_idx, k).cloned().unwrap_or(GraphElement::Null));
                        }
                        if let Some(b_indices) = hash_table.get(&key_buf) {
                            for &b_idx in b_indices {
                                let (l_idx, r_idx) = if build_is_left { (b_idx, p_idx) } else { (p_idx, b_idx) };
                                let mut valid = true;
                                // Check non-join key intersections to prevent contradictory merges
                                for (k, r_col) in &right_res.columns {
                                    if !join_keys.contains(k) {
                                        if let Some(l_col) = left_res.columns.get(k) {
                                            if l_col[l_idx] != GraphElement::Null && r_col[r_idx] != GraphElement::Null && l_col[l_idx] != r_col[r_idx] {
                                                valid = false;
                                                break;
                                            }
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
            }
            PlanNode::CrossProduct { left, right } => {
                op_name = "CrossProduct".to_string();
                // To preserve incoming row associations correctly when cross joining independent paths
                // evaluated on the SAME incoming row, we process each incoming row separately for cross-product.

                // ⚡ Bolt: Reuse ResultSet allocations across iterations to avoid repeated memory allocations.
                let mut single_res = ResultSet::new();
                let mut left_res = ResultSet::new();
                let mut right_res = ResultSet::new();
                for i in 0..in_res.rows {
                    single_res.clear();
                    single_res.push_row_from(in_res, i, std::iter::empty::<(&str, GraphElement)>());

                    left_res.clear();
                    self.execute_plan(left, &single_res, &mut left_res, profile, depth + 1, None, txid);

                    let mut right_prof = if profile.is_some() { Some(String::new()) } else { None };
                    right_res.clear();
                    self.execute_plan(right, &single_res, &mut right_res, &mut right_prof, depth + 1, None, txid);

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
        txid: u64,
    ) {
        let initial_rows = out.rows;
        self.execute_plan(plan, in_res, out, profile, 0, limit, txid);

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
        #[cfg(not(target_arch = "wasm32"))]
        if self.cancel_flag.read().load(Ordering::Relaxed) { return; }

        if limit.is_some_and(|l| out.rows >= l) { return; }
        if edge_idx >= edges.len() {
            out.push_row_from(in_res, row_idx, std::iter::empty::<(&str, GraphElement)>());
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

        let mut single_res = ResultSet::new();
        let mut bindings = Vec::with_capacity(2);
        for (next_node_id, edge_id) in matches {
            single_res.clear();
            bindings.clear();
            if let Some(var) = &rel_pattern.variable {
                bindings.push((var.as_str(), GraphElement::Edge(edge_id)));
            }
            if let Some(var) = &target_node_pattern.variable {
                bindings.push((var.as_str(), GraphElement::Node(next_node_id)));
            }
            single_res.push_row_from(in_res, row_idx, bindings.drain(..));

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
        #[cfg(not(target_arch = "wasm32"))]
        if self.cancel_flag.read().load(Ordering::Relaxed) { return; }

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
            } && {
                let target_label_id = self.resolve_node_label(target_node_pattern);
                if let Some(target_label_id) = target_label_id {
                    self.nodes.with_item(current_node_id, |node| self.node_matches(node, target_node_pattern, target_label_id, u64::MAX)).unwrap()
                } else {
                    false
                }
            };

            if matches_target {
                let mut single_res = ResultSet::new();
                let mut bindings = Vec::with_capacity(2);
                if let Some(var) = &rel_pattern.variable {
                    bindings.push((var.as_str(), GraphElement::EdgeArray(path_edges.clone())));
                }
                if let Some(var) = &target_node_pattern.variable {
                    bindings.push((var.as_str(), GraphElement::Node(current_node_id)));
                }
                single_res.push_row_from(in_res, row_idx, bindings.drain(..));

                self.match_edges_recursive(edges, edge_idx + 1, current_node_id, &single_res, 0, out, limit);
            }
        }

        if let Some(max) = max_len {
            if current_depth >= max {
                return;
            }
        }

        let rel_label_id = match self.resolve_rel_label(rel_pattern) {
            Some(id) => id,
            None => return,
        };

        let start_node_edges = self.nodes.with_item(current_node_id, |n| n.edges.clone()).unwrap();

        for &edge_id in &start_node_edges {
            let edge_matches = self.edges.with_item(edge_id, |edge| {
                if edge.start != current_node_id {
                    return None;
                }
                if path_edges.contains(&edge_id) {
                    return None;
                }
                if !self.edge_matches(edge, rel_pattern, rel_label_id) {
                    return None;
                }
                Some(edge.end)
            }).unwrap();

            if let Some(end_node_id) = edge_matches {

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

    fn resolve_node_label(&self, pattern: &NodePattern) -> Option<Option<usize>> {
        if let Some(l) = &pattern.label {
            self.labels.read().get(l).copied().map(Some)
        } else {
            Some(None)
        }
    }

    fn resolve_rel_label(&self, pattern: &RelPattern) -> Option<Option<usize>> {
        if let Some(l) = &pattern.label {
            self.labels.read().get(l).copied().map(Some)
        } else {
            Some(None)
        }
    }

    fn find_nodes(&self, pattern: &NodePattern, in_res: &ResultSet, row_idx: usize, txid: u64) -> Vec<usize> {
        let pattern_label_id = match self.resolve_node_label(pattern) {
            Some(id) => id,
            None => return vec![], // Label constraint exists but not in graph
        };

        // If node is already bound in env, return just that node if it matches the pattern
        if let Some(var) = &pattern.variable {
            if let Some(GraphElement::Node(id)) = in_res.get(row_idx, var) {
                if self.nodes.with_item(*id, |node| self.node_matches(node, pattern, pattern_label_id, txid)).unwrap() {
                    return vec![*id];
                } else {
                    return vec![];
                }
            }
        }

        // Try to use an index if one is available
        if let Some(label_name) = &pattern.label {
            if let Some(label_id) = self.labels.read().get(label_name) {
                if let Some(label_indices) = self.indices.read().get(label_id) {
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
                                    self.nodes.with_item(id, |node| {
                                        if self.node_matches(node, pattern, pattern_label_id, txid) {
                                            matched_nodes.push(id);
                                        }
                                    }).unwrap();
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
            self.nodes.with_item(id, |node| {
                if self.node_matches(node, pattern, pattern_label_id, txid) {
                    matched_nodes.push(id);
                }
            }).unwrap();
        }
        matched_nodes
    }

    fn node_matches(&self, node: &Node, pattern: &NodePattern, label_id: Option<usize>, txid: u64) -> bool {

        if node.deleted || node.created_by > txid || node.deleted_by.is_some_and(|d| d <= txid) { return false; }

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

        let rel_label_id = match self.resolve_rel_label(rel_pattern) {
            Some(id) => id,
            None => return matches,
        };

        let target_label_id = match self.resolve_node_label(target_node_pattern) {
            Some(id) => id,
            None => return matches,
        };

        let start_node_edges = self.nodes.with_item(start_id, |n| n.edges.clone()).unwrap();

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

        for &edge_id in &start_node_edges {
            let edge_matches = self.edges.with_item(edge_id, |edge| {
                if edge.start != start_id {
                    return None;
                }
                if let Some(var) = &rel_pattern.variable {
                    if let Some(GraphElement::Edge(eid)) = in_res.get(row_idx, var) {
                        if *eid != edge_id {
                            return None;
                        }
                    }
                }
                if !self.edge_matches(edge, rel_pattern, rel_label_id) {
                    return None;
                }
                Some(edge.end)
            }).unwrap();

            if let Some(end_node_id) = edge_matches {

                if let Some(bound_target) = target_bound_id {
                    if end_node_id != bound_target {
                        continue;
                    }
                }

                self.nodes.with_item(end_node_id, |end_node| {
                    if self.node_matches(end_node, target_node_pattern, target_label_id, u64::MAX) {
                        matches.push((end_node_id, edge_id));
                    }
                }).unwrap();
            }
        }

        matches
    }

    fn edge_matches(&self, edge: &Edge, pattern: &RelPattern, label_id: Option<usize>) -> bool {

        if edge.deleted { return false; }

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
                GraphElement::Node(id) => self.nodes.with_item(*id, |n| n.properties.get(prop).cloned()).unwrap(),
                GraphElement::Edge(id) => self.edges.with_item(*id, |e| e.properties.get(prop).cloned()).unwrap(),
                _ => None,
            };
            match prop_val {
                Some(crate::property::PropertyValue::String(s)) => Some(GraphElement::String(s)),
                Some(crate::property::PropertyValue::Number(n)) => Some(GraphElement::Number(n)),
                Some(crate::property::PropertyValue::Boolean(b)) => Some(GraphElement::Boolean(b)),
                Some(crate::property::PropertyValue::Date(d)) => Some(GraphElement::Date(d)),
                Some(crate::property::PropertyValue::DateTime(dt)) => Some(GraphElement::DateTime(dt)),
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
            Expression::Function(func, args) => {
                if let Some(f) = self.functions.read().get(&func.to_lowercase()) {
                    let eval_args: Vec<GraphElement> = args.iter().map(|arg| self.evaluate_expression_to_element(arg, in_res, row_idx)).collect();
                    match f(&eval_args) {
                        Ok(res) => res,
                        Err(_) => GraphElement::Null
                    }
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
                        GraphElement::Date(d) => EvalValue::Date(*d),
                        GraphElement::DateTime(dt) => EvalValue::DateTime(*dt),
                    }
                } else {
                    EvalValue::Null
                }
            }
            Expression::Function(func, args) => {
                if let Some(f) = self.functions.read().get(&func.to_lowercase()) {
                    let eval_args: Vec<GraphElement> = args.iter().map(|arg| self.evaluate_expression_to_element(arg, in_res, row_idx)).collect();
                    match f(&eval_args) {
                        Ok(res) => match res {
                            GraphElement::Number(n) => EvalValue::Number(n),
                            GraphElement::String(s) => EvalValue::String(Cow::Owned(s)),
                            GraphElement::Boolean(b) => EvalValue::Boolean(b),
                            GraphElement::Date(d) => EvalValue::Date(d),
                            GraphElement::DateTime(dt) => EvalValue::DateTime(dt),
                            GraphElement::Null => EvalValue::Null,
                            _ => EvalValue::String(Cow::Owned(self.format_element(&res))),
                        },
                        Err(_) => EvalValue::Null
                    }
                } else {
                    EvalValue::Null
                }
            }
            Expression::Property(var, prop) => {
                if let Some(element) = in_res.get(row_idx, var) {
                    let prop_val = match element {
                        GraphElement::Node(id) => self.nodes.with_item(*id, |n| n.properties.get(prop).cloned()).unwrap(),
                        GraphElement::Edge(id) => self.edges.with_item(*id, |e| e.properties.get(prop).cloned()).unwrap(),
                        _ => None,
                    };
                    match prop_val {
                        Some(crate::property::PropertyValue::String(s)) => {
                            EvalValue::String(Cow::Owned(s))
                        }
                        Some(crate::property::PropertyValue::Number(n)) => EvalValue::Number(n),
                        Some(crate::property::PropertyValue::Boolean(b)) => EvalValue::Boolean(b),
                        Some(crate::property::PropertyValue::Date(d)) => EvalValue::Date(d),
                        Some(crate::property::PropertyValue::DateTime(dt)) => EvalValue::DateTime(dt),
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

impl Graph {
    pub fn rebuild_indices(&self) {
        self.indices.write().clear();
    }

    pub fn replace_from(&self, other: Graph) {
        self.nodes.replace_from(other.nodes);
        self.edges.replace_from(other.edges);
        *self.labels.write() = other.labels.into_inner();
        *self.indices.write() = other.indices.into_inner();
        *self.functions.write() = other.functions.into_inner();
        self.next_txid.store(other.next_txid.load(std::sync::atomic::Ordering::Relaxed), std::sync::atomic::Ordering::Relaxed);

        #[cfg(not(target_arch = "wasm32"))]
        {
            *self.wal_file.lock() = other.wal_file.into_inner();
        }
    }

    fn dummy_replace(&self) {
        // Look up all nodes and populate existing indices?
        // Actually YAGDB creates indices via CREATE INDEX ON :Label(prop).
        // Since indices are stored as HashMap<usize, HashMap<String, IndexMap>>, we can't easily recreate them unless we know which ones existed.
        // Wait, import_json restores `self.indices` completely. In CSV, we didn't export `indices`.
    }
}

