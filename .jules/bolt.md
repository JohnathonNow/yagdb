## 2024-07-08 - Use Zero-Copy ItemStorage `with_item` Closure Over Full `get_item` Clones

**Learning:** In yagdb's `ItemStorage` architecture, methods like `find_nodes`, `node_matches`, and mapping queries extensively call `get_item(id)` inside loops. `get_item` was inadvertently returning cloned values (or triggering full deserialization) on every call, leading to a significant amount of redundant heap allocations when doing index lookups and full node scans. Replacing full clones with an `impl FnOnce(&T)` closure pattern (`with_item`) safely allows zero-copy access to the internal data (from both `Vec` and `Disk` backends) completely satisfying Rust's borrow checker while significantly reducing memory overhead and execution time in matching bottlenecks.

**Action:** Replace `map.entry(k.clone()).or_insert_with(Vec::new).push(v)` with a two-step `if let Some(vec) = map.get_mut(k) { vec.push(v); } else { map.insert(k.clone(), vec![v]); }` to bypass the clone on cache hits. Do not format the entire file when making targeted code modifications.
## 2024-05-19 - Cache get_item results to prevent redundant lookup overhead
**Learning:** `yagdb`'s `ItemStorage` structure performs full clones (in memory) or deep deserialization (from disk) inside `get_item(id)`. Sequential calls to `get_item(id)` in tight loops (like checking `deleted` then using the item) introduce unnecessary N+1 overhead and potential allocations.
**Action:** Always fetch the item into a local variable *once* using `get_item(id)` before checking properties like `deleted` to avoid repeated cache hits or deep copies.
## 2024-05-18 - Caching get_item in loops to reduce cloning and I/O overhead

**Learning:** In `yagdb`'s `ItemStorage` architecture, `get_item(id)` performs a full object clone (or disk deserialization). Calling it multiple times sequentially for the same `id` within logic blocks (e.g., retrieving an item once to check `.deleted` and then unwrapping it again to use its data, or fetching it multiple times in a loop) introduces severe N+1 performance bottlenecks.
**Action:** When working with `nodes` and `edges`, store the result of `get_item(id).unwrap()` in a local variable before checking properties like `deleted` or using it in indexing loops. Clone only specific required fields (like `.labels.clone()`) if the loop consumes or borrows the outer node struct to satisfy the borrow checker while preventing full struct clones.

## 2024-05-20 - Cache get_item results to prevent N+1 clones in query matcher
**Learning:** Passing `usize` IDs to helper functions like `node_matches` and `edge_matches` forces them to call `get_item(id)` internally, causing N+1 cloning overhead when the caller already had the item or fetches it in a tight loop.
**Action:** Pass `&Node` and `&Edge` references directly to matching functions to reuse the already fetched/cached objects and eliminate redundant memory allocations.
## 2024-07-06 - Avoid HashMap::entry allocation in query planner

**Learning:** When using `HashMap::entry(k.clone())` in `QueryPlanner::extract_props_from_condition` (inside `src/planner.rs`), the key string is cloned unconditionally even on cache hits. This causes unnecessary memory allocation overhead during query planning.

**Action:** Replace `HashMap::entry(k.clone())` with a two-step `get_mut()` and `insert()` pattern to bypass the `String` cloning on cache hits.
**Action:** Whenever retrieving potentially large objects from a generalized storage abstraction inside a hot loop, avoid returning owned clones. Implement zero-copy `with_...` methods accepting closures to allow temporary read-only access to avoid unnecessary deep copying, especially during property-checking and filtering.
