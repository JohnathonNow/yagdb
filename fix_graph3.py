import sys

with open("src/graph.rs", "r") as f:
    content = f.read()

# Add a closing brace for impl ResultSet
bad = """            if col.len() < self.rows {
                col.push(GraphElement::Null);
            }
        }
    }

#[cfg(not(target_arch = "wasm32"))]"""
good = """            if col.len() < self.rows {
                col.push(GraphElement::Null);
            }
        }
    }
}

#[cfg(not(target_arch = "wasm32"))]"""
content = content.replace(bad, good)

with open("src/graph.rs", "w") as f:
    f.write(content)
