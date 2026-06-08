use axum::{
    extract::{State, Json},
    routing::post,
    Router,
};
use openraft::raft::{AppendEntriesRequest, InstallSnapshotRequest, VoteRequest};
use std::sync::Arc;
use crate::raft::app::App;
use crate::raft::store::TypeConfig;
use openraft::error::ClientWriteError;
use openraft_memstore::ClientRequest;

pub type AppState = Arc<App>;

#[derive(serde::Deserialize)]
pub struct QueryReq {
    pub query: String,
}

#[derive(serde::Serialize, serde::Deserialize)]
pub struct QueryRes {
    pub result: Result<String, String>,
}

pub fn create_router() -> Router<AppState> {
    Router::new()
        .route("/query", post(handle_query))
        .route("/raft/append", post(handle_append))
        .route("/raft/snapshot", post(handle_snapshot))
        .route("/raft/vote", post(handle_vote))
        .route("/raft/init", post(handle_init))
        .route("/raft/add-learner", post(handle_add_learner))
        .route("/raft/change-membership", post(handle_change_membership))
}

async fn handle_query(
    State(app): State<AppState>,
    body: String,
) -> Result<Json<QueryRes>, (axum::http::StatusCode, String)> {
    let q = crate::parser::parse_query(&body);
    let is_write = match q {
        Ok((_, query)) => {
            query.clauses.iter().any(|c| matches!(c, crate::parser::Clause::Create(_)))
        }
        Err(_) => false,
    };

    if is_write {
        // Just trigger the consensus with a dummy request
        let req = ClientRequest { client: "app".to_string(), serial: 1, status: "ok".to_string() };
        match app.raft.client_write(req).await {
            Ok(_) => {
                let mut g = app.graph.lock().await;
                let res = g.execute(&body);
                Ok(Json(QueryRes { result: res }))
            }
            Err(e) => {
                match e {
                    openraft::error::RaftError::APIError(ClientWriteError::ForwardToLeader(fwd)) => {
                        // Forward the request to the leader if we know it
                        if let Some(leader_node_id) = fwd.leader_id {
                            // Find leader node address from id (convention: port is 3000 + id)
                            let url = format!("http://127.0.0.1:{}/query", 3000 + leader_node_id);
                            let client = reqwest::Client::new();
                            let resp = client.post(&url).body(body).send().await.map_err(|e| (axum::http::StatusCode::BAD_GATEWAY, format!("Failed to forward: {}", e)))?;
                            let res: QueryRes = resp.json().await.map_err(|e| (axum::http::StatusCode::BAD_GATEWAY, format!("Failed to parse response: {}", e)))?;
                            Ok(Json(res))
                        } else {
                            Err((axum::http::StatusCode::SERVICE_UNAVAILABLE, "No leader available".to_string()))
                        }
                    }
                    _ => Err((axum::http::StatusCode::BAD_REQUEST, format!("Raft write error: {:?}", e)))
                }
            }
        }
    } else {
        let mut g = app.graph.lock().await;
        let res = g.execute(&body);
        Ok(Json(QueryRes { result: res }))
    }
}

async fn handle_append(
    State(app): State<AppState>,
    Json(req): Json<AppendEntriesRequest<TypeConfig>>,
) -> Json<openraft::raft::AppendEntriesResponse<u64>> {
    let res = app.raft.append_entries(req).await.unwrap();
    Json(res)
}

async fn handle_snapshot(
    State(app): State<AppState>,
    Json(req): Json<InstallSnapshotRequest<TypeConfig>>,
) -> Json<openraft::raft::InstallSnapshotResponse<u64>> {
    let res = app.raft.install_snapshot(req).await.unwrap();
    Json(res)
}

async fn handle_vote(
    State(app): State<AppState>,
    Json(req): Json<VoteRequest<u64>>,
) -> Json<openraft::raft::VoteResponse<u64>> {
    let res = app.raft.vote(req).await.unwrap();
    Json(res)
}

use std::collections::BTreeSet;
async fn handle_init(State(app): State<AppState>) -> Result<Json<()>, (axum::http::StatusCode, String)> {
    let mut nodes = std::collections::BTreeMap::new();
    nodes.insert(app.id, ());
    app.raft.initialize(nodes).await.map_err(|e| (axum::http::StatusCode::INTERNAL_SERVER_ERROR, format!("{:?}", e)))?;
    Ok(Json(()))
}

#[derive(serde::Deserialize)]
struct AddLearnerReq {
    id: u64,
}

async fn handle_add_learner(
    State(app): State<AppState>,
    Json(req): Json<AddLearnerReq>,
) -> Result<Json<openraft::raft::ClientWriteResponse<TypeConfig>>, (axum::http::StatusCode, String)> {
    let res = app.raft.add_learner(req.id, (), true).await.map_err(|e| (axum::http::StatusCode::INTERNAL_SERVER_ERROR, format!("{:?}", e)))?;
    Ok(Json(res))
}

async fn handle_change_membership(
    State(app): State<AppState>,
    Json(req): Json<BTreeSet<u64>>,
) -> Result<Json<openraft::raft::ClientWriteResponse<TypeConfig>>, (axum::http::StatusCode, String)> {
    let res = app.raft.change_membership(req, false).await.map_err(|e| (axum::http::StatusCode::INTERNAL_SERVER_ERROR, format!("{:?}", e)))?;
    Ok(Json(res))
}
