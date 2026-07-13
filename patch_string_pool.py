import re

with open("src/string_pool.rs", "r") as f:
    content = f.read()

# I want to change RefCell to just standard fields and make get_or_intern take &mut self.
content = """use serde::{Deserialize, Serialize};
use std::collections::HashMap;

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct StringPool {
    map: HashMap<String, usize>,
    vec: Vec<String>,
}

impl Default for StringPool {
    fn default() -> Self {
        Self::new()
    }
}

impl StringPool {
    pub fn new() -> Self {
        Self {
            map: HashMap::new(),
            vec: Vec::new(),
        }
    }

    pub fn get_or_intern(&mut self, s: &str) -> usize {
        if let Some(&id) = self.map.get(s) {
            return id;
        }
        let id = self.vec.len();
        self.vec.push(s.to_string());
        self.map.insert(s.to_string(), id);
        id
    }

    pub fn get(&self, s: &str) -> Option<usize> {
        self.map.get(s).copied()
    }

    pub fn resolve(&self, id: usize) -> String {
        self.vec.get(id).unwrap().clone()
    }
}
"""

with open("src/string_pool.rs", "w") as f:
    f.write(content)
