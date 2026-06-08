
use yagdb::parser::*;
use nom::IResult;
use nom::bytes::complete::tag;
use nom::character::complete::char;
use nom::combinator::opt;
use nom::sequence::delimited;

fn ws<'a, F, O, E: nom::error::ParseError<&'a str>>(
    inner: F,
) -> impl FnMut(&'a str) -> IResult<&'a str, O, E>
where
    F: FnMut(&'a str) -> IResult<&'a str, O, E>,
{
    delimited(nom::character::complete::multispace0, inner, nom::character::complete::multispace0)
}

fn var_length(input: &str) -> IResult<&str, (usize, Option<usize>)> {
    let (input, _) = ws(char('*'))(input)?;
    let (input, min) = opt(ws(nom::character::complete::digit1))(input)?;
    let (input, dots) = opt(ws(tag("..")))(input)?;

    let (input, max) = if dots.is_some() {
        opt(ws(nom::character::complete::digit1))(input)?
    } else {
        (input, None)
    };

    let min_val = min.map(|s| s.parse::<usize>().unwrap()).unwrap_or(1);

    let max_val = if dots.is_some() {
        max.map(|s| s.parse::<usize>().unwrap())
    } else if min.is_some() {
        Some(min_val) // e.g. *2 means exactly 2
    } else {
        None // just *
    };

    Ok((input, (min_val, max_val)))
}

#[test]
fn test_where_clause() {
    let input = "MATCH (n) WHERE n.age > 30 AND n.name = 'Alice' OR NOT m.active = 'false' RETURN n";
    use yagdb::parser::Condition;
    let (rest, query) = parse_query(input).unwrap();
    assert_eq!(rest, "");
    match &query.clauses[0] {
        Clause::Match(_, Some(condition)) => {
            // Verify condition structure roughly
            match condition {
                Condition::Or(left, right) => {
                    assert!(matches!(**left, Condition::And(_, _)));
                    assert!(matches!(**right, Condition::Not(_)));
                }
                _ => panic!("Expected Or at the root"),
            }
        }
        _ => panic!("Expected Match clause with condition"),
    }
}

#[test]
fn test_var_length() {
    assert_eq!(var_length("*").unwrap().1, (1, None));
    assert_eq!(var_length("*1..2").unwrap().1, (1, Some(2)));
    assert_eq!(var_length("*..5").unwrap().1, (1, Some(5)));
    assert_eq!(var_length("*3..").unwrap().1, (3, None));
    assert_eq!(var_length("*4").unwrap().1, (4, Some(4)));
}

#[test]
fn test_parser_create_index() {
    let input = "CREATE INDEX ON :Person(name)";
    let (rest, _ast) = parse_query(input).unwrap();
    assert_eq!(rest, "");
}


#[test]
fn test_parser_merge() {
    let input = "MERGE (n:Person {name: 'Alice'})";
    let (rest, query) = parse_query(input).unwrap();
    assert_eq!(rest, "");
    match &query.clauses[0] {
        Clause::Merge(paths) => {
            assert_eq!(paths.len(), 1);
            assert_eq!(paths[0].start.label.as_deref(), Some("Person"));
            assert_eq!(paths[0].start.properties.get("name").unwrap(), "Alice");
        }
        _ => panic!("Expected Merge clause"),
    }
}

#[test]
fn test_parser_set() {
    let input = "SET n.age = '30'";
    let (rest, query) = parse_query(input).unwrap();
    assert_eq!(rest, "");
    match &query.clauses[0] {
        Clause::Set(var, prop, val) => {
            assert_eq!(var, "n");
            assert_eq!(prop, "age");
            assert_eq!(val, "30");
        }
        _ => panic!("Expected Set clause"),
    }
}

#[test]
fn test_return_star() {
    use yagdb::parser::{parse_query, Clause};
    let input = "RETURN *";
    let (rest, query) = parse_query(input).unwrap();
    assert_eq!(rest, "");
    match &query.clauses[0] {
        Clause::Return(vars, _) => {
            assert_eq!(vars.len(), 1);
            assert_eq!(vars[0], yagdb::parser::ProjectionItem::Star);
        }
        _ => panic!("Expected Return clause"),
    }
}

#[test]
fn test_return_star_graph() {
    use yagdb::graph::Graph;
    let mut g = Graph::new();
    g.execute("CREATE (a:Person {name: 'Alice'})").unwrap();
    let res = g.execute("MATCH (b:Person {name: 'Alice'}) RETURN *").unwrap();
    assert!(res.contains("b: Node { labels: [0], edges: [], properties: {\"name\": \"Alice\"} }"));
}

#[test]
fn test_match_path_assignment() {
    use yagdb::parser::{parse_query, Clause};
    let input = "MATCH p=(a:Person)-[:is]->(x:Alias)";
    let (rest, query) = parse_query(input).unwrap();
    assert_eq!(rest, "");
    match &query.clauses[0] {
        Clause::Match(paths, condition) => {
            assert_eq!(paths.len(), 1);
            assert!(condition.is_none());
            assert_eq!(paths[0].bound_variable.as_deref(), Some("p"));
        }
        _ => panic!("Expected Match clause"),
    }
}

#[test]
fn test_execute_bound_path() {
    use yagdb::graph::Graph;
    let mut g = Graph::new();
    g.execute("CREATE p=(a:Person {name: 'Alice'})-[:KNOWS]->(b:Person {name: 'Bob'})").unwrap();
    let res = g.execute("MATCH p=(a:Person)-[:KNOWS]->(b:Person) RETURN p").unwrap();
    println!("{}", res);
    assert!(res.contains("p: [Node { labels: [0], edges: [0], properties: {\"name\": \"Alice\"} }"));
    assert!(res.contains("Edge { labels: [1], start: 0, end: 1, properties: {} }"));
    assert!(res.contains("Node { labels: [0], edges: [0], properties: {\"name\": \"Bob\"} }]"));
}

#[test]
fn test_with_and_aggregates_parse() {
    let query_str = "MATCH (a) WITH COUNT(a) AS c, COLLECT(a) AS lst RETURN c, lst";
    let (rest, query) = parse_query(query_str).unwrap();
    assert_eq!(rest, "");
    assert_eq!(query.clauses.len(), 3);

    match &query.clauses[1] {
        Clause::With(items) => {
            assert_eq!(items.len(), 2);
            assert_eq!(items[0], yagdb::parser::ProjectionItem::Aggregate { func: "COUNT".to_string(), var: "a".to_string(), alias: Some("c".to_string()) });
            assert_eq!(items[1], yagdb::parser::ProjectionItem::Aggregate { func: "COLLECT".to_string(), var: "a".to_string(), alias: Some("lst".to_string()) });
        }
        _ => panic!("Expected With clause"),
    }

    match &query.clauses[2] {
        Clause::Return(items, _) => {
            assert_eq!(items.len(), 2);
            assert_eq!(items[0], yagdb::parser::ProjectionItem::Variable("c".to_string()));
            assert_eq!(items[1], yagdb::parser::ProjectionItem::Variable("lst".to_string()));
        }
        _ => panic!("Expected Return clause"),
    }
}
