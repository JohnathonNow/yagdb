use yagdb::graph::Graph;

#[test]
fn test_string_functions() {
    let g = Graph::new();

    // tolower
    let res = g.execute("RETURN tolower('HeLlO') AS lower").unwrap();
    assert!(res.contains(r#""lower": "hello""#) || res.contains(r#""lower":"hello""#));

    // toupper
    let res = g.execute("RETURN toupper('HeLlO') AS upper").unwrap();
    assert!(res.contains(r#""upper": "HELLO""#) || res.contains(r#""upper":"HELLO""#));

    // substring
    let res = g
        .execute("RETURN substring('hello world', 0.0, 5.0) AS sub")
        .unwrap();
    assert!(res.contains(r#""sub": "hello""#) || res.contains(r#""sub":"hello""#));

    // substring overflow
    let res = g
        .execute("RETURN substring('hello', 0.0, 100.0) AS sub")
        .unwrap();
    assert!(res.contains(r#""sub": "hello""#) || res.contains(r#""sub":"hello""#));

    // substring out of bounds start
    let res = g
        .execute("RETURN substring('hello', 10.0, 5.0) AS sub")
        .unwrap();
    assert!(res.contains(r#""sub": """#) || res.contains(r#""sub":""#));
}

#[test]
fn test_math_functions() {
    let g = Graph::new();

    // abs
    let res = g.execute("RETURN abs(-5.5) AS abs_val").unwrap();
    assert!(res.contains(r#""abs_val": 5.5"#) || res.contains(r#""abs_val":5.5"#));

    let res = g.execute("RETURN abs(5.5) AS abs_val").unwrap();
    assert!(res.contains(r#""abs_val": 5.5"#) || res.contains(r#""abs_val":5.5"#));

    // round
    let res = g
        .execute("RETURN round(5.4) AS r1, round(5.5) AS r2")
        .unwrap();
    assert!(
        (res.contains(r#""r1": 5.0"#) || res.contains(r#""r1":5.0"#))
            && (res.contains(r#""r2": 6.0"#) || res.contains(r#""r2":6.0"#))
    );

    // ceil
    let res = g.execute("RETURN ceil(5.1) AS c").unwrap();
    assert!(res.contains(r#""c": 6.0"#) || res.contains(r#""c":6.0"#));

    // floor
    let res = g.execute("RETURN floor(5.9) AS f").unwrap();
    assert!(res.contains(r#""f": 5.0"#) || res.contains(r#""f":5.0"#));
}

#[test]
fn test_substring_unicode() {
    let g = Graph::new();
    let res = g
        .execute("RETURN substring('🍎🍌🍇🍉', 1.0, 2.0) AS sub")
        .unwrap();
    assert!(res.contains(r#""sub": "🍌🍇""#) || res.contains(r#""sub":"🍌🍇""#));
}

#[test]
fn test_id_function() {
    let g = Graph::new();
    g.execute("CREATE (a:Person {name: 'Alice'})-[r:KNOWS]->(b:Person {name: 'Bob'})")
        .unwrap();

    // Test node id
    let res = g
        .execute("MATCH (n:Person {name: 'Alice'}) RETURN id(n) AS node_id")
        .unwrap();
    assert!(res.contains(r#""node_id": 0"#) || res.contains(r#""node_id":0"#));

    // Test edge id
    let res = g
        .execute("MATCH (a)-[r:KNOWS]->(b) RETURN id(r) AS edge_id")
        .unwrap();
    assert!(res.contains(r#""edge_id": 0"#) || res.contains(r#""edge_id":0"#));
}
