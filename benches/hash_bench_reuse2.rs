use criterion::{black_box, criterion_group, criterion_main, Criterion};
use std::collections::HashMap;

#[derive(Clone, PartialEq, Eq, Hash)]
enum GraphElement {
    Null,
    String(String),
}

fn entry_benchmark(c: &mut Criterion) {
    let join_keys = vec!["a"];
    c.bench_function("allocate_every_time", |b| {
        b.iter(|| {
            let mut hash_table: HashMap<Vec<GraphElement>, Vec<usize>> = HashMap::new();
            for b_idx in 0..1000 {
                let mut key = Vec::with_capacity(join_keys.len());
                for _ in &join_keys {
                    key.push(GraphElement::String((b_idx % 10).to_string()));
                }
                hash_table.entry(key).or_default().push(b_idx);
            }

            black_box(hash_table);
        })
    });

    c.bench_function("reuse_buffer", |b| {
        b.iter(|| {
            let mut hash_table: HashMap<Vec<GraphElement>, Vec<usize>> = HashMap::new();
            let mut key_buf = Vec::with_capacity(join_keys.len());
            for b_idx in 0..1000 {
                key_buf.clear();
                for _ in &join_keys {
                    key_buf.push(GraphElement::String((b_idx % 10).to_string()));
                }
                if let Some(v) = hash_table.get_mut(&key_buf) {
                    v.push(b_idx);
                } else {
                    hash_table.insert(key_buf.clone(), vec![b_idx]);
                }
            }

            black_box(hash_table);
        })
    });
}

criterion_group!(benches, entry_benchmark);
criterion_main!(benches);
