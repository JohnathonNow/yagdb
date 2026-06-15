use serde::{Deserialize, Serialize};
use std::collections::HashMap;

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Edge {
    pub id: String,
    pub labels: Vec<usize>,
    pub start: usize,
    pub end: usize,
    pub properties: HashMap<String, crate::property::PropertyValue>,
    pub deleted: bool,
}

impl Edge {
    pub fn new(
        id: String,
        labels: Vec<usize>,
        start: usize,
        end: usize,
        properties: HashMap<String, crate::property::PropertyValue>,
    ) -> Self {
        Self {
            id,
            labels,
            start,
            end,
            properties,
            deleted: false,
        }
    }
}
