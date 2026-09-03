#![allow(unused)]
use crate::parser::CompareOp;
use std::borrow::Cow;
use std::collections::HashMap;

#[derive(Clone, Debug, PartialEq)]
pub enum GraphElement {
    Node(usize),
    Edge(usize),
    EdgeArray(Vec<usize>),
    Path(Vec<GraphElement>),
    List(Vec<GraphElement>),
    Map(HashMap<String, GraphElement>),
    Number(f64),
    String(String),
    Boolean(bool),
    Date(chrono::NaiveDate),
    DateTime(chrono::DateTime<chrono::Utc>),
    Null,
}

impl Eq for GraphElement {}

impl std::hash::Hash for GraphElement {
    fn hash<H: std::hash::Hasher>(&self, state: &mut H) {
        match self {
            GraphElement::Node(id) => {
                state.write_u8(0);
                id.hash(state);
            }
            GraphElement::Edge(id) => {
                state.write_u8(1);
                id.hash(state);
            }
            GraphElement::EdgeArray(arr) => {
                state.write_u8(2);
                arr.hash(state);
            }
            GraphElement::Path(p) => {
                state.write_u8(3);
                p.hash(state);
            }
            GraphElement::List(l) => {
                state.write_u8(4);
                l.hash(state);
            }
            GraphElement::Map(m) => {
                state.write_u8(5);
                let mut pairs: Vec<_> = m.iter().collect();
                pairs.sort_by(|a, b| a.0.cmp(b.0));
                for (k, v) in pairs {
                    k.hash(state);
                    v.hash(state);
                }
            }
            GraphElement::Number(n) => {
                state.write_u8(6);
                n.to_bits().hash(state);
            }
            GraphElement::String(s) => {
                state.write_u8(7);
                s.hash(state);
            }
            GraphElement::Boolean(b) => {
                state.write_u8(8);
                b.hash(state);
            }
            GraphElement::Null => {
                state.write_u8(9);
            }
            GraphElement::Date(d) => {
                state.write_u8(10);
                d.hash(state);
            }
            GraphElement::DateTime(d) => {
                state.write_u8(11);
                d.hash(state);
            }
        }
    }
}

pub type Environment = HashMap<String, GraphElement>;

#[derive(Clone, Debug)]
pub enum EvalValue<'a> {
    String(Cow<'a, str>),
    Number(f64),
    Boolean(bool),
    Date(chrono::NaiveDate),
    DateTime(chrono::DateTime<chrono::Utc>),
    Null,
}

impl<'a> EvalValue<'a> {
    pub fn partial_cmp(&self, other: &EvalValue) -> Option<std::cmp::Ordering> {
        if let (EvalValue::Null, EvalValue::Null) = (self, other) {
            return Some(std::cmp::Ordering::Equal);
        }
        if let EvalValue::Null = self {
            return Some(std::cmp::Ordering::Less);
        }
        if let EvalValue::Null = other {
            return Some(std::cmp::Ordering::Greater);
        }

        match (self, other) {
            (EvalValue::Number(l), EvalValue::Number(r)) => l.partial_cmp(r),
            (EvalValue::String(l), EvalValue::String(r)) => l.partial_cmp(r),
            (EvalValue::Number(l), EvalValue::String(r)) => {
                if let Ok(r_num) = r.parse::<f64>() {
                    l.partial_cmp(&r_num)
                } else {
                    None
                }
            }
            (EvalValue::String(l), EvalValue::Number(r)) => {
                if let Ok(l_num) = l.parse::<f64>() {
                    l_num.partial_cmp(r)
                } else {
                    None
                }
            }
            (EvalValue::Date(l), EvalValue::Date(r)) => l.partial_cmp(r),
            (EvalValue::DateTime(l), EvalValue::DateTime(r)) => l.partial_cmp(r),
            _ => None,
        }
    }

    pub fn compare(&self, other: &EvalValue, op: &CompareOp) -> bool {
        if let (EvalValue::Null, _) | (_, EvalValue::Null) = (self, other) {
            return false;
        }
        match (self, other) {
            (EvalValue::Number(l), EvalValue::Number(r)) => Self::compare_f64(*l, *r, op),
            (EvalValue::String(l), EvalValue::String(r)) => Self::compare_str(l, r, op),
            (EvalValue::Number(l), EvalValue::String(r)) => {
                if let Ok(r_num) = r.parse::<f64>() {
                    Self::compare_f64(*l, r_num, op)
                } else {
                    false
                }
            }
            (EvalValue::String(l), EvalValue::Number(r)) => {
                if let Ok(l_num) = l.parse::<f64>() {
                    Self::compare_f64(l_num, *r, op)
                } else {
                    false
                }
            }
            (EvalValue::Boolean(l), EvalValue::Boolean(r)) => Self::compare_bool(*l, *r, op),
            (EvalValue::Date(l), EvalValue::Date(r)) => Self::compare_date(l, r, op),
            (EvalValue::DateTime(l), EvalValue::DateTime(r)) => Self::compare_datetime(l, r, op),
            _ => false,
        }
    }

    fn compare_date(l: &chrono::NaiveDate, r: &chrono::NaiveDate, op: &CompareOp) -> bool {
        match op {
            CompareOp::Eq => l == r,
            CompareOp::Neq => l != r,
            CompareOp::Gt => l > r,
            CompareOp::Gte => l >= r,
            CompareOp::Lt => l < r,
            CompareOp::Lte => l <= r,
            CompareOp::StartsWith | CompareOp::EndsWith | CompareOp::Contains | CompareOp::In => {
                false
            }
        }
    }

    fn compare_datetime(
        l: &chrono::DateTime<chrono::Utc>,
        r: &chrono::DateTime<chrono::Utc>,
        op: &CompareOp,
    ) -> bool {
        match op {
            CompareOp::Eq => l == r,
            CompareOp::Neq => l != r,
            CompareOp::Gt => l > r,
            CompareOp::Gte => l >= r,
            CompareOp::Lt => l < r,
            CompareOp::Lte => l <= r,
            CompareOp::StartsWith | CompareOp::EndsWith | CompareOp::Contains | CompareOp::In => {
                false
            }
        }
    }

    fn compare_bool(l: bool, r: bool, op: &CompareOp) -> bool {
        match op {
            CompareOp::Eq => l == r,
            CompareOp::Neq => l != r,
            CompareOp::Gt => l & !r,
            CompareOp::Gte => l >= r,
            CompareOp::Lt => !l & r,
            CompareOp::Lte => l <= r,
            CompareOp::StartsWith | CompareOp::EndsWith | CompareOp::Contains | CompareOp::In => {
                false
            }
        }
    }

    fn compare_f64(l: f64, r: f64, op: &CompareOp) -> bool {
        match op {
            CompareOp::Eq => l == r,
            CompareOp::Neq => l != r,
            CompareOp::Gt => l > r,
            CompareOp::Gte => l >= r,
            CompareOp::Lt => l < r,
            CompareOp::Lte => l <= r,
            CompareOp::StartsWith | CompareOp::EndsWith | CompareOp::Contains | CompareOp::In => {
                false
            }
        }
    }

    fn compare_str(l: &str, r: &str, op: &CompareOp) -> bool {
        match op {
            CompareOp::Eq => l == r,
            CompareOp::Neq => l != r,
            CompareOp::Gt => l > r,
            CompareOp::Gte => l >= r,
            CompareOp::Lt => l < r,
            CompareOp::Lte => l <= r,
            CompareOp::StartsWith => l.starts_with(r),
            CompareOp::EndsWith => l.ends_with(r),
            CompareOp::Contains => l.contains(r),
            CompareOp::In => false,
        }
    }
}
impl GraphElement {
    pub fn to_property_value(&self) -> Option<crate::property::PropertyValue> {
        match self {
            GraphElement::String(s) => Some(crate::property::PropertyValue::String(s.clone())),
            GraphElement::Number(n) => Some(crate::property::PropertyValue::Number(*n)),
            GraphElement::Boolean(b) => Some(crate::property::PropertyValue::Boolean(*b)),
            GraphElement::Date(d) => Some(crate::property::PropertyValue::Date(*d)),
            GraphElement::DateTime(dt) => Some(crate::property::PropertyValue::DateTime(*dt)),
            _ => None,
        }
    }
}
