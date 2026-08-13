use std::collections::HashMap;
use crate::graph::element::{Environment, GraphElement};

#[derive(Clone, Default, Debug, PartialEq)]
pub struct ResultSet {
    pub columns: HashMap<String, Vec<GraphElement>>,
    pub rows: usize,
}

impl ResultSet {
    pub fn new() -> Self {
        Self {
            columns: HashMap::new(),
            rows: 0,
        }
    }

    pub fn get_row(&self, idx: usize) -> Environment {
        // ⚡ BOLT: Avoid re-allocating memory for get_row by pre-allocating the hash map capacity.
        let mut env = HashMap::with_capacity(self.columns.len());
        for (k, v) in &self.columns {
            let val = &v[idx];
            if !matches!(val, GraphElement::Null) {
                env.insert(k.clone(), val.clone());
            }
        }
        env
    }

    pub fn push_row(&mut self, env: &Environment) {
        let current_rows = self.rows;
        for (k, v) in env {
            if let Some(col) = self.columns.get_mut(k) {
                col.push(v.clone());
            } else {
                let mut col = vec![GraphElement::Null; current_rows];
                col.push(v.clone());
                self.columns.insert(k.clone(), col);
            }
        }
        self.rows += 1;
        for (_k, col) in self.columns.iter_mut() {
            if col.len() < self.rows {
                col.push(GraphElement::Null);
            }
        }
    }

    pub fn is_empty(&self) -> bool {
        self.rows == 0
    }

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

    pub fn push_row_from<K: AsRef<str>, I>(&mut self, other: &ResultSet, row_idx: usize, bindings: I)
    where I: IntoIterator<Item = (K, GraphElement)> {
        let current_rows = self.rows;
        for (k, v) in &other.columns {
            let val = &v[row_idx];
            if !matches!(val, GraphElement::Null) {
                if let Some(col) = self.columns.get_mut(k) {
                    col.push(val.clone());
                } else {
                    let mut col = vec![GraphElement::Null; current_rows];
                    col.push(val.clone());
                    self.columns.insert(k.clone(), col);
                }
            }
        }
        for (k, v) in bindings {
            if let Some(col) = self.columns.get_mut(k.as_ref()) {
                if col.len() > current_rows {
                    col[current_rows] = v;
                } else {
                    col.push(v);
                }
            } else {
                let mut col = vec![GraphElement::Null; current_rows];
                if col.len() > current_rows {
                    col[current_rows] = v;
                } else {
                    col.push(v);
                }
                self.columns.insert(k.as_ref().to_string(), col);
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
                if let Some(col) = self.columns.get_mut(k) {
                    col.push(val.clone());
                } else {
                    let mut col = vec![GraphElement::Null; current_rows];
                    col.push(val.clone());
                    self.columns.insert(k.clone(), col);
                }
            }
        }
        for (k, v) in &right.columns {
            let val = &v[r_idx];
            if !matches!(val, GraphElement::Null) {
                if let Some(col) = self.columns.get_mut(k) {
                    if col.len() > current_rows {
                        col[current_rows] = val.clone();
                    } else {
                        col.push(val.clone());
                    }
                } else {
                    let mut col = vec![GraphElement::Null; current_rows];
                    if col.len() > current_rows {
                        col[current_rows] = val.clone();
                    } else {
                        col.push(val.clone());
                    }
                    self.columns.insert(k.clone(), col);
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

}

impl ResultSet {
    pub fn clear(&mut self) {
        self.rows = 0;
        for col in self.columns.values_mut() {
            col.clear();
        }
    }

    pub fn truncate(&mut self, len: usize) {
        if len >= self.rows { return; }
        self.rows = len;
        for col in self.columns.values_mut() {
            col.truncate(len);
        }
    }

    pub fn skip(&mut self, amount: usize) {
        if amount == 0 { return; }
        if amount >= self.rows {
            self.clear();
            return;
        }
        self.rows -= amount;
        for col in self.columns.values_mut() {
            col.drain(0..amount);
        }
    }
}
