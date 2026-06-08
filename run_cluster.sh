#!/bin/bash
# Terminal 1
cargo run --features cluster -- --id 1 --addr "127.0.0.1:3001" &
PID1=$!
sleep 2

# Terminal 2
cargo run --features cluster -- --id 2 --addr "127.0.0.1:3002" &
PID2=$!
sleep 2

# Terminal 3
cargo run --features cluster -- --id 3 --addr "127.0.0.1:3003" &
PID3=$!
sleep 2

# Initialize cluster
curl -X POST http://127.0.0.1:3001/raft/init
sleep 2

# Add learners
curl -X POST http://127.0.0.1:3001/raft/add-learner -H "Content-Type: application/json" -d '{"id": 2, "addr": "127.0.0.1:3002"}'
curl -X POST http://127.0.0.1:3001/raft/add-learner -H "Content-Type: application/json" -d '{"id": 3, "addr": "127.0.0.1:3003"}'
sleep 2

# Change membership to all nodes
curl -X POST http://127.0.0.1:3001/raft/change-membership -H "Content-Type: application/json" -d '[1, 2, 3]'
sleep 2

echo "Cluster is running!"
#kill $PID1 $PID2 $PID3
