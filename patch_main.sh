cat << 'INNER_EOF' > patch.py
import re
with open("src/main.rs", "r") as f:
    content = f.read()

batch_handler = """#[cfg(not(target_arch = "wasm32"))]
#[cfg(not(feature = "cluster"))]
async fn handle_batch(
    headers: axum::http::HeaderMap,
    axum::extract::State(graph): axum::extract::State<SharedGraph>,
    axum::Json(queries): axum::Json<Vec<String>>,
) -> impl axum::response::IntoResponse {
    if let Err(e) = check_auth(&headers) {
        return e.into_response();
    }

    let cancel = std::sync::Arc::new(std::sync::atomic::AtomicBool::new(false));
    let _guard = CancelGuard(cancel.clone());
    let g = graph.clone();
    *g.cancel_flag.write() = cancel;

    let res = tokio::task::spawn_blocking(move || {
        let guard = GraphGuard { g };
        let mut results = Vec::with_capacity(queries.len());
        for query in queries {
            match guard.g.execute(&query) {
                Ok(r) => {
                    let parsed: serde_json::Value = serde_json::from_str(&r).unwrap_or(serde_json::Value::String(r));
                    results.push(parsed);
                },
                Err(e) => return Err(e),
            }
        }
        Ok(results)
    })
    .await
    .unwrap_or_else(|_| Err("Query cancelled".to_string()));

    match res {
        Ok(results) => (axum::http::StatusCode::OK, axum::Json(results)).into_response(),
        Err(e) => (axum::http::StatusCode::BAD_REQUEST, format!("Error: {}", e)).into_response(),
    }
}

"""

# Add route
content = content.replace('.route("/query", post(handle_query))', '.route("/query", post(handle_query))\n        .route("/query/batch", post(handle_batch))')

# Add handler before handle_backup
content = content.replace("#[cfg(not(target_arch = \"wasm32\"))]\n#[cfg(not(feature = \"cluster\"))]\nasync fn handle_backup(", batch_handler + "\n#[cfg(not(target_arch = \"wasm32\"))]\n#[cfg(not(feature = \"cluster\"))]\nasync fn handle_backup(")


with open("src/main.rs", "w") as f:
    f.write(content)
INNER_EOF
python3 patch.py
