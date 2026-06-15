use openraft::{Config, Raft};
use openraft_memstore::MemStore;
use std::sync::Arc;
use tokio::sync::Mutex;

use super::network::Network;
use super::store::TypeConfig;
use crate::graph::Graph;

pub type AppRaft = Raft<TypeConfig>;

pub struct App {
    pub id: u64,
    pub addr: String,
    pub scheme: String,
    pub raft: AppRaft,
    pub config: Arc<Config>,
    pub graph: Arc<Mutex<Graph>>,
}

impl App {
    pub async fn new(id: u64, addr: String, graph: Arc<Mutex<Graph>>) -> Self {
        let config = Config {
            heartbeat_interval: 500,
            election_timeout_min: 1500,
            election_timeout_max: 3000,
            ..Default::default()
        };
        let config = Arc::new(config.validate().unwrap());

        let memstore = MemStore::new_async().await;
        let graph_store = crate::raft::store::GraphStore {
            graph: graph.clone(),
            inner: memstore,
            current_snapshot: Arc::new(tokio::sync::RwLock::new(None)),
        };

        let (log_store, state_machine) = openraft::storage::Adaptor::new(graph_store);
        let scheme = if std::env::var("YAGDB_CERT").is_ok() { "https".to_string() } else { "http".to_string() };

        let network = Network::new(scheme.clone());

        let raft = Raft::new(id, config.clone(), network, log_store, state_machine)
            .await
            .unwrap();

        Self {
            id,
            addr,
            scheme,
            raft,
            config,
            graph,
        }
    }
}
