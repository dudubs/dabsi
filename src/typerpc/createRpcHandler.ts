import createRpcConfigHandler from "@dabsi/typerpc/createRpcConfigHandler";
import { GenericConfig } from "@dabsi/typerpc/GenericConfig";
import { Rpc, RpcType } from "@dabsi/typerpc/Rpc";
import {
  AnyRpcWithConfig,
  isRpcTypeWithConfig,
  RpcConfigurator,
} from "@dabsi/typerpc/RpcConfig";
import { RpcHandler } from "@dabsi/typerpc/RpcHandler";

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
    return GenericConfig(
      (configurator as any) as GenericConfig<
        (handler: RpcHandler<T>) => RpcHandler<T>,
        [RpcType<T>]
      >,
      [rpcType]
    );
  }
  return configurator as RpcHandler<T>;
}
