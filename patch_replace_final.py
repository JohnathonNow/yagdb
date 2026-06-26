import re

with open("src/graph.rs", "r") as f:
    content = f.read()

# Fix the value missing ampersand since it was passed as owned in the matched pattern previously
content = re.sub(
    r"if let Some\(entry_vec\) = map\.get_mut\(value\) \{",
    r"if let Some(entry_vec) = map.get_mut(&value) {",
    content
)

with open("src/graph.rs", "w") as f:
    f.write(content)
