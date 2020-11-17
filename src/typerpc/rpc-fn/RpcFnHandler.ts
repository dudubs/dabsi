import { Awaitable } from "../../common/typings2/Async";
import { AnyRpcFn } from "./RpcFn";
import { AbstractRpcHandler, IRpcHandler } from "../Rpc";

type T = AnyRpcFn;

export class RpcFnHandler
  extends AbstractRpcHandler<T>
  implements IRpcHandler<T> {
  handle(payload: any): Awaitable<any> {
    return this.config(...payload);
  }
}
