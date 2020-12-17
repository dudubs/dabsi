import { Awaitable } from "@dabsi/common/typings2/Async";
import { Is } from "@dabsi/common/typings2/boolean/Is";
import { Fn } from "@dabsi/common/typings2/Fn";
import { RpcError } from "@dabsi/typerpc/Rpc";

declare const isConfigFactory: unique symbol;

const configSymbol = Symbol();

export type Config<T> = { [configSymbol]: T };

export type AwaitableConfig<C> = Awaitable<Config<C>>;

export type ConfigFn<C> = (config: C) => AwaitableConfig<C>;

export type ConfigFactory<C, U extends any[] = []> = {
  ($: ConfigFn<C>, ...args: U): AwaitableConfig<C>;
  [isConfigFactory]?: true;
};

export type FnIsConfigFactory<T extends Fn> = Is<
  Required<T>,
  { [isConfigFactory]: true }
>;

export function ConfigFactory<C, U extends any[]>(
  config: ConfigFactory<C, U> | undefined,
  ...args: U
): Promise<C | undefined>;
export function ConfigFactory<C, U extends any[]>(
  config: ConfigFactory<C, U>,
  ...args: U
): Promise<C>;
export async function ConfigFactory(config, context, ...args) {
  if (!config) return;
  let result = await config(
    $ => {
      return { [configSymbol]: $ };
    },
    context,
    ...args
  );
  if (!result || !(configSymbol in result)) {
    throw new RpcError(`You have to use $`);
  }
  while (configSymbol in result) {
    result = result[configSymbol];
    if (result == null) return;
  }
  return result;
}
