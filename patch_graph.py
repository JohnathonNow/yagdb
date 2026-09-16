import re

with open("src/graph/mod.rs", "r") as f:
    content = f.read()

# Replace Set execution loop to support both properties and labels
new_set_loop = """                ExecutionStep::Set(items) => {
                    let mut updated_nodes = std::collections::HashSet::new();
                    let mut updated_edges = std::collections::HashSet::new();
                    let mut updated_labels = std::collections::HashSet::new();

                    for item in items {
                        match item {
                            crate::parser::SetItem::Property(var, key, value_expr) => {
                                for i in 0..result_set.rows {
                                    if let Some(GraphElement::Node(node_id)) =
                                        result_set.get(i, var.as_str())
                                    {
                                        let node_id = *node_id;
                                        let evaluated_value = self.evaluate_expression_to_element(
                                            &value_expr,
                                            &result_set,
                                            i,
                                        );
                                        if let Some(value) = evaluated_value.to_property_value() {
                                            if updated_nodes.insert((node_id, key.clone())) {
                                                // ⚡ Bolt: Use in-place mutation to set property without allocating memory for cloning the node.
                                                let (old_value, has_label) = self
                                                    .nodes
                                                    .with_mut_item(node_id, |__node| {
                                                        (
                                                            __node
                                                                .properties
                                                                .insert(key.clone(), value.clone()),
                                                            __node.labels.clone(),
                                                        )
                                                    })
                                                    .unwrap();

                                                // Update indices if necessary
                                                for (label_id, label_indices) in
                                                    self.indices.write().iter_mut()
                                                {
                                                    if has_label.contains(label_id) {
                                                        if let Some(prop_index) =
                                                            label_indices.get_mut(key.as_str())
                                                        {
                                                            match prop_index {
                                                                IndexMap::Hash(map) => {
                                                                    // Remove from old index
                                                                    if let Some(old_val) = &old_value {
                                                                        if let Some(vec) =
                                                                            map.get_mut(old_val)
                                                                        {
                                                                            vec.retain(|&id| id != node_id);
                                                                        }
                                                                    }
                                                                    // Add to new index
                                                                    if let Some(entry_vec) =
                                                                        map.get_mut(&value)
                                                                    {
                                                                        if !entry_vec.contains(&node_id) {
                                                                            entry_vec.push(node_id);
                                                                        }
                                                                    } else {
                                                                        map.insert(
                                                                            value.clone(),
                                                                            vec![node_id],
                                                                        );
                                                                    }
                                                                }
                                                                IndexMap::BTree(map) => {
                                                                    // Remove from old index
                                                                    if let Some(old_val) = &old_value {
                                                                        if let Some(vec) =
                                                                            map.get_mut(old_val)
                                                                        {
                                                                            vec.retain(|&id| id != node_id);
                                                                        }
                                                                    }
                                                                    // Add to new index
                                                                    if let Some(entry_vec) =
                                                                        map.get_mut(&value)
                                                                    {
                                                                        if !entry_vec.contains(&node_id) {
                                                                            entry_vec.push(node_id);
                                                                        }
                                                                    } else {
                                                                        map.insert(
                                                                            value.clone(),
                                                                            vec![node_id],
                                                                        );
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }

                                                self.log_wal(&WalEntry::SetNodeProperty {
                                                    node_id,
                                                    key: key.clone(),
                                                    value: value.clone(),
                                                });
                                            }
                                        }
                                    } else if let Some(GraphElement::Edge(edge_id)) =
                                        result_set.get(i, var.as_str())
                                    {
                                        let edge_id = *edge_id;
                                        let evaluated_value = self.evaluate_expression_to_element(
                                            &value_expr,
                                            &result_set,
                                            i,
                                        );
                                        if let Some(value) = evaluated_value.to_property_value() {
                                            if updated_edges.insert((edge_id, key.clone())) {
                                                self.edges
                                                    .with_mut_item(edge_id, |e| {
                                                        e.properties
                                                            .insert(key.clone(), value.clone());
                                                    })
                                                    .unwrap();

                                                self.log_wal(&WalEntry::SetEdgeProperty {
                                                    edge_id,
                                                    key: key.clone(),
                                                    value: value.clone(),
                                                });
                                            }
                                        }
                                    }
                                }
                            }
                            crate::parser::SetItem::Label(var, labels) => {
                                let label_ids: Vec<usize> = labels.iter().map(|l| self.get_or_add_label(l)).collect();
                                for i in 0..result_set.rows {
                                    if let Some(GraphElement::Node(node_id)) = result_set.get(i, var.as_str()) {
                                        let node_id = *node_id;
                                        for label_id in &label_ids {
                                            if updated_labels.insert((node_id, *label_id)) {
                                                let (added, properties) = self.nodes.with_mut_item(node_id, |n| {
                                                    let mut added = false;
                                                    if !n.labels.contains(label_id) {
                                                        n.labels.push(*label_id);
                                                        added = true;
                                                    }
                                                    (added, if added { Some(n.properties.clone()) } else { None })
                                                }).unwrap();

                                                if added {
                                                    if let Some(label_indices) = self.indices.write().get_mut(label_id) {
                                                        if let Some(props) = properties {
                                                            for (key, val) in props {
                                                                if let Some(prop_index) = label_indices.get_mut(key.as_str()) {
                                                                    match prop_index {
                                                                        IndexMap::Hash(map) => {
                                                                            if let Some(entry_vec) = map.get_mut(&val) {
                                                                                if !entry_vec.contains(&node_id) {
                                                                                    entry_vec.push(node_id);
                                                                                }
                                                                            } else {
                                                                                map.insert(val.clone(), vec![node_id]);
                                                                            }
                                                                        }
                                                                        IndexMap::BTree(map) => {
                                                                            if let Some(entry_vec) = map.get_mut(&val) {
                                                                                if !entry_vec.contains(&node_id) {
                                                                                    entry_vec.push(node_id);
                                                                                }
                                                                            } else {
                                                                                map.insert(val.clone(), vec![node_id]);
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                    self.log_wal(&WalEntry::AddNodeLabel {
                                                        node_id,
                                                        label_id: *label_id,
                                                    });
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }"""

old_set_loop = r"""                ExecutionStep::Set\(items\) => \{
                    let mut updated_nodes = std::collections::HashSet::new\(\);
                    let mut updated_edges = std::collections::HashSet::new\(\);
                    for \(var, key, value_expr\) in items \{
                        for i in 0\.\.result_set\.rows \{
                            if let Some\(GraphElement::Node\(node_id\)\) =
                                result_set\.get\(i, var\.as_str\(\)\)
                            \{
                                let node_id = \*node_id;
                                let evaluated_value = self\.evaluate_expression_to_element\(
                                    &value_expr,
                                    &result_set,
                                    i,
                                \);
                                if let Some\(value\) = evaluated_value\.to_property_value\(\) \{
                                    if updated_nodes\.insert\(\(node_id, key\.clone\(\)\)\) \{
                                        // ⚡ Bolt: Use in-place mutation to set property without allocating memory for cloning the node\.
                                        let \(old_value, has_label\) = self
                                            \.nodes
                                            \.with_mut_item\(node_id, \|__node\| \{
                                                \(
                                                    __node
                                                        \.properties
                                                        \.insert\(key\.clone\(\), value\.clone\(\)\),
                                                    __node\.labels\.clone\(\),
                                                \)
                                            \}\)
                                            \.unwrap\(\);

                                        // Update indices if necessary
                                        for \(label_id, label_indices\) in
                                            self\.indices\.write\(\)\.iter_mut\(\)
                                        \{
                                            if has_label\.contains\(label_id\) \{
                                                if let Some\(prop_index\) =
                                                    label_indices\.get_mut\(key\.as_str\(\)\)
                                                \{
                                                    match prop_index \{
                                                        IndexMap::Hash\(map\) => \{
                                                            // Remove from old index
                                                            if let Some\(old_val\) = &old_value \{
                                                                if let Some\(vec\) =
                                                                    map\.get_mut\(old_val\)
                                                                \{
                                                                    vec\.retain\(\|\&id\| id != node_id\);
                                                                \}
                                                            \}
                                                            // Add to new index
                                                            if let Some\(entry_vec\) =
                                                                map\.get_mut\(&value\)
                                                            \{
                                                                if !entry_vec\.contains\(&node_id\) \{
                                                                    entry_vec\.push\(node_id\);
                                                                \}
                                                            \} else \{
                                                                map\.insert\(
                                                                    value\.clone\(\),
                                                                    vec!\[node_id\],
                                                                \);
                                                            \}
                                                        \}
                                                        IndexMap::BTree\(map\) => \{
                                                            // Remove from old index
                                                            if let Some\(old_val\) = &old_value \{
                                                                if let Some\(vec\) =
                                                                    map\.get_mut\(old_val\)
                                                                \{
                                                                    vec\.retain\(\|\&id\| id != node_id\);
                                                                \}
                                                            \}
                                                            // Add to new index
                                                            if let Some\(entry_vec\) =
                                                                map\.get_mut\(&value\)
                                                            \{
                                                                if !entry_vec\.contains\(&node_id\) \{
                                                                    entry_vec\.push\(node_id\);
                                                                \}
                                                            \} else \{
                                                                map\.insert\(
                                                                    value\.clone\(\),
                                                                    vec!\[node_id\],
                                                                \);
                                                            \}
                                                        \}
                                                    \}
                                                \}
                                            \}
                                        \}

                                        self\.log_wal\(&WalEntry::SetNodeProperty \{
                                            node_id,
                                            key: key\.clone\(\),
                                            value: value\.clone\(\),
                                        \}\);
                                    \}
                                \}
                            \} else if let Some\(GraphElement::Edge\(edge_id\)\) =
                                result_set\.get\(i, var\.as_str\(\)\)
                            \{
                                let edge_id = \*edge_id;
                                let evaluated_value = self\.evaluate_expression_to_element\(
                                    &value_expr,
                                    &result_set,
                                    i,
                                \);
                                if let Some\(value\) = evaluated_value\.to_property_value\(\) \{
                                    if updated_edges\.insert\(\(edge_id, key\.clone\(\)\)\) \{
                                        self\.edges
                                            \.with_mut_item\(edge_id, \|e\| \{
                                                e\.properties\.insert\(key\.clone\(\), value\.clone\(\)\);
                                            \}\)
                                            \.unwrap\(\);

                                        self\.log_wal\(&WalEntry::SetEdgeProperty \{
                                            edge_id,
                                            key: key\.clone\(\),
                                            value: value\.clone\(\),
                                        \}\);
                                    \}
                                \}
                            \}
                        \}
                    \}
                \}"""

content = re.sub(old_set_loop, new_set_loop, content, flags=re.DOTALL)

with open("src/graph/mod.rs", "w") as f:
    f.write(content)
