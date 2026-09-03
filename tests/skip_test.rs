use serde_json::Value;
use yagdb::graph::Graph;

#[test]
fn test_skip_clause() {
    let g = Graph::new();

    // Create test data
    g.execute("CREATE (u:User {name: 'Alice'}), (u2:User {name: 'Bob'}), (u3:User {name: 'Charlie'}), (u4:User {name: 'Dave'})").unwrap();

    // Test SKIP only
    let res = g
        .execute("MATCH (u:User) RETURN u.name AS name ORDER BY name ASC SKIP 2")
        .unwrap();
    let parsed: Value = serde_json::from_str(&res).unwrap();
    let arr = parsed.as_array().unwrap();
    assert_eq!(arr.len(), 2);
    assert_eq!(arr[0]["name"].as_str().unwrap(), "Charlie");
    assert_eq!(arr[1]["name"].as_str().unwrap(), "Dave");

    // Test SKIP and LIMIT together
    let res = g
        .execute("MATCH (u:User) RETURN u.name AS name ORDER BY name ASC SKIP 1 LIMIT 2")
        .unwrap();
    let parsed: Value = serde_json::from_str(&res).unwrap();
    let arr = parsed.as_array().unwrap();
    assert_eq!(arr.len(), 2);
    assert_eq!(arr[0]["name"].as_str().unwrap(), "Bob");
    assert_eq!(arr[1]["name"].as_str().unwrap(), "Charlie");

    // Test SKIP larger than total rows
    let res = g
        .execute("MATCH (u:User) RETURN u.name AS name ORDER BY name ASC SKIP 10")
        .unwrap();
    let parsed: Value = serde_json::from_str(&res).unwrap();
    assert!(parsed.is_null() || (parsed.is_array() && parsed.as_array().unwrap().is_empty()));

    // Test WITH SKIP
    let res = g
        .execute("MATCH (u:User) WITH u.name AS name ORDER BY name ASC SKIP 2 RETURN name")
        .unwrap();
    let parsed: Value = serde_json::from_str(&res).unwrap();
    let arr = parsed.as_array().unwrap();
    assert_eq!(arr.len(), 2);
    assert_eq!(arr[0]["name"].as_str().unwrap(), "Charlie");
    assert_eq!(arr[1]["name"].as_str().unwrap(), "Dave");
}
