use yagdb::graph::Graph;

#[test]
fn test_ast_cache() {
    let g = Graph::new();

    // First execution: should parse and insert into cache
    let result1 = g.execute("CREATE (n:CacheTest {val: 1}) RETURN n").unwrap();
    assert!(result1.contains("val\": 1.0"));

    // Subsequent executions: should hit cache
    for _ in 0..5 {
        let result2 = g.execute("MATCH (n:CacheTest) RETURN n").unwrap();
        assert!(result2.contains("val\": 1.0"));
    }
}
