1. **Restore modified files**
   - Run `git checkout src/node.rs src/edge.rs src/parser.rs src/graph.rs src/export.rs` using `run_in_bash_session` to restore the files.
2. **Add `StringPool`**
   - Keep `src/string_pool.rs` and the `pub mod string_pool;` in `src/lib.rs`.
3. **Refactor `src/node.rs`, `src/edge.rs` and `src/parser.rs`**
   - Change `pub properties: HashMap<String, crate::property::PropertyValue>` to `pub properties: HashMap<usize, crate::property::PropertyValue>`.
   - Use `sed` in `run_in_bash_session` for precise search/replace strings.
4. **Verify changes to models**
   - Run `cargo check` using `run_in_bash_session` to verify the syntax of the modified files.
5. **Refactor `src/export.rs`**
   - Use Python script in `run_in_bash_session` to update `export_csv` and `import_csv` to convert between `HashMap<usize, PropertyValue>` and `HashMap<String, PropertyValue>`. We will use string representations of properties and map them back and forth in memory.
6. **Verify changes to export module**
   - Run `cargo check` using `run_in_bash_session`.
7. **Refactor `src/graph.rs` (Structs and init)**
   - Add `pub string_pool: crate::string_pool::StringPool` to `Graph` struct.
   - Update `Graph::new`, `Graph::load_or_create`, and `Graph::clear` to initialize and clear the string pool.
   - Update `WalEntry` struct to use `HashMap<usize, PropertyValue>` where applicable.
   - Use Python script via `run_in_bash_session`.
8. **Refactor `src/graph.rs` (Node and Edge additions)**
   - Update `Graph::add_node` and `Graph::add_edge` to use `HashMap<usize, PropertyValue>` and `StringPool`.
   - Update Wal entry matching logic in `Graph::load_or_create`.
   - Update `Graph::create_index_internal`.
   - Use Python script via `run_in_bash_session`.
9. **Refactor `src/graph.rs` (Query Execution)**
   - Update `ExecutionStep::Set`.
   - Update `get_property_as_element` to use `string_pool.get(prop)`.
   - Update `node_matches` and `edge_matches` to resolve keys via `string_pool.get()`.
   - Update `element_to_json` to resolve property keys to strings.
   - Update `PlanNode::NodeIndexLookup` in `execute_plan` to use `string_pool.get(property)`.
   - Use Python script via `run_in_bash_session`.
10. **Verify changes to graph module**
    - Run `cargo check` using `run_in_bash_session`.
11. **Compile and Test**
    - Run `cargo test`, `cargo test --features cluster`, and `cargo bench` to verify correctness and performance.
12. **Complete pre-commit steps**
    - Complete pre-commit steps to ensure proper testing, verification, review, and reflection are done.
13. **Submit**
    - Submit the PR with standard conventions.
