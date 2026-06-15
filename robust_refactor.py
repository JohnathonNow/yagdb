import re

with open("src/graph.rs", "r") as f:
    content = f.read()

def find_block(start_str):
    start = content.find(start_str)
    if start == -1:
        return -1, -1

    open_brace = content.find('{', start)
    if open_brace == -1:
        return -1, -1

    depth = 1
    in_string = False
    in_char = False
    for i in range(open_brace + 1, len(content)):
        c = content[i]
        if c == '"' and content[i-1] != '\\' and not in_char:
            in_string = not in_string
        elif c == "'" and content[i-1] != '\\' and not in_string:
            in_char = not in_char
        elif not in_string and not in_char:
            if c == '{':
                depth += 1
            elif c == '}':
                depth -= 1
                if depth == 0:
                    return start, i + 1
    return -1, -1

exec_start = content.find('pub fn execute(&mut self, query_str: &str) -> Result<String, String>')
exec_end = content.find('fn execute_create_path(', exec_start)
exec_end = content.rfind('\n', 0, exec_end)

new_execute = """pub fn execute(&mut self, query_str: &str) -> Result<String, String> {
        let (_, query) = parse_query(query_str).map_err(|e| format!("Parse error: {}", e))?;

        let mut output = String::new();
        let plan = QueryPlanner::plan_query(query.clone(), &self.labels, &self.indices);
        let mut profile_out = if query.profile {
            Some(format!("{:#?}", plan))
        } else {
            None
        };

        let mut result_set = ResultSet::new();
        result_set.push_row(&HashMap::new());

        let mut step_idx = 0;
        while step_idx < plan.steps.len() {
            let mut end_idx = step_idx;
            let mut boundary_step = None;
            while end_idx < plan.steps.len() {
                if matches!(
                    plan.steps[end_idx],
                    ExecutionStep::With(..) | ExecutionStep::Return(..)
                ) {
                    boundary_step = Some(end_idx);
                    break;
                }
                end_idx += 1;
            }

            let chunk = &plan.steps[step_idx..end_idx];
            let mut next_result_set = ResultSet::new();

            for i in 0..result_set.rows {
                let env = result_set.get_row(i);
                self.run_pipeline(chunk, 0, env, &mut |_graph, row_env| {
                    next_result_set.push_row(&row_env);
                    true
                });
            }

            result_set = next_result_set;

            if let Some(b_idx) = boundary_step {
                match &plan.steps[b_idx] {
                    ExecutionStep::With(items, order_by, limit) => {
                        result_set = self.evaluate_with(&result_set, items, order_by, *limit, false);
                    }
                    ExecutionStep::Return(items, order_by, limit) => {
                        let final_res = self.evaluate_with(&result_set, items, order_by, *limit, true);
                        output = self.format_return_json(&final_res, items);
                        result_set = final_res;
                    }
                    _ => unreachable!(),
                }
                step_idx = b_idx + 1;
            } else {
                step_idx = end_idx;
            }
        }

        if let Some(prof) = profile_out {
            let results_str = if output.is_empty() { "[]" } else { &output };
            let prof_json = serde_json::to_string(&prof).unwrap_or_else(|_| "".to_string());
            Ok(format!("{{\\n  \\"profile\\": {},\\n  \\"results\\": {}\\n}}", prof_json, results_str))
        } else {
            if output.is_empty() {
                Ok("[]".to_string())
            } else {
                Ok(output)
            }
        }
    }
"""

content = content[:exec_start] + new_execute + content[exec_end:]

content = "#![allow(dead_code)]\n" + content
content = content.replace("use std::collections::HashMap;", "use std::collections::HashMap;\nuse crate::parser::OrderItem;\n")

with open("src/graph.rs", "w") as f:
    f.write(content)
