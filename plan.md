1. **Update `parser.rs`:**
   - Define structures for the WHERE clause: `Expr`, `Operator`, `Condition`.
   - Implement parsers for variables/properties, literals, operators (`=`, `<>`, `>`, `<`, `>=`, `<=`), and logical operators (`AND`, `OR`, `NOT`).
   - Modify `Clause::Match` to include an optional `Condition`: `Match(Vec<Path>, Option<Condition>)`.
   - Update `match_clause` in `parser.rs` to parse an optional WHERE clause.
2. **Update `graph.rs` and `planner.rs` (if necessary):**
   - Update any match patterns on `Clause::Match` to unpack the condition.
   - Implement an evaluator in `graph.rs` (`evaluate_condition`) to check if an environment satisfies a condition.
   - In `execute_query` for `Clause::Match`, after building the environment (`new_envs`), evaluate the WHERE clause for each environment. Filter the `new_envs` to only include those that return true.
3. **Tests:**
   - Add tests to ensure properties evaluate properly using `<`, `>`, etc.
   - Add tests to ensure `AND`, `OR`, `NOT` combination logic works as intended.
4. **Pre-commit step:**
   - Complete pre-commit steps to ensure proper testing, verification, review, and reflection are done.
