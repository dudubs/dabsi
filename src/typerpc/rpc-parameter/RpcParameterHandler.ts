import { ConfigFactory } from "../ConfigFactory";
import { AbstractRpcHandler, IRpcHandler } from "../Rpc";
import { AnyRpcParameter } from "./RpcParameter";

type T = AnyRpcParameter;

export class RpcParameterHandler
  extends AbstractRpcHandler<T>
  implements IRpcHandler<T> {
  // route(payload, index) RpcPath.next()

  async getChildConfig(key) {
    const value = await this.rpc.parameterDataType(key);
    return await ConfigFactory(this.config, value);
  }

  async getChildHandler(key) {
    throw new Error();
  }

  async route(data) {
    const value = await this.rpc.parameterDataType(data);
    const config = await ConfigFactory(this.config, value);
    return this.rpc.children.target.resolveRpcHandler(await config, this);
  }

  async handle([data, payload]): Promise<any> {
    const value = await this.rpc.parameterDataType(data);
    const configForValue = await ConfigFactory(this.config, value);
    return this.rpc.parameterTarget
      .resolveRpcHandler(configForValue, this)
      .then(c => c.handle(payload));
  }
}
