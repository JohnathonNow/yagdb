use yagdb::graph::Graph;

#[test]
fn test_unwind_literal_list() {
    let mut g = Graph::new();
    let res = g.execute("UNWIND [1.0, 2.0, 3.0] AS x RETURN x").unwrap();
    assert!(res.contains(r#""x": 1.0"#) || res.contains(r#""x":1.0"#));
    assert!(res.contains(r#""x": 2.0"#) || res.contains(r#""x":2.0"#));
    assert!(res.contains(r#""x": 3.0"#) || res.contains(r#""x":3.0"#));
}

#[test]
fn test_unwind_nested() {
    let mut g = Graph::new();
    let res = g.execute("UNWIND [1.0] AS x UNWIND [2.0] AS y RETURN x, y").unwrap();
    assert!(res.contains(r#""x": 1.0"#) || res.contains(r#""x":1.0"#));
    assert!(res.contains(r#""y": 2.0"#) || res.contains(r#""y":2.0"#));
}

#[test]
fn test_unwind_single_expression() {
    let mut g = Graph::new();
    let res = g.execute("UNWIND 5.0 AS x RETURN x").unwrap();
    assert!(res.contains(r#""x": 5.0"#) || res.contains(r#""x":5.0"#));
}

#[test]
fn test_unwind_map() {
    let mut g = Graph::new();
    let res = g.execute("UNWIND {a: 1.0} AS x RETURN x").unwrap();
    println!("{}", res);
    assert!(res.contains(r#""a": 1.0"#) || res.contains(r#""a":1.0"#));
}
