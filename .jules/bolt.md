## 2024-05-23 - Avoid redundant memory allocations in HashMap::entry
**Learning:** In hot execution paths, using `HashMap::entry(k.clone())` causes an unconditional memory allocation (cloning the key string), even if the key already exists in the map. This leads to severe O(N*M) allocation overhead when accumulating query results into `ResultSet` columns.
**Action:** Replace `HashMap::entry(k.clone())` with a two-step lookup/insert pattern: use `get_mut` or `contains_key` first to check for existence, and only clone the key when an insertion is actually needed.
