import { AbstractRpcHandler } from "../AbstractRpcHandler";
import { ConfigFactory } from "../ConfigFactory";
import { TextInput } from "../input/text-input/TextInput";
import { AnyRpcHandler, IRpcHandler } from "../Rpc";
import { AnyRpcParameter, RpcParameter } from "./RpcParameter";

type T = AnyRpcParameter;

export class RpcParameterHandler
  extends AbstractRpcHandler<T>
  implements IRpcHandler<T> {
  $targetConfig = null;

  async route(data) {
    const value = await this.rpc.parameterDataType(data);
    const config = await ConfigFactory(this.config, value);
    return this.rpc.children.target.resolveRpcHandler(
      await config,
      this as AnyRpcHandler
    );
  }
}

const r = RpcParameter(String, TextInput());
r.resolveRpcHandler(($, x) => {
  return $({});
}, null);

r.children.target;
