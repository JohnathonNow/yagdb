import sys
import re

with open("src/graph.rs", "r") as f:
    content = f.read()

# Add get and push_row_from to ResultSet
resultset_methods = """
    pub fn get(&self, row_idx: usize, col_name: &str) -> Option<&GraphElement> {
        if let Some(col) = self.columns.get(col_name) {
            let val = &col[row_idx];
            if matches!(val, GraphElement::Null) {
                None
            } else {
                Some(val)
            }
        } else {
            None
        }
    }

    pub fn push_row_from(&mut self, other: &ResultSet, row_idx: usize, bindings: &[(&str, GraphElement)]) {
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
    }

    pub fn push_merged_row(&mut self, left: &ResultSet, l_idx: usize, right: &ResultSet, r_idx: usize) {
        let current_rows = self.rows;
        for (k, v) in &left.columns {
            let val = &v[l_idx];
            if !matches!(val, GraphElement::Null) {
                let col = self.columns.entry(k.clone()).or_insert_with(|| vec![GraphElement::Null; current_rows]);
                col.push(val.clone());
            }
        }
        for (k, v) in &right.columns {
            let val = &v[r_idx];
            if !matches!(val, GraphElement::Null) {
                let col = self.columns.entry(k.clone()).or_insert_with(|| vec![GraphElement::Null; current_rows]);
                if col.len() > current_rows {
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
    }
"""

content = content.replace("    pub fn is_empty(&self) -> bool {\n        self.rows == 0\n    }", "    pub fn is_empty(&self) -> bool {\n        self.rows == 0\n    }\n" + resultset_methods)

with open("src/graph.rs", "w") as f:
    f.write(content)
