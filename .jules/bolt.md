## 2024-05-24 - Result Set Bindings Allocation
**Learning:** In yagdb's query execution pipeline (e.g., aggregations and projections in `ExecutionStep::With`/`Return`), allocating a new `Vec` inside hot loops for `bindings` creates performance bottlenecks.
**Action:** Hoist the initialization outside the loop as `Vec::with_capacity(...)`, call `.clear()` inside the loop, and use `.drain(..)` when passing to `ResultSet::push_row_from` to avoid cloning keys and `GraphElement` values.
## 2024-05-24 - Result Set Bindings Allocation
**Learning:** In yagdb's query execution pipeline (e.g., aggregations and projections in `ExecutionStep::With`/`Return`), allocating a new `Vec` inside hot loops for `bindings` creates performance bottlenecks.
**Action:** Hoist the initialization outside the loop as `Vec::with_capacity(...)`, call `.clear()` inside the loop, and use `.drain(..)` when passing to `ResultSet::push_row_from` to avoid cloning keys and `GraphElement` values.
