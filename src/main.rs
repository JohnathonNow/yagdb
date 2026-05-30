pub mod edge;
pub mod graph;
pub mod node;
pub mod parser;

use crate::graph::Graph;

fn main() {
    let mut g = Graph::new();

    let create_query = "CREATE (n:Person {name: 'Alice'}), (m:Person {name: 'Bob'}), (n)-[:KNOWS]->(m)";
    if let Err(e) = g.execute(create_query) {
        println!("Error executing CREATE: {}", e);
    }

    let match_query = "MATCH (a:Person {name: 'Alice'})-[:KNOWS]->(b:Person {name: 'Bob'}) RETURN a, b";
    match g.execute(match_query) {
        Ok(result) => {
            println!("Query Result:\n{}", result);
        }
        Err(e) => {
            println!("Error executing MATCH: {}", e);
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_cypher_create_and_match() {
        let mut g = Graph::new();
        g.execute("CREATE (a:User {id: '1'})-[r:FOLLOWS]->(b:User {id: '2'})").unwrap();

        let result = g.execute("MATCH (u1:User {id: '1'})-[rel:FOLLOWS]->(u2:User {id: '2'}) RETURN u1, rel, u2").unwrap();

        assert!(result.contains("u1: Node"));
        assert!(result.contains("rel: Edge"));
        assert!(result.contains("u2: Node"));
        assert!(result.contains(r#""id": "1""#));
        assert!(result.contains(r#""id": "2""#));
    }

    #[test]
    fn test_no_match_on_missing_label() {
        let mut g = Graph::new();
        g.execute("CREATE (a:User {id: '1'})").unwrap();

        let result = g.execute("MATCH (a:Admin {id: '1'}) RETURN a").unwrap();
        assert_eq!(result.trim(), "a: null");
    }

    #[test]
    fn test_trailing_garbage_fails() {
        let mut g = Graph::new();
        let res = g.execute("CREATE (n) BAD SYNTAX");
        assert!(res.is_err());
    }
}
