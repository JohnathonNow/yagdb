## 2024-05-24 - [Implement HTTP Batch Query API]
**Learning:** Adding endpoints in a clustered environment requires forwarding cluster writes to the leader securely. Because tests may not run under full async web contexts out-of-the-box (e.g. absent `axum-test` extensions for `tower::ServiceExt` like `oneshot`), keeping core logic testable without HTTP wrappers is a priority.
**Action:** When adding HTTP APIs that modify state, always handle routing them explicitly to the cluster leader, and implement core logic testing via directly executing against `GraphGuard` sequentially or in an abstracted layer to bypass complex network mocking.
## 2024-05-25 - HTTP Server Decompression Trait Bounds
**Learning:** In yagdb's Axum 0.6 setup, adding `tower_http::decompression::RequestDecompressionLayer` directly via `.layer()` causes an `Infallible: From<Box<dyn Error>>` trait bound error because decompression can fail.
**Action:** It requires wrapping with `HandleErrorLayer`, whose error-handling closure must accept `axum::BoxError` (not `std::convert::Infallible`), to properly map errors to HTTP responses.
