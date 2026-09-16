import re

with open("src/planner.rs", "r") as f:
    content = f.read()

# Replace Set in ExecutionStep
content = content.replace("Set(Vec<(String, String, Expression)>),", "Set(Vec<crate::parser::SetItem>),")

with open("src/planner.rs", "w") as f:
    f.write(content)
