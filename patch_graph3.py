import re

with open("src/graph.rs", "r") as f:
    content = f.read()

# Fix node_matches to use get instead of get_or_intern
content = re.sub(
    r"let interned_k = self\.string_pool\.get_or_intern\(k\);\n\s*if node\.properties\.get\(&interned_k\) != Some\(v\) {\n\s*return false;\n\s*}",
    r"""if let Some(interned_k) = self.string_pool.get(k) {
                if node.properties.get(&interned_k) != Some(v) {
                    return false;
                }
            } else {
                return false;
            }""",
    content
)

# Fix edge_matches
content = re.sub(
    r"let interned_k = self\.string_pool\.get_or_intern\(k\);\n\s*if edge\.properties\.get\(&interned_k\) != Some\(v\) {\n\s*return false;\n\s*}",
    r"""if let Some(interned_k) = self.string_pool.get(k) {
                if edge.properties.get(&interned_k) != Some(v) {
                    return false;
                }
            } else {
                return false;
            }""",
    content
)

# Fix get_property_as_element Node
content = re.sub(
    r"let interned_prop = self\.string_pool\.get_or_intern\(prop\);\n\s*self\.nodes\.get_item\(\*id\)\.unwrap\(\)\.properties\.get\(&interned_prop\)\.cloned\(\)",
    r"""if let Some(interned_prop) = self.string_pool.get(prop) {
                        self.nodes.get_item(*id).unwrap().properties.get(&interned_prop).cloned()
                    } else {
                        None
                    }""",
    content
)

# Fix get_property_as_element Edge
content = re.sub(
    r"let interned_prop = self\.string_pool\.get_or_intern\(prop\);\n\s*self\.edges\.get_item\(\*id\)\.unwrap\(\)\.properties\.get\(&interned_prop\)\.cloned\(\)",
    r"""if let Some(interned_prop) = self.string_pool.get(prop) {
                        self.edges.get_item(*id).unwrap().properties.get(&interned_prop).cloned()
                    } else {
                        None
                    }""",
    content
)

# Fix evaluate_expression Node
content = re.sub(
    r"let interned_prop = self\.string_pool\.get_or_intern\(prop\);\n\s*self\.nodes\.get_item\(\*id\)\.unwrap\(\)\.properties\.get\(&interned_prop\)\.cloned\(\)",
    r"""if let Some(interned_prop) = self.string_pool.get(prop) {
                            self.nodes.get_item(*id).unwrap().properties.get(&interned_prop).cloned()
                        } else {
                            None
                        }""",
    content
)

# Fix evaluate_expression Edge
content = re.sub(
    r"let interned_prop = self\.string_pool\.get_or_intern\(prop\);\n\s*self\.edges\.get_item\(\*id\)\.unwrap\(\)\.properties\.get\(&interned_prop\)\.cloned\(\)",
    r"""if let Some(interned_prop) = self.string_pool.get(prop) {
                            self.edges.get_item(*id).unwrap().properties.get(&interned_prop).cloned()
                        } else {
                            None
                        }""",
    content
)


with open("src/graph.rs", "w") as f:
    f.write(content)
