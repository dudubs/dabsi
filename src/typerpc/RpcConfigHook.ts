import { Awaited } from "../common/typings2/Async";
import { If, Not } from "../common/typings2/boolean";
import { Fn } from "../common/typings2/Fn";
import { PartialUndefinedKeys } from "../common/typings2/PartialUndefinedKeys";
import { ConfigFactory } from "./ConfigFactory";
import { GenericConfig, IsGenericConfig } from "./GenericConfig";
import { AnyRpc, RpcHook, RpcType, RpcUnresolvedConfig, TRpc } from "./Rpc";

export type RpcConfigHook<
  T extends TConfigHook & {
    Props?: object;
  }
> = RpcHook<
  T["Target"],
  {
    TConfigHook: T;
    Config: T["Config"];
  }
> &
  NonNullable<T["Props"]>;

export type TConfigHook = {
  Target: AnyRpc;
  Config: TRpc["Config"];
  Props?: object;
};
export type AnyRpcConfigHook = RpcConfigHook<{
  Target: AnyRpc;
  Config: TRpc["Config"];
}>;

// TODO: _GenericToGenericConfig
// TODO: _ConfigToGenericConfig
// TODO: _ConfigToConfig
// TODO: _GenericConfigToConfig
type _GenericConfigHandler<T extends TConfigHook> = (_: {
  config: Awaited<ReturnType<Extract<T["Config"], Fn>>>;
  target: T["Target"];
  props: T["Props"];
}) => ConfigFactory<RpcUnresolvedConfig<T["Target"]>>;

type _ConfigHandler<T extends TConfigHook> = (_: {
  config: T["Config"];
  target: T["Target"];
  props: T["Props"];
}) => ConfigFactory<RpcUnresolvedConfig<T["Target"]>>;

export type RpcConfigHookHandler<
  R extends AnyRpcConfigHook,
  T extends TConfigHook = RpcType<R>["TConfigHook"]
> = IsGenericConfig<T["Config"]> extends true
  ? _GenericConfigHandler<T>
  : _ConfigHandler<T>;

export function RpcConfigHook<
  R extends AnyRpcConfigHook,
  T extends TConfigHook = RpcType<R>["TConfigHook"]
>(
  options: PartialUndefinedKeys<
    {
      isGenericConfig:
        | IsGenericConfig<T["Config"]>
        | If<Not<IsGenericConfig<T["Config"]>>, undefined>;

      props: T["Props"];
    },
    {
      target: T["Target"];
      handler: RpcConfigHookHandler<R>;
    }
  >
): R {
  const { target, handler } = options;
  const isGenericConfig =
    "isGenericConfig" in options ? options.isGenericConfig ?? false : false;

  return Object.setPrototypeOf(
    {
      ...options["props"],
      async resolveRpcConfig(this: T["Target"], config) {
        if (isGenericConfig) {
          config = await GenericConfig(
            (handler as _GenericConfigHandler<T>)({
              config: await GenericConfig(config),
              target: this,
              props: options["props"],
            }) as GenericConfig
          );
        } else {
          config = await ConfigFactory(
            (handler as _ConfigHandler<T>)({
              config,
              target: this,
              props: options["props"],
            })
          );
        }
        return target.resolveRpcConfig.call(this, config);
      },
    },
    target
  );
}
