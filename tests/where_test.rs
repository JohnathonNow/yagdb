use yagdb::graph::Graph;

#[test]
fn test_match_where_evaluation() {
    let graph = Graph::new();
    let q_create = "CREATE (a:Person {name: 'Alice', age: '30'}), (b:Person {name: 'Bob', age: '25'}), (c:Person {name: 'Charlie', age: '35'})";
    graph.execute(q_create).unwrap();

    // Test > comparison
    let q_match = "MATCH (n:Person) WHERE n.age > 28 RETURN n";
    let results = graph.execute(q_match).unwrap();

    // Check results output
    let parsed: serde_json::Value = serde_json::from_str(&results).unwrap();
    let count = parsed.as_array().unwrap().len();
    assert_eq!(count, 2);
    assert!(results.contains("Alice"));
    assert!(results.contains("Charlie"));
    assert!(!results.contains("Bob"));

    // Test AND, OR, NOT and string/number parsing
    let q_match2 =
        "MATCH (n:Person) WHERE n.age = '30' OR NOT n.name = 'Charlie' AND n.age > 20 RETURN n";
    let results2 = graph.execute(q_match2).unwrap();
    let parsed2: serde_json::Value = serde_json::from_str(&results2).unwrap();
    let count2 = parsed2.as_array().unwrap().len();
    assert_eq!(count2, 2); // Alice (age 30), Bob (age 25, not charlie)
    assert!(results2.contains("Alice"));
    assert!(results2.contains("Bob"));
    assert!(!results2.contains("Charlie"));
}

#[test]
fn test_match_where_in() {
    let graph = Graph::new();
    let q_create = "CREATE (a:Person {name: 'Alice', age: 30}), (b:Person {name: 'Bob', age: 25}), (c:Person {name: 'Charlie', age: 35})";
    graph.execute(q_create).unwrap();

    let q_match = "MATCH (n:Person) WHERE n.name IN ['Alice', 'Bob'] RETURN n";
    let results = graph.execute(q_match).unwrap();

    let parsed: serde_json::Value = serde_json::from_str(&results).unwrap();
    let count = parsed.as_array().unwrap().len();
    assert_eq!(count, 2);
    assert!(results.contains("Alice"));
    assert!(results.contains("Bob"));
    assert!(!results.contains("Charlie"));

    let q_match_nums = "MATCH (n:Person) WHERE n.age IN [25, 35] RETURN n";
    let results_nums = graph.execute(q_match_nums).unwrap();
    let parsed_nums: serde_json::Value = serde_json::from_str(&results_nums).unwrap();
    let count_nums = parsed_nums.as_array().unwrap().len();
    assert_eq!(count_nums, 2);
    assert!(!results_nums.contains("Alice"));
    assert!(results_nums.contains("Bob"));
    assert!(results_nums.contains("Charlie"));
}

#[test]
fn test_where_pushdown() {
    let graph = Graph::new();
    graph.execute("CREATE HASH INDEX ON :Person(name)").unwrap();
    graph
        .execute("CREATE (p:Person {name: 'Alice', age: 30})")
        .unwrap();
    graph
        .execute("CREATE (p:Person {name: 'Bob', age: 40})")
        .unwrap();

    let result = graph
        .execute("PROFILE MATCH (p:Person) WHERE p.name = 'Alice' RETURN p.age")
        .unwrap();

    assert!(
        result.contains("NodeIndexLookup"),
        "Expected NodeIndexLookup in profile, got: {}",
        result
    );
    assert!(
        result.contains("Person.name"),
        "Expected Person.name in index lookup"
    );
    assert!(result.contains("Alice"), "Expected Alice in index lookup");
}

#[test]
fn test_string_operators_execution() {
    let graph = Graph::new();
    let q_create =
        "CREATE (a:Item {name: 'Apple'}), (b:Item {name: 'Banana'}), (c:Item {name: 'Cherry'})";
    graph.execute(q_create).unwrap();

    let q_starts = "MATCH (n:Item) WHERE n.name STARTS WITH 'A' RETURN n.name";
    let res_starts = graph.execute(q_starts).unwrap();
    assert!(res_starts.contains("Apple"));
    assert!(!res_starts.contains("Banana"));
    assert!(!res_starts.contains("Cherry"));

    let q_ends = "MATCH (n:Item) WHERE n.name ENDS WITH 'a' RETURN n.name";
    let res_ends = graph.execute(q_ends).unwrap();
    assert!(!res_ends.contains("Apple"));
    assert!(res_ends.contains("Banana"));
    assert!(!res_ends.contains("Cherry"));

    let q_contains = "MATCH (n:Item) WHERE n.name CONTAINS 'err' RETURN n.name";
    let res_contains = graph.execute(q_contains).unwrap();
    assert!(!res_contains.contains("Apple"));
    assert!(!res_contains.contains("Banana"));
    assert!(res_contains.contains("Cherry"));
}

#[test]
fn test_call_subquery() {
    let g = Graph::new();
    g.execute(
        "CREATE (a:User {name: 'Alice'}), (b:User {name: 'Bob'}), (c:User {name: 'Charlie'})",
    )
    .unwrap();
    g.execute("MATCH (a:User {name: 'Alice'}), (b:User {name: 'Bob'}) CREATE (a)-[:KNOWS]->(b)")
        .unwrap();
    g.execute("MATCH (b:User {name: 'Bob'}), (c:User {name: 'Charlie'}) CREATE (b)-[:KNOWS]->(c)")
        .unwrap();

    let query = "MATCH (n:User {name: 'Alice'}) CALL { WITH n MATCH (n)-[:KNOWS]->(m) RETURN m } RETURN n.name, m.name";
    let result = g.execute(query).unwrap();

    let val: serde_json::Value = serde_json::from_str(&result).unwrap();
    let arr = val.as_array().unwrap();

    // Alice knows Bob, so it should return Alice and Bob.
    assert_eq!(arr.len(), 1);
    let row = &arr[0];
    assert_eq!(row["n.name"].as_str().unwrap(), "Alice");
    assert_eq!(row["m.name"].as_str().unwrap(), "Bob");
}

#[test]
fn test_is_null_operators() {
    let g = Graph::new();
    g.execute("CREATE (a:User {name: 'Alice', age: 30})")
        .unwrap();
    g.execute("CREATE (b:User {name: 'Bob'})").unwrap();
    g.execute("CREATE (c:User {age: 40})").unwrap();

    let query_is_null = "MATCH (n:User) WHERE n.name IS NULL RETURN n.age";
    let result_null = g.execute(query_is_null).unwrap();
    let val_null: serde_json::Value = serde_json::from_str(&result_null).unwrap();
    let arr_null = val_null.as_array().unwrap();

    assert_eq!(arr_null.len(), 1);
    assert_eq!(arr_null[0]["n.age"].as_f64().unwrap(), 40.0);

    let query_is_not_null = "MATCH (n:User) WHERE n.age IS NOT NULL RETURN n.name ORDER BY n.name";
    let result_not_null = g.execute(query_is_not_null).unwrap();
    let val_not_null: serde_json::Value = serde_json::from_str(&result_not_null).unwrap();
    let arr_not_null = val_not_null.as_array().unwrap();

    assert_eq!(arr_not_null.len(), 2);
    // Since node C has no name, it might be null.
    // The sorting order of Alice vs null might place null first or last depending on partial_cmp.
    // We just verify it contains Alice and does not contain Bob.
    let mut names = vec![];
    for row in arr_not_null {
        if let Some(name) = row["n.name"].as_str() {
            names.push(name.to_string());
        }
    }
    assert!(names.contains(&"Alice".to_string()));
    assert!(!names.contains(&"Bob".to_string()));
}

#[test]
fn test_min_max_aggregates_execution() {
    let g = Graph::new();
    g.execute("CREATE (a:Person {name: 'Alice', age: 30})").unwrap();
    g.execute("CREATE (b:Person {name: 'Bob', age: 45})").unwrap();
    g.execute("CREATE (c:Person {name: 'Charlie', age: 22})").unwrap();
    g.execute("CREATE (d:Person {name: 'Dave'})").unwrap(); // No age property

    let res = g.execute("MATCH (n:Person) RETURN MIN(n.age) AS min_age, MAX(n.age) AS max_age").unwrap();
    let parsed: serde_json::Value = serde_json::from_str(&res).unwrap();
    let arr = parsed.as_array().unwrap();

    assert_eq!(arr.len(), 1);
    let row = &arr[0];

    assert_eq!(row.get("min_age").unwrap().as_f64().unwrap(), 22.0);
    assert_eq!(row.get("max_age").unwrap().as_f64().unwrap(), 45.0);
}
