use yagdb::parser::{parse_query, Clause};

#[test]
fn test_parse_create_index() {
    let query = "CREATE INDEX ON :Person(name)";
    let (rest, ast) = parse_query(query).unwrap();
    assert_eq!(rest, "");
    match &ast.clauses[0] {
        Clause::CreateIndex { label, property } => {
            assert_eq!(label, "Person");
            assert_eq!(property, "name");
        }
        _ => panic!("Expected CreateIndex clause"),
    }
}

use yagdb::graph::Graph;
use std::fs;

#[test]
fn test_index_usage() {
    let snapshot_path = "test_index_graph.bin";
    let wal_path = "test_index_wal.bin";

    let _ = fs::remove_file(snapshot_path);
    let _ = fs::remove_file(wal_path);

    {
        let mut g = Graph::load_or_create(snapshot_path, wal_path);
        g.execute("CREATE (a:User {username: 'alice'}), (b:User {username: 'bob'})").unwrap();

        // Create an index on the username property
        g.execute("CREATE INDEX ON :User(username)").unwrap();

        // Add another node after index creation to ensure it gets added to index
        g.execute("CREATE (c:User {username: 'charlie'})").unwrap();
    }

    // Reload graph to test recovery
    {
        let mut g = Graph::load_or_create(snapshot_path, wal_path);

        let result = g.execute("MATCH (u:User {username: 'bob'}) RETURN u").unwrap();
        assert!(result.contains("u: Node"));
        assert!(result.contains(r#""username": "bob""#));
        assert!(!result.contains("alice"));
        assert!(!result.contains("charlie"));

        let result2 = g.execute("MATCH (u:User {username: 'charlie'}) RETURN u").unwrap();
        assert!(result2.contains("u: Node"));
        assert!(result2.contains(r#""username": "charlie""#));
    }

    let _ = fs::remove_file(snapshot_path);
    let _ = fs::remove_file(wal_path);
}
