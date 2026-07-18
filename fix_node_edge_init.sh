sed -i 's/let dummy_node = Node {/let dummy_node = Node { created_by: 0, deleted_by: None,/g' src/export.rs
sed -i 's/let node = Node {/let node = Node { created_by: 0, deleted_by: None,/g' src/export.rs
sed -i 's/let dummy_edge = Edge {/let dummy_edge = Edge { created_by: 0, deleted_by: None,/g' src/export.rs
sed -i 's/let edge = Edge {/let edge = Edge { created_by: 0, deleted_by: None,/g' src/export.rs
