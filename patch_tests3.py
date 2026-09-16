import re

with open("tests/merge_set_test.rs", "r") as f:
    content = f.read()

new_test = """
#[test]
fn test_set_labels() {
    let snapshot_path = "test_set_labels_snapshot.bin";
    let wal_path = "test_set_labels_wal.bin";
    let _ = std::fs::remove_file(snapshot_path);
    let _ = std::fs::remove_file(wal_path);

    {
        let g = Graph::load_or_create(snapshot_path, wal_path);
        g.execute("CREATE (n:Person {name: 'Alice'})").unwrap();

        // Update labels
        g.execute("MATCH (n:Person {name: 'Alice'}) SET n:Employee:Manager").unwrap();

        let result = g.execute("MATCH (n:Employee) RETURN n").unwrap();
        assert!(result.contains("Alice"));

        let result2 = g.execute("MATCH (n:Manager) RETURN n").unwrap();
        assert!(result2.contains("Alice"));
    }

    // Verify WAL persistence
    {
        let g = Graph::load_or_create(snapshot_path, wal_path);
        let result = g.execute("MATCH (n:Employee) RETURN n").unwrap();
        assert!(result.contains("Alice"));
    }

    let _ = std::fs::remove_file(snapshot_path);
    let _ = std::fs::remove_file(wal_path);
}
"""

content = re.sub(r'#\[test\]\nfn test_set_labels\(\) \{.*', new_test, content, flags=re.DOTALL)

with open("tests/merge_set_test.rs", "w") as f:
    f.write(content)
