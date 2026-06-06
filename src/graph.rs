use std::collections::HashMap;
use std::fs::File;
use std::io::Write;
use serde::{Serialize, Deserialize};

use crate::{edge::Edge, node::Node, parser::{parse_query, Clause, NodePattern, Path, RelPattern}};

#[derive(Serialize, Deserialize, Debug)]
pub enum WalEntry {
    AddLabel { label: String },
    AddNode { label: usize, properties: HashMap<String, String> },
    AddEdge { start: usize, end: usize, labels: Vec<usize>, properties: HashMap<String, String> },
}

#[derive(Clone, Debug, PartialEq)]
pub enum GraphElement {
    Node(usize),
    Edge(usize),
    EdgeArray(Vec<usize>),
}

pub type Environment = HashMap<String, GraphElement>;

#[derive(Serialize, Deserialize)]
pub struct Graph {
    pub nodes: Vec<Node>,
    pub edges: Vec<Edge>,
    pub labels: HashMap<String, usize>,
    #[serde(skip)]
    pub wal_file: Option<File>,
}

use std::io::Read;

impl Graph {
    pub fn load_or_create(snapshot_path: &str, wal_path: &str) -> Self {
        let mut graph = if let Ok(mut snapshot_file) = File::open(snapshot_path) {
            let mut buffer = Vec::new();
            snapshot_file.read_to_end(&mut buffer).unwrap();
            let mut g: Graph = bincode::deserialize(&buffer).unwrap();
            g.wal_file = None;
            g
        } else {
            Self::new()
        };

        let mut needs_snapshot = false;

        if let Ok(mut wal_file) = File::open(wal_path) {
            if wal_file.metadata().map(|m| m.len()).unwrap_or(0) > 0 {
                needs_snapshot = true;
            }
            loop {
                let mut len_buf = [0u8; 4];
                if wal_file.read_exact(&mut len_buf).is_err() {
                    break;
                }
                let len = u32::from_le_bytes(len_buf) as usize;
                let mut entry_buf = vec![0u8; len];
                if wal_file.read_exact(&mut entry_buf).is_err() {
                    break;
                }

                let entry: WalEntry = bincode::deserialize(&entry_buf).unwrap();
                match entry {
                    WalEntry::AddLabel { label } => {
                        let id = graph.labels.len();
                        graph.labels.insert(label, id);
                    }
                    WalEntry::AddNode { label, properties } => {
                        let node = Node::new(vec![label], vec![], properties);
                        graph.nodes.push(node);
                    }
                    WalEntry::AddEdge { start, end, labels, properties } => {
                        let edge = Edge::new(labels, start, end, properties);
                        graph.edges.push(edge);
                        let edge_idx = graph.edges.len() - 1;
                        graph.nodes[start].edges.push(edge_idx);
                        graph.nodes[end].edges.push(edge_idx);
                    }
                }
                needs_snapshot = true;
            }
        } else {
            needs_snapshot = true; // No wal implies we probably don't have a snapshot, create it
        }

        if needs_snapshot {
            let encoded = bincode::serialize(&graph).unwrap();
            let tmp_path = format!("{}.tmp", snapshot_path);
            let mut snapshot_file = std::fs::OpenOptions::new()
                .create(true)
                .write(true)
                .truncate(true)
                .open(&tmp_path)
                .unwrap();
            snapshot_file.write_all(&encoded).unwrap();
            snapshot_file.sync_data().unwrap();
            std::fs::rename(&tmp_path, snapshot_path).unwrap();
        }

        // If we created a new snapshot, truncate WAL to restart it
        if needs_snapshot {
            let wal_file = std::fs::OpenOptions::new()
                .create(true)
                .write(true)
                .truncate(true)
                .open(wal_path)
                .unwrap();
            wal_file.sync_data().unwrap();
        }

        graph.wal_file = Some(std::fs::OpenOptions::new()
            .create(true)
            .append(true)
            .open(wal_path)
            .unwrap());

        graph
    }

    pub fn new() -> Self {
        Self {
            nodes: Vec::new(),
            edges: Vec::new(),
            labels: HashMap::new(),
            wal_file: None,
        }
    }

    fn log_wal(&mut self, entry: &WalEntry) {
        if let Some(file) = &mut self.wal_file {
            let encoded = bincode::serialize(entry).unwrap();
            let len = encoded.len() as u32;
            file.write_all(&len.to_le_bytes()).unwrap();
            file.write_all(&encoded).unwrap();
            file.sync_data().unwrap();
        }
    }

    pub fn get_or_add_label(&mut self, label: &str) -> usize {
        if let Some(&id) = self.labels.get(label) {
            id
        } else {
            let id = self.labels.len();
            self.labels.insert(label.to_string(), id);
            self.log_wal(&WalEntry::AddLabel { label: label.to_string() });
            id
        }
    }

    pub fn add_node(&mut self, label: usize, properties: HashMap<String, String>) -> usize {
        let node = Node::new(vec![label], vec![], properties.clone());
        self.nodes.push(node);
        self.log_wal(&WalEntry::AddNode { label, properties });
        self.nodes.len() - 1
    }

    pub fn add_edge(&mut self, start: usize, end: usize, labels: Vec<usize>, properties: HashMap<String, String>) -> usize {
        let edge = Edge::new(labels.clone(), start, end, properties.clone());
        self.edges.push(edge);
        let edge_idx = self.edges.len() - 1;
        self.nodes[start].edges.push(edge_idx);
        self.nodes[end].edges.push(edge_idx);
        self.log_wal(&WalEntry::AddEdge { start, end, labels, properties });
        edge_idx
    }

    pub fn execute(&mut self, query_str: &str) -> Result<String, String> {
        let (_, query) = parse_query(query_str).map_err(|e| format!("Parse error: {}", e))?;

        let mut output = String::new();
        // A single environment initially, representing the "root" row.
        let mut envs: Vec<Environment> = vec![HashMap::new()];

        for clause in query.clauses {
            match clause {
                Clause::Create(paths) => {
                    for path in paths {
                        for env in &mut envs {
                            self.execute_create_path(path.clone(), env);
                        }
                    }
                }
                Clause::Match(paths) => {
                    for path in paths {
                        let mut new_envs = Vec::new();
                        for env in envs {
                            let matches = self.execute_match_path(&path, &env);
                            new_envs.extend(matches);
                        }
                        envs = new_envs;
                        if envs.is_empty() {
                            // If MATCH yields no results, we abort further clauses and return empty
                            break;
                        }
                    }
                }
                Clause::Return(vars, limit) => {
                    let iter = match limit {
                        Some(l) => envs.iter().take(l),
                        None => envs.iter().take(envs.len()),
                    };
                    for env in iter {
                        for var in &vars {
                            if let Some(element) = env.get(var) {
                                match element {
                                    GraphElement::Node(node_id) => {
                                        let node = &self.nodes[*node_id];
                                        output.push_str(&format!("{}: {:?}\n", var, node));
                                    }
                                    GraphElement::Edge(edge_id) => {
                                        let edge = &self.edges[*edge_id];
                                        output.push_str(&format!("{}: {:?}\n", var, edge));
                                    }
                                    GraphElement::EdgeArray(edge_ids) => {
                                        let edges: Vec<_> = edge_ids.iter().map(|&id| &self.edges[id]).collect();
                                        output.push_str(&format!("{}: {:?}\n", var, edges));
                                    }
                                }
                            } else {
                                output.push_str(&format!("{}: null\n", var));
                            }
                        }
                        output.push_str("---\n");
                    }
                    // Typically RETURN is the last clause, we can clear envs if we want,
                    // but we just let it finish.
                }
            }
        }

        // Clean up output formatting if it ends with "---"
        let mut final_output = output;
        if final_output.ends_with("---\n") {
            final_output.truncate(final_output.len() - 4);
        }

        Ok(final_output)
    }

    fn execute_create_path(&mut self, path: Path, env: &mut Environment) {
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

    fn create_node(&mut self, pattern: &NodePattern, env: &mut Environment) -> usize {
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

    fn execute_match_path(&self, path: &Path, env: &Environment) -> Vec<Environment> {
        let mut result_envs = Vec::new();

        let start_nodes = self.find_nodes(&path.start, env);
        for start_id in start_nodes {
            let mut current_env = env.clone();
            if let Some(var) = &path.start.variable {
                current_env.insert(var.clone(), GraphElement::Node(start_id));
            }

            self.match_edges_recursive(&path.edges, 0, start_id, current_env, &mut result_envs);
        }

        result_envs
    }

    fn match_edges_recursive(
        &self,
        edges: &[(RelPattern, NodePattern)],
        edge_idx: usize,
        current_node_id: usize,
        current_env: Environment,
        results: &mut Vec<Environment>,
    ) {
        if edge_idx >= edges.len() {
            results.push(current_env);
            return;
        }

        let (rel_pattern, target_node_pattern) = &edges[edge_idx];

        if let Some((min_len, max_len)) = rel_pattern.length {
            if min_len != 1 || max_len != Some(1) {
                self.match_var_length_edges(
                    edges,
                    edge_idx,
                    current_node_id,
                    current_env,
                    results,
                    min_len,
                    max_len,
                    0,
                    Vec::new(),
                );
                return;
            }
        }

        let matches = self.find_edges_and_nodes(current_node_id, rel_pattern, target_node_pattern, &current_env);

        for (next_node_id, edge_id) in matches {
            let mut new_env = current_env.clone();
            if let Some(var) = &rel_pattern.variable {
                new_env.insert(var.clone(), GraphElement::Edge(edge_id));
            }
            if let Some(var) = &target_node_pattern.variable {
                new_env.insert(var.clone(), GraphElement::Node(next_node_id));
            }
            self.match_edges_recursive(edges, edge_idx + 1, next_node_id, new_env, results);
        }
    }

    #[allow(clippy::too_many_arguments)]
    fn match_var_length_edges(
        &self,
        edges: &[(RelPattern, NodePattern)],
        edge_idx: usize,
        current_node_id: usize,
        current_env: Environment,
        results: &mut Vec<Environment>,
        min_len: usize,
        max_len: Option<usize>,
        current_depth: usize,
        path_edges: Vec<usize>,
    ) {
        let (rel_pattern, target_node_pattern) = &edges[edge_idx];

        if current_depth >= min_len {
            let target_bound_id = if let Some(var) = &target_node_pattern.variable {
                if let Some(GraphElement::Node(id)) = current_env.get(var) {
                    Some(*id)
                } else {
                    None
                }
            } else {
                None
            };

            let matches_target = if let Some(bound_id) = target_bound_id {
                current_node_id == bound_id
            } else {
                true
            } && self.node_matches(current_node_id, target_node_pattern);

            if matches_target {
                let mut new_env = current_env.clone();
                if let Some(var) = &rel_pattern.variable {
                    new_env.insert(var.clone(), GraphElement::EdgeArray(path_edges.clone()));
                }
                if let Some(var) = &target_node_pattern.variable {
                    new_env.insert(var.clone(), GraphElement::Node(current_node_id));
                }
                self.match_edges_recursive(edges, edge_idx + 1, current_node_id, new_env, results);
            }
        }

        if let Some(max) = max_len {
            if current_depth >= max {
                return;
            }
        }

        let start_node = &self.nodes[current_node_id];

        for &edge_id in &start_node.edges {
            let edge = &self.edges[edge_id];

            if edge.start == current_node_id {
                if path_edges.contains(&edge_id) {
                    continue;
                }

                if !self.edge_matches(edge_id, rel_pattern) {
                    continue;
                }

                let end_node_id = edge.end;

                let mut new_path_edges = path_edges.clone();
                new_path_edges.push(edge_id);

                self.match_var_length_edges(
                    edges,
                    edge_idx,
                    end_node_id,
                    current_env.clone(),
                    results,
                    min_len,
                    max_len,
                    current_depth + 1,
                    new_path_edges,
                );
            }
        }
    }

    fn find_nodes(&self, pattern: &NodePattern, env: &Environment) -> Vec<usize> {
        // If node is already bound in env, return just that node if it matches the pattern
        if let Some(var) = &pattern.variable {
            if let Some(GraphElement::Node(id)) = env.get(var) {
                if self.node_matches(*id, pattern) {
                    return vec![*id];
                } else {
                    return vec![];
                }
            }
        }

        let mut matched_nodes = Vec::new();
        for id in 0..self.nodes.len() {
            if self.node_matches(id, pattern) {
                matched_nodes.push(id);
            }
        }
        matched_nodes
    }

    fn node_matches(&self, node_id: usize, pattern: &NodePattern) -> bool {
        let node = &self.nodes[node_id];

        let label_id = if let Some(l) = &pattern.label {
            if let Some(id) = self.labels.get(l) {
                Some(*id)
            } else {
                return false; // label not even in graph
            }
        } else {
            None
        };

        if let Some(lid) = label_id {
            if !node.labels.contains(&lid) {
                return false;
            }
        }

        for (k, v) in &pattern.properties {
            if node.properties.get(k) != Some(v) {
                return false;
            }
        }

        true
    }

    fn find_edges_and_nodes(
        &self,
        start_id: usize,
        rel_pattern: &RelPattern,
        target_node_pattern: &NodePattern,
        env: &Environment,
    ) -> Vec<(usize, usize)> {
        let mut matches = Vec::new();
        let start_node = &self.nodes[start_id];

        // Pre-check if target is bound
        let target_bound_id = if let Some(var) = &target_node_pattern.variable {
            if let Some(GraphElement::Node(id)) = env.get(var) {
                Some(*id)
            } else {
                None
            }
        } else {
            None
        };

        for &edge_id in &start_node.edges {
            let edge = &self.edges[edge_id];

            // Only consider outgoing edges from start_id
            if edge.start == start_id {
                // If edge variable is bound, ensure it's the same edge
                if let Some(var) = &rel_pattern.variable {
                    if let Some(GraphElement::Edge(eid)) = env.get(var) {
                        if *eid != edge_id {
                            continue;
                        }
                    }
                }

                if !self.edge_matches(edge_id, rel_pattern) {
                    continue;
                }

                let end_node_id = edge.end;

                if let Some(bound_target) = target_bound_id {
                    if end_node_id != bound_target {
                        continue;
                    }
                }

                if self.node_matches(end_node_id, target_node_pattern) {
                    matches.push((end_node_id, edge_id));
                }
            }
        }

        matches
    }

    fn edge_matches(&self, edge_id: usize, pattern: &RelPattern) -> bool {
        let edge = &self.edges[edge_id];

        let label_id = if let Some(l) = &pattern.label {
            if let Some(id) = self.labels.get(l) {
                Some(*id)
            } else {
                return false;
            }
        } else {
            None
        };

        if let Some(lid) = label_id {
            if !edge.labels.contains(&lid) {
                return false;
            }
        }

        for (k, v) in &pattern.properties {
            if edge.properties.get(k) != Some(v) {
                return false;
            }
        }

        true
    }
}
