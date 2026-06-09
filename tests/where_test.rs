use yagdb::graph::Graph;

#[test]
fn test_match_where_evaluation() {
    let mut graph = Graph::new();
    let q_create = "CREATE (a:Person {name: 'Alice', age: '30'}), (b:Person {name: 'Bob', age: '25'}), (c:Person {name: 'Charlie', age: '35'})";
    graph.execute(q_create).unwrap();

    // Test > comparison
    let q_match = "MATCH (n:Person) WHERE n.age > 28 RETURN n";
    let results = graph.execute(q_match).unwrap();

    // Check results output
    let parsed: serde_json::Value = serde_json::from_str(&results).unwrap();
    let count = parsed.as_array().unwrap().len();
    assert_eq!(count, 2);
    assert!(results.contains("Alice"));
    assert!(results.contains("Charlie"));
    assert!(!results.contains("Bob"));

    // Test AND, OR, NOT and string/number parsing
    let q_match2 = "MATCH (n:Person) WHERE n.age = '30' OR NOT n.name = 'Charlie' AND n.age > 20 RETURN n";
    let results2 = graph.execute(q_match2).unwrap();
    let parsed2: serde_json::Value = serde_json::from_str(&results2).unwrap();
    let count2 = parsed2.as_array().unwrap().len();
    assert_eq!(count2, 2); // Alice (age 30), Bob (age 25, not charlie)
    assert!(results2.contains("Alice"));
    assert!(results2.contains("Bob"));
    assert!(!results2.contains("Charlie"));
}
