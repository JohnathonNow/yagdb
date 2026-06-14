import sys

with open("src/graph.rs", "r") as f:
    content = f.read()

# Update Set
set_old = """                ExecutionStep::Set(var, key, value) => {
                    let mut updated_nodes = std::collections::HashSet::new();
                    for i in 0..result_set.rows {
                        let env = result_set.get_row(i);
                        if let Some(GraphElement::Node(node_id)) = env.get(&var) {"""
set_new = """                ExecutionStep::Set(var, key, value) => {
                    let mut updated_nodes = std::collections::HashSet::new();
                    for i in 0..result_set.rows {
                        if let Some(GraphElement::Node(node_id)) = result_set.get(i, &var) {"""
content = content.replace(set_old, set_new)

# Update Delete
del_old = """                ExecutionStep::Delete(vars) => {
                    let mut nodes_to_delete = Vec::new();
                    let mut edges_to_delete = Vec::new();
                    for var in &vars {
                        for i in 0..result_set.rows {
                            let env = result_set.get_row(i);
                            if let Some(GraphElement::Node(node_id)) = env.get(var) {
                                if !nodes_to_delete.contains(node_id) {
                                    nodes_to_delete.push(*node_id);
                                }
                            } else if let Some(GraphElement::Edge(edge_id)) = env.get(var) {"""
del_new = """                ExecutionStep::Delete(vars) => {
                    let mut nodes_to_delete = Vec::new();
                    let mut edges_to_delete = Vec::new();
                    for var in &vars {
                        for i in 0..result_set.rows {
                            if let Some(GraphElement::Node(node_id)) = result_set.get(i, var) {
                                if !nodes_to_delete.contains(node_id) {
                                    nodes_to_delete.push(*node_id);
                                }
                            } else if let Some(GraphElement::Edge(edge_id)) = result_set.get(i, var) {"""
content = content.replace(del_old, del_new)

# Update Unwind
unw_old = """                ExecutionStep::Unwind(ref items) => {
                    let mut new_result_set = ResultSet::new();
                    for i in 0..result_set.rows {
                        let env = result_set.get_row(i);
                        for item in items.iter() {
                            match item {
                                ProjectionItem::Variable(var) => {
                                    if let Some(val) = env.get(var) {
                                        match val {
                                            GraphElement::List(v) => {
                                                for x in v {
                                                    let mut new_env = env.clone();
                                                    new_env.insert(var.clone(), x.clone());
                                                    new_result_set.push_row(&new_env);
                                                }
                                            }
                                            _ => {}
                                        }
                                    }
                                }
                                _ => {}
                            }
                        }
                    }
                    result_set = new_result_set;
                }"""
unw_new = """                ExecutionStep::Unwind(ref items) => {
                    let mut new_result_set = ResultSet::new();
                    for i in 0..result_set.rows {
                        for item in items.iter() {
                            match item {
                                ProjectionItem::Variable(var) => {
                                    if let Some(val) = result_set.get(i, var) {
                                        match val {
                                            GraphElement::List(v) => {
                                                for x in v {
                                                    new_result_set.push_row_from(&result_set, i, &[(var.as_str(), x.clone())] as &[(&str, GraphElement)]);
                                                }
                                            }
                                            _ => {}
                                        }
                                    }
                                }
                                _ => {}
                            }
                        }
                    }
                    result_set = new_result_set;
                }"""
content = content.replace(unw_old, unw_new)

with open("src/graph.rs", "w") as f:
    f.write(content)
