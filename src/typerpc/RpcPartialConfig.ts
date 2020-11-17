import { Override } from "../common/typings2/Override";
import { PartialKeys } from "../common/typings2/PartialUndefinedKeys";
import { UndefinedIfEmptyObject } from "../common/typings2/UndefinedIfEmptyObject";
import { AnyRpc, Rpc, RpcConfig, RpcUnresolvedConfig, TRpc } from "./Rpc";
import { AnyRpcConfigHook, RpcConfigHook } from "./RpcConfigHook";

export type AnyRpcWithObjectConfig = Rpc<
  Override<TRpc, { Config: object | undefined }>
>;

export type RpcPartialConfig<
  T extends AnyRpcWithObjectConfig,
  K extends keyof NonNullable<RpcConfig<T>>
> = RpcConfigHook<{
  Target: T;
  Config:
    | NonNullable<RpcConfig<T>>
    | UndefinedIfEmptyObject<PartialKeys<NonNullable<RpcConfig<T>>, K>>;
}>;

export function RpcPartialConfig<
  T extends AnyRpc,
  K extends keyof NonNullable<RpcConfig<T>>
>(
  target: T,
  defaultConfig: Pick<NonNullable<RpcConfig<T>>, K>
): RpcPartialConfig<T, K> {
  return <any>RpcConfigHook<AnyRpcConfigHook>({
    isGenericConfig: false,
    target,
    handler: ({ config }) => $ => $({ ...defaultConfig, ...config }),
  });
}
