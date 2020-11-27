import { ConfigFactory } from "../ConfigFactory";
import { AbstractRpcHandler, IRpcHandler } from "../Rpc";
import { AnyRpcParameter } from "./RpcParameter";

type T = AnyRpcParameter;

export class RpcParameterHandler
  extends AbstractRpcHandler<T>
  implements IRpcHandler<T> {
  async handle([data, payload]): Promise<any> {
    const value = await this.rpc.parameterDataType(data);
    const configForValue = await ConfigFactory(this.config, value);
    return this.rpc.parameterTarget
      .resolveRpcHandler(configForValue, this)
      .then(c => c.handle(payload));
  }
}
