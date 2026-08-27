use serde::{Deserialize, Serialize};
use std::collections::HashMap;

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
        index_type: IndexType,
    },
    SetNodeProperty {
        node_id: usize,
        key: String,
        value: crate::property::PropertyValue,
    },
    DeleteNode { node_id: usize },
    DeleteEdge { edge_id: usize },
    RemoveNodeProperty {
        node_id: usize,
        key: String,
    },
    RemoveNodeLabel {
        node_id: usize,
        label_id: usize,
    },
    DropIndex {
        label: usize,
        property: String,
    },
}
