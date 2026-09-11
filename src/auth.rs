#[cfg(not(target_arch = "wasm32"))]
use axum::{
    http::StatusCode,
    response::IntoResponse,
    Json,
};
#[cfg(not(target_arch = "wasm32"))]
use serde::{Deserialize, Serialize};
#[cfg(not(target_arch = "wasm32"))]
use jsonwebtoken::{encode, decode, Header, Validation, EncodingKey, DecodingKey};
#[cfg(not(target_arch = "wasm32"))]
use std::time::{SystemTime, UNIX_EPOCH};
#[cfg(not(target_arch = "wasm32"))]
use base64::Engine;
#[cfg(not(target_arch = "wasm32"))]
use ring::rand::{SystemRandom, SecureRandom};
#[cfg(not(target_arch = "wasm32"))]
use std::sync::OnceLock;

#[cfg(not(target_arch = "wasm32"))]
#[derive(Debug, Serialize, Deserialize)]
pub struct Claims {
    pub exp: usize,
    pub token_type: String,
}

#[cfg(not(target_arch = "wasm32"))]
#[derive(Debug, Serialize, Deserialize)]
pub struct TokenResponse {
    pub access_token: String,
    pub refresh_token: String,
    pub expires_in: usize,
}

#[cfg(not(target_arch = "wasm32"))]
static JWT_SECRET: OnceLock<String> = OnceLock::new();

#[cfg(not(target_arch = "wasm32"))]
fn get_jwt_secret() -> String {
    if let Ok(secret) = std::env::var("YAGDB_JWT_SECRET") {
        return secret;
    }

    JWT_SECRET.get_or_init(|| {
        let rng = SystemRandom::new();
        let mut key = [0u8; 32];
        rng.fill(&mut key).expect("Failed to generate secure random key");
        base64::engine::general_purpose::STANDARD.encode(&key)
    }).clone()
}

#[cfg(not(target_arch = "wasm32"))]
pub fn check_auth(headers: &axum::http::HeaderMap) -> Result<(), (StatusCode, String)> {
    if std::env::var("YAGDB_USER").is_err() && std::env::var("YAGDB_PASSWORD").is_err() {
        return Ok(());
    }

    let auth_header = match headers.get(axum::http::header::AUTHORIZATION) {
        Some(h) => h,
        None => return Err((StatusCode::UNAUTHORIZED, "Missing credentials".to_string())),
    };

    let auth_str = match auth_header.to_str() {
        Ok(s) => s,
        Err(_) => return Err((StatusCode::UNAUTHORIZED, "Invalid credentials format".to_string())),
    };

    if !auth_str.starts_with("Bearer ") {
        return Err((StatusCode::UNAUTHORIZED, "Invalid credentials format".to_string()));
    }

    let token = &auth_str[7..];

    let secret = get_jwt_secret();
    match decode::<Claims>(
        token,
        &DecodingKey::from_secret(secret.as_bytes()),
        &Validation::default(),
    ) {
        Ok(token_data) => {
            if token_data.claims.token_type == "access" {
                Ok(())
            } else {
                Err((StatusCode::UNAUTHORIZED, "Invalid token type".to_string()))
            }
        },
        Err(_) => Err((StatusCode::UNAUTHORIZED, "Invalid or expired token".to_string())),
    }
}

#[cfg(not(target_arch = "wasm32"))]
fn generate_token_pair() -> Result<TokenResponse, String> {
    let now = SystemTime::now().duration_since(UNIX_EPOCH).unwrap().as_secs() as usize;
    let access_expires_in = 3600; // 1 hour
    let access_expiration = now + access_expires_in;

    let refresh_expires_in = 3600 * 24 * 30; // 30 days
    let refresh_expiration = now + refresh_expires_in;

    let access_claims = Claims { exp: access_expiration, token_type: "access".to_string() };
    let refresh_claims = Claims { exp: refresh_expiration, token_type: "refresh".to_string() };
    let secret = get_jwt_secret();

    let access_token = encode(&Header::default(), &access_claims, &EncodingKey::from_secret(secret.as_bytes()))
        .map_err(|_| "Failed to create access token".to_string())?;

    let refresh_token = encode(&Header::default(), &refresh_claims, &EncodingKey::from_secret(secret.as_bytes()))
        .map_err(|_| "Failed to create refresh token".to_string())?;

    Ok(TokenResponse {
        access_token,
        refresh_token,
        expires_in: access_expires_in,
    })
}

#[cfg(not(target_arch = "wasm32"))]
pub async fn handle_auth(headers: axum::http::HeaderMap) -> impl IntoResponse {
    let required_user = std::env::var("YAGDB_USER").ok();
    let required_pass = std::env::var("YAGDB_PASSWORD").ok();

    if required_user.is_none() && required_pass.is_none() {
        return (StatusCode::BAD_REQUEST, "Authentication not configured".to_string()).into_response();
    }

    let auth_header = match headers.get(axum::http::header::AUTHORIZATION) {
        Some(h) => h,
        None => return (StatusCode::UNAUTHORIZED, "Missing credentials".to_string()).into_response(),
    };

    let auth_str = match auth_header.to_str() {
        Ok(s) => s,
        Err(_) => return (StatusCode::UNAUTHORIZED, "Invalid credentials format".to_string()).into_response(),
    };

    if !auth_str.starts_with("Basic ") {
        return (StatusCode::UNAUTHORIZED, "Invalid credentials format".to_string()).into_response();
    }

    let encoded_credentials = &auth_str[6..];
    let decoded_bytes = match base64::engine::general_purpose::STANDARD.decode(encoded_credentials) {
        Ok(b) => b,
        Err(_) => return (StatusCode::UNAUTHORIZED, "Invalid credentials format".to_string()).into_response(),
    };

    let decoded_str = match String::from_utf8(decoded_bytes) {
        Ok(s) => s,
        Err(_) => return (StatusCode::UNAUTHORIZED, "Invalid credentials format".to_string()).into_response(),
    };

    let (user_id, password) = match decoded_str.split_once(':') {
        Some((u, p)) => (u, Some(p)),
        None => (decoded_str.as_str(), None),
    };

    let user_match = match &required_user {
        Some(expected_user) => user_id == expected_user,
        None => true,
    };

    let pass_match = match &required_pass {
        Some(expected_pass) => password == Some(expected_pass.as_str()),
        None => true,
    };

    if user_match && pass_match {
        match generate_token_pair() {
            Ok(tokens) => (StatusCode::OK, Json(tokens)).into_response(),
            Err(e) => (StatusCode::INTERNAL_SERVER_ERROR, e).into_response(),
        }
    } else {
        (StatusCode::UNAUTHORIZED, "Invalid credentials".to_string()).into_response()
    }
}

#[cfg(not(target_arch = "wasm32"))]
pub async fn handle_refresh(headers: axum::http::HeaderMap) -> impl IntoResponse {
    if std::env::var("YAGDB_USER").is_err() && std::env::var("YAGDB_PASSWORD").is_err() {
        return (StatusCode::BAD_REQUEST, "Authentication not configured".to_string()).into_response();
    }

    let auth_header = match headers.get(axum::http::header::AUTHORIZATION) {
        Some(h) => h,
        None => return (StatusCode::UNAUTHORIZED, "Missing credentials".to_string()).into_response(),
    };

    let auth_str = match auth_header.to_str() {
        Ok(s) => s,
        Err(_) => return (StatusCode::UNAUTHORIZED, "Invalid credentials format".to_string()).into_response(),
    };

    if !auth_str.starts_with("Bearer ") {
        return (StatusCode::UNAUTHORIZED, "Invalid credentials format".to_string()).into_response();
    }

    let token = &auth_str[7..];
    let secret = get_jwt_secret();

    match decode::<Claims>(
        token,
        &DecodingKey::from_secret(secret.as_bytes()),
        &Validation::default(),
    ) {
        Ok(token_data) => {
            if token_data.claims.token_type == "refresh" {
                match generate_token_pair() {
                    Ok(tokens) => (StatusCode::OK, Json(tokens)).into_response(),
                    Err(e) => (StatusCode::INTERNAL_SERVER_ERROR, e).into_response(),
                }
            } else {
                (StatusCode::UNAUTHORIZED, "Invalid token type".to_string()).into_response()
            }
        },
        Err(_) => (StatusCode::UNAUTHORIZED, "Invalid or expired refresh token".to_string()).into_response(),
    }
}
