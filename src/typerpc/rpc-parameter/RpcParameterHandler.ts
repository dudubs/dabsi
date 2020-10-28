import { ConfigFactory } from "../ConfigFactory";
import { AbstractRpcHandler, IRpcHandler } from "../Rpc";
import { AnyRpcParameter } from "./RpcParameter";

type T = AnyRpcParameter;

export class RpcParameterHandler
  extends AbstractRpcHandler<T>
  implements IRpcHandler<T> {
  async handle([data, payload]): Promise<any> {
    const value = await this.rpc.parameterDataType(data);
    const targetConfig = await ConfigFactory(this.config, value);
    return this.rpc.parameterTarget
      .resolveRpcHandler(targetConfig)
      .then(c => c.handle(payload));
  }
}
