use openraft::error::{InstallSnapshotError, NetworkError, RPCError, RaftError, RemoteError};
use openraft::network::{RaftNetwork, RaftNetworkFactory, RPCOption};
use openraft::raft::{AppendEntriesRequest, AppendEntriesResponse, InstallSnapshotRequest, InstallSnapshotResponse, VoteRequest, VoteResponse};
use reqwest::Client;
use std::future::Future;

use super::store::TypeConfig;

pub struct Network {
    client: Client,
}

impl Network {
    pub fn new() -> Self {
        Self {
            client: Client::new(),
        }
    }
}

pub struct NetworkConnection {
    client: Client,
    target: (),
    target_id: u64,
}

impl RaftNetworkFactory<TypeConfig> for Network {
    type Network = NetworkConnection;

    #[allow(clippy::type_complexity)]
    fn new_client(&mut self, target_id: u64, node: &()) -> impl Future<Output = Self::Network> + Send {
        let client = self.client.clone();
        let target = node.clone();
        async move {
            NetworkConnection {
                client,
                target,
                target_id,
            }
        }
    }
}

impl RaftNetwork<TypeConfig> for NetworkConnection {
    fn append_entries(
        &mut self,
        req: AppendEntriesRequest<TypeConfig>,
        _option: RPCOption,
    ) -> impl Future<Output = Result<AppendEntriesResponse<u64>, RPCError<u64, (), RaftError<u64>>>> + Send {
        let client = self.client.clone();
        let target_id = self.target_id;
        async move {
            let url = format!("http://127.0.0.1:{}/raft/append", 3000 + target_id);
            let resp = client.post(&url).json(&req).send().await.map_err(|e| RPCError::Network(NetworkError::new(&e)))?;
            let res: Result<AppendEntriesResponse<u64>, RaftError<u64>> = resp.json().await.map_err(|e| RPCError::Network(NetworkError::new(&e)))?;
            res.map_err(|e| RPCError::RemoteError(RemoteError::new(target_id, e)))
        }
    }

    fn install_snapshot(
        &mut self,
        req: InstallSnapshotRequest<TypeConfig>,
        _option: RPCOption,
    ) -> impl Future<Output = Result<InstallSnapshotResponse<u64>, RPCError<u64, (), RaftError<u64, InstallSnapshotError>>>> + Send {
        let client = self.client.clone();
        let target_id = self.target_id;
        async move {
            let url = format!("http://127.0.0.1:{}/raft/snapshot", 3000 + target_id);
            let resp = client.post(&url).json(&req).send().await.map_err(|e| RPCError::Network(NetworkError::new(&e)))?;
            let res: Result<InstallSnapshotResponse<u64>, RaftError<u64, InstallSnapshotError>> = resp.json().await.map_err(|e| RPCError::Network(NetworkError::new(&e)))?;
            res.map_err(|e| RPCError::RemoteError(RemoteError::new(target_id, e)))
        }
    }

    fn vote(
        &mut self,
        req: VoteRequest<u64>,
        _option: RPCOption,
    ) -> impl Future<Output = Result<VoteResponse<u64>, RPCError<u64, (), RaftError<u64>>>> + Send {
        let client = self.client.clone();
        let target_id = self.target_id;
        async move {
            let url = format!("http://127.0.0.1:{}/raft/vote", 3000 + target_id);
            let resp = client.post(&url).json(&req).send().await.map_err(|e| RPCError::Network(NetworkError::new(&e)))?;
            let res: Result<VoteResponse<u64>, RaftError<u64>> = resp.json().await.map_err(|e| RPCError::Network(NetworkError::new(&e)))?;
            res.map_err(|e| RPCError::RemoteError(RemoteError::new(target_id, e)))
        }
    }
}
