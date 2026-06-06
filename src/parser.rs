use nom::{
    branch::alt,
    bytes::complete::{tag, take_while},
    character::complete::{alpha1, alphanumeric1, char, multispace0, digit1},
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
    pub length: Option<(usize, Option<usize>)>,
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
    Return(Vec<String>, Option<usize>),
    CreateIndex(String, String),
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
        Some(min_val)
    } else {
        None
    };

    Ok((input, (min_val, max_val)))
}

fn rel_pattern(input: &str) -> IResult<&str, RelPattern> {
    let (input, _) = ws(tag("-["))(input)?;
    let (input, variable) = opt(ws(identifier))(input)?;
    let (input, label) = opt(preceded(ws(char(':')), ws(identifier)))(input)?;
    let (input, props) = opt(ws(properties))(input)?;
    let (input, length) = opt(ws(var_length))(input)?;
    let (input, _) = ws(tag("]->"))(input)?;

    Ok((
        input,
        RelPattern {
            variable: variable.map(|s| s.to_string()),
            label: label.map(|s| s.to_string()),
            properties: props.unwrap_or_default(),
            length,
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
    let (input, limit) = opt(preceded(
        ws(alt((tag("LIMIT"), tag("limit")))),
        ws(digit1),
    ))(input)?;
    let limit_val = limit.and_then(|s| s.parse::<usize>().ok());
    Ok((input, Clause::Return(vars.into_iter().map(|s| s.to_string()).collect(), limit_val)))
}

fn create_index_clause(input: &str) -> IResult<&str, Clause> {
    let (input, _) = ws(alt((tag("CREATE INDEX ON"), tag("create index on"))))(input)?;
    let (input, _) = ws(char(':'))(input)?;
    let (input, label) = ws(identifier)(input)?;
    let (input, _) = ws(char('('))(input)?;
    let (input, prop) = ws(identifier)(input)?;
    let (input, _) = ws(char(')'))(input)?;
    Ok((input, Clause::CreateIndex(label.to_string(), prop.to_string())))
}

fn clause(input: &str) -> IResult<&str, Clause> {
    alt((create_index_clause, create_clause, match_clause, return_clause))(input)
}

pub fn parse_query(input: &str) -> IResult<&str, Query> {
    let (input, clauses) = all_consuming(many0(ws(clause)))(input)?;
    Ok((input, Query { clauses }))
}
