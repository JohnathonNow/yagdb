import sys

with open("src/graph.rs", "r") as f:
    content = f.read()

execute_match_old = """                ExecutionStep::Match(plan_opt, paths, condition_opt) => {
                    if let Some(plan) = plan_opt {
                        let mut new_result_set = ResultSet::new();
                        for i in 0..result_set.rows {
                            let env = result_set.get_row(i);
                            let matches = self.execute_plan_and_bind_paths(
                                &plan,
                                &paths,
                                &env,
                                &mut profile_out,
                            );
                            for m in matches {
                                if let Some(cond) = &condition_opt {
                                    if !self.evaluate_condition(cond, &m) { continue; }
                                }
                                new_result_set.push_row(&m);
                            }
                        }
                        result_set = new_result_set;
                        if result_set.is_empty() {
                            break;
                        }
                    }
                }"""
execute_match_new = """                ExecutionStep::Match(plan_opt, paths, condition_opt) => {
                    if let Some(plan) = plan_opt {
                        let mut new_result_set = ResultSet::new();
                        self.execute_plan_and_bind_paths(
                            &plan,
                            &paths,
                            &result_set,
                            &mut new_result_set,
                            &mut profile_out,
                        );

                        if let Some(cond) = &condition_opt {
                            let mut filtered = ResultSet::new();
                            for i in 0..new_result_set.rows {
                                if self.evaluate_condition(cond, &new_result_set, i) {
                                    filtered.push_row_from(&new_result_set, i, &[]);
                                }
                            }
                            new_result_set = filtered;
                        }

                        result_set = new_result_set;
                        if result_set.is_empty() {
                            break;
                        }
                    }
                }"""
content = content.replace(execute_match_old, execute_match_new)


execute_create_old = """                ExecutionStep::Create(paths) => {
                    let mut new_result_set = ResultSet::new();
                    for i in 0..result_set.rows {
                        let mut env = result_set.get_row(i);
                        for path in &paths {
                            self.execute_create_path(path.clone(), &mut env);
                        }
                        new_result_set.push_row(&env);
                    }
                    result_set = new_result_set;
                }"""
execute_create_new = """                ExecutionStep::Create(paths) => {
                    let mut new_result_set = ResultSet::new();
                    for i in 0..result_set.rows {
                        let mut bindings = Vec::new();
                        for path in &paths {
                            self.execute_create_path(path.clone(), &result_set, i, &mut bindings);
                        }
                        new_result_set.push_row_from(&result_set, i, &bindings);
                    }
                    result_set = new_result_set;
                }"""
content = content.replace(execute_create_old, execute_create_new)

execute_merge_old = """                ExecutionStep::Merge(planned_paths) => {
                    let mut new_result_set = ResultSet::new();
                    for i in 0..result_set.rows {
                        let env = result_set.get_row(i);
                        for (plan_opt, path) in &planned_paths {
                            if let Some(plan) = plan_opt {
                                let matches = self.execute_plan_and_bind_paths(
                                    plan,
                                    &[path.clone()],
                                    &env,
                                    &mut profile_out,
                                );
                                if !matches.is_empty() {
                                    for m in matches {
                                        new_result_set.push_row(&m);
                                    }
                                } else {
                                    let mut create_env = env.clone();
                                    self.execute_create_path(path.clone(), &mut create_env);
                                    new_result_set.push_row(&create_env);
                                }
                            } else {
                                let mut create_env = env.clone();
                                self.execute_create_path(path.clone(), &mut create_env);
                                new_result_set.push_row(&create_env);
                            }
                        }
                    }
                    result_set = new_result_set;
                }"""
execute_merge_new = """                ExecutionStep::Merge(planned_paths) => {
                    let mut new_result_set = ResultSet::new();
                    for i in 0..result_set.rows {
                        for (plan_opt, path) in &planned_paths {
                            if let Some(plan) = plan_opt {
                                let mut single_res = ResultSet::new();
                                single_res.push_row_from(&result_set, i, &[]);

                                let mut matches = ResultSet::new();
                                self.execute_plan_and_bind_paths(
                                    plan,
                                    &[path.clone()],
                                    &single_res,
                                    &mut matches,
                                    &mut profile_out,
                                );
                                if !matches.is_empty() {
                                    for m_idx in 0..matches.rows {
                                        new_result_set.push_row_from(&matches, m_idx, &[]);
                                    }
                                } else {
                                    let mut bindings = Vec::new();
                                    self.execute_create_path(path.clone(), &result_set, i, &mut bindings);
                                    new_result_set.push_row_from(&result_set, i, &bindings);
                                }
                            } else {
                                let mut bindings = Vec::new();
                                self.execute_create_path(path.clone(), &result_set, i, &mut bindings);
                                new_result_set.push_row_from(&result_set, i, &bindings);
                            }
                        }
                    }
                    result_set = new_result_set;
                }"""
content = content.replace(execute_merge_old, execute_merge_new)

# E0502: cannot borrow `out` as immutable because it is also borrowed as mutable
col_borrow_old = """                    let col = out.columns.entry(bound_var.clone()).or_insert_with(|| vec![GraphElement::Null; out.rows]);"""
col_borrow_new = """                    let current_rows = out.rows;
                    let col = out.columns.entry(bound_var.clone()).or_insert_with(|| vec![GraphElement::Null; current_rows]);"""
content = content.replace(col_borrow_old, col_borrow_new)

with open("src/graph.rs", "w") as f:
    f.write(content)
