import re

with open('src/graph.rs', 'r') as f:
    content = f.read()

# Also replace in match_var_length_edges
new_content = re.sub(
    r'let edge = self\.edges\.get_item\(edge_id\)\.unwrap\(\);\n\n            if edge\.start == current_node_id \{\n                if path_edges\.contains\(&edge_id\) \{\n                    continue;\n                \}\n\n                if !self\.edge_matches\(&edge, rel_pattern\) \{\n                    continue;\n                \}\n\n                let end_node_id = edge\.end;',
    r'''let edge_matches = self.edges.with_item(edge_id, |edge| {
                if edge.start != current_node_id {
                    return None;
                }
                if path_edges.contains(&edge_id) {
                    return None;
                }
                if !self.edge_matches(edge, rel_pattern) {
                    return None;
                }
                Some(edge.end)
            }).unwrap();

            if let Some(end_node_id) = edge_matches {''',
    content
)


with open('src/graph.rs', 'w') as f:
    f.write(new_content)
