import { AnyRpc, RpcUnresolvedConfig, RpcConnection } from "../Rpc";

export function RpcConfigOld<T extends AnyRpc>(
  rpc: T,
  config: RpcUnresolvedConfig<T>
): RpcUnresolvedConfig<T> {
  return config;
}

export function createRpcConnectionOld<T extends AnyRpc>(
  rpc: T,
  config: RpcUnresolvedConfig<T>
): RpcConnection<T> {
  return rpc.createRpcConnection(rpc.createRpcCommand(config));
}
