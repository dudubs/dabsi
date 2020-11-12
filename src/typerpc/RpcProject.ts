import { Resolver } from "../typedi";
import { AnyRpc, RpcUnresolvedConfig } from "./Rpc";

export class RpcProject<T extends AnyRpc> {
  constructor(
    protected rpc: T,
    protected rpcConfigResolver: Resolver<RpcUnresolvedConfig<T>>
  ) {}
}
