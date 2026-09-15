use yagdb::graph::Graph;

#[test]
fn test_set_label() {
    let g = Graph::new();

    // Create a node without the target label
    g.execute("CREATE (n:Person {name: 'Alice'})").unwrap();

    // Verify it doesn't match Admin
    let res1 = g.execute("MATCH (n:Admin) RETURN n").unwrap();
    assert_eq!(res1.trim(), "[]");

    // Set the label
    g.execute("MATCH (n:Person {name: 'Alice'}) SET n:Admin").unwrap();

    // Verify it now matches Admin
    let res2 = g.execute("MATCH (n:Admin) RETURN n").unwrap();
    let parsed: serde_json::Value = serde_json::from_str(&res2).unwrap();
    let arr = parsed.as_array().unwrap();
    assert_eq!(arr.len(), 1);

    let node = arr[0].get("n").unwrap().as_object().unwrap();
    let properties = node.get("properties").unwrap().as_object().unwrap();
    assert_eq!(properties.get("name").unwrap().as_str().unwrap(), "Alice");

    // Verify it retained the original label too (yagdb doesn't support n:Person:Admin in MATCH yet, so we just check Person again)
    let res3 = g.execute("MATCH (n:Person) RETURN n").unwrap();
    let parsed3: serde_json::Value = serde_json::from_str(&res3).unwrap();
    assert_eq!(parsed3.as_array().unwrap().len(), 1);
}
