use openraft::{BasicNode, Entry, EntryPayload, LogId, SnapshotMeta, StorageError, RaftTypeConfig};
use openraft::storage::RaftStateMachine;
use openraft_memstore::{MemStore, TypeConfig as MemStoreTypeConfig, ClientRequest as MemStoreClientRequest, ClientResponse as MemStoreClientResponse};
use openraft::storage::{Adaptor, RaftLogStorage};
use async_trait::async_trait;

use std::sync::Arc;
use tokio::sync::Mutex;
use serde::{Deserialize, Serialize};
use crate::graph::Graph;
use std::io::Cursor;

pub type TypeConfig = MemStoreTypeConfig;

pub type QueryRequest = MemStoreClientRequest;
pub type QueryResponse = MemStoreClientResponse;

pub type LogStore = Adaptor<TypeConfig, Arc<MemStore>>;
