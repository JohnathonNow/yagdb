use yagdb::parser::*;

#[test]
fn test_parser_create_index() {
    let input = "CREATE INDEX ON :Person(name)";
    let (rest, _ast) = parse_query(input).unwrap();
    assert_eq!(rest, "");
}
