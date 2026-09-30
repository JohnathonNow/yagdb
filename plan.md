1. **Optimize `ProjectionItem::Function` allocations in `ExecutionStep::With` and `ExecutionStep::Return`:**
   - In `src/graph/mod.rs`, during `ExecutionStep::With` and `Return` projections with aggregations (around line 2320), hoist the `eval_args` buffer outside the loops using `let mut eval_args = Vec::new();` and reuse it via `.clear()` in the inner loop instead of `.map(|arg| ...).collect()`.
   - Apply the same optimization for simple projections (around line 2390).
2. **Optimize `COLLECT` and `UNIQUE` allocations:**
   - Hoist `let mut elements = Vec::new();` outside the loop, and `.clear()` it before populating in `COLLECT` and `UNIQUE` aggregations. Since they create `GraphElement::List`, we can `.drain(..).collect()` or `std::mem::take` to pass the items and reuse the buffer capacity.
3. **Complete Pre Commit Steps:**
   - Call `pre_commit_instructions` tool to run checks.
4. **Submit:**
   - Create PR with title `⚡ Bolt: [performance improvement]` and appropriate description.
