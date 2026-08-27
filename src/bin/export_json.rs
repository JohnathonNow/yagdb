use std::env;
use std::fs::File;
use std::io::Write;
use yagdb::graph::Graph;

fn main() {
    let args: Vec<String> = env::args().collect();
    if args.len() != 4 {
        eprintln!("Usage: {} <snapshot_path> <wal_path> <output_json_path>", args[0]);
        std::process::exit(1);
    }

    let snapshot_path = &args[1];
    let wal_path = &args[2];
    let output_json_path = &args[3];

    println!("Loading graph from {} and {}", snapshot_path, wal_path);
    let graph = Graph::load_or_create(snapshot_path, wal_path);

    println!("Exporting graph to JSON...");
    match graph.export_json() {
        Ok(json_str) => {
            match File::create(output_json_path) {
                Ok(mut file) => {
                    if let Err(e) = file.write_all(json_str.as_bytes()) {
                        eprintln!("Error writing to {}: {}", output_json_path, e);
                        std::process::exit(1);
                    }
                    println!("Successfully exported to {}", output_json_path);
                }
                Err(e) => {
                    eprintln!("Error creating {}: {}", output_json_path, e);
                    std::process::exit(1);
                }
            }
        }
        Err(e) => {
            eprintln!("Error exporting graph: {}", e);
            std::process::exit(1);
        }
    }
}
