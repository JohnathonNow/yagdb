# YAGDB - Architectural Review

## Code Review Findings
- **Cleanups**: Addressed various clippy warnings (using `cargo clippy --fix`) relating to collapsing nested `if let`/`match` statements for brevity, unused enumerator index dropping, replacing `clone()` with slice ref where appropriate, providing default default behavior explicitly, replacing `.or_insert_with(HashMap::new)` with `.or_default()`, etc. These cleanups improved code hygiene.
- **Large Enum Variants (e.g. `ExecutionStep` in `planner.rs`)**: Clippy flagged that `ExecutionStep` contains variants of drastically different sizes (e.g., `Match` is ~500 bytes vs `Set` is ~104 bytes). This means every instance of `ExecutionStep` takes up at least 500 bytes. **Actionable Improvement:** Box large variants (e.g., `Match(Box<Option<PlanNode>>, ...)` ) to shrink the enum size.
- **Too many arguments**: Methods like `execute_plan`, `execute_plan_and_bind_paths`, and `match_edges_recursive` in `src/graph.rs` have too many arguments (>7). This decreases readability and makes the code brittle to changes. **Actionable Improvement:** Introduce context structs (e.g., `ExecutionContext`) that bundle related configuration/state variables (txid, limits, etc.).

## Major Architectural Suggestions

### 1. Concurrency Bottleneck: The Global `Mutex<Graph>`
**Issue**: Currently in `src/main.rs`, the global graph instance is protected by a single `tokio::sync::Mutex<Graph>` (specifically `Arc<Mutex<Graph>>`). Because almost all operations require locking this mutex entirely, all queries (even purely read-only ones) are strictly serialized. This completely cripples throughput for read-heavy workloads.
**Suggestion**:
- **Read-Write Locks (RwLock)**: Move from `Mutex<Graph>` to `RwLock<Graph>`. This would allow concurrent read-only queries.
- **Granular Locking**: Instead of locking the *entire* graph, implement more granular locking (e.g., row-level locking or page-level locking if disk-backed) or utilize Concurrent Data Structures (like `dashmap` instead of `HashMap`).
- **MVCC (Multi-Version Concurrency Control)**: The memory log mentions MVCC fields already exist (`created_by`, `deleted_by`). Expanding this properly would allow lock-free snapshot reads while writers append new versions.

### 2. Result Set Materialization & Pipeline
**Issue**: The memory logs show improvements around avoiding `ResultSet` re-allocations inside loops (`.clear()`). However, deeply nested operations can still allocate significant memory when materializing intermediate `ResultSets`.
**Suggestion**:
- **Vectorized Execution (Volcano Model / Push-based Engine)**: Instead of passing fully materialized `ResultSets` between operators, pipeline batches (vectors) of rows. This maximizes CPU cache efficiency and minimizes memory footprint. The memory log hints at generator pipelines using closures, but ensuring these operate on chunked batches rather than materializing everything would yield large performance gains.

### 3. Disk Storage & Buffer Pool Architecture
**Issue**: The `DiskStorage` uses `RefCell<File>` and a custom caching mechanism (`RefCell<HashMap<usize, T>>`). It seems custom-built and potentially unoptimized for high concurrency (RefCell is not Thread Safe - though WASM implies it's Single Threaded, but the Tokio Axum server runs multithreaded, so it's a bit mixed).
**Suggestion**:
- **Standardized Buffer Pool Manager**: If aiming for disk persistence, implementing a standard Page-based Buffer Pool Manager (similar to Postgres/InnoDB) that handles page eviction (LRU), pinning, and interacts with the OS file system cleanly (via memory-mapped files `mmap` or `io_uring` for async I/O) would be more robust.

### 4. Code Organization
**Issue**: `src/graph.rs` is massive (~2900 lines). It contains parsing evaluation, execution engine logic, storage abstractions (`ItemStorage`), and the core `Graph` struct.
**Suggestion**:
- Split `graph.rs` into smaller modules:
  - `storage.rs`: Move `ItemStorage`, `DiskStorage` and related traits here.
  - `execution.rs` / `engine/`: Move `execute_plan`, `HashJoin`, `Intersect` logic here.
  - `core.rs`: Keep the basic `Graph` data structures here.