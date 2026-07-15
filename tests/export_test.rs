use yagdb::graph::{Graph, IndexType};
use std::collections::HashMap;

#[test]
fn test_export_import_csv() {
    let mut g = Graph::new();
    let label_id = g.get_or_add_label("Test");
    let node1 = g.add_node(label_id, {
        let mut p = HashMap::new();
        p.insert("name".to_string(), yagdb::property::PropertyValue::String("Alice".to_string()));
        p
    });

    // Instead of deleting, just create a node and mark it deleted manually for test
    let node_del = g.add_node(label_id, HashMap::new());
    let mut n_del = g.nodes.get_item(node_del).unwrap();
    n_del.deleted = true;
    g.nodes.update_item(node_del, n_del);

    let node2 = g.add_node(label_id, HashMap::new());
    let edge_id = g.add_edge(node1, node2, vec![], HashMap::new());

    g.create_index(label_id, "name".to_string(), IndexType::Hash);

    let (nodes_csv, edges_csv, labels_csv, indices_csv) = g.export_csv().unwrap();

    let mut g2 = Graph::new();
    g2.import_csv(&nodes_csv, &edges_csv, &labels_csv, &indices_csv).unwrap();

    assert_eq!(g.nodes.len_items(), g2.nodes.len_items());
    assert_eq!(g.edges.len_items(), g2.edges.len_items());
    assert_eq!(g.labels.len(), g2.labels.len());

    // Check one node property
    let imported_node1 = g2.nodes.get_item(node1).unwrap();
    assert_eq!(imported_node1.properties.get("name").unwrap(), &yagdb::property::PropertyValue::String("Alice".to_string()));

    // Check indices rebuilt
    assert!(g2.indices.contains_key(&label_id));
    assert!(g2.indices.get(&label_id).unwrap().contains_key("name"));
}

#[test]
fn test_export_import_json() {
    let mut g = Graph::new();
    let label_id = g.get_or_add_label("TestJSON");
    let node1 = g.add_node(label_id, {
        let mut p = HashMap::new();
        p.insert("name".to_string(), yagdb::property::PropertyValue::String("Bob".to_string()));
        p
    });
    let node2 = g.add_node(label_id, HashMap::new());
    g.add_edge(node1, node2, vec![], HashMap::new());

    let json_str = g.export_json().unwrap();

    let mut g2 = Graph::new();
    g2.import_json(&json_str).unwrap();

    assert_eq!(g.nodes.len_items(), g2.nodes.len_items());
    assert_eq!(g.edges.len_items(), g2.edges.len_items());
    assert_eq!(g.labels.len(), g2.labels.len());

    // Check one node property
    let imported_node1 = g2.nodes.get_item(node1).unwrap();
    assert_eq!(imported_node1.properties.get("name").unwrap(), &yagdb::property::PropertyValue::String("Bob".to_string()));
}
