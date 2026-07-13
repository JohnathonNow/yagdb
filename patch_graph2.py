import re

with open("src/graph.rs", "r") as f:
    content = f.read()

# Fix WalEntry to use String instead of usize for property map keys
# Wait, WalEntry AddNode uses HashMap<String, ...>, so we need to map keys to interned IDs when applying WAL
# Actually, it's probably better to keep WalEntry as String, and map when inserting.

content = re.sub(
    r"let node = Node::new\(id\.clone\(\), vec!\[label\], vec!\[\], properties\.clone\(\)\);",
    r"""let mut props_interned = std::collections::HashMap::new();
                        for (k, v) in properties.iter() {
                            props_interned.insert(graph.string_pool.get_or_intern(k), v.clone());
                        }
                        let node = Node::new(id.clone(), vec![label], vec![], props_interned);""",
    content
)

content = re.sub(
    r"let edge = Edge::new\(id\.clone\(\), labels, start, end, properties\);",
    r"""let mut props_interned = std::collections::HashMap::new();
                        for (k, v) in properties.iter() {
                            props_interned.insert(graph.string_pool.get_or_intern(k), v.clone());
                        }
                        let edge = Edge::new(id.clone(), labels, start, end, props_interned);""",
    content
)

content = re.sub(
    r"let old_value = __node\.properties\.insert\(key\.clone\(\), value\.clone\(\)\);",
    r"""let interned_key = graph.string_pool.get_or_intern(&key);
                        let old_value = __node.properties.insert(interned_key, value.clone());""",
    content
)

content = re.sub(
    r"for \(k, v\) in &node\.properties {\n\s*props\.insert\(k\.clone\(\), v\.to_json_value\(\)\);\n\s*}",
    r"""for (k, v) in &node.properties {
                        props.insert(self.string_pool.resolve(*k), v.to_json_value());
                    }""",
    content
)

content = re.sub(
    r"for \(k, v\) in &edge\.properties {\n\s*props\.insert\(k\.clone\(\), v\.to_json_value\(\)\);\n\s*}",
    r"""for (k, v) in &edge.properties {
                        props.insert(self.string_pool.resolve(*k), v.to_json_value());
                    }""",
    content
)

content = re.sub(
    r"let node = Node::new\(id\.clone\(\), vec!\[label\], vec!\[\], properties\.clone\(\)\);\n\s*self\.nodes\.push_item\(node\);",
    r"""let mut props_interned = std::collections::HashMap::new();
        for (k, v) in properties.iter() {
            props_interned.insert(self.string_pool.get_or_intern(k), v.clone());
        }
        let node = Node::new(id.clone(), vec![label], vec![], props_interned);
        self.nodes.push_item(node);""",
    content
)

content = re.sub(
    r"if let Some\(value\) = node\.properties\.get\(&property\) {",
    r"""let interned_prop = self.string_pool.get_or_intern(&property);
                if let Some(value) = node.properties.get(&interned_prop) {""",
    content
)

content = re.sub(
    r"let edge = Edge::new\(id\.clone\(\), labels\.clone\(\), start, end, properties\.clone\(\)\);\n\s*self\.edges\.push_item\(edge\);",
    r"""let mut props_interned = std::collections::HashMap::new();
        for (k, v) in properties.iter() {
            props_interned.insert(self.string_pool.get_or_intern(k), v.clone());
        }
        let edge = Edge::new(id.clone(), labels.clone(), start, end, props_interned);
        self.edges.push_item(edge);""",
    content
)

content = re.sub(
    r"let old_value = __node\.properties\.insert\(key\.clone\(\), value\.clone\(\)\);",
    r"""let interned_key = self.string_pool.get_or_intern(&key);
                                let old_value = __node.properties.insert(interned_key, value.clone());""",
    content
)

content = re.sub(
    r"for \(k, v\) in &pattern\.properties {\n\s*if node\.properties\.get\(k\) != Some\(v\) {\n\s*return false;\n\s*}\n\s*}",
    r"""for (k, v) in &pattern.properties {
            let interned_k = self.string_pool.get_or_intern(k);
            if node.properties.get(&interned_k) != Some(v) {
                return false;
            }
        }""",
    content
)

content = re.sub(
    r"for \(k, v\) in &pattern\.properties {\n\s*if edge\.properties\.get\(k\) != Some\(v\) {\n\s*return false;\n\s*}\n\s*}",
    r"""for (k, v) in &pattern.properties {
            let interned_k = self.string_pool.get_or_intern(k);
            if edge.properties.get(&interned_k) != Some(v) {
                return false;
            }
        }""",
    content
)

content = re.sub(
    r"GraphElement::Node\(id\) => self\.nodes\.get_item\(\*id\)\.unwrap\(\)\.properties\.get\(prop\)\.cloned\(\),",
    r"""GraphElement::Node(id) => {
                    let interned_prop = self.string_pool.get_or_intern(prop);
                    self.nodes.get_item(*id).unwrap().properties.get(&interned_prop).cloned()
                }""",
    content
)

content = re.sub(
    r"GraphElement::Edge\(id\) => self\.edges\.get_item\(\*id\)\.unwrap\(\)\.properties\.get\(prop\)\.cloned\(\),",
    r"""GraphElement::Edge(id) => {
                    let interned_prop = self.string_pool.get_or_intern(prop);
                    self.edges.get_item(*id).unwrap().properties.get(&interned_prop).cloned()
                }""",
    content
)

with open("src/graph.rs", "w") as f:
    f.write(content)
