## 2024-08-09 - Reuse buffer for get_row
**Learning:** In yagdb's ResultSet, constructing a new HashMap for the environment inside hot loops like get_row causes significant memory allocation overhead.
**Action:** Avoid re-allocating memory for get_row when possible by using get to directly fetch GraphElement instances from the columns or by pre-allocating.
## 2024-05-30 - SKIP Clause Implementation
**Learning:** Adding SKIP clause makes the query capabilities of yagdb more aligned with standard Cypher, providing features for pagination which is important in production.
**Action:** Implement SKIP parsing in `src/parser.rs`, adding `skip` option to `Clause::Match`, `Clause::Return`, and `Clause::With`, modifying `ExecutionStep` in `src/planner.rs`, and implementing the skip logic in `src/graph.rs`.
