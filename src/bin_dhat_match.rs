#[cfg(feature = "dhat-heap")]
#[global_allocator]
static ALLOC: dhat::Alloc = dhat::Alloc;

use yagdb::graph::Graph;

fn main() {
    let mut g = Graph::new();
    for i in 0..1000 {
        g.execute(&format!("CREATE (n:Person {{name: \"Person{}\", age: \"30\"}})", i)).unwrap();
    }

    #[cfg(feature = "dhat-heap")]
    let _profiler = dhat::Profiler::new_heap();

    for _ in 0..100 {
        g.execute("MATCH (n:Person) RETURN n").unwrap();
    }
}
