pub mod edge;
pub mod graph;
pub mod node;
pub mod parser;
pub mod planner;
pub mod property;
pub mod string_pool;

#[cfg(feature = "cluster")]
pub mod raft;

#[cfg(target_arch = "wasm32")]
pub mod wasm {
    use crate::graph::Graph;
    use std::sync::Mutex;
    use wasm_bindgen::prelude::*;

    static GRAPH: once_cell::sync::Lazy<Mutex<Graph>> =
        once_cell::sync::Lazy::new(|| Mutex::new(Graph::new()));

    #[wasm_bindgen]
    pub fn execute_query(query: &str) -> String {
        let mut g = GRAPH.lock().unwrap();
        match g.execute(query) {
            Ok(result) => result,
            Err(e) => format!("Error: {}", e),
        }
    }

    #[wasm_bindgen]
    pub fn clear_graph() {
        let mut g = GRAPH.lock().unwrap();
        g.clear();
    }
}
