use serde::{Deserialize, Serialize};
use std::collections::HashMap;

#[derive(Debug, Serialize, Deserialize)]
#[derive(Clone)]
pub struct Edge {
    pub id: String,
    pub labels: Vec<usize>,
    pub start: usize,
    pub end: usize,
    pub properties: HashMap<usize, crate::property::PropertyValue>,
    pub deleted: bool,
}

impl Edge {
    pub fn new(
        id: String,
        labels: Vec<usize>,
        start: usize,
        end: usize,
        properties: HashMap<usize, crate::property::PropertyValue>,
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
