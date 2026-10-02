use serde_json::Value;
use yagdb::graph::Graph;

#[test]
fn test_remove_edge_property() {
    let g = Graph::new();
    g.execute("CREATE (a)-[r:KNOWS {since: 2020}]->(b)")
        .unwrap();
    let res1 = g.execute("MATCH (a)-[r]->(b) RETURN r").unwrap();
    let json1: Value = serde_json::from_str(&res1).unwrap();
    assert_eq!(json1[0]["r"]["properties"]["since"], 2020.0);

    g.execute("MATCH (a)-[r]->(b) REMOVE r.since").unwrap();
    let res2 = g.execute("MATCH (a)-[r]->(b) RETURN r").unwrap();
    let json2: Value = serde_json::from_str(&res2).unwrap();
    assert!(
        json2[0]["r"]["properties"].get("since").is_none(),
        "Edge property 'since' should be removed"
    );
}
