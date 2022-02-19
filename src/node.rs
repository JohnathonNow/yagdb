use std::collections::HashMap;

pub(crate) struct Node {
    labels: Vec<usize>,
    edges: Vec<usize>,
    properties: HashMap<String, String>,
}

impl Node {
    pub fn new(labels: Vec<usize>, edges: Vec<usize>, properties: HashMap<String, String>) -> Self { Self { labels, edges, properties } }
}