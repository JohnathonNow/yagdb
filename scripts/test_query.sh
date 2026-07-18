#!/bin/bash
cargo build
cargo run &
PID=$!
sleep 5
curl -X POST -H "Content-Type: text/plain" -d "CREATE (a:User {name: 'Alice'})-[r:KNOWS]->(b:User {name: 'Bob'})" http://127.0.0.1:3000/query
echo
curl -X POST -H "Content-Type: text/plain" -d "MATCH (a:User)-[r:KNOWS]->(b:User) RETURN a, b, r" http://127.0.0.1:3000/query
echo
kill $PID
