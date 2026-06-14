import sys

with open("src/graph.rs", "r") as f:
    content = f.read()

# Fix empty slices
content = content.replace("&[]", "&[] as &[(&str, GraphElement)]")

# Fix evaluate_expression inside ORDER BY
ob_old = """                    if let Some(order_items) = order_by_opt {
                        let mut env_with_keys: Vec<(Vec<EvalValue>, Environment)> = final_envs.into_iter().map(|env| {
                            let keys = order_items.iter().map(|item| {
                                self.evaluate_expression(&item.expr, &env)
                            }).collect();
                            (keys, env)
                        }).collect();"""

ob_new = """                    if let Some(order_items) = order_by_opt {
                        // wait, final_envs is Vec<Environment>, but evaluate_expression takes ResultSet now.
                        // Instead of modifying final_envs grouping here, we can create a temporary ResultSet for evaluation.
                        let mut env_with_keys: Vec<(Vec<EvalValue>, Environment)> = final_envs.into_iter().map(|env| {
                            let mut tmp_res = ResultSet::new();
                            tmp_res.push_row(&env);
                            let keys = order_items.iter().map(|item| {
                                self.evaluate_expression(&item.expr, &tmp_res, 0)
                            }).collect();
                            (keys, env)
                        }).collect();"""
content = content.replace(ob_old, ob_new)

with open("src/graph.rs", "w") as f:
    f.write(content)
