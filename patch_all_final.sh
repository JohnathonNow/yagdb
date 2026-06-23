#!/bin/bash
git restore src/graph.rs
sed -i 's/let col = self.columns.entry(k.clone()).or_insert_with(|| vec!\[GraphElement::Null; current_rows\]);/if !self.columns.contains_key(k) { self.columns.insert(k.clone(), vec![GraphElement::Null; current_rows]); } let col = self.columns.get_mut(k).unwrap();/g' src/graph.rs
sed -i 's/let col = self.columns.entry(k.as_ref().to_string()).or_insert_with(|| vec!\[GraphElement::Null; current_rows\]);/let key_str = k.as_ref(); if !self.columns.contains_key(key_str) { self.columns.insert(key_str.to_string(), vec![GraphElement::Null; current_rows]); } let col = self.columns.get_mut(key_str).unwrap();/g' src/graph.rs
sed -i 's/if col.len() < self.rows {/col.reserve(self.rows - col.len()); while col.len() < self.rows {/g' src/graph.rs
