import sys

with open("src/graph.rs", "r") as f:
    content = f.read()

ecp_old = """    fn execute_create_path(&mut self, path: Path, env: &mut Environment) {
        let mut path_elements = Vec::new();
        let start_id = self.create_node(&path.start, env);
        path_elements.push(GraphElement::Node(start_id));
        let mut current_id = start_id;

        let bound_var = path.bound_variable.clone();
        for (rel, target_node) in path.edges {
            let next_id = self.create_node(&target_node, env);
            let rel_id = self.create_rel(&rel, current_id, next_id);
            path_elements.push(GraphElement::Edge(rel_id));
            path_elements.push(GraphElement::Node(next_id));
            if let Some(var) = &rel.variable {
                env.insert(var.clone(), GraphElement::Edge(rel_id));
            }
            current_id = next_id;
        }

        if let Some(bv) = bound_var {
            env.insert(bv, GraphElement::Path(path_elements));
        }
    }

    fn create_node(&mut self, pattern: &NodePattern, env: &mut Environment) -> usize {
        if let Some(var) = &pattern.variable {
            if let Some(GraphElement::Node(id)) = env.get(var) {
                return *id;
            }
        }"""
ecp_new = """    fn execute_create_path(&mut self, path: Path, in_res: &ResultSet, row_idx: usize, bindings: &mut Vec<(String, GraphElement)>) {
        let mut path_elements = Vec::new();
        let start_id = self.create_node(&path.start, in_res, row_idx, bindings);
        path_elements.push(GraphElement::Node(start_id));
        let mut current_id = start_id;

        let bound_var = path.bound_variable.clone();
        for (rel, target_node) in path.edges {
            let next_id = self.create_node(&target_node, in_res, row_idx, bindings);
            let rel_id = self.create_rel(&rel, current_id, next_id);
            path_elements.push(GraphElement::Edge(rel_id));
            path_elements.push(GraphElement::Node(next_id));
            if let Some(var) = &rel.variable {
                bindings.push((var.clone(), GraphElement::Edge(rel_id)));
            }
            current_id = next_id;
        }

        if let Some(bv) = bound_var {
            bindings.push((bv, GraphElement::Path(path_elements)));
        }
    }

    fn create_node(&mut self, pattern: &NodePattern, in_res: &ResultSet, row_idx: usize, bindings: &mut Vec<(String, GraphElement)>) -> usize {
        if let Some(var) = &pattern.variable {
            if let Some(GraphElement::Node(id)) = in_res.get(row_idx, var) {
                return *id;
            }
            for (k, v) in bindings.iter() {
                if k == var {
                    if let GraphElement::Node(id) = v {
                        return *id;
                    }
                }
            }
        }"""
content = content.replace(ecp_old, ecp_new)

cn_old = """        if let Some(var) = &pattern.variable {
            env.insert(var.clone(), GraphElement::Node(node_id));
        }"""
cn_new = """        if let Some(var) = &pattern.variable {
            bindings.push((var.clone(), GraphElement::Node(node_id)));
        }"""
content = content.replace(cn_old, cn_new)

with open("src/graph.rs", "w") as f:
    f.write(content)
