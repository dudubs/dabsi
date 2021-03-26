import { Awaitable } from "@dabsi/common/typings2/Async";
import { Is } from "@dabsi/common/typings2/boolean/Is";
import { Fn } from "@dabsi/common/typings2/Fn";
import { RpcError } from "@dabsi/typerpc/RpcError";

declare const isConfigFactory: unique symbol;

const configSymbol = Symbol();

export type Config<T> = { [configSymbol]: T };

export type AwaitableConfig<C> = Awaitable<Config<C>>;

export type ConfigFn<C> = (config: Awaitable<C>) => AwaitableConfig<C>;

export type ConfigFactory<C, U extends any[] = []> = {
  ($: ConfigFn<C>, ...args: U): AwaitableConfig<C>;
  [isConfigFactory]?: true;
};

export type AnyConfigFactory = ConfigFactory<any, any>;

export type FnIsConfigFactory<T extends Fn> = Is<
  Required<T>,
  { [isConfigFactory]: true }
>;

export function ConfigFactory<C, U extends any[]>(
  config: ConfigFactory<C, U>,
  args: U
): Promise<C>;

export function ConfigFactory<T extends ConfigFactory<C, []>, C>(
  config: T
): Promise<C>;

export function ConfigFactory<C, U extends any[]>(
  config: ConfigFactory<C, U> | undefined,
  args: U
): Promise<C | undefined>;

export function ConfigFactory<T extends ConfigFactory<C, []>, C>(
  config: T | undefined
): Promise<C | undefined>;

export async function ConfigFactory(config, args: any[] = []) {
  if (!config) return;
  let result = await config($ => {
    return { [configSymbol]: $ };
  }, ...args);
  if (!result || !(configSymbol in result)) {
    throw new RpcError(`You have to use $`);
  }
  while (configSymbol in result) {
    result = result[configSymbol];
    if (result == null) return;
  }
  return result;
}

export type ConfigOrFactory<C, U extends any[] = []> = C | ConfigFactory<C, U>;

export function ConfigOrFactory<
  T extends ConfigOrFactory<C, U>,
  C,
  U extends any[]
>(config: C | undefined, args: U): Promise<C | undefined>;

export function ConfigOrFactory<T extends ConfigOrFactory<C, []>, C>(
  config: C | undefined
): Promise<C | undefined>;

export async function ConfigOrFactory(config, args = []) {
  if (!config) return;
  if (typeof config !== "function") return config;
  return ConfigFactory(config, args);
}
