1. **Fix find_node and find_edge_and_node logic**: In `src/graph.rs`, if a node or rel pattern specifies a label, but the label ID is not found in `self.labels`, return early as no match is possible instead of defaulting to matching all.
2. **Add Relationship Variable Support**: In `src/graph.rs` `execute_match_path`, store the matched relationship variable into the environment mapping using `edge_id`. Update `return` logic to handle fetching edges from the graph.
3. **Parse Entire String**: In `src/parser.rs`, wrap the query parser with `all_consuming` or ensure all input is consumed so trailing garbage throws an error.
4. **Update tests**: Add a test that checks matching for a non-existent label to ensure it returns empty.
5. **Pre-commit**: Complete pre-commit step.
