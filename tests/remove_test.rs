use serde_json::Value;
use yagdb::graph::Graph;

#[test]
fn test_remove_property() {
    let g = Graph::new();

    // Create node with properties
    g.execute("CREATE (n:Person {name: 'Alice', age: 30})")
        .unwrap();

    // Verify properties exist
    let result1 = g.execute("MATCH (n:Person) RETURN n").unwrap();
    let json1: Value = serde_json::from_str(&result1).unwrap();
    assert_eq!(json1[0]["n"]["properties"]["name"], "Alice");
    assert_eq!(json1[0]["n"]["properties"]["age"], 30.0);

    // Remove one property
    g.execute("MATCH (n:Person) REMOVE n.age").unwrap();

    // Verify property is gone
    let result2 = g.execute("MATCH (n:Person) RETURN n").unwrap();
    let json2: Value = serde_json::from_str(&result2).unwrap();
    assert_eq!(json2[0]["n"]["properties"]["name"], "Alice");
    assert!(json2[0]["n"]["properties"].get("age").is_none());
}

#[test]
fn test_remove_label() {
    let g = Graph::new();

    // Create node with multiple labels (Note: yagdb create currently parses one label per node in path, but let's just create one and remove it)
    g.execute("CREATE (n:Person {name: 'Bob'})").unwrap();

    // Verify node is found by label
    let result1 = g.execute("MATCH (n:Person) RETURN n").unwrap();
    let json1: Value = serde_json::from_str(&result1).unwrap();
    assert_eq!(json1.as_array().unwrap().len(), 1);

    // Remove label
    g.execute("MATCH (n:Person) REMOVE n:Person").unwrap();

    // Verify node is no longer found by label
    let result2 = g.execute("MATCH (n:Person) RETURN n").unwrap();
    let json2: Value = serde_json::from_str(&result2).unwrap();
    assert_eq!(json2.as_array().unwrap().len(), 0);

    // But node still exists
    let result3 = g.execute("MATCH (n) RETURN n").unwrap();
    let json3: Value = serde_json::from_str(&result3).unwrap();
    assert_eq!(json3.as_array().unwrap().len(), 1);
    assert_eq!(json3[0]["n"]["properties"]["name"], "Bob");
}
