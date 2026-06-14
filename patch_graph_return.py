import sys

with open("src/graph.rs", "r") as f:
    content = f.read()

# Replace the WITH / RETURN block
ret_old = """                ExecutionStep::With(ref items, ref order_by_opt) | ExecutionStep::Return(ref items, ref order_by_opt, _) => {
                    let mut is_return = false;
                    let mut limit = None;
                    if let ExecutionStep::Return(_, _, l) = &step {
                        is_return = true;
                        limit = *l;
                    }

                    // Construct envs from result_set to avoid changing the complex Return grouping block for now
                    // Wait, we need to completely avoid creating `Vec<Environment>` across pipeline boundaries.
                    // But inside this specific terminal block it's okay. Still better to just collect it.
                    let mut envs = Vec::with_capacity(result_set.rows);
                    for i in 0..result_set.rows {
                        envs.push(result_set.get_row(i));
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
                                            grouped_env.insert(out_key, GraphElement::Number(0f64));
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
                                            projected_env.insert(out_key, GraphElement::Number(0f64));
                                        }
                                    }
                                    _ => {}
                                }
                            }
                            final_envs.push(projected_env);
                        }
                    }

                    if let Some(order_items) = order_by_opt {
                        // wait, final_envs is Vec<Environment>, but evaluate_expression takes ResultSet now.
                        // Instead of modifying final_envs grouping here, we can create a temporary ResultSet for evaluation.
                        let mut env_with_keys: Vec<(Vec<EvalValue>, Environment)> = final_envs.into_iter().map(|env| {
                            let mut tmp_res = ResultSet::new();
                            tmp_res.push_row(&env);
                            let keys = order_items.iter().map(|item| {
                                self.evaluate_expression(&item.expr, &tmp_res, 0)
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
                        let mut next_result_set = ResultSet::new();
                        for env in final_envs {
                            next_result_set.push_row(&env);
                        }
                        result_set = next_result_set;
                    }
                }"""

ret_new = """                ExecutionStep::With(ref items, ref order_by_opt) | ExecutionStep::Return(ref items, ref order_by_opt, _) => {
                    let mut is_return = false;
                    let mut limit = None;
                    if let ExecutionStep::Return(_, _, l) = &step {
                        is_return = true;
                        limit = *l;
                    }

                    // Handle Star conversion
                    let items: Vec<ProjectionItem> =
                        if items.len() == 1 && matches!(items[0], ProjectionItem::Star) {
                            let mut keys: Vec<String> = result_set.columns.keys()
                                .filter(|k| !k.starts_with("_anon_"))
                                .cloned()
                                .collect();
                            keys.sort();
                            keys.into_iter().map(ProjectionItem::Variable).collect()
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

                    let mut final_res = ResultSet::new();

                    if has_aggregate {
                        let mut groups: Vec<(Vec<Option<GraphElement>>, Vec<usize>)> = Vec::new();

                        for i in 0..result_set.rows {
                            let key: Vec<Option<GraphElement>> =
                                grouping_keys.iter().map(|k| result_set.get(i, k).cloned()).collect();

                            if let Some((_, group_rows)) =
                                groups.iter_mut().find(|(k, _)| *k == key)
                            {
                                group_rows.push(i);
                            } else {
                                groups.push((key, vec![i]));
                            }
                        }

                        // Compute aggregates per group
                        for (idx_group, (_group_key, group_rows)) in groups.into_iter().enumerate() {
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
                                        let out_key = alias
                                            .clone()
                                            .unwrap_or_else(|| format!("{}({})", func, var));

                                        match func.as_str() {
                                            "COUNT" => {
                                                let count = if var == "*" {
                                                    group_rows.len()
                                                } else {
                                                    group_rows
                                                        .iter()
                                                        .filter(|&&i| result_set.get(i, var).is_some())
                                                        .count()
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
                                    ProjectionItem::Function { func, args: _, alias } => {
                                        let out_key = alias
                                            .clone()
                                            .unwrap_or_else(|| format!("{}()", func));
                                        if func.eq_ignore_ascii_case("rand") {
                                            bindings.push((out_key, GraphElement::Number(0f64)));
                                        }
                                    }
                                    ProjectionItem::Star => {}
                                }
                            }
                            let bindings_ref: Vec<(&str, GraphElement)> = bindings.iter().map(|(k, v)| (k.as_str(), v.clone())).collect();
                            final_res.push_row_from(&result_set, 0, &bindings_ref as &[(&str, GraphElement)]);
                        }
                    } else {
                        // Simple projection without aggregation
                        for i in 0..result_set.rows {
                            let mut bindings = Vec::new();
                            for item in &items {
                                match item {
                                    ProjectionItem::Variable(var) => {
                                        if let Some(val) = result_set.get(i, var).cloned() {
                                            bindings.push((var.clone(), val));
                                        }
                                    }
                                    ProjectionItem::AliasedVariable(var, alias) => {
                                        if let Some(val) = result_set.get(i, var).cloned() {
                                            bindings.push((alias.clone(), val));
                                        }
                                    }
                                    ProjectionItem::Function { func, args: _, alias } => {
                                        let out_key = alias
                                            .clone()
                                            .unwrap_or_else(|| format!("{}()", func));
                                        if func.eq_ignore_ascii_case("rand") {
                                            bindings.push((out_key, GraphElement::Number(0f64)));
                                        }
                                    }
                                    _ => {}
                                }
                            }
                            let bindings_ref: Vec<(&str, GraphElement)> = bindings.iter().map(|(k, v)| (k.as_str(), v.clone())).collect();
                            final_res.push_row_from(&result_set, i, &bindings_ref as &[(&str, GraphElement)]);
                        }
                    }

                    if let Some(order_items) = order_by_opt {
                        let mut env_with_keys: Vec<(Vec<EvalValue>, usize)> = (0..final_res.rows).map(|i| {
                            let keys = order_items.iter().map(|item| {
                                self.evaluate_expression(&item.expr, &final_res, i)
                            }).collect();
                            (keys, i)
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

                        let mut sorted_res = ResultSet::new();
                        for (_, original_idx) in env_with_keys {
                            sorted_res.push_row_from(&final_res, original_idx, &[] as &[(&str, GraphElement)]);
                        }
                        final_res = sorted_res;
                    }

                    if is_return {
                        let len = final_res.rows;
                        let iter = match limit {
                            Some(l) => 0..std::cmp::min(l, len),
                            None => 0..len,
                        };
                        let mut results_json = Vec::new();
                        for i in iter {
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
                                if let Some(element) = final_res.get(i, &key) {
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
                        result_set = final_res;
                    }
                }"""

content = content.replace(ret_old, ret_new)

with open("src/graph.rs", "w") as f:
    f.write(content)
