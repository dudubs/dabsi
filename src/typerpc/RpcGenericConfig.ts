import { touchMap } from "../common/map/touchMap";
import { Awaitable, Fn, PluckRequired } from "../common/typings";
import { AnyRpc, Rpc, RpcConfig } from "./Rpc";

export type AnyGenericConfigFn = RpcGenericConfigFn<Fn>;

export type RpcGenericConfigFn<T extends Fn = any> = {
  (configure: T): ReturnType<T>;
};

const resultSymbol = Symbol();
export type ConfigFactoryResult<C> = { [resultSymbol]: C };

export type ConfigFactoryFn<C> = (config: C) => ConfigFactoryResult<C>;

export type AnyConfigFactory = ConfigFactory<any, any[]>;

export type ConfigFactory<C, U extends any[] = []> = (
  $: ConfigFactoryFn<C>,
  ...args: U
) => ConfigFactoryResult<C>;

export type ConfigFactory2<T, C, U extends any[] = []> = (
  $: ConfigFactoryFn<C>,
  context: T,
  ...args: U
) => ConfigFactoryResult<C>;

export type AsyncConfigFactory<T, C, U extends any[] = []> = (
  $: ConfigFactoryFn<C>,
  context: T,
  ...args: U
) => Awaitable<ConfigFactoryResult<C>>;

export type RpcConfigFactory2<
  T,
  R extends AnyRpc,
  U extends any[] = []
> = ConfigFactory2<T, RpcConfig<R>, U>;

export function ConfigFactory<T, C, U extends any[]>(
  config: ConfigFactory2<T, C, U> | undefined,
  context: T,
  ...args: U
): C | undefined;

export function ConfigFactory<T, C, U extends any[]>(
  config: ConfigFactory2<T, C, U>,
  context: T,
  ...args: U
): C;
export function ConfigFactory(config, context, ...args) {
  let result = config?.(
    $ => {
      return { [resultSymbol]: $ };
    },
    context,
    ...args
  );
  if (!result || !(resultSymbol in result)) {
    throw new Error(`You have to use $`);
  }
  while (resultSymbol in result) {
    result = result[resultSymbol];
  }
  return result;
}

export function AsyncConfigFactory<T, C>(
  config: AsyncConfigFactory<T, C> | undefined,
  context: T
): C | undefined;
export function AsyncConfigFactory<T, C>(
  config: AsyncConfigFactory<T, C>,
  context: T
): C;
export async function AsyncConfigFactory(config, context) {
  return (await config?.($ => ({ $: $ }), context))?.$;
}

export type AnyRpcWithGenericConfig = Rpc<{
  Handler: any;
  Config: RpcGenericConfigFn;
  Connection: any;
}>;

export type RpcGenericConfig<T extends AnyRpcWithGenericConfig> = ReturnType<
  RpcConfig<T>
>;

export function RpcGenericConfig<T extends RpcGenericConfigFn>(
  genericConfig: T
): ReturnType<T> {
  return touchMap(genericConfigCache, genericConfig, () => {
    return genericConfig(x => x);
  });
}

const genericConfigCache = new WeakMap();

export function RpcConfigContext<C, T extends AnyRpc>(
  rpc: T,
  factory: RpcConfigFactory2<Readonly<C>, T>
) {
  return (context: Readonly<C>): RpcConfig<T> => {
    return ConfigFactory(factory, context);
  };
}

RpcConfigContext.Generic = function <C, T extends AnyRpcWithGenericConfig>(
  rpc: T,
  factory: (
    $: Parameters<RpcConfig<T>>[0],
    context: Readonly<C>
  ) => ReturnType<RpcConfig<T>>
) {
  return (context: C): RpcConfig<T> => {
    return $ => {
      return $(ConfigFactory(factory, context));
    };
  };
};
