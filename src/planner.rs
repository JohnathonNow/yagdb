use crate::parser::{Clause, Condition, ProjectionItem, Query};
use crate::parser::{NodePattern, Path, RelPattern};
use std::collections::HashMap;

#[derive(Debug, Clone, PartialEq)]
pub enum PlanNode {
    FullNodeScan {
        pattern: NodePattern,
    },
    NodeLabelLookup {
        label: String,
        pattern: NodePattern,
    },
    NodeIndexLookup {
        label: String,
        property: String,
        value: crate::property::PropertyValue,
        pattern: NodePattern,
    },
    PathExpand {
        source: Box<PlanNode>,
        source_node_pattern: NodePattern,
        rel_pattern: RelPattern,
        target_node_pattern: NodePattern,
    },
    Intersect {
        left: Box<PlanNode>,
        right: Box<PlanNode>,
    },
    Union {
        left: Box<PlanNode>,
        right: Box<PlanNode>,
    },
    CrossProduct {
        left: Box<PlanNode>,
        right: Box<PlanNode>,
    },
}

pub struct QueryPlanner;

impl QueryPlanner {
    pub fn plan_match_path(
        path: &Path,
        labels: &HashMap<String, usize>,
        indices: &HashMap<
            usize,
            HashMap<String, HashMap<crate::property::PropertyValue, Vec<usize>>>,
        >,
    ) -> PlanNode {
        // Ensure the start node has a variable for chaining.
        let mut start_pattern = path.start.clone();
        if start_pattern.variable.is_none() {
            start_pattern.variable = Some("_anon_start".to_string());
        }

        // Build the start node plan
        let mut plan = Self::plan_node_lookup(&start_pattern, labels, indices);

        let mut prev_node_pattern = start_pattern.clone();
        // Chain PathExpand for each edge
        for (idx, (rel, target_node)) in path.edges.iter().enumerate() {
            let mut target_pattern = target_node.clone();
            if target_pattern.variable.is_none() {
                target_pattern.variable = Some(format!("_anon_node_{}", idx));
            }

            let mut rel_pattern = rel.clone();
            if rel_pattern.variable.is_none() {
                rel_pattern.variable = Some(format!("_anon_rel_{}", idx));
            }

            plan = PlanNode::PathExpand {
                source: Box::new(plan),
                source_node_pattern: prev_node_pattern,
                rel_pattern,
                target_node_pattern: target_pattern.clone(),
            };
            prev_node_pattern = target_pattern;
        }

        plan
    }

    pub fn plan_match_paths(
        paths: &[Path],
        labels: &HashMap<String, usize>,
        indices: &HashMap<
            usize,
            HashMap<String, HashMap<crate::property::PropertyValue, Vec<usize>>>,
        >,
    ) -> Option<PlanNode> {
        if paths.is_empty() {
            return None;
        }
        let mut plan = Self::plan_match_path(&paths[0], labels, indices);
        for path in paths.iter().skip(1) {
            plan = PlanNode::CrossProduct {
                left: Box::new(plan),
                right: Box::new(Self::plan_match_path(path, labels, indices)),
            };
        }
        Some(plan)
    }

    fn plan_node_lookup(
        pattern: &NodePattern,
        labels: &HashMap<String, usize>,
        indices: &HashMap<
            usize,
            HashMap<String, HashMap<crate::property::PropertyValue, Vec<usize>>>,
        >,
    ) -> PlanNode {
        if let Some(label_name) = &pattern.label {
            if let Some(label_id) = labels.get(label_name) {
                if let Some(label_indices) = indices.get(label_id) {
                    for (prop_name, prop_value) in &pattern.properties {
                        if label_indices.contains_key(prop_name) {
                            // We have an index for this property!
                            return PlanNode::NodeIndexLookup {
                                label: label_name.clone(),
                                property: prop_name.clone(),
                                value: prop_value.clone(),
                                pattern: pattern.clone(),
                            };
                        }
                    }
                }
            }
            // No index found, but we have a label
            return PlanNode::NodeLabelLookup {
                label: label_name.clone(),
                pattern: pattern.clone(),
            };
        }

        // Fallback: full scan
        PlanNode::FullNodeScan {
            pattern: pattern.clone(),
        }
    }
}

#[derive(Debug, Clone, PartialEq)]
pub enum ExecutionStep {
    Create(Vec<Path>),
    Match(Option<PlanNode>, Vec<Path>, Option<Condition>),
    Merge(Vec<(Option<PlanNode>, Path)>),
    Set(String, String, String),
    CreateIndex { label: String, property: String },
    Return(Vec<ProjectionItem>, Option<usize>),
    With(Vec<ProjectionItem>),
    Unwind(Vec<ProjectionItem>),
}

#[derive(Debug, Clone, PartialEq)]
pub struct QueryPlan {
    pub profile: bool,
    pub steps: Vec<ExecutionStep>,
}

impl QueryPlanner {
    pub fn plan_query(
        query: Query,
        labels: &HashMap<String, usize>,
        indices: &HashMap<usize, HashMap<String, HashMap<String, Vec<usize>>>>,
    ) -> QueryPlan {
        let mut steps = Vec::new();
        for clause in query.clauses {
            let step = match clause {
                Clause::Create(paths) => ExecutionStep::Create(paths),
                Clause::Match(paths, condition) => {
                    let plan = Self::plan_match_paths(&paths, labels, indices);
                    ExecutionStep::Match(plan, paths, condition)
                }
                Clause::Merge(paths) => {
                    let mut planned_paths = Vec::new();
                    for path in paths {
                        let plan = Self::plan_match_paths(&[path.clone()], labels, indices);
                        planned_paths.push((plan, path));
                    }
                    ExecutionStep::Merge(planned_paths)
                }
                Clause::Set(var, key, val) => ExecutionStep::Set(var, key, val),
                Clause::CreateIndex { label, property } => ExecutionStep::CreateIndex { label, property },
                Clause::Return(items, limit) => ExecutionStep::Return(items, limit),
                Clause::With(items) => ExecutionStep::With(items),
                Clause::Unwind(items) => ExecutionStep::Unwind(items),
            };
            steps.push(step);
        }
        QueryPlan {
            profile: query.profile,
            steps,
        }
    }
}
