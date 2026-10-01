use serde_json::Value;
use yagdb::graph::Graph;

#[test]
fn test_date_functions() {
    let g = Graph::new();

    // Query for date()
    let query_str = "RETURN date() AS d";
    let result_json_str = g.execute(query_str).unwrap();
    let result: Value = serde_json::from_str(&result_json_str).unwrap();

    let d = &result[0]["d"];
    assert!(d.as_str().unwrap().chars().filter(|&c| c == '-').count() == 2);

    // Query for datetime()
    let query_str = "RETURN datetime() AS d";
    let result_json_str = g.execute(query_str).unwrap();
    let result: Value = serde_json::from_str(&result_json_str).unwrap();

    let d = &result[0]["d"];
    assert!(d.as_str().unwrap().contains("T") || d.as_str().unwrap().contains(" "));
}
