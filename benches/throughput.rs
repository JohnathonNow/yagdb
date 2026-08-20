use criterion::{criterion_group, criterion_main, BatchSize, Criterion};
use std::hint::black_box;
use yagdb::graph::Graph;

struct Ratios {
    name: &'static str,
    read_prop: usize,
    read_path: usize,
    insert_node: usize,
    modify_prop: usize,
}

fn benchmark_throughput(c: &mut Criterion) {
    let scenarios = vec![
        Ratios { name: "read_heavy", read_prop: 80, read_path: 10, insert_node: 5, modify_prop: 5 },
        Ratios { name: "write_heavy", read_prop: 10, read_path: 10, insert_node: 40, modify_prop: 40 },
        Ratios { name: "balanced", read_prop: 25, read_path: 25, insert_node: 25, modify_prop: 25 },
        Ratios { name: "read_only", read_prop: 50, read_path: 50, insert_node: 0, modify_prop: 0 },
        Ratios { name: "write_only", read_prop: 0, read_path: 0, insert_node: 50, modify_prop: 50 },
    ];

    for scenario in scenarios {
        // Pre-generate a sequence of 100 operations based on the ratios
        let mut operations = Vec::new();
        for i in 0..scenario.read_prop {
            operations.push(format!("MATCH (n:Node {{id: '{}'}}) RETURN n.prop", i % 10));
        }
        for i in 0..scenario.read_path {
            operations.push(format!("MATCH (n:Node {{id: '{}'}})-[:REL]->(m) RETURN m", i % 10));
        }
        for i in 0..scenario.insert_node {
            operations.push(format!("CREATE (n:Node {{id: 'new_{}', prop: 'val'}})", i));
        }
        for i in 0..scenario.modify_prop {
            operations.push(format!("MATCH (n:Node {{id: '{}'}}) SET n.prop = 'new_val_{}'", i % 10, i));
        }

        // Shuffle operations with a simple custom PRNG to avoid external dependencies
        let mut prng_state = 12345u32;
        for i in (1..operations.len()).rev() {
            prng_state = prng_state ^ (prng_state << 13);
            prng_state = prng_state ^ (prng_state >> 17);
            prng_state = prng_state ^ (prng_state << 5);
            let swap_idx = (prng_state as usize) % (i + 1);
            operations.swap(i, swap_idx);
        }

        c.bench_function(&format!("throughput_{}", scenario.name), |b| {
            b.iter_batched(
                || {
                    let mut g = Graph::new();
                    g.execute("CREATE INDEX ON :Node(id)").unwrap();
                    for i in 0..10 {
                        g.execute(&format!("CREATE (n:Node {{id: '{}', prop: 'val'}})-[:REL]->(m:Node {{id: 'm{}'}})", i, i)).unwrap();
                    }
                    (g, operations.clone())
                },
                |(mut g, ops)| {
                    for op in ops {
                        g.execute(black_box(&op)).unwrap();
                    }
                },
                BatchSize::SmallInput,
            )
        });
    }
}

criterion_group!(benches, benchmark_throughput);
criterion_main!(benches);
