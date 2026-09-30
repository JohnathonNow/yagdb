use yagdb::graph::Graph;

#[test]
fn test_math_without_parens_vars() {
    let graph = Graph::new();
    let _ = graph.execute("MATCH (n) RETURN n.age * 5").unwrap();
}
