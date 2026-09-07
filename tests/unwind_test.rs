use yagdb::graph::Graph;

#[test]
fn test_unwind_expr() {
    let g = Graph::new();
    let res = g.execute("UNWIND [1, 2, 3] AS x RETURN x").unwrap();
    assert!(res.contains("1"));

    let res = g.execute("UNWIND 1 AS x RETURN x").unwrap();
    assert!(res.contains("1"));
}
