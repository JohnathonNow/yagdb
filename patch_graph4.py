import sys

with open("src/graph.rs", "r") as f:
    content = f.read()

ec_old = """    fn evaluate_condition(&self, condition: &Condition, env: &Environment) -> bool {
        match condition {
            Condition::And(left, right) => {
                self.evaluate_condition(left, env) && self.evaluate_condition(right, env)
            }
            Condition::Or(left, right) => {
                self.evaluate_condition(left, env) || self.evaluate_condition(right, env)
            }
            Condition::Not(inner) => !self.evaluate_condition(inner, env),
            Condition::Compare { left, op, right } => {
                let l_val = self.evaluate_expression(left, env);
                let r_val = self.evaluate_expression(right, env);
                l_val.compare(&r_val, op)
            }
        }
    }

    fn evaluate_expression(&self, expr: &Expression, env: &Environment) -> EvalValue {"""

ec_new = """    fn evaluate_condition(&self, condition: &Condition, in_res: &ResultSet, row_idx: usize) -> bool {
        match condition {
            Condition::And(left, right) => {
                self.evaluate_condition(left, in_res, row_idx) && self.evaluate_condition(right, in_res, row_idx)
            }
            Condition::Or(left, right) => {
                self.evaluate_condition(left, in_res, row_idx) || self.evaluate_condition(right, in_res, row_idx)
            }
            Condition::Not(inner) => !self.evaluate_condition(inner, in_res, row_idx),
            Condition::Compare { left, op, right } => {
                let l_val = self.evaluate_expression(left, in_res, row_idx);
                let r_val = self.evaluate_expression(right, in_res, row_idx);
                l_val.compare(&r_val, op)
            }
        }
    }

    fn evaluate_expression(&self, expr: &Expression, in_res: &ResultSet, row_idx: usize) -> EvalValue {"""

content = content.replace(ec_old, ec_new)


ee_var_old = """            Expression::Variable(var) => {
                if let Some(element) = env.get(var) {
                    match element {"""
ee_var_new = """            Expression::Variable(var) => {
                if let Some(element) = in_res.get(row_idx, var) {
                    match element {"""
content = content.replace(ee_var_old, ee_var_new)


ee_prop_old = """            Expression::Property(var, prop) => {
                if let Some(element) = env.get(var) {
                    let prop_val = match element {"""
ee_prop_new = """            Expression::Property(var, prop) => {
                if let Some(element) = in_res.get(row_idx, var) {
                    let prop_val = match element {"""
content = content.replace(ee_prop_old, ee_prop_new)

with open("src/graph.rs", "w") as f:
    f.write(content)
