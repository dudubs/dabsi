import { MetaType } from "../common/MetaType";
import { Fn } from "../common/typings";
import { AnyRpc, RpcConfig } from "./Rpc";
import { RpcConfigHook } from "./RpcConfigHook";
import {
  AnyConfigFactory,
  ConfigFactory,
  ConfigFactory2,
  RpcConfigFactory2,
  RpcGenericConfig,
  RpcGenericConfigFn,
} from "./RpcGenericConfig";
import Any = jasmine.Any;

export type RpcConfigurator<T extends AnyRpc, C> = RpcConfigHook<
  T,
  C extends Fn ? RpcGenericConfigFn<C> : C,
  {
    Configurator: {
      Target: T;
      ToConfig: C;
    };
  }
>;

export type RpcGenericConfigurator<T extends AnyRpc, C> = RpcConfigurator<T, C>;

export function RpcConfigurator<T extends AnyRpcConfigurator>(
  target: Target<T>,
  getConfig: RpcConfiguratorFactory<T>
): RpcConfigurator<Target<T>, ToConfig<T>> {
  return RpcConfigHook(target, getConfig);
}

export type Target<T extends AnyRpcConfigurator> = MetaType<
  T
>["Configurator"]["Target"];

export type ToConfig<T extends AnyRpcConfigurator> = MetaType<
  T
>["Configurator"]["ToConfig"];

export type AnyRpcConfigurator = RpcConfigurator<AnyRpc, any>;
export type RpcConfiguratorFactory<T extends AnyRpcConfigurator> = (
  this: T,
  config: ToConfig<T>
) => RpcConfig<Target<T>>;

export function RpcConfiguratorFactory<
  T extends AnyRpcConfigurator,
  C = ToConfig<T> extends Fn ? ReturnType<ToConfig<T>> : ToConfig<T>,
  TargetConfig = RpcConfig<Target<T>>
>(
  configurator: ConfigFactory<TargetConfig, [C, T]>
): RpcConfiguratorFactory<T> {
  return function (config) {
    if (typeof config === "function") config = RpcGenericConfig(<any>config);
    return ConfigFactory(configurator, config, this);
  };
}

export function RpcConfiguratorFactory2<
  T extends AnyRpcConfigurator,
  C = ToConfig<T> extends Fn ? ReturnType<ToConfig<T>> : ToConfig<T>,
  TargetConfig = RpcConfig<Target<T>>
>(
  configurator: ConfigFactory<TargetConfig, [C, T]>
): RpcConfiguratorFactory<T> {
  return function (config) {
    if (typeof config === "function") config = RpcGenericConfig(<any>config);
    return ConfigFactory(configurator, config, this);
  };
}
