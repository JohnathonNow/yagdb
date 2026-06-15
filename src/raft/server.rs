use crate::raft::app::App;
use crate::raft::store::TypeConfig;
use axum::{
    extract::{Json, State},
    response::{sse::Event, sse::Sse, IntoResponse},
    routing::post,
    Router,
};
use openraft::error::ClientWriteError;
use openraft::raft::{AppendEntriesRequest, InstallSnapshotRequest, VoteRequest};
use openraft_memstore::ClientRequest;
use std::sync::Arc;

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
        .route("/query_stream", post(handle_query_stream))
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
        Ok((_, query)) => query
            .clauses
            .iter()
            .any(|c| matches!(c, crate::parser::Clause::Create(_))),
        Err(_) => false,
    };

    if is_write {
        // Trigger the consensus with the query embedded in status
        let req = ClientRequest {
            client: "app".to_string(),
            serial: 1,
            status: body.clone(),
        };
        match app.raft.client_write(req).await {
            Ok(resp) => {
                let result_str = resp.data.0.unwrap_or_else(|| "null".to_string());
                let res: Result<String, String> = serde_json::from_str(&result_str)
                    .unwrap_or(Err("Failed to parse inner response".into()));
                Ok(Json(QueryRes { result: res }))
            }
            Err(e) => {
                match e {
                    openraft::error::RaftError::APIError(ClientWriteError::ForwardToLeader(
                        fwd,
                    )) => {
                        // Forward the request to the leader if we know it
                        if let Some(leader_node_id) = fwd.leader_id {
                            // Find leader node address from id (convention: port is 3000 + id)
                            let url = format!("http://127.0.0.1:{}/query", 3000 + leader_node_id);
                            let client = reqwest::Client::new();
                            let resp = client.post(&url).body(body).send().await.map_err(|e| {
                                (
                                    axum::http::StatusCode::BAD_GATEWAY,
                                    format!("Failed to forward: {}", e),
                                )
                            })?;
                            let res: QueryRes = resp.json().await.map_err(|e| {
                                (
                                    axum::http::StatusCode::BAD_GATEWAY,
                                    format!("Failed to parse response: {}", e),
                                )
                            })?;
                            Ok(Json(res))
                        } else {
                            Err((
                                axum::http::StatusCode::SERVICE_UNAVAILABLE,
                                "No leader available".to_string(),
                            ))
                        }
                    }
                    _ => Err((
                        axum::http::StatusCode::BAD_REQUEST,
                        format!("Raft write error: {:?}", e),
                    )),
                }
            }
        }
    } else {
        // Read query, can be handled locally by any node because state is updated via Raft
        let mut g = app.graph.lock().await;
        let res = g.execute(&body);
        Ok(Json(QueryRes { result: res }))
    }
}

async fn handle_query_stream(State(app): State<AppState>, body: String) -> impl IntoResponse {
    let q = crate::parser::parse_query(&body);
    let is_write = match q {
        Ok((_, query)) => query
            .clauses
            .iter()
            .any(|c| matches!(c, crate::parser::Clause::Create(_))),
        Err(_) => false,
    };

    let result_to_stream = if is_write {
        let req = ClientRequest {
            client: "app".to_string(),
            serial: 1,
            status: body.clone(),
        };
        match app.raft.client_write(req).await {
            Ok(resp) => {
                let result_str = resp.data.0.unwrap_or_else(|| "null".to_string());
                let res: Result<String, String> = serde_json::from_str(&result_str)
                    .unwrap_or(Err("Failed to parse inner response".into()));
                res
            }
            Err(e) => {
                match e {
                    openraft::error::RaftError::APIError(ClientWriteError::ForwardToLeader(
                        fwd,
                    )) => {
                        if let Some(leader_node_id) = fwd.leader_id {
                            // Find leader node address from id (convention: port is 3000 + id)
                            let url = format!("http://127.0.0.1:{}/query", 3000 + leader_node_id);
                            let client = reqwest::Client::new();
                            match client.post(&url).body(body).send().await {
                                Ok(resp) => match resp.json::<QueryRes>().await {
                                    Ok(res) => res.result,
                                    Err(e) => Err(format!("Failed to parse response: {}", e)),
                                },
                                Err(e) => Err(format!("Failed to forward: {}", e)),
                            }
                        } else {
                            Err("No leader available".to_string())
                        }
                    }
                    _ => Err(format!("Raft write error: {:?}", e)),
                }
            }
        }
    } else {
        let mut g = app.graph.lock().await;
        g.execute(&body)
    };

    match result_to_stream {
        Ok(result) => {
            if result.trim().is_empty() {
                return Sse::new(futures::stream::empty::<
                    Result<Event, std::convert::Infallible>,
                >())
                .into_response();
            }

            match serde_json::from_str::<Vec<serde_json::Value>>(&result) {
                Ok(arr) => {
                    let stream = futures::stream::iter(arr.into_iter().map(|val| {
                        Ok::<_, std::convert::Infallible>(
                            Event::default().data(serde_json::to_string(&val).unwrap()),
                        )
                    }));
                    Sse::new(stream).into_response()
                }
                Err(_) => {
                    let stream = futures::stream::iter(vec![Ok::<_, std::convert::Infallible>(
                        Event::default().data(result),
                    )]);
                    Sse::new(stream).into_response()
                }
            }
        }
        Err(e) => (axum::http::StatusCode::BAD_REQUEST, format!("Error: {}", e)).into_response(),
    }
}

async fn handle_append(
    State(app): State<AppState>,
    Json(req): Json<AppendEntriesRequest<TypeConfig>>,
) -> Json<Result<openraft::raft::AppendEntriesResponse<u64>, openraft::error::RaftError<u64>>> {
    Json(app.raft.append_entries(req).await)
}

async fn handle_snapshot(
    State(app): State<AppState>,
    Json(req): Json<InstallSnapshotRequest<TypeConfig>>,
) -> Json<
    Result<
        openraft::raft::InstallSnapshotResponse<u64>,
        openraft::error::RaftError<u64, openraft::error::InstallSnapshotError>,
    >,
> {
    Json(app.raft.install_snapshot(req).await)
}

async fn handle_vote(
    State(app): State<AppState>,
    Json(req): Json<VoteRequest<u64>>,
) -> Json<Result<openraft::raft::VoteResponse<u64>, openraft::error::RaftError<u64>>> {
    Json(app.raft.vote(req).await)
}

use std::collections::BTreeSet;
async fn handle_init(
    State(app): State<AppState>,
) -> Result<Json<()>, (axum::http::StatusCode, String)> {
    let mut nodes = std::collections::BTreeMap::new();
    nodes.insert(app.id, ());
    app.raft.initialize(nodes).await.map_err(|e| {
        (
            axum::http::StatusCode::INTERNAL_SERVER_ERROR,
            format!("{:?}", e),
        )
    })?;
    Ok(Json(()))
}

#[derive(serde::Deserialize)]
struct AddLearnerReq {
    id: u64,
}

async fn handle_add_learner(
    State(app): State<AppState>,
    Json(req): Json<AddLearnerReq>,
) -> Result<Json<openraft::raft::ClientWriteResponse<TypeConfig>>, (axum::http::StatusCode, String)>
{
    let res = app.raft.add_learner(req.id, (), true).await.map_err(|e| {
        (
            axum::http::StatusCode::INTERNAL_SERVER_ERROR,
            format!("{:?}", e),
        )
    })?;
    Ok(Json(res))
}

async fn handle_change_membership(
    State(app): State<AppState>,
    Json(req): Json<BTreeSet<u64>>,
) -> Result<Json<openraft::raft::ClientWriteResponse<TypeConfig>>, (axum::http::StatusCode, String)>
{
    let res = app.raft.change_membership(req, false).await.map_err(|e| {
        (
            axum::http::StatusCode::INTERNAL_SERVER_ERROR,
            format!("{:?}", e),
        )
    })?;
    Ok(Json(res))
}
