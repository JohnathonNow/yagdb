pub mod edge;
pub mod export;
pub mod graph;
pub mod node;
pub mod parser;
pub mod planner;
pub mod property;

#[cfg(feature = "cluster")]
pub mod raft;

#[cfg(target_arch = "wasm32")]
pub mod wasm {
    use crate::graph::Graph;
    use std::sync::Mutex;
    use wasm_bindgen::prelude::*;

    static GRAPH: once_cell::sync::Lazy<Graph> = once_cell::sync::Lazy::new(|| Graph::new());

    #[wasm_bindgen]
    pub fn execute_query(query: &str) -> String {
        let g = &*GRAPH;
        match g.execute(query) {
            Ok(result) => result,
            Err(e) => format!("Error: {}", e),
        }
    }

    #[wasm_bindgen]
    pub fn clear_graph() {
        let g = &*GRAPH;
        g.clear();
    }
}
