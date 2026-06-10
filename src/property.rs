use serde::{Deserialize, Serialize};
use std::hash::{Hash, Hasher};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum PropertyValue {
    Boolean(bool),
    Number(f64),
    String(String),
}

impl PropertyValue {
    pub fn to_json_value(&self) -> serde_json::Value {
        match self {
            PropertyValue::Boolean(b) => serde_json::Value::Bool(*b),
            PropertyValue::Number(n) => {
                serde_json::Value::Number(serde_json::Number::from_f64(*n).unwrap())
            }
            PropertyValue::String(s) => serde_json::Value::String(s.clone()),
        }
    }
}

impl PartialEq for PropertyValue {
    fn eq(&self, other: &Self) -> bool {
        match (self, other) {
            (PropertyValue::String(a), PropertyValue::String(b)) => a == b,
            (PropertyValue::Number(a), PropertyValue::Number(b)) => {
                if a.is_nan() && b.is_nan() {
                    true
                } else {
                    a == b
                }
            }
            (PropertyValue::Boolean(a), PropertyValue::Boolean(b)) => a == b,
            _ => false,
        }
    }
}

impl Eq for PropertyValue {}

impl Hash for PropertyValue {
    fn hash<H: Hasher>(&self, state: &mut H) {
        match self {
            PropertyValue::String(s) => {
                0_u8.hash(state);
                s.hash(state);
            }
            PropertyValue::Number(n) => {
                1_u8.hash(state);
                let normalized = if *n == 0.0 { 0.0 } else { *n };
                normalized.to_bits().hash(state);
            }
            PropertyValue::Boolean(b) => {
                2_u8.hash(state);
                b.hash(state);
            }
        }
    }
}
