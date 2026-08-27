use serde::{Deserialize, Serialize};
use std::hash::{Hash, Hasher};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum PropertyValue {
    Boolean(bool),
    Number(f64),
    String(String),
    Date(chrono::NaiveDate),
    DateTime(chrono::DateTime<chrono::Utc>),
}

impl PropertyValue {
    fn type_index(&self) -> u8 {
        match self {
            PropertyValue::Boolean(_) => 0,
            PropertyValue::Number(_) => 1,
            PropertyValue::String(_) => 2,
            PropertyValue::Date(_) => 3,
            PropertyValue::DateTime(_) => 4,
        }
    }

    pub fn to_json_value(&self) -> serde_json::Value {
        match self {
            PropertyValue::Boolean(b) => serde_json::Value::Bool(*b),
            PropertyValue::Number(n) => {
                serde_json::Value::Number(serde_json::Number::from_f64(*n).unwrap())
            }
            PropertyValue::String(s) => serde_json::Value::String(s.clone()),
            PropertyValue::Date(d) => serde_json::Value::String(d.to_string()),
            PropertyValue::DateTime(dt) => serde_json::Value::String(dt.to_rfc3339()),
        }
    }
}

impl PartialEq for PropertyValue {
    fn eq(&self, other: &Self) -> bool {
        if self.type_index() != other.type_index() {
            return false;
        }
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
            (PropertyValue::DateTime(a), PropertyValue::DateTime(b)) => a == b,
            _ => false,
        }
    }
}

impl Eq for PropertyValue {}

impl PartialOrd for PropertyValue {
    fn partial_cmp(&self, other: &Self) -> Option<std::cmp::Ordering> {
        let t1 = self.type_index();
        let t2 = other.type_index();
        if t1 != t2 {
            return t1.partial_cmp(&t2);
        }
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
            (PropertyValue::DateTime(a), PropertyValue::DateTime(b)) => a.partial_cmp(b),
            _ => None,
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
        self.type_index().hash(state);
        match self {
            PropertyValue::String(s) => s.hash(state),
            PropertyValue::Number(n) => {
                let normalized = if *n == 0.0 { 0.0 } else { *n };
                normalized.to_bits().hash(state);
            }
            PropertyValue::Boolean(b) => b.hash(state),
            PropertyValue::Date(d) => d.hash(state),
            PropertyValue::DateTime(dt) => dt.hash(state),
        }
    }
}
