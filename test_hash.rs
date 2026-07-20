use std::collections::HashMap;

fn main() {
    let mut hash_table: HashMap<Vec<i32>, Vec<usize>> = HashMap::new();
    let mut key = Vec::new();
    key.push(1);

    if let Some(v) = hash_table.get_mut(&key) {
        v.push(1);
    } else {
        hash_table.insert(key, vec![1]);
    }
}
