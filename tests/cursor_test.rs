use yagdb::graph::Graph;

#[test]
fn test_cursor_pagination() {
    let graph = Graph::new();

    // Create dummy data
    for i in 1..=5 {
        graph.execute(&format!("CREATE (n:Item {{id: {}}})", i)).unwrap();
    }

    // Initialize cursor
    let query = "MATCH (n:Item) RETURN n.id AS id ORDER BY id ASC";
    let cursor_id = graph.execute_cursor(query).expect("Failed to execute cursor");
    assert!(!cursor_id.is_empty(), "Cursor ID should not be empty");

    // Fetch batch 1 (size 2)
    let batch1_json = graph.fetch_cursor(&cursor_id, 2).expect("Failed to fetch first batch");
    let batch1: Vec<serde_json::Value> = serde_json::from_str(&batch1_json).unwrap();
    assert_eq!(batch1.len(), 2);
    assert_eq!(batch1[0]["id"], 1.0);
    assert_eq!(batch1[1]["id"], 2.0);

    // Fetch batch 2 (size 2)
    let batch2_json = graph.fetch_cursor(&cursor_id, 2).expect("Failed to fetch second batch");
    let batch2: Vec<serde_json::Value> = serde_json::from_str(&batch2_json).unwrap();
    assert_eq!(batch2.len(), 2);
    assert_eq!(batch2[0]["id"], 3.0);
    assert_eq!(batch2[1]["id"], 4.0);

    // Fetch batch 3 (size 2, but only 1 left)
    let batch3_json = graph.fetch_cursor(&cursor_id, 2).expect("Failed to fetch third batch");
    let batch3: Vec<serde_json::Value> = serde_json::from_str(&batch3_json).unwrap();
    assert_eq!(batch3.len(), 1);
    assert_eq!(batch3[0]["id"], 5.0);

    // Fetching after exhausted should fail
    let fetch_exhausted = graph.fetch_cursor(&cursor_id, 2);
    assert!(fetch_exhausted.is_err(), "Fetching from exhausted cursor should return an error");
}

#[test]
fn test_cursor_early_close() {
    let graph = Graph::new();

    for i in 1..=5 {
        graph.execute(&format!("CREATE (n:Item {{id: {}}})", i)).unwrap();
    }

    let query = "MATCH (n:Item) RETURN n";
    let cursor_id = graph.execute_cursor(query).unwrap();

    let close_res = graph.close_cursor(&cursor_id);
    assert!(close_res.is_ok(), "Cursor should be closed successfully");

    let fetch_res = graph.fetch_cursor(&cursor_id, 10);
    assert!(fetch_res.is_err(), "Fetching from closed cursor should fail");
}
