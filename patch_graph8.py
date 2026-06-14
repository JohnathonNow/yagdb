import sys

with open("src/graph.rs", "r") as f:
    content = f.read()

prf_old = """    pub fn push_row_from<'a, I>(&mut self, other: &ResultSet, row_idx: usize, bindings: I)
    where I: IntoIterator<Item = &'a (&'a str, GraphElement)> {"""
prf_new = """    pub fn push_row_from<'a, K: AsRef<str> + 'a, I>(&mut self, other: &ResultSet, row_idx: usize, bindings: I)
    where I: IntoIterator<Item = &'a (K, GraphElement)> {"""
content = content.replace(prf_old, prf_new)

key_str_old = """            let col = self.columns.entry(k.to_string()).or_insert_with(|| vec![GraphElement::Null; current_rows]);"""
key_str_new = """            let col = self.columns.entry(k.as_ref().to_string()).or_insert_with(|| vec![GraphElement::Null; current_rows]);"""
content = content.replace(key_str_old, key_str_new)

# Fix evaluate_expression in ORDER BY
# We are sorting inside WITH / RETURN. Wait!
# In WITH/RETURN, the final envs are already extracted? Let's check where `env` comes from.
# "let mut env_with_keys: Vec<(Vec<EvalValue>, Environment)> = final_envs.into_iter().map(|env| {"
# final_envs is Vec<Environment>.
# We should probably evaluate on a ResultSet there too!

with open("src/graph.rs", "w") as f:
    f.write(content)
