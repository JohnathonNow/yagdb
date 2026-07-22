use std::fs;
use yagdb::graph::Graph;

#[test]
fn test_merge_set() {
    let snapshot_path = "test_merge_set_snapshot.bin";
    let wal_path = "test_merge_set_wal.bin";
    let _ = fs::remove_file(snapshot_path);
    let _ = fs::remove_file(wal_path);

    {
        let mut g = Graph::load_or_create(snapshot_path, wal_path);
        g.execute("MERGE (n:Person {name: 'Alice'})").unwrap();
        let r1 = g.execute("MATCH (n:Person) RETURN n").unwrap();
        assert!(r1.contains("Alice"));

        g.execute("MERGE (n:Person {name: 'Alice'})").unwrap();
        let r2 = g.execute("MATCH (n:Person) RETURN n").unwrap();
        // Should still only have one Alice
        assert_eq!(r1, r2);

        g.execute("MATCH (n:Person {name: 'Alice'}) SET n.age = '30'")
            .unwrap();
        let r3 = g.execute("MATCH (n:Person) RETURN n").unwrap();
        assert!(r3.contains("30"));
    }

    // Now verify WAL persistence
    {
        let mut g = Graph::load_or_create(snapshot_path, wal_path);
        let r4 = g.execute("MATCH (n:Person) RETURN n").unwrap();
        assert!(r4.contains("Alice"));
        assert!(r4.contains("30"));
    }

    let _ = fs::remove_file(snapshot_path);
    let _ = fs::remove_file(wal_path);
}

#[test]
fn test_set_index_update() {
    let snapshot_path = "test_set_index_snapshot.bin";
    let wal_path = "test_set_index_wal.bin";
    let _ = fs::remove_file(snapshot_path);
    let _ = fs::remove_file(wal_path);

    {
        let mut g = Graph::load_or_create(snapshot_path, wal_path);
        g.execute("CREATE INDEX ON :Person(name)").unwrap();
        g.execute("MERGE (n:Person {name: 'Alice'})").unwrap();

        // Verify index works
        let r1 = g
            .execute("MATCH (n:Person {name: 'Alice'}) RETURN n")
            .unwrap();
        assert!(r1.contains("Alice"));

        // Update property
        g.execute("MATCH (n:Person {name: 'Alice'}) SET n.name = 'Bob'")
            .unwrap();

        // Old index value should be gone
        let r2 = g
            .execute("MATCH (n:Person {name: 'Alice'}) RETURN n")
            .unwrap();
        assert!(!r2.contains("Alice"));
        assert!(!r2.contains("Node"));

        // New index value should be present
        let r3 = g
            .execute("MATCH (n:Person {name: 'Bob'}) RETURN n")
            .unwrap();
        assert!(r3.contains("Bob"));
    }

    let _ = fs::remove_file(snapshot_path);
    let _ = fs::remove_file(wal_path);
}

#[test]
fn test_set_from_function() {
    let mut g = Graph::new();
    // Graph::new() already registers default functions
    g.execute("CREATE (n:Test {value: 'initial'})").unwrap();

    // Create a custom function to test deterministic return
    let custom_func = std::sync::Arc::new(|_args: &[yagdb::graph::GraphElement]| -> Result<yagdb::graph::GraphElement, String> {
        Ok(yagdb::graph::GraphElement::Number(42.0))
    });
    g.register_function("custom_val", custom_func);

    g.execute("MATCH (n:Test) SET n.value = custom_val()").unwrap();

    let result = g.execute("MATCH (n:Test) RETURN n.value AS val").unwrap();
    assert!(result.contains("42"));
}
