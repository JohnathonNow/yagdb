import re

with open('src/graph.rs', 'r') as f:
    text = f.read()

text = text.replace(
    'let col = self.columns.entry(k.clone()).or_insert_with(|| vec![GraphElement::Null; current_rows]);\n                col.push(val.clone());',
    'if let Some(col) = self.columns.get_mut(k) {\n                    col.push(val.clone());\n                } else {\n                    let mut col = vec![GraphElement::Null; current_rows];\n                    col.push(val.clone());\n                    self.columns.insert(k.clone(), col);\n                }'
)

text = text.replace(
    'let col = self.columns.entry(k.clone()).or_insert_with(|| vec![GraphElement::Null; current_rows]);\n            col.push(v.clone());',
    'if let Some(col) = self.columns.get_mut(k) {\n                col.push(v.clone());\n            } else {\n                let mut col = vec![GraphElement::Null; current_rows];\n                col.push(v.clone());\n                self.columns.insert(k.clone(), col);\n            }'
)

text = text.replace(
    'let col = self.columns.entry(k.as_ref().to_string()).or_insert_with(|| vec![GraphElement::Null; current_rows]);\n            if col.len() > current_rows {\n                col[current_rows] = v.clone();\n            } else {\n                col.push(v.clone());\n            }',
    'let key_str = k.as_ref();\n            if let Some(col) = self.columns.get_mut(key_str) {\n                if col.len() > current_rows {\n                    col[current_rows] = v.clone();\n                } else {\n                    col.push(v.clone());\n                }\n            } else {\n                let mut col = vec![GraphElement::Null; current_rows];\n                col.push(v.clone());\n                self.columns.insert(key_str.to_string(), col);\n            }'
)

text = text.replace(
    'let col = self.columns.entry(k.clone()).or_insert_with(|| vec![GraphElement::Null; current_rows]);\n                if col.len() > current_rows {\n                    col[current_rows] = val.clone();\n                } else {\n                    col.push(val.clone());\n                }',
    'if let Some(col) = self.columns.get_mut(k) {\n                    if col.len() > current_rows {\n                        col[current_rows] = val.clone();\n                    } else {\n                        col.push(val.clone());\n                    }\n                } else {\n                    let mut col = vec![GraphElement::Null; current_rows];\n                    col.push(val.clone());\n                    self.columns.insert(k.clone(), col);\n                }'
)

text = text.replace(
    'if col.len() < self.rows {\n                col.push(GraphElement::Null);\n            }',
    'col.reserve(self.rows - col.len());\n            while col.len() < self.rows {\n                col.push(GraphElement::Null);\n            }'
)

with open('src/graph.rs', 'w') as f:
    f.write(text)
