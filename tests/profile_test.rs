use yagdb::graph::Graph;

#[test]
fn test_profile_output() {
    let mut g = Graph::new();
    g.execute("CREATE (a:User {id: '1'})-[r:FOLLOWS]->(b:User {id: '2'})").unwrap();

    let result = g.execute("PROFILE MATCH (u1:User {id: '1'})-[rel:FOLLOWS]->(u2:User {id: '2'}) RETURN u1, rel, u2").unwrap();

    println!("RESULT:\n{}", result);
    assert!(result.contains("\"profile\": \""));
    assert!(result.contains("NodeLabelLookup"));
    assert!(result.contains("PathExpand"));
    assert!(result.contains("\"u1\":"));
}
