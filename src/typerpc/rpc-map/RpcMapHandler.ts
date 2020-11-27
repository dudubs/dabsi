import { Awaitable } from "../../common/typings2/Async";
import {
  AbstractRpcHandler,
  AnyRpc,
  IRpcHandler,
  RpcError,
  RpcResolvedHandler,
  RpcType,
  RpcUnresolvedConfig,
} from "../Rpc";
import { AnyRpcMap } from "./RpcMap";

export class RpcMapHandler<R extends AnyRpcMap, T extends RpcType<R>["TRpcMap"]>
  extends AbstractRpcHandler<R>
  implements IRpcHandler<AnyRpcMap> {
  handle([key, payload]): Promise<any> {
    return this.getTargetHandler(key).then(c => c.handle(payload));
  }

  getChildConfig(key): Awaitable<RpcUnresolvedConfig<AnyRpc>> {
    throw new Error();
  }

  async getChildRpc(data) {
    return this.rpc.children[data];
  }

  async getChildHandler(key) {
    if (!this.getChildConfig) throw new Error();
    return this.rpc.children[key].resolveRpcHandler(
      await this.getChildConfig(key),
      this
    );
  }

  async route(path) {
    return this.getChildHandler(path);
  }

  async getTargetHandler(key: string): Promise<RpcResolvedHandler<AnyRpc>> {
    try {
      return await this.rpc.targetMap[key].resolveRpcHandler(
        this.config[key],
        this
      );
    } catch (error) {
      if (error instanceof RpcError) {
        throw new RpcError(`At key:${key}, ${error.message}`);
      }
      throw error;
    }
  }
}
