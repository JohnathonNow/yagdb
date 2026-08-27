# Concurrency and ACID Architecture for yagdb

To support concurrent writes and read-heavy workloads with strict ACID guarantees, `yagdb` will transition from its current global single-writer lock (`Arc<Mutex<Graph>>`) to a Multi-Version Concurrency Control (MVCC) architecture. This document outlines the roadmap and technical design to implement these changes.

## 1. Concurrency Control: Multi-Version Concurrency Control (MVCC)

MVCC allows multiple transactions to read and write to the database simultaneously without blocking each other. Reads do not block writes, and writes do not block reads. This is ideal for graph databases where complex path traversals (reads) can be long-running.

- **Record Versioning:** Instead of updating `Node` and `Edge` records in place, every update creates a new version of the record.
- **Transaction Visibility:** Each query or transaction operates against a specific logical snapshot of the database, ensuring Snapshot Isolation.

## 2. Transaction Management

- **Transaction ID (TxID):** A global, monotonically increasing atomic counter will generate TxIDs.
- **Transaction Context:** A new `Transaction` struct will wrap `Graph` execution operations. It will track:
  - `start_ts`: The timestamp/TxID when the transaction began.
  - `commit_ts`: The timestamp/TxID assigned upon a successful commit.
  - `write_set`: A local buffer of pending modifications (new nodes, edges, property updates) not yet visible to other transactions.
  - `read_set`: Used for conflict detection during commit (to prevent write-skew and guarantee serializability, if required).
  - `status`: `Active`, `Committed`, or `Aborted`.

## 3. Core Graph State and Granular Locking

To eliminate the `Arc<Mutex<Graph>>` bottleneck, the internal storage structures will be refactored:

- **Storage Changes:** `ItemStorage<T>` (memory vectors) will be modified to support concurrent appends and version tracking. A concurrent map (e.g., `DashMap` or a striped `RwLock` structure) will replace `HashMap` for indices.
- **Record Structure:** `Node` and `Edge` structs will be extended to include MVCC metadata:
  ```rust
  pub struct VersionMeta {
      pub created_by: u64, // TxID that created this version
      pub deleted_by: Option<u64>, // TxID that deleted/updated this version
  }
  ```
- **Read-Only API:** `Graph::execute` will be refactored to take `&self` instead of `&mut self`. Mutations will be routed through the `Transaction` context.

## 4. Durability (Write-Ahead Log Synchronization)

To ensure durability (the 'D' in ACID) without sacrificing concurrent performance:

- **Group Commit:** The Write-Ahead Log (WAL) appending logic will be serialized through an asynchronous MPSC channel or a localized `Mutex<File>`.
- **Fsync Behavior:** Transactions must wait for their `COMMIT` record to be `fsync`'d to disk before acknowledging success to the client. Group commit will batch multiple transaction syncs to reduce I/O overhead.
- **WalEntry Updates:** `WalEntry` will be expanded to include `BeginTransaction`, `CommitTransaction`, and `AbortTransaction` events, with all mutation entries carrying the associated `TxID`.

## 5. Atomicity (Commit / Rollback Protocols)

To ensure atomicity (the 'A' in ACID):

- **Private Workspaces:** While a query executes, all updates are staged in the `Transaction`'s private `write_set`. They are invisible to the rest of the system.
- **Commit Phase:**
  1. Conflict detection (if serializability is enforced).
  2. Assign a `commit_ts`.
  3. Flush `write_set` changes to the global storage as new versions, marked with the `commit_ts`.
  4. Write the `COMMIT` record to the WAL and `fsync`.
- **Rollback Phase:** If an error occurs (e.g., query syntax, type mismatch, constraint failure), the `Transaction` simply discards its `write_set`. No global state needs to be reverted, ensuring instantaneous rollback.

## Summary of Execution Steps

1. Implement `Transaction` and `TransactionManager`.
2. Refactor `Node`, `Edge`, and `ItemStorage` for MVCC versioning.
3. Replace global `Arc<Mutex<Graph>>` with thread-safe localized structures (`DashMap`, `RwLock`).
4. Update `QueryPlanner` and `execute` to use `&self` and read from the appropriate snapshot.
5. Implement the WAL group commit and `fsync` logic.
6. Rigorous testing with concurrent thread simulators to detect data races and anomalies.
