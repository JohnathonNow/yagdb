pub mod edge;
pub mod graph;
pub mod node;
pub mod parser;

use axum::{
    extract::State,
    http::StatusCode,
    response::IntoResponse,
    routing::post,
    Router,
};
use std::sync::Arc;
use tokio::sync::Mutex;
use crate::graph::Graph;

type SharedGraph = Arc<Mutex<Graph>>;

#[tokio::main]
async fn main() {
    let graph = Arc::new(Mutex::new(Graph::new()));

    let app = Router::new()
        .route("/query", post(handle_query))
        .with_state(graph);

    let addr = std::net::SocketAddr::from(([127, 0, 0, 1], 3000));
    println!("Listening on {}", addr);

    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}

async fn handle_query(
    State(graph): State<SharedGraph>,
    body: String,
) -> impl IntoResponse {
    let mut g = graph.lock().await;
    match g.execute(&body) {
        Ok(result) => (StatusCode::OK, result),
        Err(e) => (StatusCode::BAD_REQUEST, format!("Error: {}", e)),
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
        assert_eq!(result.trim(), "");
    }

    #[test]
    fn test_trailing_garbage_fails() {
        let mut g = Graph::new();
        let res = g.execute("CREATE (n) BAD SYNTAX");
        assert!(res.is_err());
    }
}
