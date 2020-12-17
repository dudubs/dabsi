import { Awaitable } from "@dabsi/common/typings2/Async";
import { AbstractRpcHandler } from "@dabsi/typerpc/AbstractRpcHandler";
import { AnyRpcFn } from "@dabsi/typerpc/rpc-fn/RpcFn";
import { IRpcHandler, RpcPayload } from "@dabsi/typerpc/Rpc";

type T = AnyRpcFn;

export class RpcFnHandler
  extends AbstractRpcHandler<T>
  implements IRpcHandler<T> {
  handle(payload: RpcPayload<T>): Awaitable<any> {
    return this.config(...payload);
  }
}
