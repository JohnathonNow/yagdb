## 2024-05-18 - Avoid HashMap::entry with expensive owned keys
**Learning:** When using `HashMap::entry(k.clone())` to update indices where the key `k` is an expensive or owned type, it causes unconditional allocation/cloning.
**Action:** Replace `map.entry(k.clone()).or_insert_with(Vec::new).push(v)` with a two-step `if let Some(vec) = map.get_mut(k) { vec.push(v); } else { map.insert(k.clone(), vec![v]); }` to bypass the clone on cache hits. Do not format the entire file when making targeted code modifications.

## 2024-05-18 - Cache get_item results to prevent redundant deserialization
**Learning:** Repeatedly calling `get_item` on the same ID (e.g. `graph.nodes.get_item(node_id).unwrap()`) within loops or sequential operations is very expensive in a disk-backed storage architecture since each call triggers disk I/O and bincode deserialization.
**Action:** Cache the item in a local variable (e.g., `let node = graph.nodes.get_item(node_id).unwrap();`) and reuse it for subsequent property/label lookups instead of re-fetching. Be careful when functions like `update_item` consume the cached object.
