import { Awaitable } from "../../common/typings2/Async";
import { AbstractRpcHandler } from "../AbstractRpcHandler";
import { AnyRpcFn } from "./RpcFn";
import { IRpcHandler, RpcPayload } from "../Rpc";

type T = AnyRpcFn;

export class RpcFnHandler
  extends AbstractRpcHandler<T>
  implements IRpcHandler<T> {
  handle(payload: RpcPayload<T>): Awaitable<any> {
    return this.config(...payload);
  }
}
