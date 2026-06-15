# Technical Roadmap for yagdb

To transition `yagdb` into a production-ready, highly concurrent, and scalable graph database system, the following technical architectural changes and feature additions are planned.

## Q1: Core Engine Refactoring & Typing
- **Concurrent Query Execution**: Transition the global graph state from `Arc<Mutex<Graph>>` to a more granular locking structure (like `RwLock` with row-level locks) or an MVCC (Multi-Version Concurrency Control) implementation to allow concurrent reads and parallel write queries.
- **Strongly Typed Property System**: The current `PropertyValue` enum only handles `f64`, `bool`, and `String`. This needs expanding to native integers, temporal types (Dates, DateTimes, Durations), spatial types, and byte arrays to improve data integrity and query efficiency.
- **Improved B-Tree Indices**: The current property index is a simple nested `HashMap` (`HashMap<PropertyValue, Vec<usize>>`). Replace this with a disk-backed B-Tree to support range queries (e.g., `<, >, <=, >=`) and ordered index scans.

## Q2: Advanced Cypher Capabilities & Query Optimization
- **Advanced Cypher Support**: Expand `parser.rs` and the execution planner to support missing Cypher features, most notably `OPTIONAL MATCH`, `REMOVE` for labels/properties, `UNWIND`, complex subqueries, and mathematical/string manipulation functions.
- **Cost-Based Query Optimizer (CBO)**: The current query planner combines paths blindly into left-deep `CrossProduct` nodes. Implement a cost-based optimizer that utilizes index statistics and graph cardinality to generate optimal query execution plans.
- **Transactions Support**: Add support for multi-statement ACID transactions via an updated API protocol, moving away from single-query implicit transactions.

## Q3: True Disk-Based Storage Engine
- **Page-Based Buffer Pool Manager**: The current `ItemStorage` approach deserializes full `Vec` structures or uses a rudimentary `RefCell` LRU cache for disk storage. Replace this with a robust fixed-size page buffer pool manager with a replacement policy (e.g., CLOCK or LRU-K).
- **On-Disk Graph Layout**: Implement a slotted-page architecture or a specialized graph-native physical layout (like Neo4j's linked lists for relationships) on disk to allow for O(1) pointer-chasing disk traversal, moving away from the pure in-memory sequential scans.
- **Write-Ahead Log (WAL) Enhancements**: Improve the current append-only `bincode` WAL with proper check-pointing, log rotation, and parallel apply algorithms during recovery.

## Q4: Ecosystem, Clustering & Observability
- **Production Raft Consensus**: Stabilize the experimental `openraft` cluster mode. Implement dynamic cluster membership changes, leader leases for local reads, and secure Raft node-to-node communication with mutual TLS.
- **Observability and Tracing**: Expose Prometheus metrics, open telemetry traces, and deep query latency profiles. Upgrade the `PROFILE` keyword to output standard EXPLAIN formatted tables.
- **Backup & Tooling**: Provide CLI utilities for zero-downtime hot backups, version migrations, graph imports (CSV/JSON), and data consistency checking.