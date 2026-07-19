use serde::{Deserialize, Serialize};
use std::hash::{Hash, Hasher};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum PropertyValue {
    Boolean(bool),
    Number(f64),
    String(String),
    Date(i64),
}

impl PropertyValue {
    pub fn to_json_value(&self) -> serde_json::Value {
        match self {
            PropertyValue::Boolean(b) => serde_json::Value::Bool(*b),
            PropertyValue::Number(n) => {
                serde_json::Value::Number(serde_json::Number::from_f64(*n).unwrap())
            }
            PropertyValue::String(s) => serde_json::Value::String(s.clone()),
            PropertyValue::Date(d) => {
                if let Some(dt) = chrono::DateTime::from_timestamp_millis(*d) {
                    serde_json::Value::String(dt.to_rfc3339())
                } else {
                    serde_json::Value::Null
                }
            }
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
            (PropertyValue::Date(a), PropertyValue::Date(b)) => a == b,
            _ => false,
        }
    }
}

impl Eq for PropertyValue {}

impl PartialOrd for PropertyValue {
    fn partial_cmp(&self, other: &Self) -> Option<std::cmp::Ordering> {
        match (self, other) {
            (PropertyValue::String(a), PropertyValue::String(b)) => a.partial_cmp(b),
            (PropertyValue::Number(a), PropertyValue::Number(b)) => {
                if a.is_nan() && b.is_nan() {
                    Some(std::cmp::Ordering::Equal)
                } else if a.is_nan() {
                    Some(std::cmp::Ordering::Less)
                } else if b.is_nan() {
                    Some(std::cmp::Ordering::Greater)
                } else {
                    a.partial_cmp(b)
                }
            }
            (PropertyValue::Boolean(a), PropertyValue::Boolean(b)) => a.partial_cmp(b),
            (PropertyValue::Date(a), PropertyValue::Date(b)) => a.partial_cmp(b),
            // Cross-type ordering: Boolean < Date < Number < String
            (PropertyValue::Boolean(_), _) => Some(std::cmp::Ordering::Less),
            (_, PropertyValue::Boolean(_)) => Some(std::cmp::Ordering::Greater),
            (PropertyValue::Date(_), PropertyValue::Number(_)) => Some(std::cmp::Ordering::Less),
            (PropertyValue::Number(_), PropertyValue::Date(_)) => Some(std::cmp::Ordering::Greater),
            (PropertyValue::Date(_), PropertyValue::String(_)) => Some(std::cmp::Ordering::Less),
            (PropertyValue::String(_), PropertyValue::Date(_)) => Some(std::cmp::Ordering::Greater),
            (PropertyValue::Number(_), PropertyValue::String(_)) => Some(std::cmp::Ordering::Less),
            (PropertyValue::String(_), PropertyValue::Number(_)) => Some(std::cmp::Ordering::Greater),
        }
    }
}

impl Ord for PropertyValue {
    fn cmp(&self, other: &Self) -> std::cmp::Ordering {
        self.partial_cmp(other).unwrap()
    }
}

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
            PropertyValue::Date(d) => {
                3_u8.hash(state);
                d.hash(state);
            }
        }
    }
}
