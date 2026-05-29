use std::collections::HashMap;

use crate::{edge::Edge, node::Node, parser::{parse_query, Clause, NodePattern, Path, RelPattern}};

pub enum GraphElement {
    Node(usize),
    Edge(usize),
}

pub struct Graph {
    pub nodes: Vec<Node>,
    pub edges: Vec<Edge>,
    pub labels: HashMap<String, usize>,
}

impl Graph {
    pub fn new() -> Self {
        Self {
            nodes: Vec::new(),
            edges: Vec::new(),
            labels: HashMap::new(),
        }
    }

    pub fn get_or_add_label(&mut self, label: &str) -> usize {
        if let Some(&id) = self.labels.get(label) {
            id
        } else {
            let id = self.labels.len();
            self.labels.insert(label.to_string(), id);
            id
        }
    }

    pub fn add_node(&mut self, label: usize, properties: HashMap<String, String>) -> usize {
        let node = Node::new(vec![label], vec![], properties);
        self.nodes.push(node);
        self.nodes.len() - 1
    }

    pub fn add_edge(&mut self, start: usize, end: usize, labels: Vec<usize>, properties: HashMap<String, String>) -> usize {
        let edge = Edge::new(labels, start, end, properties);
        self.edges.push(edge);
        let edge_idx = self.edges.len() - 1;
        self.nodes[start].edges.push(edge_idx);
        self.nodes[end].edges.push(edge_idx);
        edge_idx
    }

    pub fn execute(&mut self, query_str: &str) -> Result<String, String> {
        let (_, query) = parse_query(query_str).map_err(|e| format!("Parse error: {}", e))?;

        let mut output = String::new();
        // A simple environment to map variables to element IDs for the duration of the query execution
        let mut env: HashMap<String, GraphElement> = HashMap::new();

        for clause in query.clauses {
            match clause {
                Clause::Create(paths) => {
                    for path in paths {
                        self.execute_create_path(path, &mut env);
                    }
                }
                Clause::Match(paths) => {
                    for path in paths {
                        self.execute_match_path(path, &mut env);
                    }
                }
                Clause::Return(vars) => {
                    for var in vars {
                        if let Some(element) = env.get(&var) {
                            match element {
                                GraphElement::Node(node_id) => {
                                    let node = &self.nodes[*node_id];
                                    output.push_str(&format!("{}: {:?}\n", var, node));
                                }
                                GraphElement::Edge(edge_id) => {
                                    let edge = &self.edges[*edge_id];
                                    output.push_str(&format!("{}: {:?}\n", var, edge));
                                }
                            }
                        } else {
                            output.push_str(&format!("{}: null\n", var));
                        }
                    }
                }
            }
        }

        Ok(output)
    }

    fn execute_create_path(&mut self, path: Path, env: &mut HashMap<String, GraphElement>) {
        let start_id = self.create_node(&path.start, env);
        let mut current_id = start_id;

        for (rel, target_node) in path.edges {
            let next_id = self.create_node(&target_node, env);
            let rel_id = self.create_rel(&rel, current_id, next_id);
            if let Some(var) = &rel.variable {
                env.insert(var.clone(), GraphElement::Edge(rel_id));
            }
            current_id = next_id;
        }
    }

    fn create_node(&mut self, pattern: &NodePattern, env: &mut HashMap<String, GraphElement>) -> usize {
        if let Some(var) = &pattern.variable {
            if let Some(GraphElement::Node(id)) = env.get(var) {
                return *id;
            }
        }

        let label_id = if let Some(label) = &pattern.label {
            self.get_or_add_label(label)
        } else {
            // using 0 as a default / generic label
            self.get_or_add_label("Node")
        };

        let node_id = self.add_node(label_id, pattern.properties.clone());

        if let Some(var) = &pattern.variable {
            env.insert(var.clone(), GraphElement::Node(node_id));
        }

        node_id
    }

    fn create_rel(&mut self, pattern: &RelPattern, start: usize, end: usize) -> usize {
        let label_id = if let Some(label) = &pattern.label {
            self.get_or_add_label(label)
        } else {
            self.get_or_add_label("Rel")
        };

        self.add_edge(start, end, vec![label_id], pattern.properties.clone())
    }

    fn execute_match_path(&mut self, path: Path, env: &mut HashMap<String, GraphElement>) {
        // Very simplistic matching: find first node that matches the start pattern
        if let Some(node_id) = self.find_node(&path.start) {
            if let Some(var) = &path.start.variable {
                env.insert(var.clone(), GraphElement::Node(node_id));
            }
            // In a real graph DB we would do a traversal / back-tracking to match paths.
            // For this minimal implementation, we'll just match the first node.
            // Matching paths is complex.
            let mut current_id = node_id;
            for (rel, target_node) in path.edges {
                 // Simplistic path match: find an edge from current_id that matches `rel` and leads to a node matching `target_node`
                 if let Some((next_id, edge_id)) = self.find_edge_and_node(current_id, &rel, &target_node) {
                     if let Some(var) = &rel.variable {
                         env.insert(var.clone(), GraphElement::Edge(edge_id));
                     }
                     if let Some(var) = &target_node.variable {
                         env.insert(var.clone(), GraphElement::Node(next_id));
                     }
                     current_id = next_id;
                 }
            }
        }
    }

    fn find_node(&self, pattern: &NodePattern) -> Option<usize> {
        let label_id = if let Some(l) = &pattern.label {
            let id = self.labels.get(l).copied();
            if id.is_none() {
                return None;
            }
            id
        } else {
            None
        };

        for (id, node) in self.nodes.iter().enumerate() {
            let mut matches = true;
            if let Some(lid) = label_id {
                if !node.labels.contains(&lid) {
                    matches = false;
                }
            }
            for (k, v) in &pattern.properties {
                if node.properties.get(k) != Some(v) {
                    matches = false;
                }
            }
            if matches {
                return Some(id);
            }
        }
        None
    }

    fn find_edge_and_node(&self, start: usize, rel_pattern: &RelPattern, target_node_pattern: &NodePattern) -> Option<(usize, usize)> {
        let start_node = &self.nodes[start];

        let rel_label_id = if let Some(l) = &rel_pattern.label {
            let id = self.labels.get(l).copied();
            if id.is_none() {
                return None;
            }
            id
        } else {
            None
        };

        let target_label_id = if let Some(l) = &target_node_pattern.label {
            let id = self.labels.get(l).copied();
            if id.is_none() {
                return None;
            }
            id
        } else {
            None
        };

        for &edge_id in &start_node.edges {
            let edge = &self.edges[edge_id];
            if edge.start == start {
                let mut edge_matches = true;
                if let Some(lid) = rel_label_id {
                    if !edge.labels.contains(&lid) {
                        edge_matches = false;
                    }
                }
                for (k, v) in &rel_pattern.properties {
                     if edge.properties.get(k) != Some(v) {
                         edge_matches = false;
                     }
                }

                if edge_matches {
                    let end_node_id = edge.end;
                    let end_node = &self.nodes[end_node_id];
                    let mut node_matches = true;
                    if let Some(lid) = target_label_id {
                         if !end_node.labels.contains(&lid) {
                             node_matches = false;
                         }
                    }
                    for (k, v) in &target_node_pattern.properties {
                        if end_node.properties.get(k) != Some(v) {
                            node_matches = false;
                        }
                    }

                    if node_matches {
                         return Some((end_node_id, edge_id));
                    }
                }
            }
        }

        None
    }
}
