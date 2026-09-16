import re

with open("src/graph/mod.rs", "r") as f:
    content = f.read()

# Add logic for AddNodeLabel in the recovery loop
wal_recovery_insertion = """                    WalEntry::RemoveNodeLabel { node_id, label_id } => {
                        let properties = graph
                            .nodes
                            .with_mut_item(node_id, |n| {
                                if let Some(pos) = n.labels.iter().position(|&l| l == label_id) {
                                    n.labels.remove(pos);
                                }
                                n.properties.clone()
                            })
                            .unwrap();

                        if let Some(label_indices) = graph.indices.write().get_mut(&label_id) {
                            for (key, val) in properties {
                                if let Some(prop_index) = label_indices.get_mut(key.as_str()) {
                                    match prop_index {
                                        IndexMap::Hash(map) => {
                                            if let Some(vec) = map.get_mut(&val) {
                                                vec.retain(|&id| id != node_id);
                                            }
                                        }
                                        IndexMap::BTree(map) => {
                                            if let Some(vec) = map.get_mut(&val) {
                                                vec.retain(|&id| id != node_id);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    WalEntry::AddNodeLabel { node_id, label_id } => {
                        let properties = graph.nodes.with_mut_item(node_id, |n| {
                            if !n.labels.contains(&label_id) {
                                n.labels.push(label_id);
                            }
                            n.properties.clone()
                        }).unwrap();

                        if let Some(label_indices) = graph.indices.write().get_mut(&label_id) {
                            for (key, val) in properties {
                                if let Some(prop_index) = label_indices.get_mut(key.as_str()) {
                                    match prop_index {
                                        IndexMap::Hash(map) => {
                                            if let Some(vec) = map.get_mut(&val) {
                                                if !vec.contains(&node_id) {
                                                    vec.push(node_id);
                                                }
                                            } else {
                                                map.insert(val.clone(), vec![node_id]);
                                            }
                                        }
                                        IndexMap::BTree(map) => {
                                            if let Some(vec) = map.get_mut(&val) {
                                                if !vec.contains(&node_id) {
                                                    vec.push(node_id);
                                                }
                                            } else {
                                                map.insert(val.clone(), vec![node_id]);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }"""

old_str = """                    WalEntry::RemoveNodeLabel { node_id, label_id } => {
                        let properties = graph
                            .nodes
                            .with_mut_item(node_id, |n| {
                                if let Some(pos) = n.labels.iter().position(|&l| l == label_id) {
                                    n.labels.remove(pos);
                                }
                                n.properties.clone()
                            })
                            .unwrap();

                        if let Some(label_indices) = graph.indices.write().get_mut(&label_id) {
                            for (key, val) in properties {
                                if let Some(prop_index) = label_indices.get_mut(key.as_str()) {
                                    match prop_index {
                                        IndexMap::Hash(map) => {
                                            if let Some(vec) = map.get_mut(&val) {
                                                vec.retain(|&id| id != node_id);
                                            }
                                        }
                                        IndexMap::BTree(map) => {
                                            if let Some(vec) = map.get_mut(&val) {
                                                vec.retain(|&id| id != node_id);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }"""

content = content.replace(old_str, wal_recovery_insertion)

with open("src/graph/mod.rs", "w") as f:
    f.write(content)
