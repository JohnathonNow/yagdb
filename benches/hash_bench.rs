use criterion::{black_box, criterion_group, criterion_main, Criterion};
use std::collections::HashMap;

fn entry_benchmark(c: &mut Criterion) {
    c.bench_function("entry", |b| {
        b.iter(|| {
            let mut hash_table: HashMap<Vec<i32>, Vec<usize>> = HashMap::new();
            for i in 0..1000 {
                let key = vec![i % 10];
                hash_table.entry(key).or_default().push(i as usize);
            }
            black_box(hash_table);
        })
    });

    c.bench_function("get_mut_insert", |b| {
        b.iter(|| {
            let mut hash_table: HashMap<Vec<i32>, Vec<usize>> = HashMap::new();
            for i in 0..1000 {
                let key = vec![i % 10];
                if let Some(v) = hash_table.get_mut(&key) {
                    v.push(i as usize);
                } else {
                    hash_table.insert(key, vec![i as usize]);
                }
            }
            black_box(hash_table);
        })
    });
}

criterion_group!(benches, entry_benchmark);
criterion_main!(benches);
