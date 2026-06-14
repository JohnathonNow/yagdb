import sys

with open("src/graph.rs", "r") as f:
    content = f.read()

# Replace the whole push_row_from function
prf_old = """    pub fn push_row_from(&mut self, other: &ResultSet, row_idx: usize, bindings: &[(&str, GraphElement)]) {
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

prf_new = """    pub fn push_row_from<'a, I>(&mut self, other: &ResultSet, row_idx: usize, bindings: I)
    where I: IntoIterator<Item = &'a (&'a str, GraphElement)> {
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
content = content.replace(prf_old, prf_new)

with open("src/graph.rs", "w") as f:
    f.write(content)
