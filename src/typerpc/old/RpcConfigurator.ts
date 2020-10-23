import { Awaited, Fn } from "../../common/typings";
import { ConfigFactory } from "../ConfigFactory";
import { AnyRpc, BasedRpc, RpcConfig, RpcType, TRpc } from "../Rpc";
import { RpcConfigHook } from "../RpcConfigHook";
import { GenericConfig } from "../GenericConfig";
import { RpcConfigOld } from "./Old";

export type RpcConfigurator<
  T extends BasedRpc,
  C extends TRpc["Config"]
> = RpcConfigHook<
  T,
  C,
  {
    Configurator: {
      Target: T;
      ToConfig: C;
    };
  }
>;

export type AnyRpcConfigurator = RpcConfigurator<AnyRpc, TRpc["Config"]>;

export type Target<T extends AnyRpcConfigurator> = RpcType<
  T
>["Configurator"]["Target"];

export type ToConfig<T extends AnyRpcConfigurator> = RpcType<
  T
>["Configurator"]["ToConfig"];

export type RpcGenericConfigurator<
  T extends AnyRpc,
  C extends Fn
> = RpcConfigurator<T, GenericConfig<C>>;

/*




 */

export function RpcConfigurator<T extends AnyRpcConfigurator>(
  target: Target<T>,
  getConfig: RpcConfiguratorHandler<T>
): RpcConfigurator<Target<T>, ToConfig<T>> {
  return RpcConfigHook(target, getConfig);
}

export type RpcConfiguratorHandler<T extends AnyRpcConfigurator> = (
  this: T,
  config: ToConfig<T>
) => RpcConfigOld<Target<T>>;

export function RpcConfiguratorFactory<T extends AnyRpcConfigurator>(
  configurator: ConfigFactory<RpcConfig<Target<T>>, [ToConfig<T>, T]>
): RpcConfiguratorHandler<T> {
  return function (config) {
    throw new Error();
    // if (typeof config === "function") config = RpcGenericConfig(<any>config);
    // return ConfigFactory(configurator, config, this);
  };
}

RpcConfiguratorFactory.Generic = function <
  T extends RpcGenericConfigurator<AnyRpc, any>,
  TargetConfig = RpcConfig<Target<T>>
>(
  configurator: ConfigFactory<
    RpcConfig<Target<T>>,
    [Awaited<ReturnType<ToConfig<T>>>, T]
  >
): RpcConfiguratorHandler<T> {
  return function (config) {
    throw new Error();
    // if (typeof config === "function") config = RpcGenericConfig(<any>config);
    // return ConfigFactory(configurator, config, this);
  };
};
