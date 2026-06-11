#!/bin/bash
sed -i 's/^mod tests {/#[cfg(test)]\n#[cfg(not(target_arch = "wasm32"))]\nmod tests {/' src/main.rs
