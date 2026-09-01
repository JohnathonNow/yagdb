use yagdb::graph::Graph;

#[test]
fn test_set_edge_property() {
    let graph = Graph::new();
    let q_create = "CREATE (a:Node)-[r:KNOWS {since: 2020}]->(b:Node)";
    graph.execute(q_create).unwrap();

    let q_set = "MATCH (a:Node)-[r:KNOWS]->(b:Node) SET r.since = 2024 RETURN r.since";
    let res = graph.execute(q_set).unwrap();
    println!("{}", res);

    assert!(res.contains("2024"));
}
