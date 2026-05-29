use nom::{
    branch::alt,
    bytes::complete::{tag, take_while},
    character::complete::{alpha1, alphanumeric1, char, multispace0},
    combinator::{all_consuming, opt, recognize},
    multi::{many0, separated_list0},
    sequence::{delimited, pair, preceded},
    IResult,
};
use std::collections::HashMap;

#[derive(Debug, PartialEq, Clone)]
pub struct NodePattern {
    pub variable: Option<String>,
    pub label: Option<String>,
    pub properties: HashMap<String, String>,
}

#[derive(Debug, PartialEq, Clone)]
pub struct RelPattern {
    pub variable: Option<String>,
    pub label: Option<String>,
    pub properties: HashMap<String, String>,
}

#[derive(Debug, PartialEq, Clone)]
pub enum PathPart {
    Node(NodePattern),
    Edge(RelPattern, NodePattern),
}

#[derive(Debug, PartialEq, Clone)]
pub struct Path {
    pub start: NodePattern,
    pub edges: Vec<(RelPattern, NodePattern)>,
}

#[derive(Debug, PartialEq, Clone)]
pub enum Clause {
    Create(Vec<Path>),
    Match(Vec<Path>),
    Return(Vec<String>),
}

#[derive(Debug, PartialEq, Clone)]
pub struct Query {
    pub clauses: Vec<Clause>,
}

fn ws<'a, F, O, E: nom::error::ParseError<&'a str>>(
    inner: F,
) -> impl FnMut(&'a str) -> IResult<&'a str, O, E>
where
    F: FnMut(&'a str) -> IResult<&'a str, O, E>,
{
    delimited(multispace0, inner, multispace0)
}

fn identifier(input: &str) -> IResult<&str, &str> {
    recognize(pair(
        alpha1,
        many0(alt((alphanumeric1, tag("_"))))
    ))(input)
}

fn string_literal(input: &str) -> IResult<&str, &str> {
    alt((
        delimited(char('\''), take_while(|c| c != '\''), char('\'')),
        delimited(char('"'), take_while(|c| c != '"'), char('"')),
    ))(input)
}

fn property(input: &str) -> IResult<&str, (String, String)> {
    let (input, key) = ws(identifier)(input)?;
    let (input, _) = ws(char(':'))(input)?;
    let (input, val) = ws(alt((string_literal, identifier)))(input)?;
    Ok((input, (key.to_string(), val.to_string())))
}

fn properties(input: &str) -> IResult<&str, HashMap<String, String>> {
    let (input, props) = delimited(
        ws(char('{')),
        separated_list0(ws(char(',')), property),
        ws(char('}')),
    )(input)?;

    let mut map = HashMap::new();
    for (k, v) in props {
        map.insert(k, v);
    }
    Ok((input, map))
}

fn node_pattern(input: &str) -> IResult<&str, NodePattern> {
    let (input, _) = ws(char('('))(input)?;
    let (input, variable) = opt(ws(identifier))(input)?;
    let (input, label) = opt(preceded(ws(char(':')), ws(identifier)))(input)?;
    let (input, props) = opt(ws(properties))(input)?;
    let (input, _) = ws(char(')'))(input)?;

    Ok((
        input,
        NodePattern {
            variable: variable.map(|s| s.to_string()),
            label: label.map(|s| s.to_string()),
            properties: props.unwrap_or_default(),
        },
    ))
}

fn rel_pattern(input: &str) -> IResult<&str, RelPattern> {
    let (input, _) = ws(tag("-["))(input)?;
    let (input, variable) = opt(ws(identifier))(input)?;
    let (input, label) = opt(preceded(ws(char(':')), ws(identifier)))(input)?;
    let (input, props) = opt(ws(properties))(input)?;
    let (input, _) = ws(tag("]->"))(input)?;

    Ok((
        input,
        RelPattern {
            variable: variable.map(|s| s.to_string()),
            label: label.map(|s| s.to_string()),
            properties: props.unwrap_or_default(),
        },
    ))
}

fn path(input: &str) -> IResult<&str, Path> {
    let (input, start) = node_pattern(input)?;
    let (input, edges) = many0(pair(ws(rel_pattern), ws(node_pattern)))(input)?;
    Ok((input, Path { start, edges }))
}

fn create_clause(input: &str) -> IResult<&str, Clause> {
    let (input, _) = ws(alt((tag("CREATE"), tag("create"))))(input)?;
    let (input, paths) = separated_list0(ws(char(',')), path)(input)?;
    Ok((input, Clause::Create(paths)))
}

fn match_clause(input: &str) -> IResult<&str, Clause> {
    let (input, _) = ws(alt((tag("MATCH"), tag("match"))))(input)?;
    let (input, paths) = separated_list0(ws(char(',')), path)(input)?;
    Ok((input, Clause::Match(paths)))
}

fn return_clause(input: &str) -> IResult<&str, Clause> {
    let (input, _) = ws(alt((tag("RETURN"), tag("return"))))(input)?;
    let (input, vars) = separated_list0(ws(char(',')), ws(identifier))(input)?;
    Ok((input, Clause::Return(vars.into_iter().map(|s| s.to_string()).collect())))
}

fn clause(input: &str) -> IResult<&str, Clause> {
    alt((create_clause, match_clause, return_clause))(input)
}

pub fn parse_query(input: &str) -> IResult<&str, Query> {
    let (input, clauses) = all_consuming(many0(ws(clause)))(input)?;
    Ok((input, Query { clauses }))
}
