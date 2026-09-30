use yagdb::graph::Graph;

#[test]
fn test_math_without_parens() {
    let graph = Graph::new();
    // This should fail to parse before the fix
    let _ = graph.execute("RETURN rand() * 5").unwrap();
}
