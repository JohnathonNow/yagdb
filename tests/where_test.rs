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
    graph.execute("CREATE (p:Person {name: 'Alice', age: 30})").unwrap();
    graph.execute("CREATE (p:Person {name: 'Bob', age: 40})").unwrap();

    let result = graph.execute("PROFILE MATCH (p:Person) WHERE p.name = 'Alice' RETURN p.age").unwrap();

    assert!(result.contains("NodeIndexLookup"), "Expected NodeIndexLookup in profile, got: {}", result);
    assert!(result.contains("Person.name"), "Expected Person.name in index lookup");
    assert!(result.contains("Alice"), "Expected Alice in index lookup");
}

#[test]
fn test_string_operators_execution() {
    let graph = Graph::new();
    let q_create = "CREATE (a:Item {name: 'Apple'}), (b:Item {name: 'Banana'}), (c:Item {name: 'Cherry'})";
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
