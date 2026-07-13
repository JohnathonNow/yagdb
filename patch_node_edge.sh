sed -i 's/HashMap<String, crate::property::PropertyValue>/HashMap<usize, crate::property::PropertyValue>/g' src/node.rs
sed -i 's/HashMap<String, crate::property::PropertyValue>/HashMap<usize, crate::property::PropertyValue>/g' src/edge.rs
