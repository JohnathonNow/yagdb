use criterion::{black_box, criterion_group, criterion_main, Criterion};
use std::collections::HashMap;

#[derive(Clone, Default, Debug, PartialEq)]
pub enum GraphElement {
    #[default]
    Null,
    String(String),
}

#[derive(Clone, Default, Debug, PartialEq)]
pub struct ResultSet {
    pub columns: HashMap<String, Vec<GraphElement>>,
    pub rows: usize,
}

impl ResultSet {
    pub fn new() -> Self {
        Self {
            columns: HashMap::new(),
            rows: 0,
        }
    }
    pub fn clear(&mut self) {
        for col in self.columns.values_mut() {
            col.clear();
        }
        self.rows = 0;
    }
}

fn execute_plan(res: &mut ResultSet) {
    res.rows = 100;
    for c in res.columns.values_mut() {
        c.resize(100, GraphElement::Null);
    }
}

fn full_benchmark(c: &mut Criterion) {
    c.bench_function("allocate_resultset_every_time", |b| {
        b.iter(|| {
            for _ in 0..100 {
                let mut left_res = ResultSet::new();
                let mut right_res = ResultSet::new();
                left_res.columns.insert("a".to_string(), Vec::new());
                right_res.columns.insert("a".to_string(), Vec::new());
                execute_plan(&mut left_res);
                execute_plan(&mut right_res);
                black_box((left_res.rows, right_res.rows));
            }
        })
    });

    c.bench_function("reuse_resultset", |b| {
        b.iter(|| {
            let mut left_res = ResultSet::new();
            let mut right_res = ResultSet::new();
            left_res.columns.insert("a".to_string(), Vec::new());
            right_res.columns.insert("a".to_string(), Vec::new());
            for _ in 0..100 {
                left_res.clear();
                right_res.clear();
                execute_plan(&mut left_res);
                execute_plan(&mut right_res);
                black_box((left_res.rows, right_res.rows));
            }
        })
    });
}

criterion_group!(benches, full_benchmark);
criterion_main!(benches);
