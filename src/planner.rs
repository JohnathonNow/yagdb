use crate::parser::{Clause, CompareOp, Condition, Expression, ProjectionItem, Query, OrderItem};
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
    HashJoin {
        left: Box<PlanNode>,
        right: Box<PlanNode>,
        join_keys: Vec<String>,
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
        indices: &HashMap<usize, HashMap<String, crate::graph::IndexMap>>,
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

    fn extract_variables(path: &Path) -> std::collections::HashSet<String> {
        let mut vars = std::collections::HashSet::new();
        if let Some(v) = &path.start.variable {
            vars.insert(v.clone());
        }
        for (rel, node) in &path.edges {
            if let Some(v) = &rel.variable {
                vars.insert(v.clone());
            }
            if let Some(v) = &node.variable {
                vars.insert(v.clone());
            }
        }
        vars
    }

    pub fn plan_match_paths(
        paths: &[Path],
        labels: &HashMap<String, usize>,
        indices: &HashMap<usize, HashMap<String, crate::graph::IndexMap>>,
        extracted_props: &HashMap<String, HashMap<String, PropertyValue>>,
    ) -> Option<PlanNode> {
        if paths.is_empty() {
            return None;
        }
        let mut plan = Self::plan_match_path(&paths[0], labels, indices, extracted_props);
        let mut planned_vars = Self::extract_variables(&paths[0]);

        for path in paths.iter().skip(1) {
            let right_plan = Self::plan_match_path(path, labels, indices, extracted_props);
            let right_vars = Self::extract_variables(path);
            let mut join_keys: Vec<String> = planned_vars.intersection(&right_vars).cloned().collect();
            join_keys.sort(); // For determinism

            if !join_keys.is_empty() {
                plan = PlanNode::HashJoin {
                    left: Box::new(plan),
                    right: Box::new(right_plan),
                    join_keys,
                };
            } else {
                plan = PlanNode::CrossProduct {
                    left: Box::new(plan),
                    right: Box::new(right_plan),
                };
            }
            planned_vars.extend(right_vars);
        }
        Some(plan)
    }

    fn plan_node_lookup(
        pattern: &NodePattern,
        labels: &HashMap<String, usize>,
        indices: &HashMap<usize, HashMap<String, crate::graph::IndexMap>>,
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
    Set(String, String, Expression),
    CreateIndex { label: String, property: String, index_type: crate::graph::IndexType },
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
    fn extract_props_from_condition(
        condition: &Condition,
        extracted_props: &mut HashMap<String, HashMap<String, PropertyValue>>,
    ) {
        match condition {
            Condition::And(left, right) => {
                Self::extract_props_from_condition(left, extracted_props);
                Self::extract_props_from_condition(right, extracted_props);
            }
            Condition::Compare { left, op, right } => {
                if *op == CompareOp::Eq {
                    if let Expression::Property(var, prop) = left {
                        if let Some(val) = Self::eval_literal(right) {
                            // ⚡ BOLT: Avoid unconditional String cloning by bypassing HashMap::entry for cache hits.
                            if let Some(entry) = extracted_props.get_mut(var) {
                                entry.insert(prop.clone(), val);
                            } else {
                                let mut map = std::collections::HashMap::new();
                                map.insert(prop.clone(), val);
                                extracted_props.insert(var.clone(), map);
                            }
                        }
                    } else if let Expression::Property(var, prop) = right {
                        if let Some(val) = Self::eval_literal(left) {
                            // ⚡ BOLT: Avoid unconditional String cloning by bypassing HashMap::entry for cache hits.
                            if let Some(entry) = extracted_props.get_mut(var) {
                                entry.insert(prop.clone(), val);
                            } else {
                                let mut map = std::collections::HashMap::new();
                                map.insert(prop.clone(), val);
                                extracted_props.insert(var.clone(), map);
                            }
                        }
                    }
                }
            }
            _ => {} // We only care about explicit ANDed equalities right now
        }
    }

    fn eval_literal(expr: &Expression) -> Option<PropertyValue> {
        match expr {
            Expression::StringLiteral(s) => Some(PropertyValue::String(s.clone())),
            Expression::NumberLiteral(n) => Some(PropertyValue::Number(*n)),
            Expression::BooleanLiteral(b) => Some(PropertyValue::Boolean(*b)),
            _ => None,
        }
    }

    pub fn plan_query(
        query: Query,
        labels: &HashMap<String, usize>,
        indices: &HashMap<usize, HashMap<String, crate::graph::IndexMap>>,
    ) -> QueryPlan {
        let mut steps = Vec::new();
        for clause in query.clauses {
            let step = match clause {
                Clause::Create(paths) => ExecutionStep::Create(paths),
                Clause::Match(paths, condition, limit) => {
                    let mut extracted_props = HashMap::new();
                    if let Some(cond) = &condition {
                        Self::extract_props_from_condition(cond, &mut extracted_props);
                    }
                    let plan = Self::plan_match_paths(&paths, labels, indices, &extracted_props);
                    ExecutionStep::Match(plan, paths, condition, limit)
                }
                Clause::Merge(paths) => {
                    let mut planned_paths = Vec::new();
                    let empty_props = HashMap::new();
                    for path in paths {
                        let plan = Self::plan_match_paths(&[path.clone()], labels, indices, &empty_props);
                        planned_paths.push((plan, path));
                    }
                    ExecutionStep::Merge(planned_paths)
                }
                Clause::Set(var, key, val) => ExecutionStep::Set(var, key, val),
                Clause::CreateIndex { label, property, index_type } => ExecutionStep::CreateIndex { label, property, index_type },
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
