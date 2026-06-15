use openraft::error::{InstallSnapshotError, NetworkError, RPCError, RaftError, RemoteError};
use openraft::network::{RPCOption, RaftNetwork, RaftNetworkFactory};
use openraft::raft::{
    AppendEntriesRequest, AppendEntriesResponse, InstallSnapshotRequest, InstallSnapshotResponse,
    VoteRequest, VoteResponse,
};
use reqwest::Client;
use std::future::Future;

use super::store::TypeConfig;

pub struct Network {
    client: Client,
    scheme: String,
}

impl Network {
    pub fn new(scheme: String) -> Self {
        let mut builder = Client::builder();
        if std::env::var("YAGDB_CLUSTER_DANGER_ACCEPT_INVALID_CERTS").unwrap_or_default() == "true" {
            builder = builder.danger_accept_invalid_certs(true);
        }

        Self {
            client: builder.build().unwrap_or_default(),
            scheme,
        }
    }
}

pub struct NetworkConnection {
    client: Client,
    scheme: String,
    target_id: u64,
}

impl RaftNetworkFactory<TypeConfig> for Network {
    type Network = NetworkConnection;

    #[allow(clippy::type_complexity)]
    fn new_client(
        &mut self,
        target_id: u64,
        _node: &(),
    ) -> impl Future<Output = Self::Network> + Send {
        let client = self.client.clone();
        let scheme = self.scheme.clone();
        async move { NetworkConnection { client, scheme, target_id } }
    }
}

impl RaftNetwork<TypeConfig> for NetworkConnection {
    fn append_entries(
        &mut self,
        req: AppendEntriesRequest<TypeConfig>,
        _option: RPCOption,
    ) -> impl Future<Output = Result<AppendEntriesResponse<u64>, RPCError<u64, (), RaftError<u64>>>> + Send
    {
        let client = self.client.clone();
        let scheme = self.scheme.clone();
        let target_id = self.target_id;
        async move {
            let url = format!("{}://127.0.0.1:{}/raft/append", scheme, 3000 + target_id);
            let resp = client
                .post(&url)
                .json(&req)
                .send()
                .await
                .map_err(|e| RPCError::Network(NetworkError::new(&e)))?;
            let res: Result<AppendEntriesResponse<u64>, RaftError<u64>> = resp
                .json()
                .await
                .map_err(|e| RPCError::Network(NetworkError::new(&e)))?;
            res.map_err(|e| RPCError::RemoteError(RemoteError::new(target_id, e)))
        }
    }

    fn install_snapshot(
        &mut self,
        req: InstallSnapshotRequest<TypeConfig>,
        _option: RPCOption,
    ) -> impl Future<
        Output = Result<
            InstallSnapshotResponse<u64>,
            RPCError<u64, (), RaftError<u64, InstallSnapshotError>>,
        >,
    > + Send {
        let client = self.client.clone();
        let scheme = self.scheme.clone();
        let target_id = self.target_id;
        async move {
            let url = format!("{}://127.0.0.1:{}/raft/snapshot", scheme, 3000 + target_id);
            let resp = client
                .post(&url)
                .json(&req)
                .send()
                .await
                .map_err(|e| RPCError::Network(NetworkError::new(&e)))?;
            let res: Result<InstallSnapshotResponse<u64>, RaftError<u64, InstallSnapshotError>> =
                resp.json()
                    .await
                    .map_err(|e| RPCError::Network(NetworkError::new(&e)))?;
            res.map_err(|e| RPCError::RemoteError(RemoteError::new(target_id, e)))
        }
    }

    fn vote(
        &mut self,
        req: VoteRequest<u64>,
        _option: RPCOption,
    ) -> impl Future<Output = Result<VoteResponse<u64>, RPCError<u64, (), RaftError<u64>>>> + Send
    {
        let client = self.client.clone();
        let scheme = self.scheme.clone();
        let target_id = self.target_id;
        async move {
            let url = format!("{}://127.0.0.1:{}/raft/vote", scheme, 3000 + target_id);
            let resp = client
                .post(&url)
                .json(&req)
                .send()
                .await
                .map_err(|e| RPCError::Network(NetworkError::new(&e)))?;
            let res: Result<VoteResponse<u64>, RaftError<u64>> = resp
                .json()
                .await
                .map_err(|e| RPCError::Network(NetworkError::new(&e)))?;
            res.map_err(|e| RPCError::RemoteError(RemoteError::new(target_id, e)))
        }
    }
}
