import sys

with open("src/graph.rs", "r") as f:
    content = f.read()

epabp_old = """    fn execute_plan_and_bind_paths(
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
    }"""
epabp_new = """    fn execute_plan_and_bind_paths(
        &self,
        plan: &PlanNode,
        paths: &[Path],
        in_res: &ResultSet,
        out: &mut ResultSet,
        profile: &mut Option<String>,
    ) {
        let initial_rows = out.rows;
        self.execute_plan(plan, in_res, out, profile, 0);

        for path in paths {
            if let Some(bound_var) = &path.bound_variable {
                for i in initial_rows..out.rows {
                    let mut path_elements = Vec::new();
                    let start_var = path
                        .start
                        .variable
                        .clone()
                        .unwrap_or_else(|| "_anon_start".to_string());
                    if let Some(el) = out.get(i, &start_var) {
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

                        if let Some(el) = out.get(i, &rel_var) {
                            path_elements.push(el.clone());
                        }
                        if let Some(el) = out.get(i, &target_var) {
                            path_elements.push(el.clone());
                        }
                    }

                    let col = out.columns.entry(bound_var.clone()).or_insert_with(|| vec![GraphElement::Null; out.rows]);
                    col[i] = GraphElement::Path(path_elements);
                }
            }
        }
    }"""

content = content.replace(epabp_old, epabp_new)

mer_old = """    fn match_edges_recursive(
        &self,
        edges: &[(RelPattern, NodePattern)],
        edge_idx: usize,
        current_node_id: usize,
        current_env: Environment,
        results: &mut Vec<Environment>,
    ) {"""
mer_new = """    fn match_edges_recursive(
        &self,
        edges: &[(RelPattern, NodePattern)],
        edge_idx: usize,
        current_node_id: usize,
        in_res: &ResultSet,
        row_idx: usize,
        out: &mut ResultSet,
    ) {"""
content = content.replace(mer_old, mer_new)

mer_body_old = """        if edge_idx >= edges.len() {
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
        }"""
mer_body_new = """        if edge_idx >= edges.len() {
            out.push_row_from(in_res, row_idx, &[]);
            return;
        }

        let (rel_pattern, target_node_pattern) = &edges[edge_idx];

        if let Some((min_len, max_len)) = rel_pattern.length {
            if min_len != 1 || max_len != Some(1) {
                self.match_var_length_edges(
                    edges,
                    edge_idx,
                    current_node_id,
                    in_res,
                    row_idx,
                    out,
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
            in_res,
            row_idx,
        );

        for (next_node_id, edge_id) in matches {
            let mut single_res = ResultSet::new();
            let mut bindings = Vec::new();
            if let Some(var) = &rel_pattern.variable {
                bindings.push((var.as_str(), GraphElement::Edge(edge_id)));
            }
            if let Some(var) = &target_node_pattern.variable {
                bindings.push((var.as_str(), GraphElement::Node(next_node_id)));
            }
            single_res.push_row_from(in_res, row_idx, &bindings);

            self.match_edges_recursive(edges, edge_idx + 1, next_node_id, &single_res, 0, out);
        }"""
content = content.replace(mer_body_old, mer_body_new)


mvle_old = """    #[allow(clippy::too_many_arguments)]
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

        let start_node = self.nodes.get_item(current_node_id).unwrap();

        for &edge_id in &start_node.edges {
            let edge = self.edges.get_item(edge_id).unwrap();

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
    }"""
mvle_new = """    #[allow(clippy::too_many_arguments)]
    fn match_var_length_edges(
        &self,
        edges: &[(RelPattern, NodePattern)],
        edge_idx: usize,
        current_node_id: usize,
        in_res: &ResultSet,
        row_idx: usize,
        out: &mut ResultSet,
        min_len: usize,
        max_len: Option<usize>,
        current_depth: usize,
        path_edges: Vec<usize>,
    ) {
        let (rel_pattern, target_node_pattern) = &edges[edge_idx];

        if current_depth >= min_len {
            let target_bound_id = if let Some(var) = &target_node_pattern.variable {
                if let Some(GraphElement::Node(id)) = in_res.get(row_idx, var) {
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
                let mut single_res = ResultSet::new();
                let mut bindings = Vec::new();
                if let Some(var) = &rel_pattern.variable {
                    bindings.push((var.as_str(), GraphElement::EdgeArray(path_edges.clone())));
                }
                if let Some(var) = &target_node_pattern.variable {
                    bindings.push((var.as_str(), GraphElement::Node(current_node_id)));
                }
                single_res.push_row_from(in_res, row_idx, &bindings);

                self.match_edges_recursive(edges, edge_idx + 1, current_node_id, &single_res, 0, out);
            }
        }

        if let Some(max) = max_len {
            if current_depth >= max {
                return;
            }
        }

        let start_node = self.nodes.get_item(current_node_id).unwrap();

        for &edge_id in &start_node.edges {
            let edge = self.edges.get_item(edge_id).unwrap();

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
                    in_res,
                    row_idx,
                    out,
                    min_len,
                    max_len,
                    current_depth + 1,
                    new_path_edges,
                );
            }
        }
    }"""
content = content.replace(mvle_old, mvle_new)

fn_old = """    fn find_nodes(&self, pattern: &NodePattern, env: &Environment) -> Vec<usize> {
        // If node is already bound in env, return just that node if it matches the pattern
        if let Some(var) = &pattern.variable {
            if let Some(GraphElement::Node(id)) = env.get(var) {
                if self.node_matches(*id, pattern) {
                    return vec![*id];
                } else {
                    return vec![];
                }
            }
        }"""
fn_new = """    fn find_nodes(&self, pattern: &NodePattern, in_res: &ResultSet, row_idx: usize) -> Vec<usize> {
        // If node is already bound in env, return just that node if it matches the pattern
        if let Some(var) = &pattern.variable {
            if let Some(GraphElement::Node(id)) = in_res.get(row_idx, var) {
                if self.node_matches(*id, pattern) {
                    return vec![*id];
                } else {
                    return vec![];
                }
            }
        }"""
content = content.replace(fn_old, fn_new)


fean_old = """    fn find_edges_and_nodes(
        &self,
        start_id: usize,
        rel_pattern: &RelPattern,
        target_node_pattern: &NodePattern,
        env: &Environment,
    ) -> Vec<(usize, usize)> {
        let mut matches = Vec::new();
        let start_node = self.nodes.get_item(start_id).unwrap();

        // Pre-check if target is bound
        let target_bound_id = if let Some(var) = &target_node_pattern.variable {
            if let Some(GraphElement::Node(id)) = env.get(var) {
                Some(*id)
            } else {
                None
            }
        } else {
            None
        };"""
fean_new = """    fn find_edges_and_nodes(
        &self,
        start_id: usize,
        rel_pattern: &RelPattern,
        target_node_pattern: &NodePattern,
        in_res: &ResultSet,
        row_idx: usize,
    ) -> Vec<(usize, usize)> {
        let mut matches = Vec::new();
        let start_node = self.nodes.get_item(start_id).unwrap();

        // Pre-check if target is bound
        let target_bound_id = if let Some(var) = &target_node_pattern.variable {
            if let Some(GraphElement::Node(id)) = in_res.get(row_idx, var) {
                Some(*id)
            } else {
                None
            }
        } else {
            None
        };"""
content = content.replace(fean_old, fean_new)

fean_var_old = """                // If edge variable is bound, ensure it's the same edge
                if let Some(var) = &rel_pattern.variable {
                    if let Some(GraphElement::Edge(eid)) = env.get(var) {
                        if *eid != edge_id {
                            continue;
                        }
                    }
                }"""
fean_var_new = """                // If edge variable is bound, ensure it's the same edge
                if let Some(var) = &rel_pattern.variable {
                    if let Some(GraphElement::Edge(eid)) = in_res.get(row_idx, var) {
                        if *eid != edge_id {
                            continue;
                        }
                    }
                }"""
content = content.replace(fean_var_old, fean_var_new)

with open("src/graph.rs", "w") as f:
    f.write(content)
