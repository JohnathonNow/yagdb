## 2024-05-24 - Result Set Bindings Allocation
**Learning:** In yagdb's query execution pipeline (e.g., aggregations and projections in `ExecutionStep::With`/`Return`), allocating a new `Vec` inside hot loops for `bindings` creates performance bottlenecks.
**Action:** Hoist the initialization outside the loop as `Vec::with_capacity(...)`, call `.clear()` inside the loop, and use `.drain(..)` when passing to `ResultSet::push_row_from` to avoid cloning keys and `GraphElement` values.

## 2025-02-12 - Reusing Binding Arrays in Unwind Execution Step
**Learning:** In yagdb's `ExecutionStep::Unwind`, hoisting string formatting outside loop boundaries saves significant memory allocation. Array literals in Rust are allocated on the stack (0 cost), while formatting strings performs a heap allocation per format!.
**Action:** When creating variable length or looping constructs inside `ExecutionStep`, pull format! heap allocations outside loops where variables do not change.
## 2024-05-25 - Avoid Redundant String Formatting in Hot Loops
**Learning:** In yagdb query execution pipeline (like Unwind), building strings like `format!("{}.{}", var, prop)` repeatedly inside a loop is inefficient and creates performance bottlenecks due to heap allocation.
**Action:** When a string formatted from variables that do not change inside a loop, hoist the `format!` macro evaluation outside the loop.
## 2026-09-06 - Hoist String Formatting out of Projection Loops
**Learning:** In yagdb's query execution pipeline (specifically projections in `ExecutionStep::With` and `ExecutionStep::Return`), using `format!` inside hot loops causes a significant performance bottleneck due to redundant heap allocations on every iteration.
**Action:** When a string key is based on a struct definition that doesn't change during iteration (like `ProjectionItem`), map the items into a `Vec<String>` of precomputed keys before the loop and access them by index to replace runtime formatting with cheap `clone()`s.
## 2026-09-07 - Precompute output keys in Unwind
**Learning:** In yagdb's `ExecutionStep::Unwind`, string formatting (`format!`) and cloning string references inside inner row loops create redundant heap allocations per row and per unwound item, acting as a performance bottleneck during list unwinding operations.
**Action:** Always precompute static destination output keys outside hot iterators and loop bodies, caching them into a `Vec<String>` and passing them down by reference to inner mapping methods to preserve memory stability and optimize CPU execution times.
## 2024-05-18 - Avoid String Clone inside ResultSet Projection Loops
**Learning:** During query execution in `ExecutionStep::With` and `ExecutionStep::Return`, populating projection bindings resulted in an unnecessary `String` heap allocation per column per row due to the use of `out_key.clone()` inside the hot loop. The `ResultSet::push_row_from` method, however, accepts a generic `K: AsRef<str>`, meaning the allocation can be avoided entirely by passing string slices (`&str`).
**Action:** When populating bindings structures (`Vec<(K, GraphElement)>`) that are meant to be pushed into generic collections accepting `AsRef<str>`, always declare the collection to hold `&str` references to precomputed keys and use `.as_str()` instead of `.clone()` to eliminate hidden per-row heap allocations.
## 2026-09-08 - Hoist Variable Formatting out of Execute Path Binding
**Learning:** In yagdb's `execute_plan_and_bind_paths`, path variable strings like `start_var`, `rel_var`, and `target_var` were redundantly cloned and formatted via `format!` inside the row iteration loop (`for i in initial_rows..out.rows`). This triggered continuous heap allocation overhead during pattern matching.
**Action:** When mapping logic evaluates elements row-by-row on a `ResultSet`, move generic schema or variable calculations (like path node/edge variable names) outside of the loop. Precompute these bounds into `Vec<(String, String)>` structures so that the loop only requires cheap variable references (`&rel_var`).

## 2026-09-08 - Hoist PathExpand Vec Allocations and AST Clones
**Learning:** In yagdb's query execution pipeline (specifically pattern path matching in `ExecutionStep` for `PlanNode::PathExpand`), generating the edge mapping (`vec![(rel_pattern.clone(), target_node_pattern.clone())]`) inside the nested traversal hot loops causes severe redundant AST cloning and vector memory allocation on every matched source node.
**Action:** When working with nested result iterations during graph path expansions, always precompute static mappings like path AST copies into variables outside of row loops (`i in 0..source_res.rows`) and source node loops, passing references downward.

## 2026-09-08 - Hoist ResultSet allocation from Recursive Variable Length Edge traversal
**Learning:** In yagdb's query execution engine, `match_var_length_edges` dynamically constructed variable length paths by recursively discovering and verifying target matches. However, it repeatedly created `let mut single_res = ResultSet::new()` and `bindings` vectors locally inside the deeply nested `if matches_target` recursion base case. Since deep graph traversals visit thousands of nodes, allocating `HashMap`-backed ResultSets for every target matched acts as a significant memory allocation bottleneck.
**Action:** When a method performs depth-first traversal and executes downstream handlers (like `match_edges_recursive`), hoist complex data structures like `ResultSet` to the caller of the top-level recursive entry point (e.g. into `match_edges_recursive` loops or parent functions), and pass `&mut ResultSet` down the call stack, explicitly `.clear()`ing it before each push, completely bypassing inner loop `Vec/HashMap` allocations.
