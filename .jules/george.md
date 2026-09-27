## 2024-05-24 - [Implement HTTP Batch Query API]
**Learning:** Adding endpoints in a clustered environment requires forwarding cluster writes to the leader securely. Because tests may not run under full async web contexts out-of-the-box (e.g. absent `axum-test` extensions for `tower::ServiceExt` like `oneshot`), keeping core logic testable without HTTP wrappers is a priority.
**Action:** When adding HTTP APIs that modify state, always handle routing them explicitly to the cluster leader, and implement core logic testing via directly executing against `GraphGuard` sequentially or in an abstracted layer to bypass complex network mocking.
## 2024-05-24 - [Implement AST Query Cache]
**Learning:** By caching the parsed AST using `indexmap` as an LRU limit directly inside `Graph::execute`, we bypass repeated parsing overhead and string-based parsing overhead. The AST tree implements `Clone` naturally.
**Action:** When working on caching parsed syntax trees, directly use a thread-safe `RwLock<IndexMap>` initialized in `Graph::new` and correctly handle serialization with `#[serde(skip, default = "default_ast_cache")]`.
