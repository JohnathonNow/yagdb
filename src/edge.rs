use std::collections::HashMap;

pub(crate) struct Edge {
    labels: Vec<usize>,
    start: usize,
    end: usize,
    properties: HashMap<String, String>,
}

impl Edge {
    pub fn new(labels: Vec<usize>, start: usize, end: usize, properties: HashMap<String, String>) -> Self { Self { labels, start, end, properties } }
}