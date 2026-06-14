import sys

with open("src/graph.rs", "r") as f:
    content = f.read()

bad1 = """                            let bindings_ref: Vec<(&str, GraphElement)> = bindings.iter().map(|(k, v)| (k.as_str(), v.clone())).collect();
                            final_res.push_row_from(&result_set, 0, &bindings_ref as &[(&str, GraphElement)]);"""
good1 = """                            let bindings_ref: Vec<(&str, GraphElement)> = bindings.iter().map(|(k, v)| (k.as_str(), v.clone())).collect();
                            let empty_res = ResultSet::new();
                            final_res.push_row_from(&empty_res, 0, &bindings_ref as &[(&str, GraphElement)]);"""
content = content.replace(bad1, good1)

bad2 = """                            let bindings_ref: Vec<(&str, GraphElement)> = bindings.iter().map(|(k, v)| (k.as_str(), v.clone())).collect();
                            final_res.push_row_from(&result_set, i, &bindings_ref as &[(&str, GraphElement)]);"""
good2 = """                            let bindings_ref: Vec<(&str, GraphElement)> = bindings.iter().map(|(k, v)| (k.as_str(), v.clone())).collect();
                            let empty_res = ResultSet::new();
                            final_res.push_row_from(&empty_res, 0, &bindings_ref as &[(&str, GraphElement)]);"""
content = content.replace(bad2, good2)

with open("src/graph.rs", "w") as f:
    f.write(content)
