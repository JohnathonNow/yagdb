use nom::{
    branch::alt,
    bytes::complete::tag,
    character::complete::{alpha1, char, multispace0, digit1, alphanumeric1},
    combinator::{opt, recognize},
    multi::many0,
    sequence::{delimited, pair, preceded},
    IResult,
};

fn main() {}
