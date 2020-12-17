import { Resolver } from "@dabsi/typedi";
import { AnyRpc, RpcUnresolvedConfig } from "@dabsi/typerpc/Rpc";

export class RpcProject<T extends AnyRpc> {
  constructor(
    protected rpc: T,
    protected rpcConfigResolver: Resolver<RpcUnresolvedConfig<T>>
  ) {}
}
