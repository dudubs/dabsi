import { Awaitable } from "@dabsi/common/typings2/Async";
import { If } from "@dabsi/common/typings2/boolean";
import { Is } from "@dabsi/common/typings2/boolean/Is";
import { Fn } from "@dabsi/common/typings2/Fn";

declare const __GenericConfigSymbol: unique symbol;

export type IsGenericConfig<T> = Is<
  Required<T>,
  {
    [__GenericConfigSymbol]: true;
  }
>;

export interface GenericConfig2<T extends Fn, U extends any[] = []> {
  ($: T, ...args: U): Awaitable<ReturnType<T>>;

  [__GenericConfigSymbol]?: true;
}

declare let X: GenericConfig2<
  <T extends Fn>(
    type: T,
    config: {
      value: ReturnType<T>;
    }
  ) => number
>;

export type AnyGenericConfig = GenericConfig2<Fn, any[]>;

export type GenericConfigArgs<
  T extends AnyGenericConfig
> = T extends GenericConfig2<any, infer U> ? U : never;

export type GenericConfigFn<
  T extends AnyGenericConfig
> = T extends GenericConfig2<infer U, any[]> ? U : never;

type IsWithoutArgs<T extends AnyGenericConfig> = Is<GenericConfigArgs<T>, []>;

export namespace GenericConfig2 {
  export type IsWithoutResolveFn<T extends AnyGenericConfig> = Is<
    Parameters<GenericConfigFn<T>>,
    [ReturnType<GenericConfigFn<T>>]
  >;

  export type ResolveFn<T extends AnyGenericConfig> = (
    ...params: Parameters<GenericConfigFn<T>>
  ) => ReturnType<GenericConfigFn<T>>;
}
//
export function GenericConfig2<T extends AnyGenericConfig>(
  genericConfig: T,
  ...[]: [
    ...If<IsWithoutArgs<T>, [], [configArgs: GenericConfigArgs<T>]>,
    ...If<
      GenericConfig2.IsWithoutResolveFn<T>,
      [],
      [resolve: GenericConfig2.ResolveFn<T>]
    >
  ]
): Promise<ReturnType<T>>;

export async function GenericConfig2(
  genericConfig,
  resolveOrArgs?,
  maybeResolve?
) {
  let resolve;
  let args;

  if (Array.isArray(resolveOrArgs)) {
    [args, resolve] = [resolveOrArgs, maybeResolve];
  } else if (typeof resolveOrArgs === "function") {
    [args, resolve] = [[], resolveOrArgs];
  }

  let result;
  let resolved = false;
  await genericConfig((...resolveArgs) => {
    if (resolved) {
      throw new Error("GenericConfig already resolved.");
    }

    resolved = true;
    result = resolve ? resolve(...resolveArgs) : resolveArgs[0];
  }, ...(args || []));

  if (!resolved) {
    throw new Error("GenericConfig is not resolved, did you used $?");
  }
  return result;
}

export type ConfigFactory<T, U extends any[] = []> = GenericConfig2<
  (config: T) => T,
  U
>;

export type Configurator<T> =
  | T
  | If<IsGenericConfig<T>, never, ConfigFactory<T>>;

export type ConfiguratorType<T> = If<
  IsGenericConfig<T>,
  ReturnType<GenericConfigFn<Extract<T, AnyGenericConfig>>>,
  T
>;
