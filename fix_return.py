with open('src/graph/mod.rs', 'r') as f:
    code = f.read()

replacement = """                                if !row.is_empty() {
                                    #[cfg(not(target_arch = "wasm32"))]
                                    {
                                        if let Some(tx) = &sender {
                                            if tx.blocking_send(Value::Object(row.clone())).is_err() {
                                                break;
                                            }
                                        } else {
                                            results_json.push(Value::Object(row));
                                        }
                                    }
                                    #[cfg(target_arch = "wasm32")]
                                    results_json.push(Value::Object(row));
                                }"""

code = code.replace(
    '                                if !row.is_empty() {\n                                    results_json.push(Value::Object(row));\n                                }',
    replacement
)

with open('src/graph/mod.rs', 'w') as f:
    f.write(code)
