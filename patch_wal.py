import re

with open("src/graph/types.rs", "r") as f:
    content = f.read()

# Add AddNodeLabel variant to WalEntry
wal_insertion = """    RemoveNodeLabel {
        node_id: usize,
        label_id: usize,
    },
    AddNodeLabel {
        node_id: usize,
        label_id: usize,
    },"""

content = content.replace("    RemoveNodeLabel {\n        node_id: usize,\n        label_id: usize,\n    },", wal_insertion)

with open("src/graph/types.rs", "w") as f:
    f.write(content)
