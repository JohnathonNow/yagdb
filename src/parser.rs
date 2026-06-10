use nom::{
    multi::{many0, separated_list1},
    branch::alt,
    bytes::complete::{tag, take_while},
    character::complete::{alpha1, alphanumeric1, char, digit1, multispace0},
    combinator::{all_consuming, map, opt, recognize},
    error::Error,
    sequence::{delimited, pair, preceded, tuple},
    IResult,
};
use std::collections::HashMap;

#[derive(Debug, PartialEq, Clone)]
pub struct NodePattern {
    pub variable: Option<String>,
    pub label: Option<String>,
    pub properties: HashMap<String, crate::property::PropertyValue>,
}

#[derive(Debug, PartialEq, Clone)]
pub struct RelPattern {
    pub variable: Option<String>,
    pub label: Option<String>,
    pub properties: HashMap<String, crate::property::PropertyValue>,
    pub length: Option<(usize, Option<usize>)>,
}

#[derive(Debug, PartialEq, Clone)]
pub enum PathPart {
    Node(NodePattern),
    Edge(RelPattern, NodePattern),
}

#[derive(Debug, PartialEq, Clone)]
pub struct Path {
    pub bound_variable: Option<String>,
    pub start: NodePattern,
    pub edges: Vec<(RelPattern, NodePattern)>,
}

#[derive(Debug, PartialEq, Clone)]
pub enum Expression {
    Property(String, String),
    StringLiteral(String),
    NumberLiteral(f64),
    BooleanLiteral(bool),
    Variable(String),
    Function(String, Vec<Expression>),
}

#[derive(Debug, PartialEq, Clone)]
pub enum CompareOp {
    Eq,
    Neq,
    Gt,
    Gte,
    Lt,
    Lte,
}

#[derive(Debug, PartialEq, Clone)]
pub enum Condition {
    And(Box<Condition>, Box<Condition>),
    Or(Box<Condition>, Box<Condition>),
    Not(Box<Condition>),
    Compare {
        left: Expression,
        op: CompareOp,
        right: Expression,
    },
}

#[derive(Debug, PartialEq, Clone)]
pub enum ProjectionItem {
    Star,
    Variable(String),
    AliasedVariable(String, String),
    Aggregate {
        func: String,
        var: String,
        alias: Option<String>,
    },
    Function {
        func: String,
        args: Vec<Expression>,
        alias: Option<String>,
    },
}

#[derive(Debug, PartialEq, Clone)]
pub enum Clause {
    Create(Vec<Path>),
    Match(Vec<Path>, Option<Condition>),
    Merge(Vec<Path>),
    Set(String, String, crate::property::PropertyValue),
    CreateIndex { label: String, property: String },
    Unwind(Vec<ProjectionItem>),
    Delete(Vec<String>),
    Return(Vec<ProjectionItem>, Option<Vec<OrderItem>>, Option<usize>),
    With(Vec<ProjectionItem>, Option<Vec<OrderItem>>),
    Call(Vec<Clause>),
}

#[derive(Debug, PartialEq, Clone)]
pub struct OrderItem {
    pub expr: Expression,
    pub asc: bool,
}

#[derive(Debug, PartialEq, Clone)]
pub struct Query {
    pub profile: bool,
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
    recognize(pair(alpha1, many0(alt((alphanumeric1, tag("_"))))))(input)
}

fn string_literal(input: &str) -> IResult<&str, &str> {
    alt((
        delimited(char('\''), take_while(|c| c != '\''), char('\'')),
        delimited(char('"'), take_while(|c| c != '"'), char('"')),
    ))(input)
}

fn property(input: &str) -> IResult<&str, (String, crate::property::PropertyValue)> {
    let (input, key) = ws(identifier)(input)?;
    let (input, _) = ws(char(':'))(input)?;
    let (input, val) = ws(alt((
        property_value_parser,
        map(identifier, |s| {
            crate::property::PropertyValue::String(s.to_string())
        }),
    )))(input)?;
    Ok((input, (key.to_string(), val)))
}

fn properties(input: &str) -> IResult<&str, HashMap<String, crate::property::PropertyValue>> {
    let (input, props) = delimited(
        ws(char('{')),
        separated_list1(ws(char(',')), property),
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
    let (input, bound_opt) = opt(pair(ws(identifier), ws(char('='))))(input)?;
    let bound_variable = bound_opt.map(|(id, _)| id.to_string());
    let (input, start) = node_pattern(input)?;
    let (input, edges) = many0(pair(ws(rel_pattern), ws(node_pattern)))(input)?;
    Ok((
        input,
        Path {
            bound_variable,
            start,
            edges,
        },
    ))
}

fn create_clause(input: &str) -> IResult<&str, Clause> {
    let (input, _) = ws(alt((tag("CREATE"), tag("create"))))(input)?;
    let (input, paths) = separated_list1(ws(char(',')), path)(input)?;
    Ok((input, Clause::Create(paths)))
}

fn number_literal(input: &str) -> IResult<&str, f64> {
    let (input, num_str) = recognize(tuple((
        opt(char('-')),
        digit1,
        opt(tuple((char('.'), digit1))),
    )))(input)?;
    Ok((input, num_str.parse().unwrap()))
}

fn boolean_literal(input: &str) -> IResult<&str, bool> {
    let (input, b_str) = alt((tag("true"), tag("TRUE"), tag("false"), tag("FALSE")))(input)?;
    // Ensure word boundary to prevent partial matches like "true_story"
    if let Ok((_, _)) = nom::character::complete::satisfy::<_, &str, nom::error::Error<&str>>(|c| {
        c.is_alphanumeric() || c == '_'
    })(input)
    {
        return Err(nom::Err::Error(nom::error::Error::new(
            input,
            nom::error::ErrorKind::Tag,
        )));
    }
    let val = match b_str {
        "true" | "TRUE" => true,
        "false" | "FALSE" => false,
        _ => unreachable!(),
    };
    Ok((input, val))
}

fn property_value_parser(input: &str) -> IResult<&str, crate::property::PropertyValue> {
    alt((
        map(string_literal, |s| {
            crate::property::PropertyValue::String(s.to_string())
        }),
        map(number_literal, crate::property::PropertyValue::Number),
        map(boolean_literal, crate::property::PropertyValue::Boolean),
    ))(input)
}

fn expression(input: &str) -> IResult<&str, Expression> {
    alt((
        map(ws(string_literal), |s| {
            Expression::StringLiteral(s.to_string())
        }),
        map(ws(number_literal), Expression::NumberLiteral),
        map(ws(boolean_literal), Expression::BooleanLiteral),
        map(
            tuple((ws(identifier), char('.'), ws(identifier))),
            |(var, _, prop)| Expression::Property(var.to_string(), prop.to_string()),
        ),
        map(
            tuple((
                ws(identifier),
                ws(char('(')),
                separated_list1(ws(char(',')), expression),
                ws(char(')')),
            )),
            |(func, _, args, _)| Expression::Function(func.to_string(), args),
        ),
        map(ws(identifier), |var| Expression::Variable(var.to_string())),
    ))(input)
}

fn compare_op(input: &str) -> IResult<&str, CompareOp> {
    alt((
        map(tag(">="), |_| CompareOp::Gte),
        map(tag("<="), |_| CompareOp::Lte),
        map(tag("!="), |_| CompareOp::Neq),
        map(tag(">"), |_| CompareOp::Gt),
        map(tag("<"), |_| CompareOp::Lt),
        map(tag("="), |_| CompareOp::Eq),
    ))(input)
}

fn condition_base(input: &str) -> IResult<&str, Condition> {
    alt((
        map(
            tuple((ws(alt((tag("NOT"), tag("not")))), ws(condition_base))),
            |(_, cond)| Condition::Not(Box::new(cond)),
        ),
        delimited(ws(char('(')), ws(condition_or), ws(char(')'))),
        map(
            tuple((expression, ws(compare_op), expression)),
            |(left, op, right)| Condition::Compare { left, op, right },
        ),
    ))(input)
}

fn condition_and(input: &str) -> IResult<&str, Condition> {
    let (mut input, mut cond) = condition_base(input)?;
    while let Ok((next_input_after, _)) = ws(alt((
        tag::<&str, &str, Error<&str>>("AND"),
        tag::<&str, &str, Error<&str>>("and"),
    )))(input)
    {
        let (next_input_after, right) = condition_base(next_input_after)?;
        cond = Condition::And(Box::new(cond), Box::new(right));
        input = next_input_after;
    }
    Ok((input, cond))
}

fn condition_or(input: &str) -> IResult<&str, Condition> {
    let (mut input, mut cond) = condition_and(input)?;
    while let Ok((next_input_after, _)) = ws(alt((
        tag::<&str, &str, Error<&str>>("OR"),
        tag::<&str, &str, Error<&str>>("or"),
    )))(input)
    {
        let (next_input_after, right) = condition_and(next_input_after)?;
        cond = Condition::Or(Box::new(cond), Box::new(right));
        input = next_input_after;
    }
    Ok((input, cond))
}

pub fn where_clause(input: &str) -> IResult<&str, Condition> {
    let (input, _) = ws(alt((tag("WHERE"), tag("where"))))(input)?;
    condition_or(input)
}

use nom::multi::separated_list0;

fn order_by_clause(input: &str) -> IResult<&str, Vec<OrderItem>> {
    let (input, _) = ws(alt((tag("ORDER BY"), tag("order by"))))(input)?;
    separated_list1(
        ws(char(',')),
        map(
            pair(
                expression,
                opt(ws(alt((tag("ASC"), tag("asc"), tag("DESC"), tag("desc"))))),
            ),
            |(expr, dir)| {
                let asc = match dir {
                    Some("DESC") | Some("desc") => false,
                    _ => true,
                };
                OrderItem { expr, asc }
            },
        ),
    )(input)
}

fn match_clause(input: &str) -> IResult<&str, Clause> {
    let (input, _) = ws(alt((tag("MATCH"), tag("match"))))(input)?;
    let (input, paths) = separated_list1(ws(char(',')), path)(input)?;
    let (input, condition) = opt(where_clause)(input)?;
    Ok((input, Clause::Match(paths, condition)))
}

fn projection_item(input: &str) -> IResult<&str, ProjectionItem> {
    alt((
        map(ws(char('*')), |_| ProjectionItem::Star),
        |i| {
            let (i, func) = ws(alt((
                tag("COUNT"),
                tag("count"),
                tag("COLLECT"),
                tag("collect"),
                tag("UNIQUE"),
                tag("unique"),
            )))(i)?;
            let (i, _) = ws(char('('))(i)?;
            let (i, var) = ws(alt((identifier, tag("*"))))(i)?;
            let (i, _) = ws(char(')'))(i)?;
            let (i, alias) = opt(preceded(ws(alt((tag("AS"), tag("as")))), ws(identifier)))(i)?;
            Ok((
                i,
                ProjectionItem::Aggregate {
                    func: func.to_uppercase(),
                    var: var.to_string(),
                    alias: alias.map(|s| s.to_string()),
                },
            ))
        },
        |i| {
            let (i, func) = ws(identifier)(i)?;
            let (i, _) = ws(char('('))(i)?;
            let (i, args) = separated_list0(ws(char(',')), expression)(i)?;
            let (i, _) = ws(char(')'))(i)?;
            let (i, alias) = opt(preceded(ws(alt((tag("AS"), tag("as")))), ws(identifier)))(i)?;
            Ok((
                i,
                ProjectionItem::Function {
                    func: func.to_string(),
                    args,
                    alias: alias.map(|s| s.to_string()),
                },
            ))
        },
        |i| {
            let (i, var) = ws(identifier)(i)?;
            let (i, alias) = opt(preceded(ws(alt((tag("AS"), tag("as")))), ws(identifier)))(i)?;
            if let Some(a) = alias {
                Ok((
                    i,
                    ProjectionItem::AliasedVariable(var.to_string(), a.to_string()),
                ))
            } else {
                Ok((i, ProjectionItem::Variable(var.to_string())))
            }
        },
    ))(input)
}

fn return_clause(input: &str) -> IResult<&str, Clause> {
    let (input, _) = ws(alt((tag("RETURN"), tag("return"))))(input)?;
    let (input, vars) = separated_list1(ws(char(',')), projection_item)(input)?;
    let (input, order_by) = opt(order_by_clause)(input)?;
    let (input, limit) = opt(preceded(ws(alt((tag("LIMIT"), tag("limit")))), ws(digit1)))(input)?;
    let limit_val = limit.and_then(|s| s.parse::<usize>().ok());
    Ok((input, Clause::Return(vars, order_by, limit_val)))
}

fn with_clause(input: &str) -> IResult<&str, Clause> {
    let (input, _) = ws(alt((tag("WITH"), tag("with"))))(input)?;
    let (input, vars) = separated_list0(ws(char(',')), projection_item)(input)?;
    let (input, order_by) = opt(order_by_clause)(input)?;
    Ok((input, Clause::With(vars, order_by)))
}

fn create_index_clause(input: &str) -> IResult<&str, Clause> {
    let (input, _) = ws(alt((tag("CREATE INDEX ON"), tag("create index on"))))(input)?;
    let (input, label) = preceded(ws(char(':')), ws(identifier))(input)?;
    let (input, property) = delimited(ws(char('(')), ws(identifier), ws(char(')')))(input)?;
    Ok((
        input,
        Clause::CreateIndex {
            label: label.to_string(),
            property: property.to_string(),
        },
    ))
}

fn merge_clause(input: &str) -> IResult<&str, Clause> {
    let (input, _) = ws(alt((tag("MERGE"), tag("merge"))))(input)?;
    let (input, paths) = separated_list1(ws(char(',')), path)(input)?;
    Ok((input, Clause::Merge(paths)))
}

fn set_clause(input: &str) -> IResult<&str, Clause> {
    let (input, _) = ws(alt((tag("SET"), tag("set"))))(input)?;
    let (input, var) = ws(identifier)(input)?;
    let (input, _) = ws(char('.'))(input)?;
    let (input, prop) = ws(identifier)(input)?;
    let (input, _) = ws(char('='))(input)?;
    let (input, val) = ws(alt((
        property_value_parser,
        map(identifier, |s| {
            crate::property::PropertyValue::String(s.to_string())
        }),
    )))(input)?;
    Ok((input, Clause::Set(var.to_string(), prop.to_string(), val)))
}

fn unwind_clause(input: &str) -> IResult<&str, Clause> {
    let (input, _) = ws(alt((tag("UNWIND"), tag("unwind"))))(input)?;
    let (input, vars) = separated_list1(ws(char(',')), projection_item)(input)?;
    Ok((input, Clause::Unwind(vars)))
}


fn call_clause(input: &str) -> IResult<&str, Clause> {
    let (input, _) = ws(alt((tag("CALL"), tag("call"))))(input)?;
    let (input, _) = ws(char('{'))(input)?;
    let (input, clauses) = many0(ws(clause))(input)?;
    let (input, _) = ws(char('}'))(input)?;
    Ok((input, Clause::Call(clauses)))
}

fn delete_clause(input: &str) -> IResult<&str, Clause> {
    let (input, _) = ws(alt((tag("DELETE"), tag("delete"))))(input)?;
    let (input, vars) = separated_list1(ws(char(',')), ws(identifier))(input)?;
    Ok((input, Clause::Delete(vars.into_iter().map(|s| s.to_string()).collect())))
}

fn clause(input: &str) -> IResult<&str, Clause> {
    alt((
        create_index_clause,
        create_clause,
        match_clause,
        merge_clause,
        set_clause,
        with_clause,
        return_clause,
        unwind_clause,
        delete_clause,
        call_clause,
    ))(input)
}

pub fn parse_query(input: &str) -> IResult<&str, Query> {
    let (input, profile_opt) = opt(ws(alt((tag("PROFILE"), tag("profile")))))(input)?;
    let (input, clauses) = all_consuming(many0(ws(clause)))(input)?;
    Ok((
        input,
        Query {
            profile: profile_opt.is_some(),
            clauses,
        },
    ))
}
