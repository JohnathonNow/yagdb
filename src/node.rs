use serde::{Deserialize, Serialize};
use std::collections::HashMap;

#[derive(Debug, Serialize, Deserialize)]
#[derive(Clone)]
pub struct Node {
    pub id: String,
    pub labels: Vec<usize>,
    pub edges: Vec<usize>,
    pub properties: HashMap<usize, crate::property::PropertyValue>,
    pub deleted: bool,
}

impl Node {
    pub fn new(
        id: String,
        labels: Vec<usize>,
        edges: Vec<usize>,
        properties: HashMap<usize, crate::property::PropertyValue>,
    ) -> Self {
        Self {
            id,
            labels,
            edges,
            properties,
            deleted: false,
        }
    }
}
