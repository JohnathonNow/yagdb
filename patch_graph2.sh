#!/bin/bash
cat src/graph.rs | awk '
BEGIN { skip = 0 }
/^    #\[cfg\(not\(target_arch = "wasm32"\)\)\]/ {
    if (skip == 0) {
        buf = $0 "\n"
        getline
        if ($0 ~ /^    pub fn backup\(&self, backup_path: &str\) -> Result<\(\), String> \{/) {
            skip = 1
        } else {
            print buf $0
            next
        }
    }
}
skip == 1 {
    if ($0 ~ /^    \}/) {
        skip = 0
        print "    #[cfg(not(target_arch = \"wasm32\"))]"
        print "    pub fn backup(&self) -> Result<Vec<u8>, String> {"
        print "        let encoded = bincode::serialize(self).map_err(|e| format!(\"Serialization error: {}\", e))?;"
        print "        Ok(encoded)"
        print "    }"
    }
    next
}
{ print $0 }
' > src/graph_new.rs
mv src/graph_new.rs src/graph.rs
