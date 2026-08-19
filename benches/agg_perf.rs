use criterion::{black_box, criterion_group, criterion_main, Criterion};

fn group_old(items: usize, rows: usize) {
    let mut groups: indexmap::IndexMap<Vec<i32>, Vec<usize>> = indexmap::IndexMap::new();
    for i in 0..rows {
        let key: Vec<i32> = (0..items).map(|j| (i % 5) as i32 + j as i32).collect();
        groups.entry(key).or_insert_with(Vec::new).push(i);
    }
    black_box(groups);
}

fn group_new(items: usize, rows: usize) {
    let mut groups: indexmap::IndexMap<Vec<i32>, Vec<usize>> = indexmap::IndexMap::new();
    let mut key_buf = Vec::with_capacity(items);
    for i in 0..rows {
        key_buf.clear();
        for j in 0..items {
            key_buf.push((i % 5) as i32 + j as i32);
        }
        if let Some(group) = groups.get_mut(&key_buf) {
            group.push(i);
        } else {
            groups.insert(key_buf.clone(), vec![i]);
        }
    }
    black_box(groups);
}

fn criterion_benchmark(c: &mut Criterion) {
    c.bench_function("group_old", |b| b.iter(|| group_old(3, 10000)));
    c.bench_function("group_new", |b| b.iter(|| group_new(3, 10000)));
}

criterion_group!(benches, criterion_benchmark);
criterion_main!(benches);
