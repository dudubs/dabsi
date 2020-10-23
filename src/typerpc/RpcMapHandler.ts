import { Awaitable } from "../common/typings";
import {
  AbstractRpcHandler,
  AnyRpc,
  IRpcHandler,
  RpcResolvedHandler,
  RpcType,
} from "./Rpc";
import { AnyRpcMap } from "./RpcMap";

export class RpcMapHandler<R extends AnyRpcMap, T extends RpcType<R>["TRpcMap"]>
  extends AbstractRpcHandler<R>
  implements IRpcHandler<AnyRpcMap> {
  handle([key, payload]: RpcType<R>["Payload"]): Awaitable<
    RpcType<R>["Result"]
  > {
    return this.getTargetHandler(key).call("handle", payload);
  }

  getTargetHandler(key: string): Promise<RpcResolvedHandler<AnyRpc>> {
    return this.rpc.targetMap[key].resolveRpcHandler(this.config[key]);
  }
}
