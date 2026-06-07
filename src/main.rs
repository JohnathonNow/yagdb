




#[cfg(not(target_arch = "wasm32"))]
use axum::{
    extract::State,
    http::StatusCode,
    response::IntoResponse,
    routing::post,
    Router,
};
#[cfg(not(target_arch = "wasm32"))]
use std::sync::Arc;
#[cfg(not(target_arch = "wasm32"))]
use tokio::sync::Mutex;

#[cfg(not(target_arch = "wasm32"))]
use yagdb::graph::Graph;

#[cfg(not(target_arch = "wasm32"))]
type SharedGraph = Arc<Mutex<Graph>>;

#[cfg(not(target_arch = "wasm32"))]
#[tokio::main]
async fn main() {
    let graph = Arc::new(Mutex::new(Graph::load_or_create("graph.bin", "wal.bin")));

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

#[cfg(not(target_arch = "wasm32"))]
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

#[cfg(target_arch = "wasm32")]
fn main() {}

#[cfg(test)]
#[cfg(not(target_arch = "wasm32"))]
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

    #[test]
    fn test_limit_clause() {
        let mut g = Graph::new();
        g.execute("CREATE (a:User {id: '1'})").unwrap();
        g.execute("CREATE (a:User {id: '2'})").unwrap();
        g.execute("CREATE (a:User {id: '3'})").unwrap();

        let result_all = g.execute("MATCH (u:User) RETURN u").unwrap();
        let rows_all = result_all.split("---\n").filter(|s| !s.trim().is_empty()).count();
        assert_eq!(rows_all, 3);

        let result_limit = g.execute("MATCH (u:User) RETURN u LIMIT 2").unwrap();
        let rows_limit = result_limit.split("---\n").filter(|s| !s.trim().is_empty()).count();
        assert_eq!(rows_limit, 2);

        let result_limit_large = g.execute("MATCH (u:User) RETURN u LIMIT 10").unwrap();
        let rows_limit_large = result_limit_large.split("---\n").filter(|s| !s.trim().is_empty()).count();
        assert_eq!(rows_limit_large, 3);
    }
}
