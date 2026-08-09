## 2024-08-09 - Reuse buffer for get_row
**Learning:** In yagdb's ResultSet, constructing a new HashMap for the environment inside hot loops like get_row causes significant memory allocation overhead.
**Action:** Avoid re-allocating memory for get_row when possible by using get to directly fetch GraphElement instances from the columns or by pre-allocating.
