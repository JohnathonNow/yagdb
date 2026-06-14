import sys

with open("src/graph.rs", "r") as f:
    content = f.read()

# Replace execute_plan signature and implementation
execute_plan_old = """    pub fn execute_plan(
        &self,
        plan: &PlanNode,
        env: &Environment,
        profile: &mut Option<String>,
        depth: usize,
    ) -> Vec<Environment> {
        let indent = "  ".repeat(depth);
        let op_name;

        let results = match plan {"""

execute_plan_new = """    pub fn execute_plan(
        &self,
        plan: &PlanNode,
        in_res: &ResultSet,
        out: &mut ResultSet,
        profile: &mut Option<String>,
        depth: usize,
    ) {
        let indent = "  ".repeat(depth);
        let op_name;

        let initial_rows = out.rows;

        match plan {"""

content = content.replace(execute_plan_old, execute_plan_new)

# FullNodeScan
fns_old = """            PlanNode::FullNodeScan { pattern } => {
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
            }"""
fns_new = """            PlanNode::FullNodeScan { pattern } => {
                op_name = "FullNodeScan".to_string();
                for i in 0..in_res.rows {
                    let nodes = self.find_nodes(pattern, in_res, i);
                    for node_id in nodes {
                        if let Some(var) = &pattern.variable {
                            out.push_row_from(in_res, i, &[(var.as_str(), GraphElement::Node(node_id))]);
                        } else {
                            out.push_row_from(in_res, i, &[]);
                        }
                    }
                }
            }"""
content = content.replace(fns_old, fns_new)

# NodeLabelLookup
nll_old = """            PlanNode::NodeLabelLookup { label, pattern } => {
                op_name = format!("NodeLabelLookup({})", label);
                let mut matched_nodes = Vec::new();
                let mut target_label = None;
                if let Some(label_id) = self.labels.get(label) {
                    target_label = Some(*label_id);
                }
                if let Some(label_id) = target_label {
                    for id in 0..self.nodes.len_items() {
                        if self.nodes.get_item(id).unwrap().labels.contains(&label_id)
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
            }"""
nll_new = """            PlanNode::NodeLabelLookup { label, pattern } => {
                op_name = format!("NodeLabelLookup({})", label);
                let mut matched_nodes = Vec::new();
                if let Some(label_id) = self.labels.get(label) {
                    for id in 0..self.nodes.len_items() {
                        if self.nodes.get_item(id).unwrap().labels.contains(label_id)
                            && self.node_matches(id, pattern)
                        {
                            matched_nodes.push(id);
                        }
                    }
                }

                for i in 0..in_res.rows {
                    for &node_id in &matched_nodes {
                        if let Some(var) = &pattern.variable {
                            out.push_row_from(in_res, i, &[(var.as_str(), GraphElement::Node(node_id))]);
                        } else {
                            out.push_row_from(in_res, i, &[]);
                        }
                    }
                }
            }"""
content = content.replace(nll_old, nll_new)

# NodeIndexLookup
nil_old = """            PlanNode::NodeIndexLookup {
                label,
                property,
                value,
                pattern,
            } => {
                op_name = format!("NodeIndexLookup({}.{}='{:?}')", label, property, value);
                let mut matched_nodes = Vec::new();
                let mut candidate_ids = Vec::new();
                if let Some(label_id) = self.labels.get(label) {
                    if let Some(label_indices) = self.indices.get(label_id) {
                        if let Some(prop_index) = label_indices.get(property) {
                            if let Some(node_ids) = prop_index.get(value) {
                                candidate_ids.extend(node_ids.iter().copied());
                            }
                        }
                    }
                }
                for id in candidate_ids {
                    if self.node_matches(id, pattern) {
                        matched_nodes.push(id);
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
            }"""
nil_new = """            PlanNode::NodeIndexLookup {
                label,
                property,
                value,
                pattern,
            } => {
                op_name = format!("NodeIndexLookup({}.{}='{:?}')", label, property, value);
                let mut matched_nodes = Vec::new();
                let mut candidate_ids = Vec::new();
                if let Some(label_id) = self.labels.get(label) {
                    if let Some(label_indices) = self.indices.get(label_id) {
                        if let Some(prop_index) = label_indices.get(property) {
                            if let Some(node_ids) = prop_index.get(value) {
                                candidate_ids.extend(node_ids.iter().copied());
                            }
                        }
                    }
                }
                for id in candidate_ids {
                    if self.node_matches(id, pattern) {
                        matched_nodes.push(id);
                    }
                }

                for i in 0..in_res.rows {
                    for &node_id in &matched_nodes {
                        if let Some(var) = &pattern.variable {
                            out.push_row_from(in_res, i, &[(var.as_str(), GraphElement::Node(node_id))]);
                        } else {
                            out.push_row_from(in_res, i, &[]);
                        }
                    }
                }
            }"""
content = content.replace(nil_old, nil_new)

# PathExpand
pe_old = """            PlanNode::PathExpand {
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
            }"""
pe_new = """            PlanNode::PathExpand {
                source,
                source_node_pattern,
                rel_pattern,
                target_node_pattern,
            } => {
                op_name = "PathExpand".to_string();
                let mut source_res = ResultSet::new();
                self.execute_plan(source, in_res, &mut source_res, profile, depth + 1);

                for i in 0..source_res.rows {
                    let mut source_node_ids = Vec::new();

                    if let Some(var) = &source_node_pattern.variable {
                        if let Some(GraphElement::Node(id)) = source_res.get(i, var) {
                            source_node_ids.push(*id);
                        }
                    }

                    if source_node_ids.is_empty() {
                        source_node_ids = self.find_nodes(source_node_pattern, &source_res, i);
                    }

                    for source_node_id in source_node_ids {
                        let edges = vec![(rel_pattern.clone(), target_node_pattern.clone())];
                        self.match_edges_recursive(
                            &edges,
                            0,
                            source_node_id,
                            &source_res,
                            i,
                            out,
                        );
                    }
                }
            }"""
content = content.replace(pe_old, pe_new)

# Intersect
int_old = """            PlanNode::Intersect { left, right } => {
                op_name = "Intersect".to_string();
                let left_res = self.execute_plan(left, env, profile, depth + 1);
                let right_res = self.execute_plan(right, env, profile, depth + 1);
                left_res
                    .into_iter()
                    .filter(|l| right_res.contains(l))
                    .collect()
            }"""
int_new = """            PlanNode::Intersect { left, right } => {
                op_name = "Intersect".to_string();
                let mut left_res = ResultSet::new();
                self.execute_plan(left, in_res, &mut left_res, profile, depth + 1);
                let mut right_res = ResultSet::new();
                self.execute_plan(right, in_res, &mut right_res, profile, depth + 1);

                for l_idx in 0..left_res.rows {
                    let mut found = false;
                    for r_idx in 0..right_res.rows {
                        let mut match_all = true;
                        for (k, l_col) in &left_res.columns {
                            if let Some(r_col) = right_res.columns.get(k) {
                                if l_col[l_idx] != r_col[r_idx] {
                                    match_all = false;
                                    break;
                                }
                            }
                        }
                        if match_all {
                            found = true;
                            break;
                        }
                    }
                    if found {
                        out.push_row_from(&left_res, l_idx, &[]);
                    }
                }
            }"""
content = content.replace(int_old, int_new)

# Union
uni_old = """            PlanNode::Union { left, right } => {
                op_name = "Union".to_string();
                let mut res = self.execute_plan(left, env, profile, depth + 1);
                res.extend(self.execute_plan(right, env, profile, depth + 1));
                res
            }"""
uni_new = """            PlanNode::Union { left, right } => {
                op_name = "Union".to_string();
                self.execute_plan(left, in_res, out, profile, depth + 1);
                self.execute_plan(right, in_res, out, profile, depth + 1);
            }"""
content = content.replace(uni_old, uni_new)

# CrossProduct
cp_old = """            PlanNode::CrossProduct { left, right } => {
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
            }"""
cp_new = """            PlanNode::CrossProduct { left, right } => {
                op_name = "CrossProduct".to_string();
                // To preserve incoming row associations correctly when cross joining independent paths
                // evaluated on the SAME incoming row, we process each incoming row separately for cross-product.
                for i in 0..in_res.rows {
                    let mut single_res = ResultSet::new();
                    single_res.push_row_from(in_res, i, &[]);

                    let mut left_res = ResultSet::new();
                    self.execute_plan(left, &single_res, &mut left_res, profile, depth + 1);

                    let mut right_prof = if profile.is_some() { Some(String::new()) } else { None };
                    let mut right_res = ResultSet::new();
                    self.execute_plan(right, &single_res, &mut right_res, &mut right_prof, depth + 1);

                    if let Some(prof) = profile {
                        if let Some(r_prof) = right_prof { prof.push_str(&r_prof); }
                    }

                    for l_idx in 0..left_res.rows {
                        for r_idx in 0..right_res.rows {
                            let mut valid = true;
                            for (k, r_col) in &right_res.columns {
                                if let Some(l_col) = left_res.columns.get(k) {
                                    if l_col[l_idx] != GraphElement::Null && r_col[r_idx] != GraphElement::Null && l_col[l_idx] != r_col[r_idx] {
                                        valid = false;
                                        break;
                                    }
                                }
                            }
                            if valid {
                                out.push_merged_row(&left_res, l_idx, &right_res, r_idx);
                            }
                        }
                    }
                }
            }"""
content = content.replace(cp_old, cp_new)

# execute_plan end
ep_end_old = """        if let Some(prof) = profile {
            prof.push_str(&format!("{}{} ({} rows)\\n", indent, op_name, results.len()));
        }

        results
    }"""
ep_end_new = """        if let Some(prof) = profile {
            prof.push_str(&format!("{}{} ({} rows)\\n", indent, op_name, out.rows - initial_rows));
        }
    }"""
content = content.replace(ep_end_old, ep_end_new)


with open("src/graph.rs", "w") as f:
    f.write(content)
