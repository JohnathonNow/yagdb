use std::fs;
use yagdb::graph::Graph;

#[test]
fn test_delete_nodes_and_edges() {
    let snapshot_path = "test_delete_snapshot.bin";
    let wal_path = "test_delete_wal.bin";
    let _ = fs::remove_file(snapshot_path);
    let _ = fs::remove_file(wal_path);

    {
        let mut g = Graph::load_or_create(snapshot_path, wal_path);
        g.execute("CREATE (a:User {name: 'Alice'})-[r:KNOWS]->(b:User {name: 'Bob'})")
            .unwrap();
        let r1 = g.execute("MATCH (n:User) RETURN n").unwrap();
        assert!(r1.contains("Alice"));
        assert!(r1.contains("Bob"));

        g.execute("MATCH (n:User {name: 'Alice'})-[r]->() DELETE n, r")
            .unwrap();
        let r2 = g.execute("MATCH (n:User) RETURN n").unwrap();
        assert!(!r2.contains("Alice"));
        assert!(r2.contains("Bob"));
    }

    // Now verify WAL persistence
    {
        let mut g = Graph::load_or_create(snapshot_path, wal_path);
        let r3 = g.execute("MATCH (n:User) RETURN n").unwrap();
        assert!(!r3.contains("Alice"));
        assert!(r3.contains("Bob"));
        let r4 = g.execute("MATCH ()-[r:KNOWS]->() RETURN r").unwrap();
        assert_eq!(r4, "[]");
    }

    let _ = fs::remove_file(snapshot_path);
    let _ = fs::remove_file(wal_path);
}
