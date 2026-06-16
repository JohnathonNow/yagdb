use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::cell::RefCell;

#[derive(Serialize, Deserialize, Debug, Clone, Default)]
pub struct StringPool {
    forward: RefCell<HashMap<String, usize>>,
    backward: RefCell<Vec<String>>,
}

impl StringPool {
    pub fn new() -> Self {
        Self {
            forward: RefCell::new(HashMap::new()),
            backward: RefCell::new(Vec::new()),
        }
    }

    pub fn intern(&self, s: &str) -> usize {
        if let Some(&id) = self.forward.borrow().get(s) {
            return id;
        }

        let mut forward = self.forward.borrow_mut();
        let mut backward = self.backward.borrow_mut();

        // Double check in case it was inserted while we were acquiring the mut lock
        if let Some(&id) = forward.get(s) {
            return id;
        }

        let id = backward.len();
        let s_owned = s.to_string();
        forward.insert(s_owned.clone(), id);
        backward.push(s_owned);
        id
    }

    pub fn resolve(&self, id: usize) -> Option<String> {
        self.backward.borrow().get(id).map(|s| s.clone())
    }

    pub fn clear(&self) {
        self.forward.borrow_mut().clear();
        self.backward.borrow_mut().clear();
    }
}
