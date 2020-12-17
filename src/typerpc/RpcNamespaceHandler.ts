import { Awaitable } from "@dabsi/common/typings2/Async";
import { AbstractRpcHandler } from "@dabsi/typerpc/AbstractRpcHandler";
import { AnyRpc, IRpcHandler, RpcUnresolvedConfig } from "@dabsi/typerpc/Rpc";
import { RpcNamespace } from "@dabsi/typerpc/RpcNamespace";

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
