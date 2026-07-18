# yagdb Feature Recommendations

Based on the current architecture and implementation of `yagdb`, the following technical features and improvements are recommended for future development:

## 1. Concurrent Query Execution (RwLock / MVCC)
Currently, `main.rs` wraps the entire global `Graph` state in an `Arc<Mutex<Graph>>`, which forces all queries (even read-only `MATCH` queries) to execute sequentially.
- **Implementation**: Transition the graph state to use a reader-writer lock (`RwLock`) or fully leverage the existing `next_txid`, `created_by`, and `deleted_by` fields in `Node` and `Edge` to implement full Multi-Version Concurrency Control (MVCC). This will allow concurrent read transactions without blocking on writes.

## 2. Parameterized Queries
The HTTP API and Cypher parser currently only accept raw query strings. This is a security risk (Cypher injection) and causes performance overhead since each query must be re-parsed and planned.
- **Implementation**: Extend the `POST /query` endpoint to accept a JSON payload containing the query string and a `parameters` map. Update the parser and execution engine (`Environment`) to substitute `$param_name` references with these bound values during execution, allowing for query plan caching.

## 3. Query Optimizer Enhancements (Hash Joins)
The `QueryPlanner` and `execute_plan` heavily rely on nested loop joins (`CrossProduct`, `Intersect`) when combining multiple paths or evaluating subqueries. This results in O(N*M) time complexity for many complex queries.
- **Implementation**: Introduce a `HashJoin` execution plan node. When joining two intermediate result sets on a common variable or property, build a hash map from the smaller result set and probe it with the larger one, reducing complexity to O(N+M).

## 4. Expanded Cypher Support
The current `nom`-based parser (`src/parser.rs`) and execution engine (`src/graph.rs`) support a subset of Cypher. The following clauses should be implemented to achieve better compliance:
- **`OPTIONAL MATCH`**: Allow pattern matching that returns `null` for unbound variables instead of filtering out the row entirely. Requires updating the lazy pipeline to yield `GraphElement::Null` when paths are not found.
- **`REMOVE`**: Add support for removing properties and labels from nodes/edges, complementing the existing `SET` clause.
- **Multi-Label Matching**: Expand the `NodePattern` parser and `node_matches` logic to support matching nodes with multiple labels (e.g., `MATCH (n:Person:Actor)`).

## 5. ACID Multi-Statement Transactions
The current API executes single queries per request. While Write-Ahead Logging (WAL) handles durability, there is no way for a client to execute multiple queries atomically.
- **Implementation**: Introduce `POST /transaction/begin`, `POST /transaction/commit`, and `POST /transaction/rollback` endpoints. Manage a session state where uncommitted WAL entries or shadow copies of mutated nodes/edges are held until the transaction is committed using the transaction ID (`txid`).
