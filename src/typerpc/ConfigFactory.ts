import { Awaitable } from "../common/typings2/Async";
import { RpcError } from "./Rpc";

const resultSymbol = Symbol();

export type ConfigFactoryResult<C> = Awaitable<{ [resultSymbol]: C }>;

export type ConfigFactoryFn<C> = (config: C) => ConfigFactoryResult<C>;

export type ConfigFactory<C, U extends any[] = []> = (
  $: ConfigFactoryFn<C>,
  ...args: U
) => ConfigFactoryResult<C>;

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
      return { [resultSymbol]: $ };
    },
    context,
    ...args
  );
  if (!result || !(resultSymbol in result)) {
    throw new RpcError(`You have to use $`);
  }
  while (resultSymbol in result) {
    result = result[resultSymbol];
  }
  return result;
}
