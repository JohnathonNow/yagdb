## 2024-05-24 - [Implement HTTP Batch Query API]
**Learning:** Adding endpoints in a clustered environment requires forwarding cluster writes to the leader securely. Because tests may not run under full async web contexts out-of-the-box (e.g. absent `axum-test` extensions for `tower::ServiceExt` like `oneshot`), keeping core logic testable without HTTP wrappers is a priority.
**Action:** When adding HTTP APIs that modify state, always handle routing them explicitly to the cluster leader, and implement core logic testing via directly executing against `GraphGuard` sequentially or in an abstracted layer to bypass complex network mocking.

## 2024-05-24 - [HTTP Request Decompression]
**Learning:** Axum 0.6 uses `RequestDecompressionLayer` for decompressing incoming payload, which returns an error that must be handled by wrapping it in a `HandleErrorLayer` before adding to `Router::layer`. This is required to prevent "the trait bound `Infallible: From<Box<dyn std::error::Error + Send + Sync>>` is not satisfied" compiler errors when adding the layer.
**Action:** Add `tower::ServiceBuilder` and wrap the `RequestDecompressionLayer` inside `HandleErrorLayer` when configuring axum 0.6 apps.
