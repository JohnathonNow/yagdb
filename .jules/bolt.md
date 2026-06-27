## 2024-05-18 - Avoid HashMap::entry with expensive owned keys

**Learning:** When using `HashMap::entry(k.clone())` to update indices where the key `k` is an expensive or owned type (like `PropertyValue` in `yagdb` which holds potentially large strings or floats), it causes unconditional allocation/cloning even when the key already exists and only the underlying vector needs updating. The compiler may also struggle with dereferencing `&PropertyValue` correctly when using regex-based replacement scripts if not careful with the `&value` vs `value` types in `get_mut()`. Furthermore, applying `rustfmt` or `cargo fmt` to an entire large file (`src/graph.rs`) bloated the PR diff beyond the 50-line target constraint.

**Action:** Replace `map.entry(k.clone()).or_insert_with(Vec::new).push(v)` with a two-step `if let Some(vec) = map.get_mut(k) { vec.push(v); } else { map.insert(k.clone(), vec![v]); }` to bypass the clone on cache hits. Do not format the entire file when making targeted code modifications.
## 2024-05-19 - Cache get_item results to prevent redundant lookup overhead
**Learning:** `yagdb`'s `ItemStorage` structure performs full clones (in memory) or deep deserialization (from disk) inside `get_item(id)`. Sequential calls to `get_item(id)` in tight loops (like checking `deleted` then using the item) introduce unnecessary N+1 overhead and potential allocations.
**Action:** Always fetch the item into a local variable *once* using `get_item(id)` before checking properties like `deleted` to avoid repeated cache hits or deep copies.
