use yagdb::graph::Graph;


#[test]
fn test_explain() {
    let graph = Graph::new();
    let explain_output = graph.execute("EXPLAIN MATCH (n) RETURN n").unwrap();
    println!("{}", explain_output);
    assert!(explain_output.contains("Match"));
    assert!(explain_output.contains("Return"));
}
