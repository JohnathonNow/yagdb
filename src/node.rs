use std::collections::HashMap;
use serde::{Serialize, Deserialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Node {
    pub labels: Vec<usize>,
    pub edges: Vec<usize>,
    pub properties: HashMap<String, String>,
}

impl Node {
    pub fn new(labels: Vec<usize>, edges: Vec<usize>, properties: HashMap<String, String>) -> Self { Self { labels, edges, properties } }
}
