use yagdb::graph::Graph;

#[test]
fn test_return_property() {
    let mut g = Graph::new();
    g.execute("CREATE (u:User {id: '1', name: 'Alice'})").unwrap();
    let res = g.execute("MATCH (u:User) RETURN u.name").unwrap();
    println!("{}", res);
    assert!(res.contains("Alice"));
}
