use criterion::{black_box, criterion_group, criterion_main, Criterion};
use yagdb::graph::Graph;

fn bench_intersect(c: &mut Criterion) {
    let mut graph = Graph::new();

    // Create nodes for intersect
    for i in 0..1000 {
        let _ = graph.execute(&format!("CREATE (n:A {{id: {}}})", i));
    }
    for i in 500..1500 {
        let _ = graph.execute(&format!("CREATE (n:B {{id: {}}})", i));
    }

    c.bench_function("intersect_slow", |b| {
        b.iter(|| {
            let query = "MATCH (n:A) WITH n MATCH (n:B) RETURN n";
            let _ = graph.execute(black_box(query));
        })
    });
}

criterion_group!(benches, bench_intersect);
criterion_main!(benches);
