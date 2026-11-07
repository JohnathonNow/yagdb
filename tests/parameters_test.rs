use std::collections::HashMap;
use yagdb::graph::element::GraphElement;
use yagdb::graph::Graph;

#[test]
fn test_parameterized_query() {
    let g = Graph::new();

    // Create base node
    g.execute("CREATE (n:Person)").unwrap();

    let mut set_params = HashMap::new();
    set_params.insert(
        "name".to_string(),
        GraphElement::String("Alice".to_string()),
    );

    // Test SET with params (only one property first)
    g.execute_with_params("MATCH (n:Person) SET n.name = $name", set_params.clone())
        .unwrap();

    // Test MATCH with params via WHERE
    let mut match_params = HashMap::new();
    match_params.insert(
        "target_name".to_string(),
        GraphElement::String("Alice".to_string()),
    );

    let res = g
        .execute_with_params(
            "MATCH (n:Person) WHERE n.name = $target_name RETURN n.name",
            match_params,
        )
        .unwrap();

    assert!(res.contains("Alice"));
}
