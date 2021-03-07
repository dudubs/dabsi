import { Awaitable } from "@dabsi/common/typings2/Async";
import { AbstractRpcHandler } from "@dabsi/typerpc/AbstractRpcHandler";
import {
  AnyRpc,
  IRpcHandler,
  RpcType,
  RpcUnresolvedConfig,
} from "@dabsi/typerpc/Rpc";
import { RpcError } from "@dabsi/typerpc/RpcError";
import { AnyRpcMap } from "@dabsi/typerpc/rpc-map/RpcMap";

export type T = AnyRpcMap;
export class RpcMapHandler<R extends AnyRpcMap>
  extends AbstractRpcHandler<T>
  implements IRpcHandler<T> {
  getChildConfig(key: string): Awaitable<RpcUnresolvedConfig<AnyRpc>> {
    return this.config[key];
  }
}
