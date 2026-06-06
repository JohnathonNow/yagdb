use crate::graph::Graph;
use crate::parser::{NodePattern, Path, RelPattern};

#[derive(Debug, PartialEq, Clone)]
pub enum PlanNode {
    NodeScan(NodePattern),
    IndexLookup {
        label_id: usize,
        property_name: String,
        property_value: String,
        pattern: NodePattern,
    },
    LabelScan {
        label_id: usize,
        pattern: NodePattern,
    },
    ExpandAllEdges {
        edges: Vec<(RelPattern, NodePattern)>,
        start_pattern: NodePattern,
    },
}

pub struct Planner;

impl Planner {
    pub fn plan_match(graph: &Graph, path: &Path) -> Vec<PlanNode> {
        let mut plan = Vec::new();

        let mut start_planned = false;

        // Strategy for start node
        if let Some(label_str) = &path.start.label {
            if let Some(&label_id) = graph.labels.get(label_str) {
                // Check if we can use an index
                let mut index_used = false;
                if let Some(label_indexes) = graph.indexes.get(&label_id) {
                    for (k, v) in &path.start.properties {
                        if label_indexes.contains_key(k) {
                            plan.push(PlanNode::IndexLookup {
                                label_id,
                                property_name: k.clone(),
                                property_value: v.clone(),
                                pattern: path.start.clone(),
                            });
                            index_used = true;
                            break;
                        }
                    }
                }

                if !index_used {
                    plan.push(PlanNode::LabelScan {
                        label_id,
                        pattern: path.start.clone(),
                    });
                }
                start_planned = true;
            }
        }

        let mut actual_start_pattern = path.start.clone();
        if actual_start_pattern.variable.is_none() {
            // Assign a dummy variable if there isn't one
            actual_start_pattern.variable = Some(format!("_dummy_start_{}", std::time::SystemTime::now().duration_since(std::time::UNIX_EPOCH).unwrap().as_nanos()));
        }

        if !start_planned {
            plan.push(PlanNode::NodeScan(actual_start_pattern.clone()));
        } else {
            // Need to update the plan node we just added to use the dummy variable
            if let Some(node) = plan.last_mut() {
                match node {
                    PlanNode::IndexLookup { pattern, .. } => *pattern = actual_start_pattern.clone(),
                    PlanNode::LabelScan { pattern, .. } => *pattern = actual_start_pattern.clone(),
                    _ => {}
                }
            }
        }

        if !path.edges.is_empty() {
            plan.push(PlanNode::ExpandAllEdges {
                edges: path.edges.clone(),
                start_pattern: actual_start_pattern.clone(),
            });
        }

        plan
    }
}
