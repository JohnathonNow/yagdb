pub fn parse_where_clause(input: &str) -> Option<&str> {
    Some(input)
}
fn main() {
    println!("{:?}", parse_where_clause("WHERE n.age > 30"));
}
