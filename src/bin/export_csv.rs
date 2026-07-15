use std::env;
use std::fs;
use std::io::Write;
use std::path::Path;
use yagdb::graph::Graph;

fn main() {
    let args: Vec<String> = env::args().collect();
    if args.len() != 4 {
        eprintln!("Usage: {} <snapshot_path> <wal_path> <output_dir>", args[0]);
        std::process::exit(1);
    }

    let snapshot_path = &args[1];
    let wal_path = &args[2];
    let output_dir = &args[3];

    if !Path::new(output_dir).exists() {
        if let Err(e) = fs::create_dir_all(output_dir) {
            eprintln!("Error creating output directory {}: {}", output_dir, e);
            std::process::exit(1);
        }
    }

    println!("Loading graph from {} and {}", snapshot_path, wal_path);
    let graph = Graph::load_or_create(snapshot_path, wal_path);

    println!("Exporting graph to CSV...");
    match graph.export_csv() {
        Ok((nodes_csv, edges_csv, labels_csv, indices_csv)) => {
            let write_file = |filename: &str, content: &str| {
                let filepath = Path::new(output_dir).join(filename);
                match fs::File::create(&filepath) {
                    Ok(mut file) => {
                        if let Err(e) = file.write_all(content.as_bytes()) {
                            eprintln!("Error writing to {}: {}", filepath.display(), e);
                            std::process::exit(1);
                        }
                        println!("Successfully exported to {}", filepath.display());
                    }
                    Err(e) => {
                        eprintln!("Error creating {}: {}", filepath.display(), e);
                        std::process::exit(1);
                    }
                }
            };

            write_file("nodes.csv", &nodes_csv);
            write_file("edges.csv", &edges_csv);
            write_file("labels.csv", &labels_csv);
            write_file("indices.csv", &indices_csv);
        }
        Err(e) => {
            eprintln!("Error exporting graph: {}", e);
            std::process::exit(1);
        }
    }
}
