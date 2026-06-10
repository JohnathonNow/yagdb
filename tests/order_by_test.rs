use yagdb::graph::Graph;
use serde_json::Value;

#[test]
fn test_order_by() {
    let mut g = Graph::new();
    g.execute("CREATE (a:Test {v: '1'})").unwrap();
    g.execute("CREATE (b:Test {v: '2'})").unwrap();
    g.execute("CREATE (c:Test {v: '3'})").unwrap();
    let res = g.execute("MATCH (n:Test) RETURN n AS val ORDER BY val.v DESC").unwrap();

    let json: Vec<Value> = serde_json::from_str(&res).unwrap();
    assert_eq!(json.len(), 3);
    assert_eq!(json[0]["val"]["properties"]["v"].as_str().unwrap(), "3");
    assert_eq!(json[1]["val"]["properties"]["v"].as_str().unwrap(), "2");
    assert_eq!(json[2]["val"]["properties"]["v"].as_str().unwrap(), "1");
}

#[test]
fn test_rand() {
    let mut g = Graph::new();
    g.execute("CREATE (a:Test {v: '1'})").unwrap();
    g.execute("CREATE (b:Test {v: '2'})").unwrap();
    g.execute("CREATE (c:Test {v: '3'})").unwrap();
    let res = g.execute("MATCH (n:Test) RETURN rand() AS r").unwrap();

    let json: Vec<Value> = serde_json::from_str(&res).unwrap();
    assert_eq!(json.len(), 3);
    assert!(json[0]["r"].as_f64().is_some());
}
