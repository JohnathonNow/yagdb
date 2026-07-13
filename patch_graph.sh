#!/bin/bash
# Adding string_pool to Graph
sed -i 's/pub indices: HashMap<usize, HashMap<String, IndexMap>>,/pub indices: HashMap<usize, HashMap<String, IndexMap>>,\n    pub string_pool: crate::string_pool::StringPool,/g' src/graph.rs
sed -i 's/indices: HashMap::new(),/indices: HashMap::new(),\n            string_pool: crate::string_pool::StringPool::new(),/g' src/graph.rs
sed -i 's/pub fn clear(&mut self) {/pub fn clear(&mut self) {\n        self.string_pool = crate::string_pool::StringPool::new();/g' src/graph.rs
