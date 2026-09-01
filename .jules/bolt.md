## 2024-07-14 - Implementing Export Utilities in YAGDB
**Learning:** YAGDB handles node and edge references heavily using internal `usize` identifiers instead of their `String` UUIDs. Deletions create "holes" (or `deleted = true` items) in the internal item storage. When exporting to a format like CSV where we only serialize active items by default, importing them naiveley back via `push_item` shifts these internal indices and breaks edge topology. Furthermore, indices (`self.indices`) are dynamic and must be exported/imported explicitly or rebuilt via `create_index`.
**Action:** When migrating internal graph states via external formats, always preserve the exact internal `usize` IDs (e.g. by exporting them alongside the data) and restore "holes" by pushing dummy items if needed. Make sure to export index definitions and recreate them upon import to ensure performance queries still work.
## 2026-07-16 - [Optimize Loop Accesses with Closures in yagdb]
**Learning:** When replacing `get_item` with `with_item` closures inside loops in `yagdb` to improve performance, flow control statements like `continue` or early returns cannot be used directly inside the closure to affect the outer loop.
**Action:** Return an `Option` (e.g., `None` for early exit) from the closure and handle it in the outer loop (e.g., `if let Some(val) = result { ... }`) to preserve the correct logic and avoid compilation errors related to flow control mismatch.
## 2024-05-18 - Prevent N+1 allocations on Graph node/edge mutation
**Learning:** In yagdb, modifying items inside `ItemStorage` by sequentially calling `get_item` (which clones the full node/edge structure) and then `update_item` causes massive allocation overhead on hot paths like graph creation/edge addition.
**Action:** Implemented `with_mut_item` to pass a mutable reference to a closure, allowing O(1) in-place mutations of nodes/edges (like pushing to `n.edges`) instead of copying the whole struct.

## 2024-05-18 - Refactoring `get_item` mutations to `with_mut_item` requires escaping the closure context
**Learning:** In yagdb, `with_mut_item` takes a closure over a mutable reference to the object. However, inside this closure you cannot borrow `self` or access `graph` methods (e.g. `log_wal` or iterating over `indices`) because `self` is already borrowed mutably by `with_mut_item`.
**Action:** When refactoring to use `with_mut_item` in `yagdb`, avoid borrow checker conflicts with other methods requiring `&self` (e.g., `self.log_wal()`) by extracting necessary condition flags or data from the closure's return value and invoking the `&self` method after the closure.
## 2024-07-28 - Optimize HashJoin Execution with Buffer Reuse
**Learning:** In 's `HashJoin` execution, allocating a new `Vec<GraphElement>` key inside the inner loop and moving it into a `HashMap` via `entry` caused significant overhead. By reusing a single `Vec` buffer and bypassing `HashMap::entry` on cache hits using `get_mut` and `insert`, vector allocation overhead could be minimized.
**Action:** When aggregating or joining with complex keys, reuse allocation buffers and use two-step lookups (`get_mut` + `insert`) to avoid continuous allocation in hot execution paths.
## 2024-07-28 - Optimize HashJoin Execution with Buffer Reuse
**Learning:** In yagdb's `HashJoin` execution, allocating a new `Vec<GraphElement>` key inside the inner loop and moving it into a `HashMap` via `entry` caused significant overhead. By reusing a single `Vec` buffer and bypassing `HashMap::entry` on cache hits using `get_mut` and `insert`, vector allocation overhead could be minimized.
**Action:** When aggregating or joining with complex keys, reuse allocation buffers and use two-step lookups (`get_mut` + `insert`) to avoid continuous allocation in hot execution paths.
## 2024-08-04 - Result Set Re-use Optimization
**Learning:** In yagdb, `HashJoin` and `CrossProduct` iterate over all rows of an input result set to evaluate the left or right side plans. Previously, they constructed a brand new `ResultSet` containing only the current row for every iteration. This incurred significant allocation overhead for the `HashMap` containing the variables and copying strings as keys for `GraphElement`s.
**Action:** By adding a `.clear()` method to `ResultSet` that resets its row counter and clears the underlying Vecs in the columns map without destroying the `HashMap` entries, we can instantiate `ResultSet::new()` once outside the loop and `.clear()` it at the start of each iteration, vastly reducing memory allocations and cloning.
## 2024-08-06 - Optimize Cypher Intersect Execution with HashSet
**Learning:** In yagdb's `PlanNode::Intersect` execution, checking for matching rows between the left and right result sets was implemented using a nested loop, leading to O(N*M) time complexity. This caused significant performance degradation for intersecting large result sets.
**Action:** Replace the nested loop with a `HashSet` containing the keys of the right result set. Iterating through the left result set and probing the hash set reduces the time complexity to O(N+M), significantly improving intersection performance.
## 2024-08-07 - Optimize HashJoin ResultSet Allocations
**Learning:** `ResultSet` structures within `yagdb`'s execution loops inside `PlanNode::HashJoin`, `CrossProduct`, and `ExecutionStep::Merge` incur high allocation overhead when re-instantiated on every iteration.
**Action:** Reuse existing `ResultSet` memory allocations by instantiating them outside hot loops and calling `.clear()` inside the loop, preserving vector capacities.
## 2026-08-10 - Optimize ResultSet Allocations in Loops
**Learning:** In yagdb's query execution pipeline, `ResultSet::new()` was called inside hot loops (such as iteration over `result_set.rows` in `ExecutionStep::Merge`, `ExecutionStep::Return`/`With` projections, and recursive path finding like `match_edges_recursive`), causing significant memory allocation overhead.
**Action:** When implementing or modifying execution step iterators, always hoist `ResultSet` and other collection initializations outside of the loop. Use `.clear()` (or reuse empty instances) inside the loop to preserve capacities and avoid redundant memory allocations.
## 2024-08-11 - Optimize Aggregation in Cypher Execution
**Learning:** In yagdb's `ExecutionStep::Return`/`ExecutionStep::With` execution, aggregating rows for functions like `count()` was done using a `Vec` of groups and a linear search (`groups.iter_mut().find(...)`), resulting in O(N*M) time complexity (N rows, M groups). For large results with many groups, this caused significant performance degradation.
**Action:** Replace the `Vec` and linear search with `indexmap::IndexMap`. Using `IndexMap` preserves the insertion order (which is important for deterministic results in query engines if no `ORDER BY` is specified) while providing O(1) hash-based lookups, significantly improving aggregation performance (measured ~50% time reduction in local benchmarks).
## 2026-08-12 - Passing Empty Iterators to Generic Bounds
**Learning:** When refactoring functions to take `IntoIterator<Item = T>` instead of `&[T]` to avoid cloning, passing empty bindings at call sites requires explicit type annotations to satisfy the compiler since `[]` doesn't provide enough information for type `T`. Using `None as Option<T>` is invalid syntax.
**Action:** Use `std::iter::empty::<T>()` to pass an empty iterator to generic `IntoIterator` bounds cleanly and correctly.
## 2024-08-21 - Box large ExecutionStep variants to reduce enum size
**Learning:** In yagdb's `planner.rs`, large variants within the `ExecutionStep` enum (like `PlanNode` and `Condition` in `Match`) are boxed as `Option<Box<T>>` rather than `Box<Option<T>>`. This avoids heap allocation for the `None` case and reduces the overall enum size (e.g., from 504 bytes down to 104 bytes), preventing memory bloat and improving CPU cache locality during execution.
**Action:** Always box large inner types inside `Option` as `Option<Box<T>>` rather than `Box<Option<T>>` to prevent unnecessary heap allocations for `None` variants and reduce the size of the containing enum.
## 2024-08-07 - Optimize HashJoin ResultSet Allocations
**Learning:** `ResultSet` structures within `yagdb`'s execution loops inside `PlanNode::HashJoin`, `CrossProduct`, and `ExecutionStep::Merge` incur high allocation overhead when re-instantiated on every iteration.
**Action:** Reuse existing `ResultSet` memory allocations by instantiating them outside hot loops and calling `.clear()` inside the loop, preserving vector capacities.
## 2026-08-25 - Pre-resolve labels to optimize matching
**Learning:** In yagdb, `node_matches` and `edge_matches` evaluated `self.labels.read().get(l)` on every call. In tight loops like `find_nodes` which iterate over all items, this introduced massive read lock overhead.
**Action:** Label IDs should be resolved from strings once prior to iterating and passed down to match functions.

## 2024-08-29 - Optimize Aggregation Grouping Allocation
**Learning:** In yagdb's `ExecutionStep::Return`/`ExecutionStep::With` grouping aggregation, creating a new `Vec` for every row to use as an IndexMap key using `.collect()` caused unnecessary allocations. Using a pre-allocated `key_buf` with `.clear()` inside the loop, and combining `groups.get_mut` with `groups.insert(std::mem::replace(&mut key_buf, ...))` significantly reduces allocations.
**Action:** When creating composite keys for mapping structures inside hot loops, avoid repeated instantiation by using a reused buffer (`Vec::with_capacity` / `.clear()`) and inserting into maps without double-cloning using `std::mem::replace`.
## 2026-09-01 - Refactoring repeated Vec allocations in query projections
**Learning:** In yagdb's query execution pipeline, repeated allocation of a new `Vec` for row bindings inside hot projection loops (like `ExecutionStep::Return`, `With`, and path mapping loops) incurs high memory allocation overhead, limiting performance on dense or complex queries.
**Action:** When working with row aggregations or variable bindings, always allocate the vector once outside the loop using `Vec::with_capacity(items.len())`, `.clear()` it in the loop, and use `.drain(..)` when transferring items to avoid cloning data elements.
