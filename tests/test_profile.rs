use yagdb::graph::Graph;

#[test]
fn test_index_where() {
    let mut g = Graph::new();
    g.execute("CREATE INDEX ON :User(username)").unwrap();
    let result = g.execute("PROFILE MATCH (u:User) WHERE u.username = 'bob' RETURN u").unwrap();
    println!("{}", result);
    assert!(result.contains("NodeIndexLookup"));
}
