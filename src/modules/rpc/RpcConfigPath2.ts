import { AnyRpc } from "@dabsi/typerpc/Rpc";

export class RpcConfigPath2<T extends AnyRpc = AnyRpc> {
  constructor(public rpc: T, public parent: null | RpcConfigPath2) {}
}
