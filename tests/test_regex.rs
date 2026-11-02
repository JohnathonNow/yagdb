use yagdb::graph::Graph;

#[test]
fn test_regex_match() {
    let g = Graph::new();

    // Create test data
    g.execute("CREATE (n:Person {name: 'Alice', email: 'alice@example.com'})")
        .unwrap();
    g.execute("CREATE (n:Person {name: 'Bob', email: 'bob@gmail.com'})")
        .unwrap();
    g.execute("CREATE (n:Person {name: 'Charlie', email: 'charlie@example.org'})")
        .unwrap();

    // Test simple regex match
    let result1 = g
        .execute("MATCH (n:Person) WHERE n.name =~ '(?i)^a.*' RETURN n")
        .unwrap();
    assert!(result1.contains("Alice"));
    assert!(!result1.contains("Bob"));

    // Test complex regex match
    let result2 = g
        .execute("MATCH (n:Person) WHERE n.email =~ '.*@example\\..*' RETURN n")
        .unwrap();
    assert!(result2.contains("Alice"));
    assert!(result2.contains("Charlie"));
    assert!(!result2.contains("Bob"));

    // Test negative match
    let result3 = g
        .execute("MATCH (n:Person) WHERE NOT n.email =~ '.*@example\\..*' RETURN n")
        .unwrap();
    assert!(!result3.contains("Alice"));
    assert!(!result3.contains("Charlie"));
    assert!(result3.contains("Bob"));
}
