use openraft::{Entry, EntryPayload, LogId, SnapshotMeta, StorageError, RaftTypeConfig, Vote, LogState};
use openraft::storage::{RaftLogReader, RaftStorage, Snapshot};
use openraft_memstore::{MemStore, TypeConfig as MemStoreTypeConfig, ClientRequest as MemStoreClientRequest, ClientResponse as MemStoreClientResponse};

use std::sync::Arc;
use tokio::sync::Mutex;
use crate::graph::Graph;
use std::fmt::Debug;

pub type TypeConfig = MemStoreTypeConfig;

pub type QueryRequest = MemStoreClientRequest;
pub type QueryResponse = MemStoreClientResponse;

#[derive(Clone)]
pub struct GraphStore {
    pub graph: Arc<Mutex<Graph>>,
    pub inner: Arc<MemStore>,
}

impl RaftLogReader<TypeConfig> for GraphStore {
    async fn try_get_log_entries<RB: std::ops::RangeBounds<u64> + Clone + Debug + openraft::OptionalSend>(
        &mut self,
        range: RB,
    ) -> Result<Vec<Entry<TypeConfig>>, StorageError<u64>> {
        self.inner.try_get_log_entries(range).await
    }
}

impl RaftStorage<TypeConfig> for GraphStore {
    type LogReader = <Arc<MemStore> as RaftStorage<TypeConfig>>::LogReader;
    type SnapshotBuilder = <Arc<MemStore> as RaftStorage<TypeConfig>>::SnapshotBuilder;

    async fn save_vote(&mut self, vote: &Vote<u64>) -> Result<(), StorageError<u64>> {
        self.inner.save_vote(vote).await
    }

    async fn read_vote(&mut self) -> Result<Option<Vote<u64>>, StorageError<u64>> {
        self.inner.read_vote().await
    }

    async fn get_log_state(&mut self) -> Result<LogState<TypeConfig>, StorageError<u64>> {
        self.inner.get_log_state().await
    }

    async fn get_log_reader(&mut self) -> Self::LogReader {
        self.inner.get_log_reader().await
    }

    async fn append_to_log<I>(&mut self, entries: I) -> Result<(), StorageError<u64>>
    where
        I: IntoIterator<Item = Entry<TypeConfig>> + openraft::OptionalSend,
    {
        self.inner.append_to_log(entries).await
    }

    async fn delete_conflict_logs_since(&mut self, log_id: LogId<u64>) -> Result<(), StorageError<u64>> {
        self.inner.delete_conflict_logs_since(log_id).await
    }

    async fn purge_logs_upto(&mut self, log_id: LogId<u64>) -> Result<(), StorageError<u64>> {
        self.inner.purge_logs_upto(log_id).await
    }

    async fn last_applied_state(
        &mut self,
    ) -> Result<(Option<LogId<u64>>, openraft::StoredMembership<u64, ()>), StorageError<u64>> {
        self.inner.last_applied_state().await
    }

    async fn apply_to_state_machine(&mut self, entries: &[Entry<TypeConfig>]) -> Result<Vec<QueryResponse>, StorageError<u64>> {
        let mut res = Vec::with_capacity(entries.len());
        let mut g = self.graph.lock().await;
        for entry in entries {
            if let EntryPayload::Normal(ref req) = entry.payload {
                let query_res = g.execute(&req.status);
                let json_res = serde_json::to_string(&query_res).unwrap();
                res.push(openraft_memstore::ClientResponse(Some(json_res)));
            } else {
                res.push(openraft_memstore::ClientResponse(None));
            }
        }
        let _ = self.inner.apply_to_state_machine(entries).await;
        Ok(res)
    }

    async fn get_snapshot_builder(&mut self) -> Self::SnapshotBuilder {
        self.inner.get_snapshot_builder().await
    }

    async fn begin_receiving_snapshot(&mut self) -> Result<Box<<TypeConfig as RaftTypeConfig>::SnapshotData>, StorageError<u64>> {
        self.inner.begin_receiving_snapshot().await
    }

    async fn install_snapshot(
        &mut self,
        meta: &SnapshotMeta<u64, ()>,
        snapshot: Box<<TypeConfig as RaftTypeConfig>::SnapshotData>,
    ) -> Result<(), StorageError<u64>> {
        self.inner.install_snapshot(meta, snapshot).await
    }

    async fn get_current_snapshot(&mut self) -> Result<Option<Snapshot<TypeConfig>>, StorageError<u64>> {
        self.inner.get_current_snapshot().await
    }
}
