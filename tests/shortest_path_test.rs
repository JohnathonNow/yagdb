use yagdb::graph::Graph;

#[test]
fn test_shortest_path_basic() {
    let g = Graph::new();
    // A -> B -> C -> D
    // A -> D
    g.execute("CREATE (a:Node {name: 'A'}), (b:Node {name: 'B'}), (c:Node {name: 'C'}), (d:Node {name: 'D'})").unwrap();
    g.execute("MATCH (a:Node {name: 'A'}), (b:Node {name: 'B'}) CREATE (a)-[:REL]->(b)")
        .unwrap();
    g.execute("MATCH (b:Node {name: 'B'}), (c:Node {name: 'C'}) CREATE (b)-[:REL]->(c)")
        .unwrap();
    g.execute("MATCH (c:Node {name: 'C'}), (d:Node {name: 'D'}) CREATE (c)-[:REL]->(d)")
        .unwrap();

    // Create a direct path A -> D
    g.execute("MATCH (a:Node {name: 'A'}), (d:Node {name: 'D'}) CREATE (a)-[:REL]->(d)")
        .unwrap();

    let res = g
        .execute(
            "MATCH p = shortestPath((a:Node {name: 'A'})-[r:REL*]->(d:Node {name: 'D'})) RETURN p",
        )
        .unwrap();
    let parsed: serde_json::Value = serde_json::from_str(&res).unwrap();
    let arr = parsed.as_array().unwrap();

    // Should find the path of length 1 (A -> D) instead of length 3 (A -> B -> C -> D)
    assert_eq!(arr.len(), 1);

    let path = arr[0].get("p").unwrap().as_array().unwrap();
    // A path with 1 edge has 3 elements: [Node(A), EdgeArray([rel_id]), Node(D)]
    assert_eq!(path.len(), 3);
}

#[test]
fn test_shortest_path_not_found() {
    let g = Graph::new();
    g.execute("CREATE (a:Node {name: 'A'}), (b:Node {name: 'B'})")
        .unwrap();

    // No path exists
    let res = g
        .execute(
            "MATCH p = shortestPath((a:Node {name: 'A'})-[r:REL*]->(b:Node {name: 'B'})) RETURN p",
        )
        .unwrap();
    let parsed: serde_json::Value = serde_json::from_str(&res).unwrap();
    let arr = parsed.as_array().unwrap();

    assert_eq!(arr.len(), 0);
}

#[test]
fn test_shortest_path_length_limits() {
    let g = Graph::new();
    // A -> B -> C
    g.execute("CREATE (a:Node {name: 'A'}), (b:Node {name: 'B'}), (c:Node {name: 'C'})")
        .unwrap();
    g.execute("MATCH (a:Node {name: 'A'}), (b:Node {name: 'B'}) CREATE (a)-[:REL]->(b)")
        .unwrap();
    g.execute("MATCH (b:Node {name: 'B'}), (c:Node {name: 'C'}) CREATE (b)-[:REL]->(c)")
        .unwrap();

    // Min length 3
    let res = g.execute("MATCH p = shortestPath((a:Node {name: 'A'})-[r:REL*3..]->(c:Node {name: 'C'})) RETURN p").unwrap();
    let parsed: serde_json::Value = serde_json::from_str(&res).unwrap();
    let arr = parsed.as_array().unwrap();

    // Should not find the path since its length is 2, and min is 3
    assert_eq!(arr.len(), 0);
}
