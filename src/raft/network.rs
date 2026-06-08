use openraft::error::{InstallSnapshotError, NetworkError, RPCError, RaftError, RemoteError};
use openraft::network::{RaftNetwork, RaftNetworkFactory};
use openraft::raft::{AppendEntriesRequest, AppendEntriesResponse, InstallSnapshotRequest, InstallSnapshotResponse, VoteRequest, VoteResponse};
use openraft::BasicNode;
use reqwest::Client;
use async_trait::async_trait;

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
    target: BasicNode,
}

#[async_trait]
impl RaftNetworkFactory<TypeConfig> for Network {
    type Network = NetworkConnection;

    async fn new_client(&mut self, _target: u64, node: &BasicNode) -> Self::Network {
        NetworkConnection {
            client: self.client.clone(),
            target: node.clone(),
        }
    }
}

#[async_trait]
impl RaftNetwork<TypeConfig> for NetworkConnection {
    async fn append_entries(
        &mut self,
        req: AppendEntriesRequest<TypeConfig>,
        _option: openraft::network::RPCOption,
    ) -> Result<AppendEntriesResponse<u64>, RPCError<u64, BasicNode, RaftError<u64>>> {
        let url = format!("http://{}/raft/append", self.target.addr);
        let resp = self.client.post(&url).json(&req).send().await.map_err(|e| RPCError::Network(NetworkError::new(&e)))?;
        let res: Result<AppendEntriesResponse<u64>, RaftError<u64>> = resp.json().await.map_err(|e| RPCError::Network(NetworkError::new(&e)))?;
        res.map_err(|e| RPCError::RemoteError(RemoteError::new(self.target.clone(), e)))
    }

    async fn install_snapshot(
        &mut self,
        req: InstallSnapshotRequest<TypeConfig>,
        _option: openraft::network::RPCOption,
    ) -> Result<InstallSnapshotResponse<u64>, RPCError<u64, BasicNode, RaftError<u64, InstallSnapshotError>>> {
        let url = format!("http://{}/raft/snapshot", self.target.addr);
        let resp = self.client.post(&url).json(&req).send().await.map_err(|e| RPCError::Network(NetworkError::new(&e)))?;
        let res: Result<InstallSnapshotResponse<u64>, RaftError<u64, InstallSnapshotError>> = resp.json().await.map_err(|e| RPCError::Network(NetworkError::new(&e)))?;
        res.map_err(|e| RPCError::RemoteError(RemoteError::new(self.target.clone(), e)))
    }

    async fn vote(
        &mut self,
        req: VoteRequest<u64>,
        _option: openraft::network::RPCOption,
    ) -> Result<VoteResponse<u64>, RPCError<u64, BasicNode, RaftError<u64>>> {
        let url = format!("http://{}/raft/vote", self.target.addr);
        let resp = self.client.post(&url).json(&req).send().await.map_err(|e| RPCError::Network(NetworkError::new(&e)))?;
        let res: Result<VoteResponse<u64>, RaftError<u64>> = resp.json().await.map_err(|e| RPCError::Network(NetworkError::new(&e)))?;
        res.map_err(|e| RPCError::RemoteError(RemoteError::new(self.target.clone(), e)))
    }
}
