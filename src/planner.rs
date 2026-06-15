use crate::parser::{Clause, Condition, ProjectionItem, Query, OrderItem};
use crate::property::{PropertyValue};
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
        extracted_props: &HashMap<String, HashMap<String, PropertyValue>>,
    ) -> PlanNode {
        // Ensure the start node has a variable for chaining.
        let mut start_pattern = path.start.clone();
        if start_pattern.variable.is_none() {
            start_pattern.variable = Some("_anon_start".to_string());
        }

        // Build the start node plan
        let mut plan = Self::plan_node_lookup(&start_pattern, labels, indices, extracted_props);

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
        extracted_props: &HashMap<String, HashMap<String, PropertyValue>>,
    ) -> Option<PlanNode> {
        if paths.is_empty() {
            return None;
        }
        let mut plan = Self::plan_match_path(&paths[0], labels, indices, extracted_props);
        for path in paths.iter().skip(1) {
            plan = PlanNode::CrossProduct {
                left: Box::new(plan),
                right: Box::new(Self::plan_match_path(path, labels, indices, extracted_props)),
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
        extracted_props: &HashMap<String, HashMap<String, PropertyValue>>,
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
                    if let Some(var) = &pattern.variable {
                        if let Some(props) = extracted_props.get(var) {
                            for (prop_name, prop_value) in props {
                                if label_indices.contains_key(prop_name) {
                                    // We have an index for this property from WHERE clause!
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
    Match(Option<PlanNode>, Vec<Path>, Option<Condition>, Option<usize>),
    Merge(Vec<(Option<PlanNode>, Path)>),
    Set(String, String, PropertyValue),
    CreateIndex { label: String, property: String },
    Return(Vec<ProjectionItem>, Option<Vec<OrderItem>>, Option<usize>),
    With(Vec<ProjectionItem>, Option<Vec<OrderItem>>, Option<usize>),
    Unwind(Vec<ProjectionItem>),
    Delete(Vec<String>),
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
        indices: &HashMap<usize, HashMap<String, HashMap<PropertyValue, Vec<usize>>>>,
    ) -> QueryPlan {
        let mut steps = Vec::new();
        for clause in query.clauses {
            let step = match clause {
                Clause::Create(paths) => ExecutionStep::Create(paths),
                Clause::Match(paths, condition, limit) => {
                    let mut extracted_props = HashMap::new();
                    if let Some(cond) = &condition {
                        Self::extract_equalities(cond, &mut extracted_props);
                    }
                    let plan = Self::plan_match_paths(&paths, labels, indices, &extracted_props);
                    ExecutionStep::Match(plan, paths, condition, limit)
                }
                Clause::Merge(paths) => {
                    let mut planned_paths = Vec::new();
                    let extracted_props = HashMap::new();
                    for path in paths {
                        let plan = Self::plan_match_paths(&[path.clone()], labels, indices, &extracted_props);
                        planned_paths.push((plan, path));
                    }
                    ExecutionStep::Merge(planned_paths)
                }
                Clause::Set(var, key, val) => ExecutionStep::Set(var, key, val),
                Clause::CreateIndex { label, property } => ExecutionStep::CreateIndex { label, property },
                Clause::Return(items, order, limit) => ExecutionStep::Return(items, order, limit),
                Clause::With(items, order, limit) => ExecutionStep::With(items, order, limit),
                Clause::Unwind(items) => ExecutionStep::Unwind(items),
                Clause::Delete(items) => ExecutionStep::Delete(items),
            };
            steps.push(step);
        }
        QueryPlan {
            profile: query.profile,
            steps,
        }
    }
}

impl QueryPlanner {
    fn extract_equalities(
        condition: &Condition,
        props: &mut HashMap<String, HashMap<String, PropertyValue>>,
    ) {
        use crate::parser::{Expression, CompareOp};
        match condition {
            Condition::And(left, right) => {
                Self::extract_equalities(left, props);
                Self::extract_equalities(right, props);
            }
            Condition::Compare { left, op: CompareOp::Eq, right } => {
                if let Expression::Property(var, prop) = left {
                    match right {
                        Expression::StringLiteral(s) => {
                            props.entry(var.clone()).or_default().insert(prop.clone(), PropertyValue::String(s.clone()));
                        }
                        Expression::NumberLiteral(n) => {
                            props.entry(var.clone()).or_default().insert(prop.clone(), PropertyValue::Number(*n));
                        }
                        Expression::BooleanLiteral(b) => {
                            props.entry(var.clone()).or_default().insert(prop.clone(), PropertyValue::Boolean(*b));
                        }
                        _ => {}
                    }
                } else if let Expression::Property(var, prop) = right {
                    match left {
                        Expression::StringLiteral(s) => {
                            props.entry(var.clone()).or_default().insert(prop.clone(), PropertyValue::String(s.clone()));
                        }
                        Expression::NumberLiteral(n) => {
                            props.entry(var.clone()).or_default().insert(prop.clone(), PropertyValue::Number(*n));
                        }
                        Expression::BooleanLiteral(b) => {
                            props.entry(var.clone()).or_default().insert(prop.clone(), PropertyValue::Boolean(*b));
                        }
                        _ => {}
                    }
                }
            }
            _ => {}
        }
    }
}
