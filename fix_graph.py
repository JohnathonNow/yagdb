import sys

with open("src/graph.rs", "r") as f:
    content = f.read()

# Fix the duplicate block
bad_block = """        for (_k, col) in self.columns.iter_mut() {
            if col.len() < self.rows {
                col.push(GraphElement::Null);
            }
        }
    }
        let current_rows = self.rows;
        for (k, v) in &other.columns {
            let val = &v[row_idx];
            if !matches!(val, GraphElement::Null) {
                let col = self.columns.entry(k.clone()).or_insert_with(|| vec![GraphElement::Null; current_rows]);
                col.push(val.clone());
            }
        }
        for (k, v) in bindings {
            let col = self.columns.entry(k.to_string()).or_insert_with(|| vec![GraphElement::Null; current_rows]);
            if col.len() > current_rows {
                col[current_rows] = v.clone();
            } else {
                col.push(v.clone());
            }
        }
        self.rows += 1;
        for (_k, col) in self.columns.iter_mut() {
            if col.len() < self.rows {
                col.push(GraphElement::Null);
            }
        }
    }"""
good_block = """        for (_k, col) in self.columns.iter_mut() {
            if col.len() < self.rows {
                col.push(GraphElement::Null);
            }
        }
    }"""
content = content.replace(bad_block, good_block)

with open("src/graph.rs", "w") as f:
    f.write(content)
