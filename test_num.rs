use nom::{
    branch::alt,
    bytes::complete::{tag, take_while},
    character::complete::{alpha1, alphanumeric1, char, multispace0},
    combinator::{map, opt, recognize},
    multi::many0,
    sequence::{delimited, pair, preceded},
    IResult,
};

fn identifier(input: &str) -> IResult<&str, &str> {
    recognize(pair(alpha1, many0(alt((alphanumeric1, tag("_"))))))(input)
}

fn main() {
    println!("{:?}", identifier("30"));
}
