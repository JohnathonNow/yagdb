use openraft::storage::Adaptor;
use openraft::{BasicNode, Entry, EntryPayload, LogId, RaftSnapshotBuilder, RaftStateMachine, SnapshotMeta, StorageError, RaftTypeConfig};
use openraft_memstore::MemStore;
use openraft::{OptionalSend, OptionalSync};
use async_trait::async_trait;

use std::sync::Arc;
use tokio::sync::Mutex;
use serde::{Deserialize, Serialize};
use crate::graph::Graph;
use std::io::Cursor;

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct QueryRequest {
    pub query: String,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct QueryResponse {
    pub result: Result<String, String>,
}

openraft::declare_raft_types!(
    pub TypeConfig:
        D = QueryRequest,
        R = QueryResponse,
        NodeId = u64,
        Node = BasicNode,
        Entry = openraft::Entry<TypeConfig>,
        SnapshotData = Cursor<Vec<u8>>,
);

pub type LogStore = MemStore<TypeConfig>;
pub type StateMachineStore = StateMachineStoreImpl;

#[derive(Clone)]
pub struct StateMachineStoreImpl {
    pub mem_store: Arc<MemStore<TypeConfig>>,
    pub graph: Arc<Mutex<Graph>>,
}

impl StateMachineStoreImpl {
    pub fn new(mem_store: Arc<MemStore<TypeConfig>>, graph: Arc<Mutex<Graph>>) -> Self {
        Self { mem_store, graph }
    }
}

#[async_trait]
impl RaftStateMachine<TypeConfig> for StateMachineStoreImpl {
    type SnapshotBuilder = <Arc<MemStore<TypeConfig>> as RaftStateMachine<TypeConfig>>::SnapshotBuilder;

    async fn applied_state(
        &mut self,
    ) -> Result<(Option<LogId<<TypeConfig as RaftTypeConfig>::NodeId>>, openraft::StoredMembership<<TypeConfig as RaftTypeConfig>::NodeId, <TypeConfig as RaftTypeConfig>::Node>), StorageError<<TypeConfig as RaftTypeConfig>::NodeId>> {
        self.mem_store.clone().applied_state().await
    }

    async fn apply<I>(&mut self, entries: I) -> Result<Vec<QueryResponse>, StorageError<<TypeConfig as RaftTypeConfig>::NodeId>>
    where
        I: IntoIterator<Item = Entry<TypeConfig>> + Send,
        I::IntoIter: Send,
    {
        let entries: Vec<_> = entries.into_iter().collect();
        let mut responses = Vec::with_capacity(entries.len());

        let mut g = self.graph.lock().await;

        for entry in &entries {
            let res = match &entry.payload {
                EntryPayload::Normal(req) => {
                    let result = g.execute(&req.query);
                    QueryResponse { result }
                }
                _ => QueryResponse { result: Ok("".to_string()) },
            };
            responses.push(res);
        }

        drop(g);
        let _ = self.mem_store.clone().apply(entries).await?;

        Ok(responses)
    }

    async fn get_snapshot_builder(&mut self) -> Self::SnapshotBuilder {
        self.mem_store.clone().get_snapshot_builder().await
    }

    async fn begin_receiving_snapshot(&mut self) -> Result<Box<<TypeConfig as RaftTypeConfig>::SnapshotData>, StorageError<<TypeConfig as RaftTypeConfig>::NodeId>> {
        self.mem_store.clone().begin_receiving_snapshot().await
    }

    async fn install_snapshot(
        &mut self,
        meta: &SnapshotMeta<<TypeConfig as RaftTypeConfig>::NodeId, <TypeConfig as RaftTypeConfig>::Node>,
        snapshot: Box<<TypeConfig as RaftTypeConfig>::SnapshotData>,
    ) -> Result<(), StorageError<<TypeConfig as RaftTypeConfig>::NodeId>> {
        self.mem_store.clone().install_snapshot(meta, snapshot).await
    }

    async fn get_current_snapshot(
        &mut self,
    ) -> Result<Option<openraft::Snapshot<TypeConfig>>, StorageError<<TypeConfig as RaftTypeConfig>::NodeId>> {
        self.mem_store.clone().get_current_snapshot().await
    }
}
