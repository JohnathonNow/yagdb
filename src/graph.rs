use serde::{Deserialize, Serialize};
use serde_json::{json, Value};
use std::collections::HashMap;
#[cfg(not(target_arch = "wasm32"))]
use std::fs::File;
#[cfg(not(target_arch = "wasm32"))]
use std::io::Seek;
#[cfg(not(target_arch = "wasm32"))]
use std::io::Write;
use rand::Rng;

use crate::planner::{ExecutionStep, PlanNode, QueryPlanner};
use crate::{
    edge::Edge,
    node::Node,
    parser::{
        parse_query, CompareOp, Condition, Expression, NodePattern, Path, ProjectionItem,
        RelPattern,
    },
};

#[derive(Serialize, Deserialize, Debug)]
pub enum WalEntry {
    AddLabel {
        label: String,
    },
    AddNode {
        id: String,
        label: usize,
        properties: HashMap<String, crate::property::PropertyValue>,
    },
    AddEdge {
        id: String,
        start: usize,
        end: usize,
        labels: Vec<usize>,
        properties: HashMap<String, crate::property::PropertyValue>,
    },
    CreateIndex {
        label: usize,
        property: String,
    },
    SetNodeProperty {
        node_id: usize,
        key: String,
        value: crate::property::PropertyValue,
    },
    DeleteNode { node_id: usize },
    DeleteEdge { edge_id: usize },
}

#[derive(Clone, Debug, PartialEq)]
pub enum GraphElement {
    Node(usize),
    Edge(usize),
    EdgeArray(Vec<usize>),
    Path(Vec<GraphElement>),
    List(Vec<GraphElement>),
    Number(f64),
}

pub type Environment = HashMap<String, GraphElement>;

#[derive(Serialize, Deserialize)]
pub struct Graph {
    pub nodes: Vec<Node>,
    pub edges: Vec<Edge>,
    pub labels: HashMap<String, usize>,
    pub indices:
        HashMap<usize, HashMap<String, HashMap<crate::property::PropertyValue, Vec<usize>>>>,
    #[serde(skip)]
    #[cfg(not(target_arch = "wasm32"))]
    pub wal_file: Option<File>,
}

#[cfg(not(target_arch = "wasm32"))]
use std::io::Read;

impl Graph {
    #[cfg(not(target_arch = "wasm32"))]
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
                    WalEntry::AddNode { id, label, properties } => {
                        let node = Node::new(id.clone(), vec![label], vec![], properties.clone());
                        graph.nodes.push(node);
                        let node_id = graph.nodes.len() - 1;

                        // Update indices if any apply
                        if let Some(label_indices) = graph.indices.get_mut(&label) {
                            for (prop_key, prop_index) in label_indices.iter_mut() {
                                if let Some(prop_val) = properties.get(prop_key) {
                                    prop_index
                                        .entry(prop_val.clone())
                                        .or_insert_with(Vec::new)
                                        .push(node_id);
                                }
                            }
                        }
                    }
                    WalEntry::AddEdge {
                        id,
                        start,
                        end,
                        labels,
                        properties,
                    } => {
                        let edge = Edge::new(id.clone(), labels, start, end, properties);
                        graph.edges.push(edge);
                        let edge_idx = graph.edges.len() - 1;
                        graph.nodes[start].edges.push(edge_idx);
                        graph.nodes[end].edges.push(edge_idx);
                    }
                    WalEntry::CreateIndex { label, property } => {
                        graph.create_index_internal(label, property);
                    }
                    WalEntry::SetNodeProperty {
                        node_id,
                        key,
                        value,
                    } => {
                        let old_value = graph.nodes[node_id]
                            .properties
                            .insert(key.clone(), value.clone());
                        for (label_id, label_indices) in graph.indices.iter_mut() {
                            if graph.nodes[node_id].labels.contains(label_id) {
                                if let Some(prop_index) = label_indices.get_mut(&key) {
                                    // Remove from old index
                                    if let Some(old_val) = &old_value {
                                        if let Some(vec) = prop_index.get_mut(old_val) {
                                            vec.retain(|&id| id != node_id);
                                        }
                                    }
                                    // Add to new index if not already present
                                    let entry_vec =
                                        prop_index.entry(value.clone()).or_insert_with(Vec::new);
                                    if !entry_vec.contains(&node_id) {
                                        entry_vec.push(node_id);
                                    }
                                }
                            }
                        }
                    }
                    WalEntry::DeleteNode { node_id } => {
                        graph.nodes[node_id].deleted = true;
                        for (label_id, label_indices) in graph.indices.iter_mut() {
                            if graph.nodes[node_id].labels.contains(label_id) {
                                for (_, prop_index) in label_indices.iter_mut() {
                                    for (_, vec) in prop_index.iter_mut() {
                                        vec.retain(|&id| id != node_id);
                                    }
                                }
                            }
                        }
                    }
                    WalEntry::DeleteEdge { edge_id } => {
                        graph.edges[edge_id].deleted = true;
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

        graph.wal_file = Some(
            std::fs::OpenOptions::new()
                .create(true)
                .append(true)
                .open(wal_path)
                .unwrap(),
        );

        graph
    }

    pub fn element_to_json(&self, element: &GraphElement) -> Value {
        match element {
            GraphElement::Node(node_id) => {
                let node = &self.nodes[*node_id];
                let mut map = serde_json::Map::new();
                map.insert(
                    "labels".to_string(),
                    serde_json::to_value(&node.labels).unwrap(),
                );
                map.insert(
                    "edges".to_string(),
                    serde_json::to_value(&node.edges).unwrap(),
                );
                let mut props = serde_json::Map::new();
                for (k, v) in &node.properties {
                    props.insert(k.clone(), v.to_json_value());
                }
                map.insert("properties".to_string(), Value::Object(props));
                Value::Object(map)
            }
            GraphElement::Edge(edge_id) => {
                let edge = &self.edges[*edge_id];
                let mut map = serde_json::Map::new();
                map.insert(
                    "labels".to_string(),
                    serde_json::to_value(&edge.labels).unwrap(),
                );
                map.insert(
                    "start".to_string(),
                    serde_json::to_value(edge.start).unwrap(),
                );
                map.insert("end".to_string(), serde_json::to_value(edge.end).unwrap());
                let mut props = serde_json::Map::new();
                for (k, v) in &edge.properties {
                    props.insert(k.clone(), v.to_json_value());
                }
                map.insert("properties".to_string(), Value::Object(props));
                Value::Object(map)
            }
            GraphElement::EdgeArray(edge_ids) => {
                let edges_val: Vec<_> = edge_ids
                    .iter()
                    .map(|&id| self.element_to_json(&GraphElement::Edge(id)))
                    .collect();
                serde_json::to_value(&edges_val).unwrap()
            }
            GraphElement::Path(elements) => {
                let path_out: Vec<Value> =
                    elements.iter().map(|el| self.element_to_json(el)).collect();
                serde_json::to_value(&path_out).unwrap()
            }
            GraphElement::List(elements) => {
                let list_out: Vec<Value> =
                    elements.iter().map(|el| self.element_to_json(el)).collect();
                serde_json::to_value(&list_out).unwrap()
            }
            GraphElement::Number(n) => json!(n),
        }
    }

    pub fn format_element(&self, element: &GraphElement) -> String {
        match element {
            GraphElement::Node(node_id) => format!("{:?}", self.nodes[*node_id]),
            GraphElement::Edge(edge_id) => format!("{:?}", self.edges[*edge_id]),
            GraphElement::EdgeArray(edge_ids) => {
                let edges: Vec<_> = edge_ids.iter().map(|&id| &self.edges[id]).collect();
                format!("{:?}", edges)
            }
            GraphElement::Path(elements) => {
                let mut path_out = Vec::new();
                for el in elements {
                    path_out.push(self.format_element(el));
                }
                format!("[{}]", path_out.join(", "))
            }
            GraphElement::List(elements) => {
                let mut list_out = Vec::new();
                for el in elements {
                    list_out.push(self.format_element(el));
                }
                format!("[{}]", list_out.join(", "))
            }
            GraphElement::Number(n) => format!("{}", n),
        }
    }

    pub fn new() -> Self {
        Self {
            nodes: Vec::new(),
            edges: Vec::new(),
            labels: HashMap::new(),
            indices: HashMap::new(),
            #[cfg(not(target_arch = "wasm32"))]
            wal_file: None,
        }
    }

    pub fn clear(&mut self) {
        self.nodes.clear();
        self.edges.clear();
        self.labels.clear();
        self.indices.clear();
        #[cfg(not(target_arch = "wasm32"))]
        if let Some(file) = &mut self.wal_file {
            let _ = file.set_len(0);
            let _ = file.rewind();
        }
    }

    #[cfg(not(target_arch = "wasm32"))]
    fn log_wal(&mut self, entry: &WalEntry) {
        if let Some(file) = &mut self.wal_file {
            let encoded = bincode::serialize(entry).unwrap();
            let len = encoded.len() as u32;
            file.write_all(&len.to_le_bytes()).unwrap();
            file.write_all(&encoded).unwrap();
            file.sync_data().unwrap();
        }
    }

    #[cfg(target_arch = "wasm32")]
    fn log_wal(&mut self, _entry: &WalEntry) {}

    pub fn get_or_add_label(&mut self, label: &str) -> usize {
        if let Some(&id) = self.labels.get(label) {
            id
        } else {
            let id = self.labels.len();
            self.labels.insert(label.to_string(), id);
            self.log_wal(&WalEntry::AddLabel {
                label: label.to_string(),
            });
            id
        }
    }

    pub fn add_node(
        &mut self,
        label: usize,
        properties: HashMap<String, crate::property::PropertyValue>,
    ) -> usize {
        let id = uuid::Uuid::new_v4().to_string();
        let node = Node::new(id.clone(), vec![label], vec![], properties.clone());
        self.nodes.push(node);
        let node_id = self.nodes.len() - 1;

        // Update indices if any apply
        if let Some(label_indices) = self.indices.get_mut(&label) {
            for (prop_key, prop_index) in label_indices.iter_mut() {
                if let Some(prop_val) = properties.get(prop_key) {
                    prop_index
                        .entry(prop_val.clone())
                        .or_insert_with(Vec::new)
                        .push(node_id);
                }
            }
        }

        self.log_wal(&WalEntry::AddNode { id, label, properties });
        node_id
    }

    pub fn create_index(&mut self, label: usize, property: String) {
        self.create_index_internal(label, property.clone());
        self.log_wal(&WalEntry::CreateIndex { label, property });
    }

    fn create_index_internal(&mut self, label: usize, property: String) {
        if !self.indices.contains_key(&label) {
            self.indices.insert(label, HashMap::new());
        }
        let label_indices = self.indices.get_mut(&label).unwrap();
        if !label_indices.contains_key(&property) {
            label_indices.insert(property.clone(), HashMap::new());
        }
        let property_index = label_indices.get_mut(&property).unwrap();

        // Populate index with existing nodes
        for (node_id, node) in self.nodes.iter().enumerate() {
            if node.labels.contains(&label) {
                if let Some(value) = node.properties.get(&property) {
                    property_index
                        .entry(value.clone())
                        .or_insert_with(Vec::new)
                        .push(node_id);
                }
            }
        }
    }

    pub fn add_edge(
        &mut self,
        start: usize,
        end: usize,
        labels: Vec<usize>,
        properties: HashMap<String, crate::property::PropertyValue>,
    ) -> usize {
        let id = uuid::Uuid::new_v4().to_string();
        let edge = Edge::new(id.clone(), labels.clone(), start, end, properties.clone());
        self.edges.push(edge);
        let edge_idx = self.edges.len() - 1;
        self.nodes[start].edges.push(edge_idx);
        self.nodes[end].edges.push(edge_idx);
        self.log_wal(&WalEntry::AddEdge {
            id,
            start,
            end,
            labels,
            properties,
        });
        edge_idx
    }

    pub fn execute(&mut self, query_str: &str) -> Result<String, String> {
        let (_, query) = parse_query(query_str).map_err(|e| format!("Parse error: {}", e))?;

        let mut output = String::new();
        let mut profile_out = if query.profile {
            Some(String::new())
        } else {
            None
        };

        // A single environment initially, representing the "root" row.
        let mut envs: Vec<Environment> = vec![HashMap::new()];

        let plan = QueryPlanner::plan_query(query, &self.labels, &self.indices);

        for step in plan.steps {
            match step {
                ExecutionStep::Create(paths) => {
                    for path in paths {
                        for env in &mut envs {
                            self.execute_create_path(path.clone(), env);
                        }
                    }
                }
                ExecutionStep::Match(plan_opt, paths, condition_opt) => {
                    if let Some(plan) = plan_opt {
                        let mut new_envs = Vec::new();
                        for env in envs {
                            let matches = self.execute_plan_and_bind_paths(
                                &plan,
                                &paths,
                                &env,
                                &mut profile_out,
                            );
                            new_envs.extend(matches);
                        }
                        envs = new_envs;
                        if envs.is_empty() {
                            break;
                        }
                        if let Some(cond) = condition_opt {
                            envs.retain(|env| self.evaluate_condition(&cond, env));
                        }
                    }
                }
                ExecutionStep::Merge(planned_paths) => {
                    for (plan_opt, path) in planned_paths {
                        let mut new_envs = Vec::new();
                        for env in envs {
                            if let Some(plan) = &plan_opt {
                                let matches = self.execute_plan_and_bind_paths(
                                    plan,
                                    &[path.clone()],
                                    &env,
                                    &mut profile_out,
                                );
                                if !matches.is_empty() {
                                    new_envs.extend(matches);
                                } else {
                                    let mut create_env = env.clone();
                                    self.execute_create_path(path.clone(), &mut create_env);
                                    new_envs.push(create_env);
                                }
                            } else {
                                let mut create_env = env.clone();
                                self.execute_create_path(path.clone(), &mut create_env);
                                new_envs.push(create_env);
                            }
                        }
                        envs = new_envs;
                    }
                }
                ExecutionStep::Set(var, key, value) => {
                    let mut updated_nodes = std::collections::HashSet::new();
                    for env in &envs {
                        if let Some(GraphElement::Node(node_id)) = env.get(&var) {
                            let node_id = *node_id;
                            if updated_nodes.insert(node_id) {
                                let old_value = self.nodes[node_id]
                                    .properties
                                    .insert(key.clone(), value.clone());

                                // Update indices if necessary
                                for (label_id, label_indices) in self.indices.iter_mut() {
                                    if self.nodes[node_id].labels.contains(label_id) {
                                        if let Some(prop_index) = label_indices.get_mut(&key) {
                                            // Remove from old index
                                            if let Some(old_val) = &old_value {
                                                if let Some(vec) = prop_index.get_mut(old_val) {
                                                    vec.retain(|&id| id != node_id);
                                                }
                                            }
                                            // Add to new index
                                            let entry_vec = prop_index
                                                .entry(value.clone())
                                                .or_insert_with(Vec::new);
                                            if !entry_vec.contains(&node_id) {
                                                entry_vec.push(node_id);
                                            }
                                        }
                                    }
                                }

                                self.log_wal(&WalEntry::SetNodeProperty {
                                    node_id,
                                    key: key.clone(),
                                    value: value.clone(),
                                });
                            }
                        }
                    }
                }
                ExecutionStep::Delete(vars) => {
                    let mut nodes_to_delete = Vec::new();
                    let mut edges_to_delete = Vec::new();
                    for var in &vars {
                        for env in &envs {
                            if let Some(GraphElement::Node(node_id)) = env.get(var) {
                                if !nodes_to_delete.contains(node_id) {
                                    nodes_to_delete.push(*node_id);
                                }
                            } else if let Some(GraphElement::Edge(edge_id)) = env.get(var) {
                                if !edges_to_delete.contains(edge_id) {
                                    edges_to_delete.push(*edge_id);
                                }
                            }
                        }
                    }

                    for &edge_id in &edges_to_delete {
                        if !self.edges[edge_id].deleted {
                            self.edges[edge_id].deleted = true;
                            self.log_wal(&WalEntry::DeleteEdge { edge_id });
                        }
                    }

                    for &node_id in &nodes_to_delete {
                        if !self.nodes[node_id].deleted {
                            self.nodes[node_id].deleted = true;
                            for (label_id, label_indices) in self.indices.iter_mut() {
                                if self.nodes[node_id].labels.contains(label_id) {
                                    for (_, prop_index) in label_indices.iter_mut() {
                                        for (_, vec) in prop_index.iter_mut() {
                                            vec.retain(|&id| id != node_id);
                                        }
                                    }
                                }
                            }
                            self.log_wal(&WalEntry::DeleteNode { node_id });
                        }
                    }
                }
                ExecutionStep::Unwind(ref items) => {
                    let mut final_envs: Vec<Environment> = Vec::new();
                    for env in &envs {
                        for item in items.iter() {
                            match item {
                                ProjectionItem::Variable(var) => {
                                    if let Some(val) = env.get(var) {
                                        match val {
                                            GraphElement::List(v) => {
                                                for x in v {
                                                    let mut new_env = env.clone();
                                                    new_env.insert(var.clone(), x.clone());
                                                    final_envs.push(new_env);
                                                }
                                            }
                                            _ => {}
                                        }
                                    }
                                }
                                _ => {}
                            }
                        }
                    }
                    envs = final_envs;
                }
                ExecutionStep::With(ref items, ref order_by_opt) | ExecutionStep::Return(ref items, ref order_by_opt, _) => {
                    let mut is_return = false;
                    let mut limit = None;
                    if let ExecutionStep::Return(_, _, l) = &step {
                        is_return = true;
                        limit = *l;
                    }

                    // Handle Star conversion
                    let items: Vec<ProjectionItem> =
                        if items.len() == 1 && matches!(items[0], ProjectionItem::Star) {
                            if let Some(first_env) = envs.first() {
                                let mut keys: Vec<String> = first_env
                                    .keys()
                                    .filter(|k| !k.starts_with("_anon_"))
                                    .cloned()
                                    .collect();
                                keys.sort();
                                keys.into_iter().map(ProjectionItem::Variable).collect()
                            } else {
                                Vec::new()
                            }
                        } else {
                            items.clone()
                        };

                    let mut has_aggregate = false;
                    let mut grouping_keys = Vec::new();

                    for item in &items {
                        match item {
                            ProjectionItem::Aggregate { .. } => has_aggregate = true,
                            ProjectionItem::Variable(var) => grouping_keys.push(var.clone()),
                            ProjectionItem::AliasedVariable(var, _) => {
                                grouping_keys.push(var.clone())
                            }
                            ProjectionItem::Function { .. } => {
                                // Function without aggregate isn't an aggregate grouping key directly
                            }
                            ProjectionItem::Star => {} // Already handled above
                        }
                    }

                    let mut final_envs: Vec<Environment> = Vec::new();

                    if has_aggregate {
                        let mut groups: Vec<(Vec<Option<GraphElement>>, Vec<Environment>)> =
                            Vec::new();

                        for env in std::mem::take(&mut envs) {
                            let key: Vec<Option<GraphElement>> =
                                grouping_keys.iter().map(|k| env.get(k).cloned()).collect();

                            if let Some((_, group_envs)) =
                                groups.iter_mut().find(|(k, _)| *k == key)
                            {
                                group_envs.push(env);
                            } else {
                                groups.push((key, vec![env]));
                            }
                        }

                        // Compute aggregates per group
                        for (_group_key, group_envs) in groups {
                            let mut grouped_env = HashMap::new();
                            for item in &items {
                                match item {
                                    ProjectionItem::Variable(var) => {
                                        if let Some(val) =
                                            group_envs.first().and_then(|e| e.get(var))
                                        {
                                            grouped_env.insert(var.clone(), val.clone());
                                        }
                                    }
                                    ProjectionItem::AliasedVariable(var, alias) => {
                                        if let Some(val) =
                                            group_envs.first().and_then(|e| e.get(var))
                                        {
                                            grouped_env.insert(alias.clone(), val.clone());
                                        }
                                    }
                                    ProjectionItem::Aggregate { func, var, alias } => {
                                        let out_key = alias
                                            .clone()
                                            .unwrap_or_else(|| format!("{}({})", func, var));

                                        match func.as_str() {
                                            "COUNT" => {
                                                let count = if var == "*" {
                                                    group_envs.len()
                                                } else {
                                                    group_envs
                                                        .iter()
                                                        .filter(|e| e.contains_key(var))
                                                        .count()
                                                };
                                                grouped_env.insert(
                                                    out_key,
                                                    GraphElement::Number(count as f64),
                                                );
                                            }
                                            "COLLECT" => {
                                                let mut elements = Vec::new();
                                                for e in &group_envs {
                                                    if let Some(val) = e.get(var) {
                                                        elements.push(val.clone());
                                                    }
                                                }
                                                grouped_env
                                                    .insert(out_key, GraphElement::List(elements));
                                            }
                                            "UNIQUE" => {
                                                let mut elements = Vec::new();
                                                for e in &group_envs {
                                                    if let Some(val) = e.get(var) {
                                                        if !elements.contains(val) {
                                                            elements.push(val.clone());
                                                        }
                                                    }
                                                }
                                                grouped_env
                                                    .insert(out_key, GraphElement::List(elements));
                                            }
                                            _ => {}
                                        }
                                    }
                                    ProjectionItem::Function { func, args: _, alias } => {
                                        let out_key = alias
                                            .clone()
                                            .unwrap_or_else(|| format!("{}()", func));
                                        if func.eq_ignore_ascii_case("rand") {
                                            grouped_env.insert(out_key, GraphElement::Number(rand::thread_rng().gen::<f64>()));
                                        }
                                    }
                                    ProjectionItem::Star => {}
                                }
                            }
                            final_envs.push(grouped_env);
                        }
                    } else {
                        // Simple projection without aggregation
                        for env in std::mem::take(&mut envs) {
                            let mut projected_env = HashMap::new();
                            for item in &items {
                                match item {
                                    ProjectionItem::Variable(var) => {
                                        if let Some(val) = env.get(var).cloned() {
                                            projected_env.insert(var.clone(), val);
                                        }
                                    }
                                    ProjectionItem::AliasedVariable(var, alias) => {
                                        if let Some(val) = env.get(var).cloned() {
                                            projected_env.insert(alias.clone(), val);
                                        }
                                    }
                                    ProjectionItem::Function { func, args: _, alias } => {
                                        let out_key = alias
                                            .clone()
                                            .unwrap_or_else(|| format!("{}()", func));
                                        if func.eq_ignore_ascii_case("rand") {
                                            projected_env.insert(out_key, GraphElement::Number(rand::thread_rng().gen::<f64>()));
                                        }
                                    }
                                    _ => {}
                                }
                            }
                            final_envs.push(projected_env);
                        }
                    }

                    if let Some(order_items) = order_by_opt {
                        let mut env_with_keys: Vec<(Vec<EvalValue>, Environment)> = final_envs.into_iter().map(|env| {
                            let keys = order_items.iter().map(|item| {
                                self.evaluate_expression(&item.expr, &env)
                            }).collect();
                            (keys, env)
                        }).collect();

                        env_with_keys.sort_by(|a, b| {
                            for (idx, item) in order_items.iter().enumerate() {
                                let key_a = &a.0[idx];
                                let key_b = &b.0[idx];
                                let mut cmp = key_a.partial_cmp(key_b).unwrap_or(std::cmp::Ordering::Equal);
                                if !item.asc {
                                    cmp = cmp.reverse();
                                }
                                if cmp != std::cmp::Ordering::Equal {
                                    return cmp;
                                }
                            }
                            std::cmp::Ordering::Equal
                        });

                        final_envs = env_with_keys.into_iter().map(|(_, env)| env).collect();
                    }

                    if is_return {
                        let len = final_envs.len();
                        let iter = match limit {
                            Some(l) => final_envs.into_iter().take(l),
                            None => final_envs.into_iter().take(len),
                        };
                        let mut results_json = Vec::new();
                        for env in iter {
                            let mut row = serde_json::Map::new();
                            for item in &items {
                                let key = match item {
                                    ProjectionItem::Variable(var) => var.clone(),
                                    ProjectionItem::AliasedVariable(_, alias) => alias.clone(),
                                    ProjectionItem::Aggregate { func, var, alias } => alias
                                        .clone()
                                        .unwrap_or_else(|| format!("{}({})", func, var)),
                                    ProjectionItem::Function { func, args: _, alias } => alias
                                        .clone()
                                        .unwrap_or_else(|| format!("{}()", func)),
                                    ProjectionItem::Star => continue,
                                };
                                if let Some(element) = env.get(&key) {
                                    row.insert(key, self.element_to_json(element));
                                } else {
                                    row.insert(key, Value::Null);
                                }
                            }
                            if !row.is_empty() {
                                results_json.push(Value::Object(row));
                            }
                        }
                        if !results_json.is_empty() {
                            output = serde_json::to_string_pretty(&results_json).unwrap();
                        }
                    } else {
                        // WITH clause
                        envs = final_envs;
                    }
                }
                ExecutionStep::CreateIndex { label, property } => {
                    let label_id = self.get_or_add_label(&label);
                    self.create_index(label_id, property);
                }
            }
        }

        if let Some(prof) = profile_out {
            let results: Value = if output.is_empty() {
                json!([])
            } else {
                serde_json::from_str(&output).unwrap_or_else(|_| json!([]))
            };
            Ok(serde_json::to_string_pretty(&json!({
                "profile": prof,
                "results": results
            }))
            .unwrap())
        } else {
            if output.is_empty() {
                Ok("[]".to_string())
            } else {
                Ok(output)
            }
        }
    }

    fn execute_create_path(&mut self, path: Path, env: &mut Environment) {
        let mut path_elements = Vec::new();
        let start_id = self.create_node(&path.start, env);
        path_elements.push(GraphElement::Node(start_id));
        let mut current_id = start_id;

        let bound_var = path.bound_variable.clone();
        for (rel, target_node) in path.edges {
            let next_id = self.create_node(&target_node, env);
            let rel_id = self.create_rel(&rel, current_id, next_id);
            path_elements.push(GraphElement::Edge(rel_id));
            path_elements.push(GraphElement::Node(next_id));
            if let Some(var) = &rel.variable {
                env.insert(var.clone(), GraphElement::Edge(rel_id));
            }
            current_id = next_id;
        }

        if let Some(bv) = bound_var {
            env.insert(bv, GraphElement::Path(path_elements));
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

    pub fn execute_plan(
        &self,
        plan: &PlanNode,
        env: &Environment,
        profile: &mut Option<String>,
        depth: usize,
    ) -> Vec<Environment> {
        let indent = "  ".repeat(depth);
        let op_name;

        let results = match plan {
            PlanNode::FullNodeScan { pattern } => {
                op_name = "FullNodeScan".to_string();
                let nodes = self.find_nodes(pattern, env);
                let mut results = Vec::new();
                for node_id in nodes {
                    let mut new_env = env.clone();
                    if let Some(var) = &pattern.variable {
                        new_env.insert(var.clone(), GraphElement::Node(node_id));
                    }
                    results.push(new_env);
                }
                results
            }
            PlanNode::NodeLabelLookup { label, pattern } => {
                op_name = format!("NodeLabelLookup({})", label);
                let mut matched_nodes = Vec::new();
                if let Some(label_id) = self.labels.get(label) {
                    for id in 0..self.nodes.len() {
                        if self.nodes[id].labels.contains(label_id)
                            && self.node_matches(id, pattern)
                        {
                            matched_nodes.push(id);
                        }
                    }
                }

                let mut results = Vec::new();
                for node_id in matched_nodes {
                    let mut new_env = env.clone();
                    if let Some(var) = &pattern.variable {
                        new_env.insert(var.clone(), GraphElement::Node(node_id));
                    }
                    results.push(new_env);
                }
                results
            }
            PlanNode::NodeIndexLookup {
                label,
                property,
                value,
                pattern,
            } => {
                op_name = format!("NodeIndexLookup({}.{}='{:?}')", label, property, value);
                let mut matched_nodes = Vec::new();
                if let Some(label_id) = self.labels.get(label) {
                    if let Some(label_indices) = self.indices.get(label_id) {
                        if let Some(prop_index) = label_indices.get(property) {
                            if let Some(node_ids) = prop_index.get(value) {
                                for &id in node_ids {
                                    if self.node_matches(id, pattern) {
                                        matched_nodes.push(id);
                                    }
                                }
                            }
                        }
                    }
                }

                let mut results = Vec::new();
                for node_id in matched_nodes {
                    let mut new_env = env.clone();
                    if let Some(var) = &pattern.variable {
                        new_env.insert(var.clone(), GraphElement::Node(node_id));
                    }
                    results.push(new_env);
                }
                results
            }
            PlanNode::PathExpand {
                source,
                source_node_pattern,
                rel_pattern,
                target_node_pattern,
            } => {
                op_name = "PathExpand".to_string();
                let source_envs = self.execute_plan(source, env, profile, depth + 1);
                let mut results = Vec::new();

                for source_env in source_envs {
                    let mut source_node_ids = Vec::new();

                    if let Some(var) = &source_node_pattern.variable {
                        if let Some(GraphElement::Node(id)) = source_env.get(var) {
                            source_node_ids.push(*id);
                        }
                    }

                    if source_node_ids.is_empty() {
                        source_node_ids = self.find_nodes(source_node_pattern, &source_env);
                    }

                    for source_node_id in source_node_ids {
                        let edges = vec![(rel_pattern.clone(), target_node_pattern.clone())];
                        self.match_edges_recursive(
                            &edges,
                            0,
                            source_node_id,
                            source_env.clone(),
                            &mut results,
                        );
                    }
                }

                results
            }
            PlanNode::Intersect { left, right } => {
                op_name = "Intersect".to_string();
                let left_res = self.execute_plan(left, env, profile, depth + 1);
                let right_res = self.execute_plan(right, env, profile, depth + 1);
                left_res
                    .into_iter()
                    .filter(|l| right_res.contains(l))
                    .collect()
            }
            PlanNode::Union { left, right } => {
                op_name = "Union".to_string();
                let mut res = self.execute_plan(left, env, profile, depth + 1);
                res.extend(self.execute_plan(right, env, profile, depth + 1));
                res
            }
            PlanNode::CrossProduct { left, right } => {
                op_name = "CrossProduct".to_string();
                let left_res = self.execute_plan(left, env, profile, depth + 1);

                // To avoid multiple executions of `right` cluttering the profile, we pass a temporary profile for `right`
                // ONLY ONCE or we execute right ONCE. Since right doesn't depend on left's rows in a cross product:
                let mut right_prof = if profile.is_some() {
                    Some(String::new())
                } else {
                    None
                };
                let right_res = self.execute_plan(right, env, &mut right_prof, depth + 1);

                if let Some(prof) = profile {
                    if let Some(r_prof) = right_prof {
                        prof.push_str(&r_prof);
                    }
                }

                let mut joined_res = Vec::new();
                for l in &left_res {
                    for r in &right_res {
                        let mut valid = true;
                        for (k, v) in r.iter() {
                            if let Some(lv) = l.get(k) {
                                if lv != v {
                                    valid = false;
                                    break;
                                }
                            }
                        }
                        if valid {
                            let mut merged = l.clone();
                            merged.extend(r.iter().map(|(k, v)| (k.clone(), v.clone())));
                            joined_res.push(merged);
                        }
                    }
                }
                joined_res
            }
        };

        if let Some(prof) = profile {
            prof.push_str(&format!("{}{} ({} rows)\n", indent, op_name, results.len()));
        }

        results
    }

    fn execute_plan_and_bind_paths(
        &self,
        plan: &PlanNode,
        paths: &[Path],
        env: &Environment,
        profile: &mut Option<String>,
    ) -> Vec<Environment> {
        let mut envs = self.execute_plan(plan, env, profile, 0);

        for path in paths {
            if let Some(bound_var) = &path.bound_variable {
                for e in envs.iter_mut() {
                    let mut path_elements = Vec::new();
                    let start_var = path
                        .start
                        .variable
                        .clone()
                        .unwrap_or_else(|| "_anon_start".to_string());
                    if let Some(el) = e.get(&start_var) {
                        path_elements.push(el.clone());
                    }

                    for (idx, (rel, target)) in path.edges.iter().enumerate() {
                        let rel_var = rel
                            .variable
                            .clone()
                            .unwrap_or_else(|| format!("_anon_rel_{}", idx));
                        let target_var = target
                            .variable
                            .clone()
                            .unwrap_or_else(|| format!("_anon_node_{}", idx));

                        if let Some(el) = e.get(&rel_var) {
                            path_elements.push(el.clone());
                        }
                        if let Some(el) = e.get(&target_var) {
                            path_elements.push(el.clone());
                        }
                    }

                    e.insert(bound_var.clone(), GraphElement::Path(path_elements));
                }
            }
        }

        envs
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

        let matches = self.find_edges_and_nodes(
            current_node_id,
            rel_pattern,
            target_node_pattern,
            &current_env,
        );

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

        // Try to use an index if one is available
        if let Some(label_name) = &pattern.label {
            if let Some(label_id) = self.labels.get(label_name) {
                if let Some(label_indices) = self.indices.get(label_id) {
                    for (prop_name, prop_value) in &pattern.properties {
                        if let Some(prop_index) = label_indices.get(prop_name) {
                            if let Some(node_ids) = prop_index.get(prop_value) {
                                // We found an index match! Filter the indexed nodes just in case there are other constraints
                                let mut matched_nodes = Vec::new();
                                for &id in node_ids {
                                    if self.node_matches(id, pattern) {
                                        matched_nodes.push(id);
                                    }
                                }
                                return matched_nodes;
                            } else {
                                // The property is indexed, but this specific value isn't in it, so no nodes match
                                return vec![];
                            }
                        }
                    }
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
        if self.nodes[node_id].deleted { return false; }
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
        if self.edges[edge_id].deleted { return false; }
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

    fn evaluate_condition(&self, condition: &Condition, env: &Environment) -> bool {
        match condition {
            Condition::And(left, right) => {
                self.evaluate_condition(left, env) && self.evaluate_condition(right, env)
            }
            Condition::Or(left, right) => {
                self.evaluate_condition(left, env) || self.evaluate_condition(right, env)
            }
            Condition::Not(inner) => !self.evaluate_condition(inner, env),
            Condition::Compare { left, op, right } => {
                let l_val = self.evaluate_expression(left, env);
                let r_val = self.evaluate_expression(right, env);
                l_val.compare(&r_val, op)
            }
        }
    }

    fn evaluate_expression(&self, expr: &Expression, env: &Environment) -> EvalValue {
        match expr {
            Expression::StringLiteral(s) => EvalValue::String(s.clone()),
            Expression::NumberLiteral(n) => EvalValue::Number(*n),
            Expression::BooleanLiteral(b) => EvalValue::Boolean(*b),
            Expression::Variable(var) => {
                if let Some(element) = env.get(var) {
                    match element {
                        GraphElement::Number(n) => EvalValue::Number(*n),
                        GraphElement::Node(_) | GraphElement::Edge(_) | GraphElement::EdgeArray(_) | GraphElement::Path(_) | GraphElement::List(_) => {
                            EvalValue::String(self.format_element(element))
                        }
                    }
                } else {
                    EvalValue::Null
                }
            }
            Expression::Function(func, _args) => {
                if func.eq_ignore_ascii_case("rand") {
                    EvalValue::Number(rand::thread_rng().gen::<f64>())
                } else {
                    EvalValue::Null
                }
            }
            Expression::Property(var, prop) => {
                if let Some(element) = env.get(var) {
                    let prop_val = match element {
                        GraphElement::Node(id) => self.nodes[*id].properties.get(prop),
                        GraphElement::Edge(id) => self.edges[*id].properties.get(prop),
                        _ => None,
                    };
                    match prop_val {
                        Some(crate::property::PropertyValue::String(s)) => {
                            EvalValue::String(s.clone())
                        }
                        Some(crate::property::PropertyValue::Number(n)) => EvalValue::Number(*n),
                        Some(crate::property::PropertyValue::Boolean(b)) => EvalValue::Boolean(*b),
                        None => EvalValue::Null,
                    }
                } else {
                    EvalValue::Null
                }
            }
        }
    }
}

#[derive(Clone, Debug)]
enum EvalValue {
    String(String),
    Number(f64),
    Boolean(bool),
    Null,
}

impl EvalValue {
    fn partial_cmp(&self, other: &EvalValue) -> Option<std::cmp::Ordering> {
        if let (EvalValue::Null, EvalValue::Null) = (self, other) {
            return Some(std::cmp::Ordering::Equal);
        }
        if let EvalValue::Null = self {
            return Some(std::cmp::Ordering::Less);
        }
        if let EvalValue::Null = other {
            return Some(std::cmp::Ordering::Greater);
        }

        match (self, other) {
            (EvalValue::Number(l), EvalValue::Number(r)) => l.partial_cmp(r),
            (EvalValue::String(l), EvalValue::String(r)) => l.partial_cmp(r),
            (EvalValue::Number(l), EvalValue::String(r)) => {
                if let Ok(r_num) = r.parse::<f64>() {
                    l.partial_cmp(&r_num)
                } else {
                    None
                }
            }
            (EvalValue::String(l), EvalValue::Number(r)) => {
                if let Ok(l_num) = l.parse::<f64>() {
                    l_num.partial_cmp(r)
                } else {
                    None
                }
            }
            _ => None,
        }
    }

    fn compare(&self, other: &EvalValue, op: &CompareOp) -> bool {
        if let (EvalValue::Null, _) | (_, EvalValue::Null) = (self, other) {
            return false;
        }
        match (self, other) {
            (EvalValue::Number(l), EvalValue::Number(r)) => Self::compare_f64(*l, *r, op),
            (EvalValue::String(l), EvalValue::String(r)) => Self::compare_str(l, r, op),
            (EvalValue::Number(l), EvalValue::String(r)) => {
                if let Ok(r_num) = r.parse::<f64>() {
                    Self::compare_f64(*l, r_num, op)
                } else {
                    false
                }
            }
            (EvalValue::String(l), EvalValue::Number(r)) => {
                if let Ok(l_num) = l.parse::<f64>() {
                    Self::compare_f64(l_num, *r, op)
                } else {
                    false
                }
            }
            (EvalValue::Boolean(l), EvalValue::Boolean(r)) => Self::compare_bool(*l, *r, op),
            _ => false,
        }
    }

    fn compare_bool(l: bool, r: bool, op: &CompareOp) -> bool {
        match op {
            CompareOp::Eq => l == r,
            CompareOp::Neq => l != r,
            CompareOp::Gt => l & !r,
            CompareOp::Gte => l >= r,
            CompareOp::Lt => !l & r,
            CompareOp::Lte => l <= r,
        }
    }

    fn compare_f64(l: f64, r: f64, op: &CompareOp) -> bool {
        match op {
            CompareOp::Eq => l == r,
            CompareOp::Neq => l != r,
            CompareOp::Gt => l > r,
            CompareOp::Gte => l >= r,
            CompareOp::Lt => l < r,
            CompareOp::Lte => l <= r,
        }
    }

    fn compare_str(l: &str, r: &str, op: &CompareOp) -> bool {
        match op {
            CompareOp::Eq => l == r,
            CompareOp::Neq => l != r,
            CompareOp::Gt => l > r,
            CompareOp::Gte => l >= r,
            CompareOp::Lt => l < r,
            CompareOp::Lte => l <= r,
        }
    }
}
