import { ConfigFactory } from "../ConfigFactory";
import { AnyParameter } from "./Parameter";
import { AbstractRpcHandler, IRpcHandler, RpcType } from "../Rpc";

type T = AnyParameter;

export class ParameterHandler
  extends AbstractRpcHandler<T>
  implements IRpcHandler<T> {
  async handle([data, payload]: RpcType<T>["Payload"]): Promise<
    RpcType<T>["Result"]
  > {
    const value = await this.config.load(data);
    const targetConfig = await ConfigFactory(
      this.config.getTargetConfig,
      value
    );
    return this.rpc.target
      .resolveRpcHandler(targetConfig)
      .call("handle", payload);
  }
}
