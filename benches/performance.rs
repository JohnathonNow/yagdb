use criterion::{criterion_group, criterion_main, BatchSize, Criterion};
use std::hint::black_box;
use yagdb::graph::Graph;

fn benchmark_create(c: &mut Criterion) {
    c.bench_function("create_node", |b| {
        b.iter_batched(
            || Graph::new(),
            |mut g| {
                g.execute(black_box(
                    "CREATE (n:Person {name: \"Alice\", age: \"30\"})",
                ))
                .unwrap();
            },
            BatchSize::SmallInput,
        )
    });
}

fn benchmark_create_relationship(c: &mut Criterion) {
    c.bench_function("create_relationship", |b| {
        b.iter_batched(
            || Graph::new(),
            |mut g| {
                g.execute(black_box(
                    "CREATE (n:Person {name: \"Alice\"})-[:KNOWS]->(m:Person {name: \"Bob\"})",
                ))
                .unwrap();
            },
            BatchSize::SmallInput,
        )
    });
}

fn benchmark_match(c: &mut Criterion) {
    c.bench_function("match_node", |b| {
        b.iter_batched(
            || {
                let mut g = Graph::new();
                g.execute("CREATE (n:Person {name: \"Alice\", age: \"30\"})")
                    .unwrap();
                g
            },
            |mut g| {
                g.execute(black_box("MATCH (n:Person {name: \"Alice\"}) RETURN n"))
                    .unwrap();
            },
            BatchSize::SmallInput,
        )
    });
}

fn benchmark_create_and_match(c: &mut Criterion) {
    c.bench_function("create_and_match", |b| {
        b.iter_batched(
            || Graph::new(),
            |mut g| {
                g.execute(black_box(
                    "CREATE (n:Person {name: \"Alice\", age: \"30\"})",
                ))
                .unwrap();
                g.execute(black_box("MATCH (n:Person {name: \"Alice\"}) RETURN n"))
                    .unwrap();
            },
            BatchSize::SmallInput,
        )
    });
}

fn benchmark_match_relationship(c: &mut Criterion) {
    c.bench_function("match_relationship", |b| {
        b.iter_batched(
            || {
                let mut g = Graph::new();
                g.execute(
                    "CREATE (n:Person {name: \"Alice\"})-[:KNOWS]->(m:Person {name: \"Bob\"})",
                )
                .unwrap();
                g
            },
            |mut g| {
                g.execute(black_box(
                    "MATCH (n:Person)-[:KNOWS]->(m:Person) RETURN n, m",
                ))
                .unwrap();
            },
            BatchSize::SmallInput,
        )
    });
}

fn benchmark_complex_match(c: &mut Criterion) {
    c.bench_function("match_complex_path", |b| {
        b.iter_batched(
            || {
                let mut g = Graph::new();
                g.execute("CREATE (a:Person {name: \"Alice\"})-[:KNOWS]->(b:Person {name: \"Bob\"})-[:KNOWS]->(c:Person {name: \"Charlie\"})").unwrap();
                g
            },
            |mut g| {
                g.execute(black_box("MATCH (a:Person)-[:KNOWS]->(b:Person)-[:KNOWS]->(c:Person) RETURN a, b, c")).unwrap();
            },
            BatchSize::SmallInput,
        )
    });
}

criterion_group!(
    benches,
    benchmark_create,
    benchmark_create_relationship,
    benchmark_match,
    benchmark_create_and_match,
    benchmark_match_relationship,
    benchmark_complex_match
);
criterion_main!(benches);
