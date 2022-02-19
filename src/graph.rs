use std::collections::HashMap;

use crate::{node::Node, edge::Edge};
struct Graph {
    nodes: Vec<Node>,
    edges: Vec<Edge>,
    labels: HashMap<String, usize>
}

impl Graph {
    fn new() -> Self { Self { nodes: Vec::new(), edges: Vec::new(), labels: HashMap::new() } }

    fn add_label(&mut self, label: &str) -> usize {
        let id = self.labels.len();
        self.labels.insert(label.to_string(), id);
        id
    }

    fn add_node(&mut self, label: usize) -> usize {
        let node = Node::new(vec![label], vec![], HashMap::new());
        self.nodes.push(node);
        self.nodes.len() - 1
    }

    fn add_edge(&mut self, start: usize, end: usize, labels: Vec<usize>) -> usize {
        let edge = Edge::new(labels, start, end, HashMap::new());
        self.edges.push(edge);
        self.edges.len() - 1
    }
}