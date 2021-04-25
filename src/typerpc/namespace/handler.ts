import { Awaitable } from "@dabsi/common/typings2/Async";
import { AbstractRpcHandler } from "@dabsi/old-typerpc/AbstractRpcHandler";
import {
  AnyRpc,
  IRpcHandler,
  RpcUnresolvedConfig,
} from "@dabsi/old-typerpc/Rpc";
import { RpcNamespace } from "@dabsi/old-typerpc/namespace/rpc";

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
