import { isConstructorOf } from "../common/object/isConstructorOf";
import { Awaitable } from "../common/typings2/Async";
import { AbstractRpcHandler } from "./AbstractRpcHandler";
import { AnyRpc, AnyRpcHandler, IRpcHandler, RpcUnresolvedConfig } from "./Rpc";
import { RpcNamespace } from "./RpcNamespace";

type T = RpcNamespace;

export class RpcNamespaceHandler
  extends AbstractRpcHandler<T>
  implements IRpcHandler<T> {
  protected getChildConfig(
    key: string,
    child: AnyRpc
  ): Awaitable<RpcUnresolvedConfig<AnyRpc>> {
    return this.config.getNamespaceConfig(child, key, this);
  }
}
