use std::env;
use std::fs::{self, File};
use std::io::Write;
use yagdb::graph::Graph;

fn main() {
    let args: Vec<String> = env::args().collect();
    if args.len() != 4 {
        eprintln!("Usage: {} <input_json_path> <snapshot_path> <wal_path>", args[0]);
        std::process::exit(1);
    }

    let input_json_path = &args[1];
    let snapshot_path = &args[2];
    let wal_path = &args[3];

    println!("Reading JSON from {}", input_json_path);
    let json_str = match fs::read_to_string(input_json_path) {
        Ok(s) => s,
        Err(e) => {
            eprintln!("Error reading {}: {}", input_json_path, e);
            std::process::exit(1);
        }
    };

    println!("Importing JSON into graph...");
    let mut graph = Graph::new();
    if let Err(e) = graph.import_json(&json_str) {
        eprintln!("Error importing JSON: {}", e);
        std::process::exit(1);
    }

    println!("Saving graph to snapshot {}", snapshot_path);
    match bincode::serialize(&graph) {
        Ok(encoded) => {
            match File::create(snapshot_path) {
                Ok(mut file) => {
                    if let Err(e) = file.write_all(&encoded) {
                        eprintln!("Error writing snapshot to {}: {}", snapshot_path, e);
                        std::process::exit(1);
                    }
                }
                Err(e) => {
                    eprintln!("Error creating snapshot {}: {}", snapshot_path, e);
                    std::process::exit(1);
                }
            }
        }
        Err(e) => {
            eprintln!("Error serializing graph: {}", e);
            std::process::exit(1);
        }
    }

    println!("Truncating WAL {}", wal_path);
    if let Err(e) = File::create(wal_path) {
        eprintln!("Error truncating WAL {}: {}", wal_path, e);
        std::process::exit(1);
    }

    println!("Successfully imported JSON and updated database files.");
}
