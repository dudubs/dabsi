import { isConstructor } from "../common/object/isConstructor";
import { Awaitable } from "../common/typings2/Async";
import { AbstractRpcHandler } from "./AbstractRpcHandler";
import { AnyRpc, AnyRpcHandler, IRpcHandler, RpcUnresolvedConfig } from "./Rpc";
import { RpcNamespace } from "./RpcNamespace";

type T = RpcNamespace;

export class RpcNamespaceHandler
  extends AbstractRpcHandler<T>
  implements IRpcHandler<T> {
  nsInfo: {
    parent: RpcNamespaceHandler;
    key: string;
  } | null = null;

  protected getChildConfig(
    key: string,
    child: AnyRpc
  ): Awaitable<RpcUnresolvedConfig<AnyRpc>> {
    return this.config.getNamespaceConfig(child, key, this);
  }
}
