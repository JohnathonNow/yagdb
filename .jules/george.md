## 2024-08-22 - [Data Corruption Avoidance in WAL Enum Upgrades]
**Learning:** When expanding serialized enums for disk persistence (like `WalEntry` used with `bincode`), new variants must always be appended to the end of the enum definition. Inserting variants in the middle changes the implicitly assigned sequential integer tags for all subsequent variants, causing instant data corruption and deserialization panics for existing databases.
**Action:** Always append new variants to the end of enums that are persisted via binary serialization formats like `bincode`.

## 2024-08-22 - [Integration Test Module Scoping]
**Learning:** In Rust, files placed under the `tests/` directory are treated as entirely separate integration test crates. Unlike `#[cfg(test)]` modules within `src/`, they do not automatically inherit internal crate scope. Attempting to add standalone functions relying on un-imported internal modules will fail to compile.
**Action:** When adding tests to existing integration test files, ensure that all necessary structs and functions from the target crate are explicitly imported, or add the test cases directly to existing functions where imports are already resolved.
