## 2024-08-09 - Reuse buffer for get_row
**Learning:** In yagdb's ResultSet, constructing a new HashMap for the environment inside hot loops like get_row causes significant memory allocation overhead.
**Action:** Avoid re-allocating memory for get_row when possible by using get to directly fetch GraphElement instances from the columns or by pre-allocating.
## 2024-05-30 - SKIP Clause Implementation
**Learning:** Adding SKIP clause makes the query capabilities of yagdb more aligned with standard Cypher, providing features for pagination which is important in production.
**Action:** Implement SKIP parsing in `src/parser.rs`, adding `skip` option to `Clause::Match`, `Clause::Return`, and `Clause::With`, modifying `ExecutionStep` in `src/planner.rs`, and implementing the skip logic in `src/graph.rs`.

## 2024-08-12 - Implement OPTIONAL MATCH
**Learning:** Adding OPTIONAL MATCH support requires row-by-row nested loop evaluation for missing matches to properly fallback and pad new bound variables with `null`s, instead of discarding the row like a standard MATCH.
**Action:** When implementing outer-join like functionality in standard set-based engines, carefully branch execution logic to preserve incoming row integrity if the sub-plan returns empty.
## 2024-08-16 - Expand UNWIND expressions
**Learning:** `UNWIND` in yagdb was previously restricted to unwinding simple variables or properties because `ExecutionStep::Unwind` didn't implement arbitrary `ProjectionItem::Expression`s, limiting its ability to handle Cypher literal lists or dynamic expressions.
**Action:** Always verify that clauses acting on inputs evaluate them through the generalized expression evaluation engine (e.g., `evaluate_expression_to_element`) instead of pattern-matching only specific AST tokens.
