use yagdb::graph::Graph;
use std::collections::HashMap;

fn main() {
    let mut g = Graph::new();
    let label = g.get_or_add_label("Node");
    for _ in 0..3000 {
        g.add_node(label, HashMap::new());
    }

    let query = "MATCH (n), (m) return count(m)";
    let res = g.execute(query);
    println!("{:?}", res.unwrap());
}
