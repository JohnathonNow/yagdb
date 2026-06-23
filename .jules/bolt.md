## 2024-06-23 - Avoid O(N*M) key clone allocations in ResultSet
**Learning:** Using `HashMap::entry(k.clone())` introduces significant O(N*M) allocation overhead in hot loops (like accumulating query results) due to unconditional string cloning.
**Action:** Bypass this by using a two-step `.get_mut()` and `.insert()` pattern to avoid redundant memory allocations.
