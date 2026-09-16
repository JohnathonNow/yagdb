import re

with open("src/parser.rs", "r") as f:
    content = f.read()

# Add SetItem enum
enum_insertion = """pub enum RemoveItem {
    Property(String, String),
    Label(String, String),
}

#[derive(Debug, PartialEq, Clone)]
pub enum SetItem {
    Property(String, String, Expression),
    Label(String, Vec<String>),
}"""
content = content.replace("pub enum RemoveItem {\n    Property(String, String),\n    Label(String, String),\n}", enum_insertion)

# Replace Set in Clause
content = content.replace("Set(Vec<(String, String, Expression)>),", "Set(Vec<SetItem>),")

# Rewrite set_item and add set_clause
set_item_new = """fn set_item_property(input: &str) -> IResult<&str, SetItem> {
    let (input, var) = ws(identifier)(input)?;
    let (input, _) = ws(char('.'))(input)?;
    let (input, prop) = ws(identifier)(input)?;
    let (input, _) = ws(char('='))(input)?;
    let (input, val) = ws(expression)(input)?;
    Ok((input, SetItem::Property(var.to_string(), prop.to_string(), val)))
}

fn set_item_label(input: &str) -> IResult<&str, SetItem> {
    let (input, var) = ws(identifier)(input)?;
    let (input, labels) = nom::multi::many1(|i| {
        let (i, _) = ws(char(':'))(i)?;
        let (i, label) = ws(identifier)(i)?;
        Ok((i, label))
    })(input)?;
    Ok((
        input,
        SetItem::Label(var.to_string(), labels.into_iter().map(|s| s.to_string()).collect()),
    ))
}

fn set_item(input: &str) -> IResult<&str, SetItem> {
    alt((set_item_property, set_item_label))(input)
}"""

content = re.sub(
    r"fn set_item\(input: &str\) -> IResult<&str, \(String, String, Expression\)> \{.*?\n\}",
    set_item_new,
    content,
    flags=re.DOTALL
)

with open("src/parser.rs", "w") as f:
    f.write(content)
