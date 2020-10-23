import { Awaitable } from "../common/typings";

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
): C | undefined;
export function ConfigFactory<C, U extends any[]>(
  config: ConfigFactory<C, U>,
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
