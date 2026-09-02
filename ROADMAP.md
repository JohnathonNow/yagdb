# yagdb Production Roadmap

This roadmap outlines the technical path for transitioning `yagdb` into a production-ready system over the next 6 months.

## Month 1: Strongly Typed Properties & Basic Cypher Expansion
- **Strongly Typed Properties:** Refactor the `PropertyValue` enum (currently String, Number as f64, Boolean, Null) to support native types (integers, dates) beyond `f64`. Update serialization and `IndexMap` comparisons in `src/graph.rs` and `src/property.rs`.
- **Expanded Cypher Support (Part 1):** Expand `nom` parsers in `src/parser.rs` to support `OPTIONAL MATCH` and add initial string/math function handlers in the execution environment.

## Month 2: Transactions (ACID & MVCC)
- **Multi-statement Transactions:** Build on the existing `created_by` and `deleted_by` visibility fields in `Node` and `Edge` structs.
- **Commit/Rollback:** Implement Commit/Rollback logic in `src/graph.rs`, leveraging the `next_txid` atomic counter. Ensure Write-Ahead Logging (WAL) correctly handles transaction boundaries and rollbacks.

## Month 3: Authentication, Authorization & TLS Hardening
- **Security Middleware:** Add `axum` middleware in `src/main.rs` for JWT/Basic Auth.
- **Access Control:** Introduce user roles and permission checks in the execution pipeline.
- **TLS/SSL Encryption:** Harden existing TLS integration (using `axum-server` with `tls-rustls`) for the HTTP server and ensure secure node-to-node communication for clusters.

## Month 4: Monitoring, Observability & Backup Tooling
- **Observability:** Integrate `tracing` and metrics (e.g., Prometheus) into `src/main.rs` and core execution loops (like the lazy push-based generator pipeline in `src/graph.rs`).
- **Backup Utilities:** Build dedicated utilities (CLI or HTTP endpoints) for point-in-time recovery, snapshot management, and hot backups, leveraging the existing WAL and snapshot logic.

## Month 5: Graph Algorithms (Core)
- **Built-in Procedures:** Implement algorithms like PageRank, Shortest Path, and Community Detection.
- **Execution Optimization:** Integrate these as procedures executable via the `CALL` Cypher clause, optimizing traversals (like the existing `DfsFrame` stack-based approach) to handle algorithmic workloads efficiently.

## Month 6: Clustering Hardening & Advanced Cypher
- **Cluster Stability:** Harden distributed consensus (Raft integration). Focus on network partition tolerance and leader election robustness.
- **Expanded Cypher Support (Part 2):** Implement complex Cypher features like `REMOVE`, advanced list comprehensions, and subquery optimizations (improving predicate pushdown in `src/planner.rs`).
