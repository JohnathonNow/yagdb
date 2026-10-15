use serde_json::Value;
use yagdb::graph::Graph;

#[test]
fn test_return_distinct() {
    let g = Graph::new();
    g.execute(
        "CREATE (a:Person {name: 'Alice'}), (b:Person {name: 'Alice'}), (c:Person {name: 'Bob'})",
    )
    .unwrap();

    let res = g
        .execute("MATCH (n:Person) RETURN DISTINCT n.name ORDER BY n.name ASC")
        .unwrap();
    let parsed: Value = serde_json::from_str(&res).unwrap();
    let arr = parsed.as_array().unwrap();

    assert_eq!(arr.len(), 2);
    assert_eq!(arr[0]["n.name"].as_str().unwrap(), "Alice");
    assert_eq!(arr[1]["n.name"].as_str().unwrap(), "Bob");
}

#[test]
fn test_with_distinct() {
    let g = Graph::new();
    g.execute(
        "CREATE (a:Person {name: 'Alice'}), (b:Person {name: 'Alice'}), (c:Person {name: 'Bob'})",
    )
    .unwrap();

    let res = g
        .execute("MATCH (n:Person) WITH DISTINCT n.name AS name RETURN name ORDER BY name ASC")
        .unwrap();
    let parsed: Value = serde_json::from_str(&res).unwrap();
    let arr = parsed.as_array().unwrap();

    assert_eq!(arr.len(), 2);
    assert_eq!(arr[0]["name"].as_str().unwrap(), "Alice");
    assert_eq!(arr[1]["name"].as_str().unwrap(), "Bob");
}
