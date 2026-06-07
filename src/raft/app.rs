use openraft::{BasicNode, Config, Raft};
use openraft_memstore::MemStore;
use std::sync::Arc;
use tokio::sync::Mutex;

use crate::graph::Graph;
use super::store::{LogStore, StateMachineStoreImpl, TypeConfig};
use super::network::Network;

pub type AppRaft = Raft<TypeConfig>;

pub struct App {
    pub id: u64,
    pub addr: String,
    pub raft: AppRaft,
    pub log_store: Arc<LogStore>,
    pub state_machine: StateMachineStoreImpl,
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

        let log_store = MemStore::new_async().await;
        let sm = StateMachineStoreImpl::new(log_store.clone(), graph.clone());

        let network = Network::new();

        let raft = Raft::new(id, config.clone(), network, log_store.clone(), sm.clone())
            .await
            .unwrap();

        Self {
            id,
            addr,
            raft,
            log_store,
            state_machine: sm,
            config,
            graph,
        }
    }
}
