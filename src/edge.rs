use serde::{Deserialize, Serialize};
use std::collections::HashMap;

#[derive(Debug, Serialize, Deserialize)]
#[derive(Clone)]
pub struct Edge {
    pub id: String,
    pub labels: Vec<usize>,
    pub start: usize,
    pub end: usize,
    pub properties: HashMap<String, crate::property::PropertyValue>,
    pub deleted: bool,
    pub created_by: u64,
    pub deleted_by: Option<u64>,
}

impl Edge {
    pub fn new(
        id: String,
        labels: Vec<usize>,
        start: usize,
        end: usize,
        properties: HashMap<String, crate::property::PropertyValue>,
        created_by: u64,
    ) -> Self {
        Self {
            id,
            labels,
            start,
            end,
            properties,
            deleted: false,
            created_by,
            deleted_by: None,
        }
    }
}
