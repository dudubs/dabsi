import { Awaitable } from "../../common/typings2/Async";
import { AbstractRpcHandler } from "../AbstractRpcHandler";
import {
  AnyRpc,
  IRpcHandler,
  RpcError,
  RpcType,
  RpcUnresolvedConfig,
} from "../Rpc";
import { AnyRpcMap } from "./RpcMap";

export type T = AnyRpcMap;
export class RpcMapHandler<R extends AnyRpcMap>
  extends AbstractRpcHandler<T>
  implements IRpcHandler<T> {
  getChildConfig(key: string): Awaitable<RpcUnresolvedConfig<AnyRpc>> {
    return this.config[key];
  }
}
