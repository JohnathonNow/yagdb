#!/bin/bash
cat src/main.rs | awk '
BEGIN { skip = 0 }
/^#\[cfg\(not\(target_arch = "wasm32"\)\)\]/ {
    if (skip == 0) {
        buf = $0 "\n"
        getline
        if ($0 ~ /^#\[cfg\(not\(feature = "cluster"\)\)\]/) {
            buf = buf $0 "\n"
            getline
            if ($0 ~ /^#\[cfg\(not\(target_arch = "wasm32"\)\)\]/) {
                # Found the double tag block
                skip = 1
            } else {
                print buf $0
                next
            }
        } else {
            print buf $0
            next
        }
    }
}
skip == 1 {
    if ($0 ~ /^async fn handle_query_stream/) {
        skip = 0
        print "#[cfg(not(target_arch = \"wasm32\"))]"
        print "#[cfg(not(feature = \"cluster\"))]"
        print "async fn handle_backup(State(graph): State<SharedGraph>) -> impl IntoResponse {"
        print "    let g = graph.lock().await;"
        print "    match g.backup() {"
        print "        Ok(bytes) => {"
        print "            let mut headers = axum::http::HeaderMap::new();"
        print "            headers.insert(axum::http::header::CONTENT_TYPE, axum::http::HeaderValue::from_static(\"application/octet-stream\"));"
        print "            headers.insert(axum::http::header::CONTENT_DISPOSITION, axum::http::HeaderValue::from_static(\"attachment; filename=\\\"backup.bin\\\"\"));"
        print "            (StatusCode::OK, headers, bytes).into_response()"
        print "        }"
        print "        Err(e) => (StatusCode::INTERNAL_SERVER_ERROR, format!(\"Error: {}\", e)).into_response(),"
        print "    }"
        print "}"
        print ""
        print "#[cfg(not(target_arch = \"wasm32\"))]"
        print "#[cfg(not(feature = \"cluster\"))]"
        print $0
    }
    next
}
{
    # We also need to change .route("/backup", post(handle_backup)) to .route("/backup", axum::routing::get(handle_backup))
    if ($0 ~ /\.route\("\/backup", post\(handle_backup\)\)/) {
        print "        .route(\"/backup\", axum::routing::get(handle_backup))"
    } else {
        print $0
    }
}
' > src/main_new.rs
mv src/main_new.rs src/main.rs
