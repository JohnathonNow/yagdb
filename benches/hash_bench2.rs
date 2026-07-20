use criterion::{black_box, criterion_group, criterion_main, Criterion};
use std::collections::HashMap;

fn entry_benchmark(c: &mut Criterion) {
    c.bench_function("allocate_every_time", |b| {
        b.iter(|| {
            let mut hash_table: HashMap<Vec<i32>, Vec<usize>> = HashMap::new();
            for i in 0..1000 {
                let key = vec![i % 10];
                hash_table.entry(key).or_default().push(i as usize);
            }

            let mut matches = 0;
            for i in 0..1000 {
                let key = vec![i % 10];
                if let Some(v) = hash_table.get(&key) {
                    matches += v.len();
                }
            }
            black_box(matches);
        })
    });

    c.bench_function("reuse_buffer", |b| {
        b.iter(|| {
            let mut hash_table: HashMap<Vec<i32>, Vec<usize>> = HashMap::new();
            let mut key_buf = Vec::with_capacity(1);
            for i in 0..1000 {
                key_buf.clear();
                key_buf.push(i % 10);
                if let Some(v) = hash_table.get_mut(&key_buf) {
                    v.push(i as usize);
                } else {
                    hash_table.insert(key_buf.clone(), vec![i as usize]);
                }
            }

            let mut matches = 0;
            for i in 0..1000 {
                key_buf.clear();
                key_buf.push(i % 10);
                if let Some(v) = hash_table.get(&key_buf) {
                    matches += v.len();
                }
            }
            black_box(matches);
        })
    });
}

criterion_group!(benches, entry_benchmark);
criterion_main!(benches);
