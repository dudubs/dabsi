import { AbstractRpcHandler } from "@dabsi/typerpc/AbstractRpcHandler";
import { ConfigFactory } from "@dabsi/typerpc/ConfigFactory";
import { TextInput } from "@dabsi/typerpc/input/text-input/TextInput";
import { AnyRpcHandler, IRpcHandler } from "@dabsi/typerpc/Rpc";
import {
  AnyRpcParameter,
  RpcParameter,
} from "@dabsi/typerpc/rpc-parameter/RpcParameter";

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
