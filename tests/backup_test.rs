use yagdb::graph::Graph;

#[test]
#[cfg(not(target_arch = "wasm32"))]
fn test_graph_backup_serialization() {
    let mut g = Graph::new();
    g.execute("CREATE (a:User {name: 'Alice'})").unwrap();

    let backup_bytes = g.backup().unwrap();
    assert!(!backup_bytes.is_empty());

    // Test that the serialized bytes can be deserialized back into a Graph.
    let g2: Graph = bincode::deserialize(&backup_bytes).unwrap();
    assert_eq!(g2.nodes.len_items(), 1);
}
