import re

with open('src/graph/mod.rs', 'r') as f:
    code = f.read()

# 1. execution wrapper
new_execute = """    #[cfg_attr(not(target_arch = "wasm32"), tracing::instrument(skip(self)))]
    pub fn execute(&self, query_str: &str) -> Result<String, String> {
        self.execute_stream(query_str, #[cfg(not(target_arch = "wasm32"))] None)
    }

    #[cfg_attr(not(target_arch = "wasm32"), tracing::instrument(skip(self)))]
    pub fn execute_stream(
        &self,
        query_str: &str,
        #[cfg(not(target_arch = "wasm32"))] sender: Option<tokio::sync::mpsc::Sender<serde_json::Value>>,
    ) -> Result<String, String> {"""

code = code.replace(
    '    #[cfg_attr(not(target_arch = "wasm32"), tracing::instrument(skip(self)))]\n    pub fn execute(&self, query_str: &str) -> Result<String, String> {',
    new_execute
)

# 2. Add sender param to execute_query_plan
code = code.replace(
    'fn execute_query_plan(\n        &self,\n        plan: &QueryPlan,\n        result_set: &mut ResultSet,\n        mut profile_out: &mut Option<String>,\n        txid: u64,\n        output: &mut String,\n        cursor_mode: bool,\n    ) -> Result<Option<(ResultSet, Vec<String>, Vec<crate::parser::ProjectionItem>)>, String> {',
    'fn execute_query_plan(\n        &self,\n        plan: &QueryPlan,\n        result_set: &mut ResultSet,\n        mut profile_out: &mut Option<String>,\n        txid: u64,\n        output: &mut String,\n        cursor_mode: bool,\n        #[cfg(not(target_arch = "wasm32"))] sender: Option<tokio::sync::mpsc::Sender<serde_json::Value>>,\n    ) -> Result<Option<(ResultSet, Vec<String>, Vec<crate::parser::ProjectionItem>)>, String> {'
)

# 3. Propagate to initial self.execute_query_plan inside execute
code = code.replace(
    '        self.execute_query_plan(\n            &plan,\n            &mut result_set,\n            &mut profile_out,\n            txid as u64,\n            &mut output,\n            false,\n        )?;\n\n        #[cfg(not(target_arch = "wasm32"))]',
    '        self.execute_query_plan(\n            &plan,\n            &mut result_set,\n            &mut profile_out,\n            txid as u64,\n            &mut output,\n            false,\n            #[cfg(not(target_arch = "wasm32"))] sender,\n        )?;\n\n        #[cfg(not(target_arch = "wasm32"))]'
)

# 4. Handle internal nested plan executions
code = code.replace(
    'let res = self.execute_query_plan(\n            &plan,\n            &mut result_set,\n            &mut profile_out,\n            txid as u64,\n            &mut output,\n            true,\n        )?;',
    'let res = self.execute_query_plan(\n            &plan,\n            &mut result_set,\n            &mut profile_out,\n            txid as u64,\n            &mut output,\n            true,\n            #[cfg(not(target_arch = "wasm32"))] None,\n        )?;'
)

code = code.replace(
    '                        self.execute_query_plan(\n                            subplan,\n                            &mut sub_result_set,\n                            profile_out,\n                            txid as u64,\n                            output,\n                            false,\n                        )?;\n                        // ⚡ Bolt: Fast-path merging subplan results into new_result_set without inner loops',
    '                        self.execute_query_plan(\n                            subplan,\n                            &mut sub_result_set,\n                            profile_out,\n                            txid as u64,\n                            output,\n                            false,\n                            #[cfg(not(target_arch = "wasm32"))] sender.clone(),\n                        )?;\n                        // ⚡ Bolt: Fast-path merging subplan results into new_result_set without inner loops'
)

code = code.replace(
    '                let _ = self.execute_query_plan(\n                    query_plan,\n                    &mut sub_res,\n                    &mut dummy_profile,\n                    txid,\n                    &mut String::new(),\n                    false,\n                );\n                !sub_res.is_empty()',
    '                let _ = self.execute_query_plan(\n                    query_plan,\n                    &mut sub_res,\n                    &mut dummy_profile,\n                    txid,\n                    &mut String::new(),\n                    false,\n                    #[cfg(not(target_arch = "wasm32"))] None,\n                );\n                !sub_res.is_empty()'
)

with open('src/graph/mod.rs', 'w') as f:
    f.write(code)
