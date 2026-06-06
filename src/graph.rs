use std::collections::HashMap;
use std::fs::File;
use std::io::Write;
use serde::{Serialize, Deserialize};

use crate::{
    edge::Edge,
    node::Node,
    parser::{parse_query, Clause, NodePattern, Path, RelPattern},
    planner::{PlanNode, QueryPlanner},
};

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
                    if let Some(plan) = QueryPlanner::plan_match(&paths, &self.labels) {
                        envs = self.execute_plan(&plan, &envs);
                    }
                    if envs.is_empty() {
                        // If MATCH yields no results, we abort further clauses and return empty
                        break;
                    }
                }
                Clause::Return(vars) => {
                    for env in &envs {
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

    pub fn execute_plan(&self, plan: &PlanNode, input_envs: &[Environment]) -> Vec<Environment> {
        match plan {
            PlanNode::FullNodeScan { pattern } => {
                let mut results = Vec::new();
                for env in input_envs {
                    // Check if the node is already bound in the current environment
                    if let Some(var) = &pattern.variable {
                        if let Some(GraphElement::Node(id)) = env.get(var) {
                            if self.node_matches(*id, pattern) {
                                results.push(env.clone());
                            }
                            continue;
                        }
                    }

                    // Otherwise, perform a full scan
                    for id in 0..self.nodes.len() {
                        if self.node_matches(id, pattern) {
                            let mut new_env = env.clone();
                            if let Some(var) = &pattern.variable {
                                new_env.insert(var.clone(), GraphElement::Node(id));
                            }
                            results.push(new_env);
                        }
                    }
                }
                results
            }
            PlanNode::NodeLookupByLabel { label_id, pattern } => {
                let mut results = Vec::new();
                for env in input_envs {
                    // Check if the node is already bound in the current environment
                    if let Some(var) = &pattern.variable {
                        if let Some(GraphElement::Node(id)) = env.get(var) {
                            if self.node_matches(*id, pattern) && self.nodes[*id].labels.contains(label_id) {
                                results.push(env.clone());
                            }
                            continue;
                        }
                    }

                    for id in 0..self.nodes.len() {
                        let node = &self.nodes[id];
                        if node.labels.contains(label_id) && self.node_matches(id, pattern) {
                            let mut new_env = env.clone();
                            if let Some(var) = &pattern.variable {
                                new_env.insert(var.clone(), GraphElement::Node(id));
                            }
                            results.push(new_env);
                        }
                    }
                }
                results
            }
            PlanNode::Expand { source, source_node_var, rel_pattern, target_pattern } => {
                let next_envs = self.execute_plan(source, input_envs);
                let mut results = Vec::new();

                for env in next_envs {
                    // Find the source node by variable name
                    if let Some(GraphElement::Node(node_id)) = env.get(source_node_var) {
                        let matches = self.find_edges_and_nodes_for_expand(*node_id, rel_pattern, target_pattern, &env);
                        for (next_node_id, edge_id) in matches {
                            let mut new_env = env.clone();
                            if let Some(var) = &rel_pattern.variable {
                                new_env.insert(var.clone(), GraphElement::Edge(edge_id));
                            }
                            if let Some(var) = &target_pattern.variable {
                                new_env.insert(var.clone(), GraphElement::Node(next_node_id));
                            }
                            results.push(new_env);
                        }
                    }
                }

                results
            }
            PlanNode::Intersect { left, right } => {
                // The right side shouldn't necessarily start from `input_envs` if it depends on `left_envs`.
                // However, the `Intersect` plan node combines two separate sub-plans (paths in the same MATCH clause).
                // It should evaluate `right` on the same `input_envs`, and then join `left_envs` and `right_envs`.
                // But this causes a Cartesian product of non-related environments.
                // It is better to pipe `left_envs` into `right` so that `right` can use bindings found by `left`.
                // Wait, if `right` is `plan_path` for the second path in `MATCH p1, p2`, it will start with a Scan.
                // If we pipe `left_envs` into `right`, the Scan node in `right` will check if its start variable
                // is already bound in `left_envs`! If so, it just filters. This is perfect and equivalent to a nested loop join.
                // So we just execute right with `left_envs` as input!
                // Let's refine: A `MATCH p1, p2` is logically just finding p1, then for each p1 find p2.
                // So `Intersect` could just be `self.execute_plan(right, &self.execute_plan(left, input_envs))`
                // BUT, wait. If they don't share variables, it naturally becomes a Cartesian product because the Scan in `right`
                // will duplicate each environment from `left_envs`.
                // Let's verify: Yes, if `right` starts with a Scan, and the start var is NOT in `left_envs`,
                // the Scan will append the new node to each env in `left_envs`. This handles both Join and Cross-Product!
                // Wait, if Intersect is evaluated this way, we don't even need an explicit Intersect operation that joins two lists.
                // We just pipe them.
                // However, since we defined `Intersect` with two children, and our planner makes `Intersect(Intersect(p1, p2), p3)`.
                // Let's just pipe it:
                let out_left_envs = self.execute_plan(left, input_envs);
                self.execute_plan(right, &out_left_envs)
            }
        }
    }

    fn find_edges_and_nodes_for_expand(
        &self,
        start_id: usize,
        rel_pattern: &RelPattern,
        target_node_pattern: &NodePattern,
        env: &Environment,
    ) -> Vec<(usize, usize)> {
        let mut matches = Vec::new();
        let start_node = &self.nodes[start_id];

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

            if edge.start == start_id {
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
