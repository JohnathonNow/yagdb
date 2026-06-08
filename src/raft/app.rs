use openraft::{Config, Raft};
use openraft_memstore::MemStore;
use std::sync::Arc;
use tokio::sync::Mutex;

use crate::graph::Graph;
use super::store::TypeConfig;
use super::network::Network;

pub type AppRaft = Raft<TypeConfig>;

pub struct App {
    pub id: u64,
    pub addr: String,
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
        let (log_store, state_machine) = openraft::storage::Adaptor::new(memstore);

        let network = Network::new();

        let raft = Raft::new(id, config.clone(), network, log_store, state_machine)
            .await
            .unwrap();

        Self {
            id,
            addr,
            raft,
            config,
            graph,
        }
    }
}
