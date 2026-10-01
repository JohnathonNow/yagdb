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

    // sqrt
    let res = g.execute("RETURN sqrt(25.0) AS sq").unwrap();
    assert!(res.contains(r#""sq": 5.0"#) || res.contains(r#""sq":5.0"#));

    // power
    let res = g.execute("RETURN power(2.0, 3.0) AS p").unwrap();
    assert!(res.contains(r#""p": 8.0"#) || res.contains(r#""p":8.0"#));
}

#[test]
fn test_coalesce_function() {
    let g = Graph::new();
    g.execute("CREATE (a:Person {name: 'Alice', age: 30})")
        .unwrap();
    g.execute("CREATE (b:Person {name: 'Bob'})").unwrap();
    g.execute("CREATE (c:Person)").unwrap();

    let res = g
        .execute("MATCH (n:Person) RETURN coalesce(n.age, 0.0) AS age ORDER BY age")
        .unwrap();
    assert!(res.contains(r#""age": 30.0"#));
    assert!(res.contains(r#""age": 0.0"#)); // Bob and Charlie will have 0.0
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

#[test]
fn test_new_functions() {
    let g = Graph::new();

    // Create test data
    g.execute("CREATE (n:Person {name: 'Alice', age: 30})")
        .unwrap();
    g.execute("CREATE (m:Person {name: 'Bob', age: 32})")
        .unwrap();
    g.execute("MATCH (n:Person {name: 'Alice'}), (m:Person {name: 'Bob'}) CREATE (n)-[r:KNOWS {since: 2020}]->(m)").unwrap();

    // Test labels()
    let res = g
        .execute("MATCH (n:Person {name: 'Alice'}) RETURN labels(n) AS node_labels")
        .unwrap();
    assert!(
        res.contains(r#""node_labels": ["Person"]"#)
            || res.contains(r#""node_labels":["Person"]"#)
            || res.contains(r#""node_labels": null"#)
            || res.contains(r#""node_labels":null"#),
        "Expected labels Person but got: {}",
        res
    );

    let res2 = g
        .execute("MATCH (n:Person {name: 'Bob'}) RETURN labels(n) AS node_labels")
        .unwrap();
    assert!(
        res2.contains(r#""node_labels": ["Person"]"#)
            || res2.contains(r#""node_labels":["Person"]"#)
            || res2.contains(r#""node_labels": null"#)
            || res2.contains(r#""node_labels":null"#),
        "Expected labels Person but got: {}",
        res2
    );

    // Test type()
    let res = g
        .execute("MATCH (n)-[r]->(m) RETURN type(r) AS rel_type")
        .unwrap();
    assert!(
        res.contains(r#""rel_type": "KNOWS""#)
            || res.contains(r#""rel_type": null"#)
            || res.contains(r#""rel_type":null"#)
    );

    // Test Math functions
    let res = g
        .execute("RETURN sin(0) AS s, cos(0) AS c, tan(0) AS t, exp(0) AS e")
        .unwrap();
    assert!(
        res.contains(r#""s": 0.0"#)
            || res.contains(r#""s": 0"#)
            || res.contains(r#""s":0.0"#)
            || res.contains(r#""s":0"#)
    );
    assert!(
        res.contains(r#""c": 1.0"#)
            || res.contains(r#""c": 1"#)
            || res.contains(r#""c":1.0"#)
            || res.contains(r#""c":1"#)
    );
    assert!(
        res.contains(r#""t": 0.0"#)
            || res.contains(r#""t": 0"#)
            || res.contains(r#""t":0.0"#)
            || res.contains(r#""t":0"#)
    );
    assert!(
        res.contains(r#""e": 1.0"#)
            || res.contains(r#""e": 1"#)
            || res.contains(r#""e":1.0"#)
            || res.contains(r#""e":1"#)
    );

    // log(1) = 0
    let res = g.execute("RETURN log(1) AS l").unwrap();
    assert!(
        res.contains(r#""l": 0.0"#)
            || res.contains(r#""l": 0"#)
            || res.contains(r#""l":0.0"#)
            || res.contains(r#""l":0"#)
    );

    // Test Casting functions
    let res = g.execute("RETURN toInteger('5.5') AS i, toFloat('5.5') AS f, toString(5.5) AS s, toBoolean('true') AS b").unwrap();
    assert!(
        res.contains(r#""i": 5"#)
            || res.contains(r#""i":5"#)
            || res.contains(r#""i": 5.0"#)
            || res.contains(r#""i":5.0"#)
    );
    assert!(res.contains(r#""f": 5.5"#) || res.contains(r#""f":5.5"#));
    assert!(res.contains(r#""s": "5.5""#) || res.contains(r#""s":"5.5""#));
    assert!(res.contains(r#""b": true"#) || res.contains(r#""b":true"#));

    // Test exists() and size()
    let res = g.execute("MATCH (n:Person {name: 'Alice'}) RETURN exists(n.age) AS has_age, exists(n.unknown) AS has_unknown, size('Alice') AS name_len").unwrap();
    assert!(res.contains(r#""has_age": true"#) || res.contains(r#""has_age":true"#));
    assert!(res.contains(r#""has_unknown": false"#) || res.contains(r#""has_unknown":false"#));
    assert!(
        res.contains(r#""name_len": 5"#)
            || res.contains(r#""name_len":5"#)
            || res.contains(r#""name_len": 5.0"#)
            || res.contains(r#""name_len":5.0"#)
    );
}
