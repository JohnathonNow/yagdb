
use yagdb::parser::*;

#[test]
fn test_parser_create_index() {
    let input = "CREATE INDEX ON :Person(name)";
    let (rest, _ast) = parse_query(input).unwrap();
    assert_eq!(rest, "");
}

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
fn test_var_length() {
    assert_eq!(var_length("*").unwrap().1, (1, None));
    assert_eq!(var_length("*1..2").unwrap().1, (1, Some(2)));
    assert_eq!(var_length("*..5").unwrap().1, (1, Some(5)));
    assert_eq!(var_length("*3..").unwrap().1, (3, None));
    assert_eq!(var_length("*4").unwrap().1, (4, Some(4)));

}
