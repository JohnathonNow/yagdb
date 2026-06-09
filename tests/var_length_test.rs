use yagdb::graph::Graph;

#[test]
fn test_variable_length() {
    let mut g = Graph::new();
    g.execute("CREATE (a:Node {id: '1'})-[r1:REL]->(b:Node {id: '2'})-[r2:REL]->(c:Node {id: '3'})").unwrap();
    let res = g.execute("MATCH (a:Node {id: '1'})-[*1..2]->(c) RETURN c").unwrap();
    println!("{}", res);
    assert!(res.contains("\"id\": \"2\""));
    assert!(res.contains("\"id\": \"3\""));
}

#[test]
fn test_variable_length_with_label_and_props() {
    let mut g = Graph::new();
    g.execute("CREATE (a:Node {id: '1'})-[r1:REL {prop: 'A'}]->(b:Node {id: '2'})-[r2:REL {prop: 'B'}]->(c:Node {id: '3'})").unwrap();
    let res = g.execute("MATCH (a:Node {id: '1'})-[:REL *1..2]->(c) RETURN c").unwrap();
    println!("{}", res);
    assert!(res.contains("\"id\": \"2\""));
    assert!(res.contains("\"id\": \"3\""));
}

#[test]
fn test_variable_length_bind_var() {
    let mut g = Graph::new();
    g.execute("CREATE (a:Node {id: '1'})-[r1:REL]->(b:Node {id: '2'})-[r2:REL]->(c:Node {id: '3'})").unwrap();
    // It's okay if binding var lists is not fully supported, let's see what happens.
    // Let's implement GraphElement::Array to hold multiple edges!
    let res = g.execute("MATCH (a:Node {id: '1'})-[r*1..2]->(c) RETURN r").unwrap();
    println!("{}", res);
    // if r is array:
    assert!(res.contains("start"));
}
