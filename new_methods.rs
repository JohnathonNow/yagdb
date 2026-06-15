
impl Graph {
    pub fn find_nodes_env(&self, pattern: &NodePattern, env: &Environment) -> Vec<usize> {
        let bound_id = if let Some(var) = &pattern.variable {
            if let Some(GraphElement::Node(id)) = env.get(var) {
                Some(*id)
            } else { None }
        } else { None };

        if let Some(id) = bound_id {
            if self.node_matches_env(id, pattern, env) {
                return vec![id];
            } else {
                return Vec::new();
            }
        }

        let mut candidate_ids = Vec::new();

        if let Some(label_name) = &pattern.label {
            if let Some(label_id) = self.labels.get(label_name) {
                let mut used_index = false;
                for (prop_name, prop_value) in &pattern.properties {
                    if let Some(label_indices) = self.indices.get(label_id) {
                        if let Some(prop_index) = label_indices.get(prop_name) {
                            if let Some(node_ids) = prop_index.get(prop_value) {
                                candidate_ids.extend(node_ids.iter().copied());
                                used_index = true;
                                break;
                            }
                        }
                    }
                }

                if !used_index {
                    for id in 0..self.nodes.len_items() {
                        if self.nodes.get_item(id).unwrap().labels.contains(label_id) {
                            candidate_ids.push(id);
                        }
                    }
                }
            } else {
                return Vec::new();
            }
        } else {
            for id in 0..self.nodes.len_items() {
                candidate_ids.push(id);
            }
        }

        let mut matched_nodes = Vec::new();
        for id in candidate_ids {
            if self.node_matches_env(id, pattern, env) {
                matched_nodes.push(id);
            }
        }
        matched_nodes
    }

    pub fn node_matches_env(&self, node_id: usize, pattern: &NodePattern, _env: &Environment) -> bool {
        if self.nodes.get_item(node_id).unwrap().deleted { return false; }
        let node = self.nodes.get_item(node_id).unwrap();

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

    pub fn edge_matches_env(&self, edge_id: usize, pattern: &RelPattern, _env: &Environment) -> bool {
        if self.edges.get_item(edge_id).unwrap().deleted { return false; }
        let edge = self.edges.get_item(edge_id).unwrap();

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

    pub fn evaluate_condition_env(&self, condition: &Condition, env: &Environment) -> bool {
        match condition {
            Condition::And(left, right) => {
                self.evaluate_condition_env(left, env) && self.evaluate_condition_env(right, env)
            }
            Condition::Or(left, right) => {
                self.evaluate_condition_env(left, env) || self.evaluate_condition_env(right, env)
            }
            Condition::Not(inner) => !self.evaluate_condition_env(inner, env),
            Condition::Compare { left, op, right } => {
                let l_val = self.evaluate_expression_env(left, env);
                let r_val = self.evaluate_expression_env(right, env);
                l_val.compare(&r_val, op)
            }
        }
    }

    pub fn evaluate_expression_env(&self, expr: &Expression, env: &Environment) -> EvalValue {
        match expr {
            Expression::StringLiteral(s) => EvalValue::String(s.clone()),
            Expression::NumberLiteral(n) => EvalValue::Number(n.clone()),
            Expression::BooleanLiteral(b) => EvalValue::Boolean(b.clone()),
            Expression::Variable(var) => {
                if let Some(element) = env.get(var) {
                    match element {
                        GraphElement::Number(n) => EvalValue::Number(n.clone()),
                        GraphElement::String(ref s) => EvalValue::String(s.clone()),
                        GraphElement::Boolean(b) => EvalValue::Boolean(b.clone()),
                        GraphElement::Null => EvalValue::Null,
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
                    EvalValue::Number(0f64)
                } else {
                    EvalValue::Null
                }
            }
            Expression::Property(var, prop) => {
                if let Some(element) = env.get(var) {
                    let prop_val = match element {
                        GraphElement::Node(id) => self.nodes.get_item(*id).unwrap().properties.get(prop).cloned(),
                        GraphElement::Edge(id) => self.edges.get_item(*id).unwrap().properties.get(prop).cloned(),
                        _ => None,
                    };
                    match prop_val {
                        Some(crate::property::PropertyValue::String(s)) => {
                            EvalValue::String(s.clone())
                        }
                        Some(crate::property::PropertyValue::Number(n)) => EvalValue::Number(n.clone()),
                        Some(crate::property::PropertyValue::Boolean(b)) => EvalValue::Boolean(b.clone()),
                        None => EvalValue::Null,
                    }
                } else {
                    EvalValue::Null
                }
            }
        }
    }

    pub fn execute_create_path_env(&mut self, path: Path, env: &Environment, bindings: &mut Vec<(String, GraphElement)>) {
        let mut path_elements = Vec::new();
        let start_id = self.create_node_env(&path.start, env, bindings);
        path_elements.push(GraphElement::Node(start_id));
        let mut current_id = start_id;

        let bound_var = path.bound_variable.clone();
        for (rel, target_node) in path.edges {
            let next_id = self.create_node_env(&target_node, env, bindings);
            let rel_id = self.create_rel(&rel, current_id, next_id);
            path_elements.push(GraphElement::Edge(rel_id));
            path_elements.push(GraphElement::Node(next_id));
            if let Some(var) = &rel.variable {
                bindings.push((var.clone(), GraphElement::Edge(rel_id)));
            }
            current_id = next_id;
        }

        if let Some(bv) = bound_var {
            bindings.push((bv, GraphElement::Path(path_elements)));
        }
    }

    pub fn create_node_env(&mut self, pattern: &NodePattern, env: &Environment, bindings: &mut Vec<(String, GraphElement)>) -> usize {
        if let Some(var) = &pattern.variable {
            if let Some(GraphElement::Node(id)) = env.get(var) {
                return *id;
            }
            for (k, v) in bindings.iter() {
                if k == var {
                    if let GraphElement::Node(id) = v {
                        return *id;
                    }
                }
            }
        }

        let label_id = if let Some(label) = &pattern.label {
            self.get_or_add_label(label)
        } else {
            self.get_or_add_label("Node")
        };

        let node_id = self.add_node(label_id, pattern.properties.clone());

        if let Some(var) = &pattern.variable {
            bindings.push((var.clone(), GraphElement::Node(node_id)));
        }

        node_id
    }

    pub fn bind_path(&self, path: &Path, env: &mut Environment) {
        if let Some(bound_var) = &path.bound_variable {
            let mut path_elements = Vec::new();
            let start_var = path.start.variable.clone().unwrap_or_else(|| "_anon_start".to_string());
            if let Some(el) = env.get(&start_var) {
                path_elements.push(el.clone());
            }

            for (idx, (rel, target)) in path.edges.iter().enumerate() {
                let rel_var = rel.variable.clone().unwrap_or_else(|| format!("_anon_rel_{}", idx));
                let target_var = target.variable.clone().unwrap_or_else(|| format!("_anon_node_{}", idx));

                if let Some(el) = env.get(&rel_var) {
                    if let GraphElement::EdgeArray(arr) = el {
                        for e in arr {
                            path_elements.push(GraphElement::Edge(*e));
                        }
                    } else {
                        path_elements.push(el.clone());
                    }
                }
                if let Some(el) = env.get(&target_var) {
                    path_elements.push(el.clone());
                }
            }
            env.insert(bound_var.clone(), GraphElement::Path(path_elements));
        }
    }

    pub fn execute_set_env(&mut self, var: &str, key: &str, value: &crate::property::PropertyValue, env: &Environment) {
        if let Some(GraphElement::Node(node_id)) = env.get(var) {
            let node_id = *node_id;
            let mut __node = self.nodes.get_item(node_id).unwrap();
            let old_value = __node.properties.insert(key.to_string(), value.clone());
            self.nodes.update_item(node_id, __node);

            for (label_id, label_indices) in self.indices.iter_mut() {
                if self.nodes.get_item(node_id).unwrap().labels.contains(label_id) {
                    if let Some(prop_index) = label_indices.get_mut(key) {
                        if let Some(old_val) = &old_value {
                            if let Some(vec) = prop_index.get_mut(old_val) {
                                vec.retain(|&id| id != node_id);
                            }
                        }
                        let entry_vec = prop_index.entry(value.clone()).or_insert_with(Vec::new);
                        if !entry_vec.contains(&node_id) {
                            entry_vec.push(node_id);
                        }
                    }
                }
            }
            self.log_wal(&WalEntry::SetNodeProperty {
                node_id,
                key: key.to_string(),
                value: value.clone(),
            });
        }
    }

    pub fn execute_delete_env(&mut self, vars: &[String], env: &Environment) {
        let mut nodes_to_delete = Vec::new();
        let mut edges_to_delete = Vec::new();
        for var in vars {
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

        for &edge_id in &edges_to_delete {
            if !self.edges.get_item(edge_id).unwrap().deleted {
                { let mut e = self.edges.get_item(edge_id).unwrap(); e.deleted = true; self.edges.update_item(edge_id, e); }
                self.log_wal(&WalEntry::DeleteEdge { edge_id });
            }
        }

        for &node_id in &nodes_to_delete {
            if !self.nodes.get_item(node_id).unwrap().deleted {
                { let mut n = self.nodes.get_item(node_id).unwrap(); n.deleted = true; self.nodes.update_item(node_id, n); }
                for (label_id, label_indices) in self.indices.iter_mut() {
                    if self.nodes.get_item(node_id).unwrap().labels.contains(label_id) {
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

    pub fn find_edges_and_nodes_env(
        &self,
        start_id: usize,
        rel_pattern: &RelPattern,
        target_pattern: &NodePattern,
        env: &Environment,
    ) -> Vec<(usize, usize)> {
        let mut results = Vec::new();
        if self.nodes.get_item(start_id).unwrap().deleted { return results; }

        let target_bound_id = if let Some(var) = &target_pattern.variable {
            if let Some(GraphElement::Node(id)) = env.get(var) {
                Some(*id)
            } else { None }
        } else { None };

        let start_node = self.nodes.get_item(start_id).unwrap();

        for &edge_id in &start_node.edges {
            if self.edges.get_item(edge_id).unwrap().deleted { continue; }
            let edge = self.edges.get_item(edge_id).unwrap();

            if edge.start == start_id {
                if let Some(bound_id) = target_bound_id {
                    if edge.end != bound_id { continue; }
                }
                if self.edge_matches_env(edge_id, rel_pattern, env) && self.node_matches_env(edge.end, target_pattern, env) {
                    results.push((edge.end, edge_id));
                }
            } else if edge.end == start_id { // Added fallback for both direction edge traversals (bidirectional/inbound)
                if let Some(bound_id) = target_bound_id {
                    if edge.start != bound_id { continue; }
                }
                if self.edge_matches_env(edge_id, rel_pattern, env) && self.node_matches_env(edge.start, target_pattern, env) {
                    results.push((edge.start, edge_id));
                }
            }
        }
        results
    }

    pub fn match_edges_lazy(
        &mut self,
        edges: &[(RelPattern, NodePattern)],
        edge_idx: usize,
        current_node_id: usize,
        env: Environment,
        limit: Option<usize>,
        yield_row: &mut dyn FnMut(&mut Self, Environment) -> bool,
    ) -> bool {
        if edge_idx >= edges.len() {
            return yield_row(self, env);
        }

        let (rel_pattern, target_node_pattern) = &edges[edge_idx];

        if let Some((min_len, max_len)) = rel_pattern.length {
            if min_len != 1 || max_len != Some(1) {
                return self.match_var_length_edges_lazy(
                    edges,
                    edge_idx,
                    current_node_id,
                    env,
                    min_len,
                    max_len,
                    0,
                    Vec::new(),
                    limit,
                    yield_row,
                );
            }
        }

        let matches = self.find_edges_and_nodes_env(
            current_node_id,
            rel_pattern,
            target_node_pattern,
            &env,
        );

        let mut count = 0;
        for (next_node_id, edge_id) in matches {
            let mut next_env = env.clone();
            if let Some(var) = &rel_pattern.variable {
                next_env.insert(var.clone(), GraphElement::Edge(edge_id));
            }
            if let Some(var) = &target_node_pattern.variable {
                next_env.insert(var.clone(), GraphElement::Node(next_node_id));
            }

            if !self.match_edges_lazy(edges, edge_idx + 1, next_node_id, next_env, limit, yield_row) {
                return false;
            }
            count += 1;
            if limit.is_some_and(|l| count >= l) { return false; }
        }
        true
    }

    #[allow(clippy::too_many_arguments)]
    pub fn match_var_length_edges_lazy(
        &mut self,
        edges: &[(RelPattern, NodePattern)],
        edge_idx: usize,
        current_node_id: usize,
        env: Environment,
        min_len: usize,
        max_len: Option<usize>,
        current_depth: usize,
        path_edges: Vec<usize>,
        limit: Option<usize>,
        yield_row: &mut dyn FnMut(&mut Self, Environment) -> bool,
    ) -> bool {
        let (rel_pattern, target_node_pattern) = &edges[edge_idx];
        let mut cont = true;

        if current_depth >= min_len {
            let target_bound_id = if let Some(var) = &target_node_pattern.variable {
                if let Some(GraphElement::Node(id)) = env.get(var) {
                    Some(*id)
                } else { None }
            } else { None };

            let matches_target = if let Some(bound_id) = target_bound_id {
                current_node_id == bound_id
            } else {
                true
            } && self.node_matches_env(current_node_id, target_node_pattern, &env);

            if matches_target {
                let mut next_env = env.clone();
                if let Some(var) = &rel_pattern.variable {
                    next_env.insert(var.clone(), GraphElement::EdgeArray(path_edges.clone()));
                }
                if let Some(var) = &target_node_pattern.variable {
                    next_env.insert(var.clone(), GraphElement::Node(current_node_id));
                }

                if !self.match_edges_lazy(edges, edge_idx + 1, current_node_id, next_env, limit, yield_row) {
                    return false;
                }
            }
        }

        if let Some(max) = max_len {
            if current_depth >= max {
                return cont;
            }
        }

        let start_node = self.nodes.get_item(current_node_id).unwrap();
        let start_edges = start_node.edges.clone();

        for edge_id in start_edges {
            let edge = self.edges.get_item(edge_id).unwrap();

            if edge.start == current_node_id {
                if path_edges.contains(&edge_id) { continue; }
                if !self.edge_matches_env(edge_id, rel_pattern, &env) { continue; }
                let end_node_id = edge.end;
                let mut new_path_edges = path_edges.clone();
                new_path_edges.push(edge_id);

                if !self.match_var_length_edges_lazy(edges, edge_idx, end_node_id, env.clone(), min_len, max_len, current_depth + 1, new_path_edges, limit, yield_row) {
                    return false;
                }
            } else if edge.end == current_node_id {
                if path_edges.contains(&edge_id) { continue; }
                if !self.edge_matches_env(edge_id, rel_pattern, &env) { continue; }
                let end_node_id = edge.start;
                let mut new_path_edges = path_edges.clone();
                new_path_edges.push(edge_id);

                if !self.match_var_length_edges_lazy(edges, edge_idx, end_node_id, env.clone(), min_len, max_len, current_depth + 1, new_path_edges, limit, yield_row) {
                    return false;
                }
            }
        }
        cont
    }

    pub fn evaluate_with(
        &self,
        result_set: &ResultSet,
        items: &[ProjectionItem],
        order_by_opt: &Option<Vec<OrderItem>>,
        limit: Option<usize>,
        _is_return: bool,
    ) -> ResultSet {
        let items: Vec<ProjectionItem> =
            if items.len() == 1 && matches!(items[0], ProjectionItem::Star) {
                let mut keys: Vec<String> = result_set.columns.keys()
                    .filter(|k| !k.starts_with("_anon_"))
                    .cloned()
                    .collect();
                keys.sort();
                keys.into_iter().map(ProjectionItem::Variable).collect()
            } else {
                items.to_vec()
            };

        let mut has_aggregate = false;
        let mut grouping_keys = Vec::new();

        for item in &items {
            match item {
                ProjectionItem::Aggregate { .. } => has_aggregate = true,
                ProjectionItem::Variable(var) => grouping_keys.push(var.clone()),
                ProjectionItem::AliasedVariable(var, _) => grouping_keys.push(var.clone()),
                ProjectionItem::Function { .. } | ProjectionItem::Star => {}
            }
        }

        let mut final_res = ResultSet::new();

        if has_aggregate {
            let mut groups: Vec<(Vec<Option<GraphElement>>, Vec<usize>)> = Vec::new();

            for i in 0..result_set.rows {
                let key: Vec<Option<GraphElement>> =
                    grouping_keys.iter().map(|k| result_set.get(i, k).cloned()).collect();

                if let Some((_, group_rows)) = groups.iter_mut().find(|(k, _)| *k == key) {
                    group_rows.push(i);
                } else {
                    groups.push((key, vec![i]));
                }
            }

            for (_idx_group, (_group_key, group_rows)) in groups.into_iter().enumerate() {
                let mut bindings = Vec::new();
                for item in &items {
                    match item {
                        ProjectionItem::Variable(var) => {
                            if let Some(first_idx) = group_rows.first() {
                                if let Some(val) = result_set.get(*first_idx, var) {
                                    bindings.push((var.clone(), val.clone()));
                                }
                            }
                        }
                        ProjectionItem::AliasedVariable(var, alias) => {
                            if let Some(first_idx) = group_rows.first() {
                                if let Some(val) = result_set.get(*first_idx, var) {
                                    bindings.push((alias.clone(), val.clone()));
                                }
                            }
                        }
                        ProjectionItem::Aggregate { func, var, alias } => {
                            let out_key = alias.clone().unwrap_or_else(|| format!("{}({})", func, var));
                            match func.as_str() {
                                "COUNT" => {
                                    let count = if var == "*" {
                                        group_rows.len()
                                    } else {
                                        group_rows.iter().filter(|&&i| result_set.get(i, var).is_some()).count()
                                    };
                                    bindings.push((out_key, GraphElement::Number(count as f64)));
                                }
                                "COLLECT" => {
                                    let mut elements = Vec::new();
                                    for &i in &group_rows {
                                        if let Some(val) = result_set.get(i, var) {
                                            elements.push(val.clone());
                                        }
                                    }
                                    bindings.push((out_key, GraphElement::List(elements)));
                                }
                                "UNIQUE" => {
                                    let mut elements = Vec::new();
                                    for &i in &group_rows {
                                        if let Some(val) = result_set.get(i, var) {
                                            if !elements.contains(val) {
                                                elements.push(val.clone());
                                            }
                                        }
                                    }
                                    bindings.push((out_key, GraphElement::List(elements)));
                                }
                                _ => {}
                            }
                        }
                        ProjectionItem::Function { func, alias, .. } => {
                            let out_key = alias.clone().unwrap_or_else(|| format!("{}()", func));
                            if func.eq_ignore_ascii_case("rand") {
                                bindings.push((out_key, GraphElement::Number(0f64)));
                            }
                        }
                        ProjectionItem::Star => {}
                    }
                }
                let mut env = Environment::new();
                for (k, v) in bindings {
                    env.insert(k, v);
                }
                final_res.push_row(&env);
            }
        } else {
            for i in 0..result_set.rows {
                let mut env = Environment::new();
                for item in &items {
                    match item {
                        ProjectionItem::Variable(var) => {
                            if let Some(val) = result_set.get(i, var).cloned() {
                                env.insert(var.clone(), val);
                            }
                        }
                        ProjectionItem::AliasedVariable(var, alias) => {
                            if let Some(val) = result_set.get(i, var).cloned() {
                                env.insert(alias.clone(), val);
                            }
                        }
                        ProjectionItem::Function { func, alias, .. } => {
                            let out_key = alias.clone().unwrap_or_else(|| format!("{}()", func));
                            if func.eq_ignore_ascii_case("rand") {
                                env.insert(out_key, GraphElement::Number(0f64));
                            }
                        }
                        _ => {}
                    }
                }
                final_res.push_row(&env);
            }
        }

        if let Some(order_items) = order_by_opt {
            let mut env_with_keys: Vec<(Vec<EvalValue>, usize)> = (0..final_res.rows).map(|i| {
                let keys = order_items.iter().map(|item| {
                    self.evaluate_expression_env(&item.expr, &final_res.get_row(i))
                }).collect();
                (keys, i)
            }).collect();

            env_with_keys.sort_by(|a, b| {
                for (idx, item) in order_items.iter().enumerate() {
                    let key_a = &a.0[idx];
                    let key_b = &b.0[idx];
                    let mut cmp = key_a.partial_cmp(key_b).unwrap_or(std::cmp::Ordering::Equal);
                    if !item.asc { cmp = cmp.reverse(); }
                    if cmp != std::cmp::Ordering::Equal { return cmp; }
                }
                std::cmp::Ordering::Equal
            });

            let mut sorted_res = ResultSet::new();
            for (_, original_idx) in env_with_keys {
                sorted_res.push_row(&final_res.get_row(original_idx));
            }
            final_res = sorted_res;
        }

        if let Some(l) = limit {
            final_res.truncate(l);
        }

        final_res
    }

    pub fn format_return_json(
        &self,
        final_res: &ResultSet,
        items: &[ProjectionItem],
    ) -> String {
        let items: Vec<ProjectionItem> =
            if items.len() == 1 && matches!(items[0], ProjectionItem::Star) {
                let mut keys: Vec<String> = final_res.columns.keys()
                    .filter(|k| !k.starts_with("_anon_"))
                    .cloned()
                    .collect();
                keys.sort();
                keys.into_iter().map(ProjectionItem::Variable).collect()
            } else {
                items.to_vec()
            };

        let mut results_json = Vec::new();
        for i in 0..final_res.rows {
            let mut row = serde_json::Map::new();
            for item in &items {
                let key = match item {
                    ProjectionItem::Variable(var) => var.clone(),
                    ProjectionItem::AliasedVariable(_, alias) => alias.clone(),
                    ProjectionItem::Aggregate { func, var, alias } => alias
                        .clone()
                        .unwrap_or_else(|| format!("{}({})", func, var)),
                    ProjectionItem::Function { func, alias, .. } => alias
                        .clone()
                        .unwrap_or_else(|| format!("{}()", func)),
                    ProjectionItem::Star => continue,
                };
                if let Some(element) = final_res.get(i, &key) {
                    row.insert(key, self.element_to_json(element));
                } else {
                    row.insert(key, serde_json::Value::Null);
                }
            }
            if !row.is_empty() {
                results_json.push(serde_json::Value::Object(row));
            }
        }
        if !results_json.is_empty() {
            serde_json::to_string_pretty(&results_json).unwrap()
        } else {
            String::new()
        }
    }

    fn run_pipeline(
        &mut self,
        steps: &[ExecutionStep],
        step_idx: usize,
        env: Environment,
        yield_row: &mut dyn FnMut(&mut Self, Environment) -> bool,
    ) -> bool {
        if step_idx == steps.len() {
            return yield_row(self, env);
        }

        match &steps[step_idx] {
            ExecutionStep::Match(plan_opt, paths, condition_opt, limit_opt) => {
                if let Some(plan) = plan_opt {
                    let mut count = 0;
                    let mut cont = true;

                    let limit_for_plan = if condition_opt.is_none() { *limit_opt } else { None };

                    self.execute_plan_lazy(plan, env, limit_for_plan, &mut |graph, mut matched_env| {
                        for path in paths {
                            graph.bind_path(path, &mut matched_env);
                        }

                        if let Some(cond) = condition_opt {
                            if !graph.evaluate_condition_env(cond, &matched_env) {
                                return true;
                            }
                        }

                        if let Some(l) = limit_opt {
                            if count >= *l {
                                return false;
                            }
                        }
                        count += 1;

                        if !graph.run_pipeline(steps, step_idx + 1, matched_env, yield_row) {
                            cont = false;
                            return false;
                        }
                        true
                    });
                    return cont;
                }
                true
            }
            ExecutionStep::Create(paths) => {
                let mut bindings = Vec::new();
                for path in paths {
                    self.execute_create_path_env(path.clone(), &env, &mut bindings);
                }
                let mut new_env = env.clone();
                for (k, v) in bindings {
                    new_env.insert(k, v);
                }
                self.run_pipeline(steps, step_idx + 1, new_env, yield_row)
            }
            ExecutionStep::Merge(planned_paths) => {
                let mut new_env = env.clone();
                for (plan_opt, path) in planned_paths {
                    if let Some(plan) = plan_opt {
                        let mut matches = Vec::new();
                        self.execute_plan_lazy(plan, env.clone(), None, &mut |_graph, matched_env| {
                            matches.push(matched_env);
                            true
                        });

                        if !matches.is_empty() {
                            for mut m_env in matches {
                                self.bind_path(path, &mut m_env);
                                for (k, v) in m_env {
                                    new_env.insert(k, v);
                                }
                            }
                        } else {
                            let mut bindings = Vec::new();
                            self.execute_create_path_env(path.clone(), &env, &mut bindings);
                            for (k, v) in bindings {
                                new_env.insert(k, v);
                            }
                        }
                    } else {
                        let mut bindings = Vec::new();
                        self.execute_create_path_env(path.clone(), &env, &mut bindings);
                        for (k, v) in bindings {
                            new_env.insert(k, v);
                        }
                    }
                }
                self.run_pipeline(steps, step_idx + 1, new_env, yield_row)
            }
            ExecutionStep::Set(var, key, value) => {
                self.execute_set_env(var, key, value, &env);
                self.run_pipeline(steps, step_idx + 1, env, yield_row)
            }
            ExecutionStep::Delete(vars) => {
                self.execute_delete_env(vars, &env);
                self.run_pipeline(steps, step_idx + 1, env, yield_row)
            }
            ExecutionStep::Unwind(items) => {
                let mut cont = true;
                for item in items {
                    match item {
                        ProjectionItem::Variable(var) => {
                            if let Some(GraphElement::List(v)) = env.get(var) {
                                for x in v.clone() {
                                    let mut new_env = env.clone();
                                    new_env.insert(var.clone(), x);
                                    if !self.run_pipeline(steps, step_idx + 1, new_env, yield_row) {
                                        cont = false;
                                        break;
                                    }
                                }
                            }
                        }
                        _ => {}
                    }
                }
                cont
            }
            ExecutionStep::CreateIndex { label, property } => {
                let label_id = self.get_or_add_label(label);
                self.create_index(label_id, property.clone());
                self.run_pipeline(steps, step_idx + 1, env, yield_row)
            }
            _ => true,
        }
    }

    pub fn execute_plan_lazy(
        &mut self,
        plan: &PlanNode,
        env: Environment,
        limit: Option<usize>,
        yield_row: &mut dyn FnMut(&mut Self, Environment) -> bool,
    ) -> bool {
        match plan {
            PlanNode::FullNodeScan { pattern } => {
                let nodes = self.find_nodes_env(pattern, &env);
                let mut count = 0;
                for node_id in nodes {
                    let mut new_env = env.clone();
                    if let Some(var) = &pattern.variable {
                        new_env.insert(var.clone(), GraphElement::Node(node_id));
                    }
                    if !yield_row(self, new_env) { return false; }
                    count += 1;
                    if limit.is_some_and(|l| count >= l) { return false; }
                }
                true
            }
            PlanNode::NodeLabelLookup { label, pattern } => {
                let mut matched_nodes = Vec::new();
                if let Some(label_id) = self.labels.get(label) {
                    for id in 0..self.nodes.len_items() {
                        if self.nodes.get_item(id).unwrap().labels.contains(label_id)
                            && self.node_matches_env(id, pattern, &env)
                        {
                            matched_nodes.push(id);
                        }
                    }
                }

                let mut count = 0;
                for node_id in matched_nodes {
                    let mut new_env = env.clone();
                    if let Some(var) = &pattern.variable {
                        new_env.insert(var.clone(), GraphElement::Node(node_id));
                    }
                    if !yield_row(self, new_env) { return false; }
                    count += 1;
                    if limit.is_some_and(|l| count >= l) { return false; }
                }
                true
            }
            PlanNode::NodeIndexLookup { label, property, value, pattern } => {
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
                let mut count = 0;
                for node_id in candidate_ids {
                    if self.node_matches_env(node_id, pattern, &env) {
                        let mut new_env = env.clone();
                        if let Some(var) = &pattern.variable {
                            new_env.insert(var.clone(), GraphElement::Node(node_id));
                        }
                        if !yield_row(self, new_env) { return false; }
                        count += 1;
                        if limit.is_some_and(|l| count >= l) { return false; }
                    }
                }
                true
            }
            PlanNode::PathExpand { source, source_node_pattern, rel_pattern, target_node_pattern } => {
                let mut cont = true;
                self.execute_plan_lazy(source, env, None, &mut |graph, source_env| {
                    let mut source_node_ids = Vec::new();
                    if let Some(var) = &source_node_pattern.variable {
                        if let Some(GraphElement::Node(id)) = source_env.get(var) {
                            source_node_ids.push(*id);
                        }
                    }
                    if source_node_ids.is_empty() {
                        source_node_ids = graph.find_nodes_env(source_node_pattern, &source_env);
                    }

                    for source_node_id in source_node_ids {
                        let edges = vec![(rel_pattern.clone(), target_node_pattern.clone())];
                        if !graph.match_edges_lazy(&edges, 0, source_node_id, source_env.clone(), limit, yield_row) {
                            cont = false;
                            return false;
                        }
                    }
                    true
                });
                cont
            }
            PlanNode::CrossProduct { left, right } => {
                let mut cont = true;
                self.execute_plan_lazy(left, env.clone(), None, &mut |graph, left_env| {
                    if !graph.execute_plan_lazy(right, left_env.clone(), limit, yield_row) {
                        cont = false;
                        return false;
                    }
                    true
                });
                cont
            }
            PlanNode::Intersect { left, right } => {
                let mut cont = true;
                self.execute_plan_lazy(left, env.clone(), None, &mut |graph, left_env| {
                    let mut found = false;
                    graph.execute_plan_lazy(right, env.clone(), None, &mut |_graph, right_env| {
                        let mut match_all = true;
                        for (k, v) in &left_env {
                            if let Some(rv) = right_env.get(k) {
                                if v != rv {
                                    match_all = false;
                                    break;
                                }
                            }
                        }
                        if match_all {
                            found = true;
                            return false;
                        }
                        true
                    });
                    if found {
                        if !yield_row(graph, left_env) {
                            cont = false;
                            return false;
                        }
                    }
                    true
                });
                cont
            }
            PlanNode::Union { left, right } => {
                if !self.execute_plan_lazy(left, env.clone(), limit, yield_row) { return false; }
                self.execute_plan_lazy(right, env, limit, yield_row)
            }
        }
    }
}
