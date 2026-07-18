use serde::{Deserialize, Serialize};
use std::collections::HashMap;

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct StringPool {
    strings: Vec<String>,
    map: HashMap<String, usize>,
}

impl Default for StringPool {
    fn default() -> Self {
        Self::new()
    }
}

impl StringPool {
    pub fn new() -> Self {
        Self {
            strings: Vec::new(),
            map: HashMap::new(),
        }
    }

    pub fn get_or_intern(&mut self, s: &str) -> usize {
        if let Some(&id) = self.map.get(s) {
            id
        } else {
            let id = self.strings.len();
            self.strings.push(s.to_string());
            self.map.insert(s.to_string(), id);
            id
        }
    }

    pub fn get(&self, s: &str) -> Option<usize> {
        self.map.get(s).copied()
    }

    pub fn resolve(&self, id: usize) -> Option<&str> {
        self.strings.get(id).map(|s| s.as_str())
    }
}
