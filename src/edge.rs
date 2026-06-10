use serde::{Deserialize, Serialize};
use std::collections::HashMap;

#[derive(Debug, Serialize, Deserialize)]
pub struct Edge {
    pub labels: Vec<usize>,
    pub start: usize,
    pub end: usize,
    pub properties: HashMap<String, String>,
    pub deleted: bool,
}

impl Edge {
    pub fn new(
        labels: Vec<usize>,
        start: usize,
        end: usize,
        properties: HashMap<String, String>,
    ) -> Self {
        Self {
            labels,
            start,
            end,
            properties,
            deleted: false,
        }
    }
}
