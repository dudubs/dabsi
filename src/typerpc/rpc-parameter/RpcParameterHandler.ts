import { AbstractRpcHandler } from "@dabsi/typerpc/AbstractRpcHandler";
import { ConfigFactory } from "@dabsi/typerpc/ConfigFactory";
import { TextInput } from "@dabsi/typerpc/input/text-input/TextInput";
import {
  AnyRpc,
  AnyRpcHandler,
  IRpcHandler,
  RpcUnresolvedConfig,
} from "@dabsi/typerpc/Rpc";
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

    const config: RpcUnresolvedConfig<AnyRpc> = await ConfigFactory(
      this.config,
      [value]
    );
    return this.rpc.children.target.resolveRpcHandler(
      config,
      this as AnyRpcHandler
    );
  }
}
