use yagdb::graph::Graph;

#[test]
fn test_aggregate_count() {
    let mut g = Graph::new();
    g.execute("CREATE (a:Person {name: 'Alice'}), (b:Person {name: 'Bob'})")
        .unwrap();
    let res = g
        .execute("MATCH (n:Person) WITH COUNT(n) AS c RETURN c")
        .unwrap();
    assert!(res.contains("\"c\": 2"));
}

#[test]
fn test_aggregate_collect() {
    let mut g = Graph::new();
    g.execute("CREATE (a:Person {name: 'Alice'}), (b:Person {name: 'Bob'})")
        .unwrap();
    let res = g
        .execute("MATCH (n:Person) WITH COLLECT(n) AS nodes RETURN nodes")
        .unwrap();
    assert!(res.contains("\"Alice\"") && res.contains("\"Bob\""));
}

#[test]
fn test_aggregate_unique() {
    let mut g = Graph::new();
    g.execute(
        "CREATE (a:Person {name: 'Alice'}), (b:Person {name: 'Alice'}), (c:Person {name: 'Bob'})",
    )
    .unwrap();
    // UNIQUE is essentially COLLECT(DISTINCT n)
    // Actually, graph element equivalence tests might be naive for properties, but nodes have different IDs so UNIQUE(n) on 3 distinct nodes returns 3.
    let res = g
        .execute("MATCH (n:Person) WITH UNIQUE(n) AS nodes RETURN nodes")
        .unwrap();
    assert!(res.contains("\"Alice\""));
    assert!(res.contains("\"Bob\""));
}
