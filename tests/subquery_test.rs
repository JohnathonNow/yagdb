use yagdb::graph::Graph;

#[test]
fn test_subquery_execution() {
    let mut g = Graph::new();

    g.execute("CREATE (a1:A {name: 'A1'}), (a2:A {name: 'A2'})").unwrap();
    g.execute("CREATE (b1:B {name: 'B1'}), (b2:B {name: 'B2'})").unwrap();

    let result = g.execute("MATCH (a:A) CALL { MATCH (b:B) RETURN b } RETURN a, b").unwrap();

    let parsed: serde_json::Value = serde_json::from_str(&result).unwrap();
    let rows = parsed.as_array().unwrap();
    assert_eq!(rows.len(), 4, "Should be 4 rows representing cross-product of A and B via CALL subquery");

    let mut pairs = std::collections::HashSet::new();
    for row in rows {
        let a_name = row["a"]["properties"]["name"].as_str().unwrap();
        let b_name = row["b"]["properties"]["name"].as_str().unwrap();
        pairs.insert(format!("{}-{}", a_name, b_name));
    }

    assert!(pairs.contains("A1-B1"));
    assert!(pairs.contains("A1-B2"));
    assert!(pairs.contains("A2-B1"));
    assert!(pairs.contains("A2-B2"));
}

#[test]
fn test_subquery_mutation() {
    let mut g = Graph::new();

    g.execute("CREATE (a1:A {id: '1'})").unwrap();

    g.execute("MATCH (a:A) CALL { CREATE (b:B {parent: '1'}) }").unwrap();

    let result = g.execute("MATCH (b:B) RETURN b").unwrap();
    let parsed: serde_json::Value = serde_json::from_str(&result).unwrap();
    let rows = parsed.as_array().unwrap();
    assert_eq!(rows.len(), 1);
    assert_eq!(rows[0]["b"]["properties"]["parent"].as_str().unwrap(), "1");
}
