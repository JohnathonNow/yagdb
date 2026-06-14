import sys

with open("src/graph.rs", "r") as f:
    content = f.read()

bad = """                if col.len() > current_rows {
                    col[current_rows] = val.clone();
                } else {
                    col.push(val.clone());
                }
            }
        }"""
good = """                if col.len() > current_rows {
                    col[current_rows] = val.clone();
                } else {
                    col.push(val.clone());
                }
            }
        }
        self.rows += 1;
        for (_k, col) in self.columns.iter_mut() {
            if col.len() < self.rows {
                col.push(GraphElement::Null);
            }
        }
    }"""
content = content.replace(bad, good, 1)

with open("src/graph.rs", "w") as f:
    f.write(content)
