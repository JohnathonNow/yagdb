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
