# Roadmap to Production

To transition `yagdb` into a production-ready system, the following features would have to be implemented:

## Q1
- **Strongly Typed Properties**: Transitioning from string-only properties to native support for integers, floats, booleans, and dates to improve performance and data integrity.
- **Authentication & Authorization**: Implementing user roles, credentials, and access control for the API.

## Q2
- **Transactions**: Adding support for multi-statement ACID transactions with commit and rollback capabilities.
- **Expanded Cypher Support**: Adding advanced Cypher clauses like `OPTIONAL MATCH`, `REMOVE`, and string/math functions.

## Q3
- **TLS/SSL Encryption**: Securing the HTTP server and Raft node-to-node communication.
- **Monitoring & Observability**: Exposing metrics and tracing for production monitoring.

## Q4
- **Graph Algorithms**: Built-in procedures for PageRank, Shortest Path, and Community Detection.
- **Backup & Restore Tooling**: Dedicated utilities for point-in-time recovery, snapshot management, version migration, and hot backups.
