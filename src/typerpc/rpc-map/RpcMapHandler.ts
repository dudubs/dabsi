import { Awaitable } from "../../common/typings2/Async";
import {
  AbstractRpcHandler,
  AnyRpc,
  IRpcHandler,
  RpcError,
  RpcResolvedHandler,
  RpcType,
} from "../Rpc";
import { AnyRpcMap } from "./RpcMap";

export class RpcMapHandler<R extends AnyRpcMap, T extends RpcType<R>["TRpcMap"]>
  extends AbstractRpcHandler<R>
  implements IRpcHandler<AnyRpcMap> {
  handle([key, payload]): Promise<any> {
    return this.getTargetHandler(key).then(c => c.handle(payload));
  }

  async getTargetHandler(key: string): Promise<RpcResolvedHandler<AnyRpc>> {
    try {
      return await this.rpc.targetMap[key].resolveRpcHandler(this.config[key]);
    } catch (error) {
      if (error instanceof RpcError) {
        throw new RpcError(`At key:${key}, ${error.message}`);
      }
      throw error;
    }
  }
}
