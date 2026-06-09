use std::collections::HashMap;
use std::fs;
use yagdb::graph::Graph;

#[test]
fn test_wal_and_recovery() {
    let snapshot_path = "test_graph.bin";
    let wal_path = "test_wal.bin";

    // Clean up any existing files
    let _ = fs::remove_file(snapshot_path);
    let _ = fs::remove_file(wal_path);

    // Create a new graph and add some data
    {
        let mut g = Graph::load_or_create(snapshot_path, wal_path);
        g.execute("CREATE (a:Person {name: 'Alice'})-[r:KNOWS]->(b:Person {name: 'Bob'})")
            .unwrap();
    }

    // Now reload the graph from the snapshot + WAL
    {
        let mut g = Graph::load_or_create(snapshot_path, wal_path);
        let result = g
            .execute("MATCH (a:Person)-[r:KNOWS]->(b:Person) RETURN a, r, b")
            .unwrap();

        assert!(result.contains("\"a\":"));
        assert!(result.contains("\"r\":"));
        assert!(result.contains("\"b\":"));
        assert!(result.contains(r#""name": "Alice""#));
        assert!(result.contains(r#""name": "Bob""#));

        // Add more data to verify WAL appending works
        g.execute("CREATE (c:Person {name: 'Charlie'})").unwrap();
    }

    // Reload again to verify the new snapshot incorporates the previous WAL + the new WAL works
    {
        let mut g = Graph::load_or_create(snapshot_path, wal_path);
        let result = g
            .execute("MATCH (c:Person {name: 'Charlie'}) RETURN c")
            .unwrap();
        assert!(result.contains("\"c\":"));
        assert!(result.contains(r#""name": "Charlie""#));
    }

    // Cleanup
    let _ = fs::remove_file(snapshot_path);
    let _ = fs::remove_file(wal_path);
}
