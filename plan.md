1. **Add `SetEdgeProperty` to `WalEntry` enum**
   - File: `src/graph/types.rs`
   - Action: Add `SetEdgeProperty { edge_id: usize, key: String, value: crate::property::PropertyValue }` to `WalEntry`.

2. **Handle `SetEdgeProperty` during WAL replay**
   - File: `src/graph/mod.rs`
   - Action: In `Graph::load_or_create`, handle `WalEntry::SetEdgeProperty` by getting a mutable reference to the edge (via `self.edges.with_mut_item`) and updating its `properties` map.

3. **Update `ExecutionStep::Set` in `src/graph/mod.rs` to support edges**
   - File: `src/graph/mod.rs`
   - Action: In the match branch for `ExecutionStep::Set`, in addition to matching `GraphElement::Node(node_id)`, add logic to match `GraphElement::Edge(edge_id)`.
   - Action: When it's an edge, evaluate the expression to get the new `PropertyValue`.
   - Action: Use `self.edges.with_mut_item` to update the property on the edge in-place.
   - Action: Use `self.log_wal(&WalEntry::SetEdgeProperty { ... })` to durably log the change to the Write-Ahead Log. Keep track of updated edges using a `HashSet` to avoid redundant updates and WAL entries (similar to how nodes are handled with `updated_nodes`).

4. **Run Pre-Commit Checks**
   - Use `pre_commit_instructions` tool to make sure tests and formatting pass.

5. **Submit PR**
   - Submit the PR as '⚡ George: Add support for updating edge properties with SET'.
