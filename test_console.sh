#!/bin/bash
cargo build
cargo run &
PID=$!
sleep 5
curl -s http://127.0.0.1:3000/console
kill $PID
