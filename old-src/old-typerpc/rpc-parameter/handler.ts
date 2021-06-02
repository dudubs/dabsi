import { AbstractRpcHandler } from "@dabsi/old-typerpc/AbstractRpcHandler";
import { ConfigFactory } from "@dabsi/old-typerpc/ConfigFactory";
import { TextInput } from "@dabsi/old-typerpc/input/text-input/TextInput";
import {
  AnyRpc,
  AnyRpcHandler,
  IRpcHandler,
  RpcUnresolvedConfig,
} from "@dabsi/old-typerpc/Rpc";
import {
  AnyRpcParameter,
  RpcParameter,
} from "@dabsi/old-typerpc/rpc-parameter/rpc";

type T = AnyRpcParameter;

declare module "./rpc" {
  interface RpcParameterConfig<T extends TRpcParameter>
    extends ConfigFactory<RpcUnresolvedConfig<T["Target"]>, [T["Data"]]> {}
}

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
