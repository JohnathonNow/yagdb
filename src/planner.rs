use crate::parser::{NodePattern, Path, RelPattern};
use std::collections::HashMap;

#[derive(Debug, Clone)]
pub enum PlanNode {
    /// Full scan over all nodes, optionally filtering by pattern
    FullNodeScan {
        pattern: NodePattern,
    },
    /// Lookup nodes by label
    NodeLookupByLabel {
        label_id: usize,
        pattern: NodePattern,
    },
    /// Expands from a set of starting nodes following an edge pattern
    Expand {
        source: Box<PlanNode>,
        source_node_var: String,
        rel_pattern: RelPattern,
        target_pattern: NodePattern,
    },
    /// Intersects two environments on shared variables
    Intersect {
        left: Box<PlanNode>,
        right: Box<PlanNode>,
    },
}

pub struct QueryPlanner;

impl QueryPlanner {
    pub fn plan_match(paths: &[Path], labels: &HashMap<String, usize>) -> Option<PlanNode> {
        if paths.is_empty() {
            return None;
        }

        let mut plan = Self::plan_path(&paths[0], labels);

        for path in paths.iter().skip(1) {
            let next_plan = Self::plan_path(path, labels);
            plan = PlanNode::Intersect {
                left: Box::new(plan),
                right: Box::new(next_plan),
            };
        }

        Some(plan)
    }

    fn plan_path(path: &Path, labels: &HashMap<String, usize>) -> PlanNode {
        let mut start_pattern = path.start.clone();
        Self::ensure_variable(&mut start_pattern.variable);

        let mut plan = if let Some(label) = &start_pattern.label {
            if let Some(label_id) = labels.get(label) {
                PlanNode::NodeLookupByLabel {
                    label_id: *label_id,
                    pattern: start_pattern.clone(),
                }
            } else {
                PlanNode::FullNodeScan {
                    pattern: start_pattern.clone(),
                }
            }
        } else {
            PlanNode::FullNodeScan {
                pattern: start_pattern.clone(),
            }
        };

        let mut current_source_var = start_pattern.variable.clone().unwrap();

        for (rel, target) in &path.edges {
            let mut rel_pattern = rel.clone();
            Self::ensure_variable(&mut rel_pattern.variable);

            let mut target_pattern = target.clone();
            Self::ensure_variable(&mut target_pattern.variable);

            let target_var = target_pattern.variable.clone().unwrap();

            plan = PlanNode::Expand {
                source: Box::new(plan),
                source_node_var: current_source_var,
                rel_pattern,
                target_pattern,
            };

            current_source_var = target_var;
        }

        plan
    }

    fn ensure_variable(var: &mut Option<String>) {
        use std::sync::atomic::{AtomicUsize, Ordering};
        static COUNTER: AtomicUsize = AtomicUsize::new(0);

        if var.is_none() {
            let id = COUNTER.fetch_add(1, Ordering::SeqCst);
            *var = Some(format!("__gen_var_{}", id));
        }
    }
}
