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
    let count = results.matches("Node {").count();
    assert_eq!(count, 2);
    assert!(results.contains("Alice"));
    assert!(results.contains("Charlie"));
    assert!(!results.contains("Bob"));

    // Test AND, OR, NOT and string/number parsing
    let q_match2 = "MATCH (n:Person) WHERE n.age = '30' OR NOT n.name = 'Charlie' AND n.age > 20 RETURN n";
    let results2 = graph.execute(q_match2).unwrap();
    let count2 = results2.matches("Node {").count();
    assert_eq!(count2, 2); // Alice (age 30), Bob (age 25, not charlie)
    assert!(results2.contains("Alice"));
    assert!(results2.contains("Bob"));
    assert!(!results2.contains("Charlie"));
}
