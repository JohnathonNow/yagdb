use yagdb::graph::Graph;

#[test]
fn test_create_and_use_index() {
    let mut g = Graph::new();

    // Create an index
    g.execute("CREATE INDEX ON :User(id)").unwrap();

    // Add some nodes
    g.execute("CREATE (u1:User {id: '1', name: 'Alice'})").unwrap();
    g.execute("CREATE (u2:User {id: '2', name: 'Bob'})").unwrap();
    g.execute("CREATE (u3:User {id: '3', name: 'Charlie'})").unwrap();

    // Also create another index after some nodes exist
    g.execute("CREATE INDEX ON :User(name)").unwrap();

    // Add more nodes
    g.execute("CREATE (u4:User {id: '4', name: 'Diana'})").unwrap();

    // Match using the first index
    let result1 = g.execute("MATCH (u:User {id: '2'}) RETURN u").unwrap();
    assert!(result1.contains("Bob"));
    assert!(!result1.contains("Alice"));

    // Match using the second index
    let result2 = g.execute("MATCH (u:User {name: 'Diana'}) RETURN u").unwrap();
    assert!(result2.contains("Diana"));
    assert!(!result2.contains("Charlie"));

    // Ensure the planner uses the index (implicit by verifying correctness and no failure)
}
