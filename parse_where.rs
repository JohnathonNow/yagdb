use nom::{
    branch::alt,
    bytes::complete::{tag, take_while},
    character::complete::{alpha1, alphanumeric1, char, multispace0},
    combinator::{map, opt, recognize},
    multi::many0,
    sequence::{delimited, pair, preceded},
    IResult,
};

#[derive(Debug, PartialEq, Clone)]
pub enum Expr {
    VariableProperty(String, String),
    Literal(String),
}

#[derive(Debug, PartialEq, Clone)]
pub enum Operator {
    Eq,
    Neq,
    Gt,
    Lt,
    Gte,
    Lte,
}

#[derive(Debug, PartialEq, Clone)]
pub enum Condition {
    And(Box<Condition>, Box<Condition>),
    Or(Box<Condition>, Box<Condition>),
    Not(Box<Condition>),
    Compare {
        left: Expr,
        op: Operator,
        right: Expr,
    },
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

fn parse_expr(input: &str) -> IResult<&str, Expr> {
    alt((
        map(
            pair(identifier, preceded(char('.'), identifier)),
            |(var, prop)| Expr::VariableProperty(var.to_string(), prop.to_string()),
        ),
        map(alt((string_literal, identifier)), |s: &str| {
            Expr::Literal(s.to_string())
        }),
    ))(input)
}

fn parse_operator(input: &str) -> IResult<&str, Operator> {
    alt((
        map(tag("="), |_| Operator::Eq),
        map(tag("<>"), |_| Operator::Neq),
        map(tag(">="), |_| Operator::Gte),
        map(tag("<="), |_| Operator::Lte),
        map(tag(">"), |_| Operator::Gt),
        map(tag("<"), |_| Operator::Lt),
    ))(input)
}

fn parse_compare(input: &str) -> IResult<&str, Condition> {
    let (input, left) = ws(parse_expr)(input)?;
    let (input, op) = ws(parse_operator)(input)?;
    let (input, right) = ws(parse_expr)(input)?;
    Ok((
        input,
        Condition::Compare {
            left,
            op,
            right,
        },
    ))
}

fn parse_condition_factor(input: &str) -> IResult<&str, Condition> {
    alt((
        map(
            preceded(ws(alt((tag("NOT"), tag("not")))), parse_condition_factor),
            |cond| Condition::Not(Box::new(cond)),
        ),
        delimited(ws(char('(')), parse_condition_or, ws(char(')'))),
        parse_compare,
    ))(input)
}

fn parse_condition_and(input: &str) -> IResult<&str, Condition> {
    let (input, mut left) = parse_condition_factor(input)?;
    let (input, rights) = many0(preceded(
        ws(alt((tag("AND"), tag("and")))),
        parse_condition_factor,
    ))(input)?;

    for right in rights {
        left = Condition::And(Box::new(left), Box::new(right));
    }

    Ok((input, left))
}

fn parse_condition_or(input: &str) -> IResult<&str, Condition> {
    let (input, mut left) = parse_condition_and(input)?;
    let (input, rights) = many0(preceded(
        ws(alt((tag("OR"), tag("or")))),
        parse_condition_and,
    ))(input)?;

    for right in rights {
        left = Condition::Or(Box::new(left), Box::new(right));
    }

    Ok((input, left))
}

pub fn parse_where_clause(input: &str) -> IResult<&str, Condition> {
    preceded(ws(alt((tag("WHERE"), tag("where")))), parse_condition_or)(input)
}

fn main() {
    println!("{:?}", parse_where_clause("WHERE n.age > 30 AND n.name = 'Alice' OR NOT n.active = 'false'"));
}
