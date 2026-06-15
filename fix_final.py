import re

with open("src/graph.rs", "r") as f:
    content = f.read()

# 1. Remove `else if false { ... }` from find_edges_and_nodes_env
content = re.sub(r'\} else if false \{.*?\}', '}', content, flags=re.DOTALL)

# 2. Fix Intersect
intersect_old = """PlanNode::Intersect { left, right } => {
                unimplemented!("Intersect lazy")
            }"""

intersect_new = """PlanNode::Intersect { left, right } => {
                let mut cont = true;
                self.execute_plan_lazy(left, env.clone(), None, &mut |graph, left_env| {
                    let mut found = false;
                    graph.execute_plan_lazy(right, env.clone(), None, &mut |_graph, right_env| {
                        let mut match_all = true;
                        for (k, v) in &left_env {
                            if let Some(rv) = right_env.get(k) {
                                if v != rv {
                                    match_all = false;
                                    break;
                                }
                            }
                        }
                        if match_all {
                            found = true;
                            return false;
                        }
                        true
                    });
                    if found {
                        if !yield_row(graph, left_env) {
                            cont = false;
                            return false;
                        }
                    }
                    true
                });
                cont
            }"""

content = content.replace(intersect_old, intersect_new)

with open("src/graph.rs", "w") as f:
    f.write(content)
