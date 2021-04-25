import { Awaited } from "@dabsi/common/typings2/Async";
import { If, Not } from "@dabsi/common/typings2/boolean";
import { Call } from "@dabsi/common/typings2/Call";
import { Fn } from "@dabsi/common/typings2/Fn";
import { PartialUndefinedKeys } from "@dabsi/common/typings2/PartialUndefinedKeys";
import { ConfigFactory } from "@dabsi/old-typerpc/ConfigFactory";
import {
  GenericConfig,
  IsGenericConfig,
} from "@dabsi/old-typerpc/GenericConfig";
import {
  AnyRpc,
  RpcType,
  RpcUnresolvedConfig,
  TRpc,
} from "@dabsi/old-typerpc/Rpc";
import { RpcHook } from "@dabsi/old-typerpc/RpcHook";

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

export type RpcConfigHookOptions<
  R extends AnyRpcConfigHook,
  T extends TConfigHook = RpcType<R>["TConfigHook"]
> = PartialUndefinedKeys<
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
>;

export function RpcConfigHook<
  R extends AnyRpcConfigHook,
  T extends TConfigHook = RpcType<R>["TConfigHook"]
>(options: RpcConfigHookOptions<R>): R {
  const {
    isGenericConfig = false,
    target,
    handler,
  } = options as RpcConfigHookOptions<AnyRpcConfigHook>;

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
        return (target.resolveRpcConfig.call as Call<
          typeof target.resolveRpcConfig
        >)(this, config);
      },
    },
    target
  );
}
