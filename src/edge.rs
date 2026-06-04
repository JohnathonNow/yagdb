use std::collections::HashMap;
use serde::{Serialize, Deserialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Edge {
    pub labels: Vec<usize>,
    pub start: usize,
    pub end: usize,
    pub properties: HashMap<String, String>,
}

impl Edge {
    pub fn new(labels: Vec<usize>, start: usize, end: usize, properties: HashMap<String, String>) -> Self { Self { labels, start, end, properties } }
}
