1. **Add `IsNull` and `IsNotNull` to `Condition` enum in `src/parser.rs`.**
2. **Update the `condition_base` parser in `src/parser.rs` to handle `IS NULL` and `IS NOT NULL`.**
3. **Update `QueryPlanner` in `src/planner.rs` to handle these new conditions.**
   - Though `QueryPlanner` might not strictly need an update since it passes `Condition` transparently for now, I will check and verify if `extract_props_from_condition` needs to be updated.
4. **Update `evaluate_condition` in `src/graph/mod.rs` to correctly evaluate `Condition::IsNull` and `Condition::IsNotNull`.**
5. **Add tests for `IS NULL` and `IS NOT NULL` in `tests/parser_test.rs` and `tests/where_test.rs`.**
6. Complete pre-commit steps to ensure proper testing, verification, review, and reflection are done.
7. Submit the PR.
