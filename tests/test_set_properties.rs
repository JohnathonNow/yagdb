use yagdb::graph::Graph;

#[test]
fn test_set_properties_add() {
    let g = Graph::new();
    g.execute("CREATE (n:Person {name: 'Alice', old_prop: 'keep_me'})")
        .unwrap();
    g.execute("MATCH (n:Person) SET n += {age: 30, city: 'London'}")
        .unwrap();
    let r = g.execute("MATCH (n:Person) RETURN n").unwrap();
    assert!(r.contains("30"));
    assert!(r.contains("London"));
    assert!(r.contains("Alice"));
    assert!(r.contains("keep_me"));
}

#[test]
fn test_set_properties_replace() {
    let g = Graph::new();
    g.execute("CREATE (n:Person {name: 'Alice', old_prop: 'remove_me'})")
        .unwrap();
    g.execute("MATCH (n:Person) SET n = {age: 30, city: 'London'}")
        .unwrap();
    let r = g.execute("MATCH (n:Person) RETURN n").unwrap();
    assert!(r.contains("30"));
    assert!(r.contains("London"));
    assert!(!r.contains("Alice"));
    assert!(!r.contains("remove_me"));
}
