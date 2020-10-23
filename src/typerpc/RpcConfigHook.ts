import { Awaited, Fn, If, Not, PartialUndefinedKeys } from "../common/typings";
import { ConfigFactory } from "./ConfigFactory";
import { GenericConfig, IsGenericConfig } from "./GenericConfig";
import { AnyRpc, RpcHook, RpcType, RpcUnresolvedConfig, TRpc } from "./Rpc";

export type RpcConfigHook<T extends TConfigHook> = RpcHook<
  T["Target"],
  { Config: T["Config"]; TConfigHook: T }
>;

export type TConfigHook = {
  Target: AnyRpc;
  Config: TRpc["Config"];
};
export type AnyRpcConfigHook = RpcConfigHook<{
  Target: AnyRpc;
  Config: TRpc["Config"];
}>;

type _GenericConfigHandler<T extends TConfigHook> = (
  config: Awaited<ReturnType<Extract<T["Config"], Fn>>>,
  target: T["Target"]
) => RpcUnresolvedConfig<T["Target"]>;

type _ConfigHandler<T extends TConfigHook> = (
  config: T["Config"],
  target: T["Target"]
) => ConfigFactory<RpcUnresolvedConfig<T["Target"]>>;

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

  return Object.setPrototypeOf(target, {
    async resolveRpcConfig(this: T["Target"], config) {
      if (isGenericConfig) {
        config = await GenericConfig(
          (handler as _GenericConfigHandler<T>)(config, this) as GenericConfig
        );
      } else {
        config = await ConfigFactory(
          (handler as _ConfigHandler<T>)(config, this)
        );
      }
      return target.resolveRpcConfig.call(this, config);
    },
  });
}
