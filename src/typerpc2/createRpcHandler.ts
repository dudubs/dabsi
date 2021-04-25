import { createRpcConfigHandler } from "@dabsi/typerpc2/createRpcConfigHandler";
import { GenericConfig2 } from "@dabsi/typerpc2/GenericConfig";
import { Rpc, RpcType } from "@dabsi/typerpc2/Rpc";
import {
  AnyRpcWithConfig,
  isRpcTypeWithConfig,
  RpcConfigurator,
} from "@dabsi/typerpc2/RpcConfig";
import { RpcHandler } from "@dabsi/typerpc2/RpcHandler";

export async function createRpcHandler<T extends Rpc>(
  rpcType: RpcType<T>,
  configurator: RpcConfigurator<T>
): Promise<RpcHandler<T>> {
  if (isRpcTypeWithConfig(rpcType)) {
    return <any>(
      createRpcConfigHandler(
        rpcType as RpcType<AnyRpcWithConfig>,
        configurator as RpcConfigurator<AnyRpcWithConfig>
      )
    );
  }
  if (typeof configurator === "function") {
    return GenericConfig2(
      (configurator as any) as GenericConfig2<
        (handler: RpcHandler<T>) => RpcHandler<T>,
        [RpcType<T>]
      >,
      [rpcType]
    );
  }
  return <any>configurator;
}