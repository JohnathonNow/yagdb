use serde::{Deserialize, Serialize};
use std::collections::HashMap;

#[derive(Debug, Serialize, Deserialize)]
pub struct Edge {
    pub id: String,
    pub labels: Vec<usize>,
    pub start: usize,
    pub end: usize,
    pub properties: HashMap<String, String>,
}

impl Edge {
    pub fn new(
        id: String,
        labels: Vec<usize>,
        start: usize,
        end: usize,
        properties: HashMap<String, String>,
    ) -> Self {
        Self {
            id,
            labels,
            start,
            end,
            properties,
        }
    }
}
