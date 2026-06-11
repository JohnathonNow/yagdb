# yagdb (Yet Another Graph Database)

`yagdb` is an experimental, in-memory graph database written in Rust. It implements a subset of the Cypher query language, features disk persistence via Write-Ahead Logging (WAL) and snapshots, and provides an HTTP API for query execution. It also supports compiling to WebAssembly (WASM) for use in browsers. The project was largely built as an exercise in using AI-tooling, and at this time should not be trusted for anything beyond goofing off. 

## Features

- **Cypher Query Support**: Implements a subset of Cypher using the `nom` parser combinator library.
  - `CREATE` nodes and relationships.
  - `MATCH` patterns, including variable-length path queries (`-[*1..3]->`).
  - `RETURN` variables.
  - `LIMIT` results.
  - `CREATE INDEX` for fast node property lookups.
  - `PROFILE` keyword prefix to inspect the execution plan and query metrics.
- **Graph Engine**: Native Rust graph execution engine utilizing Depth-First Search (DFS) for path finding.
- **Persistence**: Fast binary serialization of the database state and Write-Ahead Log (WAL) entries using `bincode` and `serde`. Automatically recovers state upon startup.
- **HTTP Server**: An asynchronous API server using `axum` and `tokio`. Exposes a POST endpoint to execute queries.
- **Clustering (Optional)**: Can be compiled with the `cluster` feature to enable distributed consensus using `openraft`. Extra experimental.
- **Disk Storage**: Experimental support for managing large graphs by caching nodes and serving from disk.
- **WASM Support**: Can be compiled to the `wasm32-unknown-unknown` target for browser embedding.

## Getting Started

### Prerequisites

- [Rust toolchain](https://rustup.rs/) (stable)

### Running the Server

To start the HTTP server, simply run:

```bash
cargo run
```

The server will start listening on `127.0.0.1:3000` by default. It will automatically create `graph.bin` and `wal.bin` in the current directory for persistence.

### Running with Clustering

To compile and run with Raft cluster support:

```bash
cargo run --features cluster
```

## Using the Database

You can interact with `yagdb` using HTTP POST requests to the `/query` endpoint. The body of the request should be the raw Cypher query string.

### Examples

**Create nodes and a relationship:**

```bash
curl -X POST -H "Content-Type: text/plain" -d "CREATE (a:User {name: 'Alice'})-[r:KNOWS]->(b:User {name: 'Bob'})" http://127.0.0.1:3000/query
```

**Match and return nodes:**

```bash
curl -X POST -H "Content-Type: text/plain" -d "MATCH (a:User)-[r:KNOWS]->(b:User) RETURN a, b" http://127.0.0.1:3000/query
```

**Create an index:**

```bash
curl -X POST -H "Content-Type: text/plain" -d "CREATE INDEX ON :User(name)" http://127.0.0.1:3000/query
```

**Profile a query:**

```bash
curl -X POST -H "Content-Type: text/plain" -d "PROFILE MATCH (a:User {name: 'Alice'}) RETURN a" http://127.0.0.1:3000/query
```

## Library Usage

You can also use `yagdb` as an embedded library in your own Rust applications.

```rust
use yagdb::graph::Graph;

fn main() {
    // Start an in-memory database without persistence for testing
    let mut g = Graph::new();

    // Execute queries
    g.execute("CREATE (n:Person {name: 'Alice'})").unwrap();
    let result = g.execute("MATCH (n:Person) RETURN n").unwrap();

    println!("{}", result);
}
```

## Testing

Run the test suite using standard Cargo commands:

```bash
cargo test
```

To test cluster features specifically:

```bash
cargo test --features cluster
```

## Benchmarks

`yagdb` includes a benchmark suite using the `criterion` crate.

```bash
cargo bench
```

## WebAssembly Build

To build the project for WASM:

```bash
wasm-pack build --target web
```

In WASM mode, disk persistence (WAL, snapshots) and the HTTP server are conditionally disabled. The library exposes a `wasm_bindgen` function `execute_query(query: &str) -> String` that operates on a globally shared in-memory graph.

## Roadmap to Production

To transition `yagdb` into a production-ready system, the following features would have to be implemented:

- **Strongly Typed Properties**: Transitioning from string-only properties to native support for integers, floats, booleans, and dates to improve performance and data integrity.
- **Authentication & Authorization**: Implementing user roles, credentials, and access control for the API.
- **Transactions**: Adding support for multi-statement ACID transactions with commit and rollback capabilities.
- **Expanded Cypher Support**: Adding advanced Cypher clauses like `OPTIONAL MATCH`, `REMOVE`, and string/math functions.
- **TLS/SSL Encryption**: Securing the HTTP server and Raft node-to-node communication.
- **Monitoring & Observability**: Exposing  metrics and tracing for production monitoring.
- **Graph Algorithms**: Built-in procedures for PageRank, Shortest Path, and Community Detection.
- **Backup & Restore Tooling**: Dedicated utilities for point-in-time recovery, snapshot management, version migration, and hot backups.
