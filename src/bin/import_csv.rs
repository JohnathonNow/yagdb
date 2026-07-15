use std::env;
use std::fs;
use std::path::Path;
use yagdb::graph::Graph;

fn main() {
    let args: Vec<String> = env::args().collect();
    if args.len() != 4 {
        eprintln!("Usage: {} <input_dir> <snapshot_path> <wal_path>", args[0]);
        std::process::exit(1);
    }

    let input_dir = &args[1];
    let snapshot_path = &args[2];
    let wal_path = &args[3];

    let read_file = |filename: &str| -> String {
        let filepath = Path::new(input_dir).join(filename);
        match fs::read_to_string(&filepath) {
            Ok(content) => content,
            Err(e) => {
                eprintln!("Error reading {}: {}", filepath.display(), e);
                std::process::exit(1);
            }
        }
    };

    println!("Reading CSV files from {}", input_dir);
    let nodes_csv = read_file("nodes.csv");
    let edges_csv = read_file("edges.csv");
    let labels_csv = read_file("labels.csv");
    let indices_csv = read_file("indices.csv");

    println!("Importing CSV into graph...");
    let mut graph = Graph::new();
    if let Err(e) = graph.import_csv(&nodes_csv, &edges_csv, &labels_csv, &indices_csv) {
        eprintln!("Error importing CSV: {}", e);
        std::process::exit(1);
    }

    println!("Saving graph to snapshot {}", snapshot_path);
    match bincode::serialize(&graph) {
        Ok(encoded) => {
            match fs::File::create(snapshot_path) {
                Ok(mut file) => {
                    use std::io::Write;
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
    if let Err(e) = fs::File::create(wal_path) {
        eprintln!("Error truncating WAL {}: {}", wal_path, e);
        std::process::exit(1);
    }

    println!("Successfully imported CSV and updated database files.");
}
