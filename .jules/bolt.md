## 2024-05-24 - Result Set Bindings Allocation
**Learning:** In yagdb's query execution pipeline (e.g., aggregations and projections in `ExecutionStep::With`/`Return`), allocating a new `Vec` inside hot loops for `bindings` creates performance bottlenecks.
**Action:** Hoist the initialization outside the loop as `Vec::with_capacity(...)`, call `.clear()` inside the loop, and use `.drain(..)` when passing to `ResultSet::push_row_from` to avoid cloning keys and `GraphElement` values.

## 2025-02-12 - Reusing Binding Arrays in Unwind Execution Step
**Learning:** In yagdb's `ExecutionStep::Unwind`, hoisting string formatting outside loop boundaries saves significant memory allocation. Array literals in Rust are allocated on the stack (0 cost), while formatting strings performs a heap allocation per format!.
**Action:** When creating variable length or looping constructs inside `ExecutionStep`, pull format! heap allocations outside loops where variables do not change.
