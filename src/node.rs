use serde::{Deserialize, Serialize};
use std::collections::HashMap;

#[derive(Debug, Serialize, Deserialize)]
#[derive(Clone)]
pub struct Node {
    pub id: String,
    pub labels: Vec<usize>,
    pub edges: Vec<usize>,
    pub properties: HashMap<String, crate::property::PropertyValue>,
    pub deleted: bool,
    pub created_by: u64,
    pub deleted_by: Option<u64>,
}

impl Node {
    pub fn new(
        id: String,
        labels: Vec<usize>,
        edges: Vec<usize>,
        properties: HashMap<String, crate::property::PropertyValue>,
        created_by: u64,
    ) -> Self {
        Self {
            id,
            labels,
            edges,
            properties,
            deleted: false,
            created_by,
            deleted_by: None,
        }
    }
}
