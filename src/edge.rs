use serde::{Deserialize, Serialize};
use std::collections::HashMap;

#[derive(Debug, Serialize, Deserialize)]
pub struct Edge {
    pub labels: Vec<usize>,
    pub start: usize,
    pub end: usize,
    pub properties: HashMap<String, crate::property::PropertyValue>,
}

impl Edge {
    pub fn new(
        labels: Vec<usize>,
        start: usize,
        end: usize,
        properties: HashMap<String, crate::property::PropertyValue>,
    ) -> Self {
        Self {
            labels,
            start,
            end,
            properties,
        }
    }
}
