#[cfg(feature = "dhat-heap")]
#[global_allocator]
static ALLOC: dhat::Alloc = dhat::Alloc;

#[cfg(not(target_arch = "wasm32"))]
#[cfg(not(feature = "cluster"))]
use axum::{
    extract::State,
    http::StatusCode,
    response::{sse::Event, sse::Sse, IntoResponse},
    routing::post,
    Router,
};
#[cfg(not(target_arch = "wasm32"))]
use std::sync::Arc;
#[cfg(not(target_arch = "wasm32"))]
use tokio::sync::Mutex;

#[cfg(not(target_arch = "wasm32"))]
use yagdb::graph::Graph;

use tokio::signal;

#[cfg(not(target_arch = "wasm32"))]
#[cfg(not(feature = "cluster"))]
type SharedGraph = Arc<Mutex<Graph>>;

#[cfg(not(target_arch = "wasm32"))]
#[cfg(not(feature = "cluster"))]
#[tokio::main]
async fn main() {
    #[cfg(feature = "dhat-heap")]
    let _profiler = dhat::Profiler::new_heap();
    let mut g = Graph::load_or_create("graph.bin", "wal.bin");
    if std::env::var("YAGDB_DISK_STORAGE").is_ok() {
        g.enable_disk_storage("nodes.bin", "edges.bin");
    }
    let graph = Arc::new(Mutex::new(g));

    let app = Router::new()
        .route("/query", post(handle_query))
        .route("/query_stream", post(handle_query_stream))
        .route("/backup", axum::routing::get(handle_backup))
        .with_state(graph);

    let addr = std::net::SocketAddr::from(([127, 0, 0, 1], 3000));
    println!("Listening on {}", addr);

    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .with_graceful_shutdown(shutdown_signal())
        .await
        .unwrap();
}

#[cfg(not(target_arch = "wasm32"))]
#[cfg(feature = "cluster")]
#[tokio::main]
async fn main() {
    use clap::Parser;

    #[derive(Parser, Debug)]
    #[command(author, version, about, long_about = None)]
    struct Args {
        #[arg(short, long)]
        id: u64,

        #[arg(short, long)]
        addr: String,
    }

    let args = Args::parse();
    env_logger::init();

    let graph = Arc::new(Mutex::new(Graph::load_or_create(
        &format!("graph_{}.bin", args.id),
        &format!("wal_{}.bin", args.id),
    )));

    let app: Arc<yagdb::raft::app::App> =
        Arc::new(yagdb::raft::app::App::new(args.id, args.addr.clone(), graph).await);

    let router = yagdb::raft::server::create_router().with_state(app.clone());

    println!("Listening on {}", args.addr);

    let addr: std::net::SocketAddr = args.addr.parse().unwrap();
    axum::Server::bind(&addr)
        .serve(router.into_make_service())
        .await
        .unwrap();
}

#[cfg(not(target_arch = "wasm32"))]
#[cfg(not(feature = "cluster"))]
async fn handle_query(State(graph): State<SharedGraph>, body: String) -> impl IntoResponse {
    let mut g = graph.lock().await;
    match g.execute(&body) {
        Ok(result) => (StatusCode::OK, result).into_response(),
        Err(e) => (StatusCode::BAD_REQUEST, format!("Error: {}", e)).into_response(),
    }
}

#[cfg(not(target_arch = "wasm32"))]
#[cfg(not(feature = "cluster"))]
async fn handle_backup(State(graph): State<SharedGraph>) -> impl IntoResponse {
    let g = graph.lock().await;
    match g.backup() {
        Ok(bytes) => {
            let mut headers = axum::http::HeaderMap::new();
            headers.insert(axum::http::header::CONTENT_TYPE, axum::http::HeaderValue::from_static("application/octet-stream"));
            headers.insert(axum::http::header::CONTENT_DISPOSITION, axum::http::HeaderValue::from_static("attachment; filename=\"backup.bin\""));
            (StatusCode::OK, headers, bytes).into_response()
        }
        Err(e) => (StatusCode::INTERNAL_SERVER_ERROR, format!("Error: {}", e)).into_response(),
    }
}

#[cfg(not(target_arch = "wasm32"))]
#[cfg(not(feature = "cluster"))]
async fn handle_query_stream(State(graph): State<SharedGraph>, body: String) -> impl IntoResponse {
    let mut g = graph.lock().await;
    match g.execute(&body) {
        Ok(result) => {
            if result.trim().is_empty() {
                return Sse::new(futures::stream::empty::<Result<Event, std::convert::Infallible>>()).into_response();
            }

            match serde_json::from_str::<Vec<serde_json::Value>>(&result) {
                Ok(arr) => {
                    let stream = futures::stream::iter(arr.into_iter().map(|val| {
                        Ok::<_, std::convert::Infallible>(
                            Event::default().data(serde_json::to_string(&val).unwrap())
                        )
                    }));
                    Sse::new(stream).into_response()
                }
                Err(_) => {
                    let stream = futures::stream::iter(vec![Ok::<_, std::convert::Infallible>(
                        Event::default().data(result)
                    )]);
                    Sse::new(stream).into_response()
                }
            }
        }
        Err(e) => (StatusCode::BAD_REQUEST, format!("Error: {}", e)).into_response(),
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
        g.execute("CREATE (a:User {id: '1'})-[r:FOLLOWS]->(b:User {id: '2'})")
            .unwrap();

        let result = g
            .execute(
                "MATCH (u1:User {id: '1'})-[rel:FOLLOWS]->(u2:User {id: '2'}) RETURN u1, rel, u2",
            )
            .unwrap();

        assert!(result.contains("\"u1\": {"));
        assert!(result.contains("\"rel\": {"));
        assert!(result.contains("\"u2\": {"));
        assert!(result.contains(r#""id": "1""#));
        assert!(result.contains(r#""id": "2""#));
    }

    #[test]
    fn test_no_match_on_missing_label() {
        let mut g = Graph::new();
        g.execute("CREATE (a:User {id: '1'})").unwrap();

        let result = g.execute("MATCH (a:Admin {id: '1'}) RETURN a").unwrap();
        assert_eq!(result.trim(), "[]");
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
        let parsed_all: serde_json::Value = serde_json::from_str(&result_all).unwrap();
        assert_eq!(parsed_all.as_array().unwrap().len(), 3);

        let result_limit = g.execute("MATCH (u:User) RETURN u LIMIT 2").unwrap();
        let parsed_limit: serde_json::Value = serde_json::from_str(&result_limit).unwrap();
        assert_eq!(parsed_limit.as_array().unwrap().len(), 2);

        let result_limit_large = g.execute("MATCH (u:User) RETURN u LIMIT 10").unwrap();
        let parsed_limit_large: serde_json::Value =
            serde_json::from_str(&result_limit_large).unwrap();
        assert_eq!(parsed_limit_large.as_array().unwrap().len(), 3);
    }
}


async fn shutdown_signal() {
    // Wait for the Ctrl+C signal
    let ctrl_c = async {
        signal::ctrl_c()
            .await
            .expect("failed to install Ctrl+C handler");
    };
    tokio::select! {
        _ = ctrl_c => {},
    }

    println!("Signal received, starting graceful shutdown...");
}
