use yagdb::graph::Graph;

#[test]
fn test_date_function_now() {
    let mut g = Graph::new();
    let res = g.execute("RETURN date()").unwrap();
    println!("{}", res);
    assert!(res.contains("T"));
}

#[test]
fn test_date_function_parse() {
    let mut g = Graph::new();
    let res = g.execute("RETURN date('2015-09-05T23:56:04')").unwrap();
    println!("{}", res);
    assert!(res.contains("2015-09-05T23:56:04+00:00"));
}

#[test]
fn test_date_function_parse_short() {
    let mut g = Graph::new();
    let res = g.execute("RETURN date('2023-01-01')").unwrap();
    println!("{}", res);
    assert!(res.contains("2023-01-01T00:00:00+00:00"));
}

#[test]
fn test_date_property_storage() {
    let mut g = Graph::new();
    g.execute("CREATE (n:Event {d: date('2023-01-01')})").unwrap();
    let res = g.execute("MATCH (n:Event) RETURN n.d").unwrap();
    println!("{}", res);
    assert!(res.contains("2023-01-01T00:00:00+00:00"));
}

#[test]
fn test_date_comparison() {
    let mut g = Graph::new();
    g.execute("CREATE (n:Event {d: date('2023-01-01')})").unwrap();
    g.execute("CREATE (n:Event {d: date('2023-01-02')})").unwrap();
    let res = g.execute("MATCH (n:Event) WHERE n.d > date('2023-01-01') RETURN n.d").unwrap();
    println!("{}", res);
    assert!(res.contains("2023-01-02T00:00:00+00:00"));
    assert!(!res.contains("2023-01-01T00:00:00+00:00"));
}
