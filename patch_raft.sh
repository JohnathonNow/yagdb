cat << 'INNER_EOF' > patch.py
import re
with open("src/raft/server.rs", "r") as f:
    content = f.read()

batch_handler = """async fn handle_batch(
    headers: axum::http::HeaderMap,
    axum::extract::State(app): axum::extract::State<AppState>,
    axum::Json(queries): axum::Json<Vec<String>>,
) -> Result<axum::Json<Vec<serde_json::Value>>, (axum::http::StatusCode, String)> {
    if let Err(e) = crate::auth::check_auth(&headers) {
        return Err(e);
    }

    let mut all_results = Vec::new();

    for body in queries {
        let q = crate::parser::parse_query(&body);
        let is_write = match q {
            Ok((_, query)) => query
                .clauses
                .iter()
                .any(|c| matches!(c, crate::parser::Clause::Create(_) | crate::parser::Clause::Set(_) | crate::parser::Clause::Delete(_) | crate::parser::Clause::Remove(_) | crate::parser::Clause::Merge(_) | crate::parser::Clause::CreateIndex{..} | crate::parser::Clause::DropIndex{..})),
            Err(_) => false,
        };

        let result = if is_write {
            let req = openraft_memstore::ClientRequest {
                client: "app".to_string(),
                serial: 1, // Optional: sequential request ID
                status: body.clone(),
            };

            match app.raft.client_write(req).await {
                Ok(resp) => {
                    let result_str = resp.data.0.unwrap_or_else(|| "null".to_string());
                    let res: Result<String, String> = serde_json::from_str(&result_str).unwrap_or(Err("Failed to parse inner response".into()));
                    res
                },
                Err(e) => {
                    match e {
                        openraft::error::RaftError::APIError(openraft::error::ClientWriteError::ForwardToLeader(
                            fwd,
                        )) => {
                            // Forward the request to the leader if we know it
                            if let Some(leader_node_id) = fwd.leader_id {
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
                                        format!("Failed to parse forwarded response: {}", e),
                                    )
                                })?;
                                res.result
                            } else {
                                return Err((axum::http::StatusCode::BAD_REQUEST, "Leader unknown".to_string()));
                            }
                        }
                        _ => {
                            return Err((axum::http::StatusCode::INTERNAL_SERVER_ERROR, format!("Raft write error: {:?}", e)));
                        }
                    }
                }
            }
        } else {
            app.graph.execute(&body)
        };

        match result {
            Ok(r) => {
                let parsed: serde_json::Value = serde_json::from_str(&r).unwrap_or(serde_json::Value::String(r));
                all_results.push(parsed);
            },
            Err(e) => return Err((axum::http::StatusCode::BAD_REQUEST, format!("Error: {}", e))),
        }
    }

    Ok(axum::Json(all_results))
}

"""

# Add route
content = content.replace('.route("/query", post(handle_query))', '.route("/query", post(handle_query))\n        .route("/query/batch", post(handle_batch))')

content = re.sub(r'(async fn handle_query\()', batch_handler + r'\1', content)

with open("src/raft/server.rs", "w") as f:
    f.write(content)
INNER_EOF
python3 patch.py
