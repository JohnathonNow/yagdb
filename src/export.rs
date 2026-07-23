use crate::graph::{Graph, IndexType, IndexMap};
use crate::node::Node;
use crate::edge::Edge;
use serde::{Deserialize, Serialize};
use std::collections::HashMap;

#[derive(Serialize, Deserialize)]
struct CsvNode {
    internal_id: usize,
    id: String,
    labels: String,
    edges: String,
    properties: String,
    deleted: bool,
    deleted_by: Option<u64>,
    created_by: u64,
}

#[derive(Serialize, Deserialize)]
struct CsvEdge {
    internal_id: usize,
    id: String,
    labels: String,
    start: usize,
    end: usize,
    properties: String,
    deleted: bool,
    deleted_by: Option<u64>,
    created_by: u64,
}

#[derive(Serialize, Deserialize)]
struct CsvLabel {
    name: String,
    id: usize,
}

#[derive(Serialize, Deserialize)]
struct CsvIndexDef {
    label_id: usize,
    property: String,
    index_type: String, // "hash" or "btree"
}

impl Graph {
    pub fn export_json(&self) -> Result<String, String> {
        serde_json::to_string(self).map_err(|e| e.to_string())
    }

    pub fn import_json(&mut self, json_str: &str) -> Result<(), String> {
        let imported: Graph = serde_json::from_str(json_str).map_err(|e| e.to_string())?;
        self.nodes = imported.nodes;
        self.edges = imported.edges;
        self.labels = imported.labels;
        self.indices = imported.indices;
        Ok(())
    }

    pub fn export_csv(&self) -> Result<(String, String, String, String), String> {
        let mut nodes_wtr = csv::Writer::from_writer(vec![]);
        for i in 0..self.nodes.len_items() {
            // Optimization: using with_item avoids cloning the full node struct just to format it
            if let Some(result) = self.nodes.with_item(i, |node| {
                let csv_node = CsvNode {
                    internal_id: i,
                    id: node.id.clone(),
                    labels: serde_json::to_string(&node.labels).map_err(|e| e.to_string())?,
                    edges: serde_json::to_string(&node.edges).map_err(|e| e.to_string())?,
                    properties: serde_json::to_string(&node.properties).map_err(|e| e.to_string())?,
                    deleted: node.deleted,
                    created_by: node.created_by,
                    deleted_by: node.deleted_by,
                };
                nodes_wtr.serialize(csv_node).map_err(|e| e.to_string())
            }) {
                result?;
            }
        }

        let mut edges_wtr = csv::Writer::from_writer(vec![]);
        for i in 0..self.edges.len_items() {
            // Optimization: using with_item avoids cloning the full edge struct just to format it
            if let Some(result) = self.edges.with_item(i, |edge| {
                let csv_edge = CsvEdge {
                    internal_id: i,
                    id: edge.id.clone(),
                    labels: serde_json::to_string(&edge.labels).map_err(|e| e.to_string())?,
                    start: edge.start,
                    end: edge.end,
                    properties: serde_json::to_string(&edge.properties).map_err(|e| e.to_string())?,
                    deleted: edge.deleted,
                    deleted_by: edge.deleted_by,
                    created_by: edge.created_by,
                };
                edges_wtr.serialize(csv_edge).map_err(|e| e.to_string())
            }) {
                result?;
            }
        }

        let mut labels_wtr = csv::Writer::from_writer(vec![]);
        for (name, id) in &self.labels {
            let csv_label = CsvLabel {
                name: name.clone(),
                id: *id,
            };
            labels_wtr.serialize(csv_label).map_err(|e| e.to_string())?;
        }

        let mut indices_wtr = csv::Writer::from_writer(vec![]);
        for (label_id, props) in &self.indices {
            for (prop_name, index_map) in props {
                let index_type = match index_map {
                    IndexMap::Hash(_) => "hash",
                    IndexMap::BTree(_) => "btree",
                };
                let def = CsvIndexDef {
                    label_id: *label_id,
                    property: prop_name.clone(),
                    index_type: index_type.to_string(),
                };
                indices_wtr.serialize(def).map_err(|e| e.to_string())?;
            }
        }

        let nodes_csv = String::from_utf8(nodes_wtr.into_inner().map_err(|e| e.to_string())?).map_err(|e| e.to_string())?;
        let edges_csv = String::from_utf8(edges_wtr.into_inner().map_err(|e| e.to_string())?).map_err(|e| e.to_string())?;
        let labels_csv = String::from_utf8(labels_wtr.into_inner().map_err(|e| e.to_string())?).map_err(|e| e.to_string())?;
        let indices_csv = String::from_utf8(indices_wtr.into_inner().map_err(|e| e.to_string())?).map_err(|e| e.to_string())?;

        Ok((nodes_csv, edges_csv, labels_csv, indices_csv))
    }

    pub fn import_csv(&mut self, nodes_csv: &str, edges_csv: &str, labels_csv: &str, indices_csv: &str) -> Result<(), String> {
        self.nodes.clear_items();
        self.edges.clear_items();
        self.labels.clear();
        self.indices.clear();

        let mut labels_rdr = csv::Reader::from_reader(labels_csv.as_bytes());
        for result in labels_rdr.deserialize() {
            let record: CsvLabel = result.map_err(|e| e.to_string())?;
            self.labels.insert(record.name, record.id);
        }

        let mut nodes_rdr = csv::Reader::from_reader(nodes_csv.as_bytes());
        // To handle sparse arrays or holes from deleted items, we collect them first and sort
        let mut parsed_nodes = Vec::new();
        for result in nodes_rdr.deserialize() {
            let record: CsvNode = result.map_err(|e| e.to_string())?;
            parsed_nodes.push(record);
        }
        parsed_nodes.sort_by_key(|n| n.internal_id);

        let mut current_idx = 0;
        for record in parsed_nodes {
            while current_idx < record.internal_id {
                let dummy_node = Node {
                    id: String::new(),
                    labels: vec![],
                    edges: vec![],
                    properties: HashMap::new(),
                    deleted: true,
                    created_by: (u64::MAX),
                    deleted_by: Some(u64::MAX),
                };
                self.nodes.push_item(dummy_node);
                current_idx += 1;
            }
            let node = Node {
                id: record.id,
                labels: serde_json::from_str(&record.labels).map_err(|e| e.to_string())?,
                edges: serde_json::from_str(&record.edges).map_err(|e| e.to_string())?,
                properties: serde_json::from_str(&record.properties).map_err(|e| e.to_string())?,
                deleted: record.deleted,
                created_by: record.created_by,
                deleted_by: record.deleted_by,
            };
            self.nodes.push_item(node);
            current_idx += 1;
        }

        let mut edges_rdr = csv::Reader::from_reader(edges_csv.as_bytes());
        let mut parsed_edges = Vec::new();
        for result in edges_rdr.deserialize() {
            let record: CsvEdge = result.map_err(|e| e.to_string())?;
            parsed_edges.push(record);
        }
        parsed_edges.sort_by_key(|e| e.internal_id);

        let mut current_idx_edges = 0;
        for record in parsed_edges {
            while current_idx_edges < record.internal_id {
                let dummy_edge = Edge {
                    id: String::new(),
                    labels: vec![],
                    start: 0,
                    end: 0,
                    properties: HashMap::new(),
                    deleted: true,
                    created_by: (u64::MAX),
                    deleted_by: Some(u64::MAX),
                };
                self.edges.push_item(dummy_edge);
                current_idx_edges += 1;
            }
            let edge = Edge {
                id: record.id,
                labels: serde_json::from_str(&record.labels).map_err(|e| e.to_string())?,
                start: record.start,
                end: record.end,
                properties: serde_json::from_str(&record.properties).map_err(|e| e.to_string())?,
                deleted: record.deleted,
                created_by: record.created_by,
                deleted_by: record.deleted_by,
            };
            self.edges.push_item(edge);
            current_idx_edges += 1;
        }

        // Rebuild indices
        let mut indices_rdr = csv::Reader::from_reader(indices_csv.as_bytes());
        for result in indices_rdr.deserialize() {
            let record: CsvIndexDef = result.map_err(|e| e.to_string())?;

            let index_type = if record.index_type == "btree" {
                IndexType::BTree
            } else {
                IndexType::Hash
            };

            self.create_index(record.label_id, record.property, index_type);
        }

        Ok(())
    }
}
