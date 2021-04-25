import { Awaitable } from "@dabsi/common/typings2/Async";
import { AbstractRpcHandler } from "@dabsi/old-typerpc/AbstractRpcHandler";
import { AnyRpcFn } from "@dabsi/old-typerpc/rpc-fn/RpcFn";
import { IRpcHandler, RpcPayload } from "@dabsi/old-typerpc/Rpc";

type T = AnyRpcFn;

export class RpcFnHandler
  extends AbstractRpcHandler<T>
  implements IRpcHandler<T> {
  handle(payload: RpcPayload<T>): Awaitable<any> {
    return this.config(...payload);
  }
}
