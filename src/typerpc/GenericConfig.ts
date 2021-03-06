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

export interface GenericConfig<T extends Fn, U extends any[] = []> {
  ($: T, ...args: U): Awaitable<ReturnType<T>>;

  [__GenericConfigSymbol]?: true;
}

export type AnyGenericConfig = GenericConfig<Fn, any[]>;

export type GenericConfigArgs<
  T extends AnyGenericConfig
> = T extends GenericConfig<any, infer U> ? U : never;

export type GenericConfigFn<
  T extends AnyGenericConfig
> = T extends GenericConfig<infer U, any[]> ? U : never;

type IsWithoutArgs<T extends AnyGenericConfig> = Is<GenericConfigArgs<T>, []>;

export namespace GenericConfig {
  export type IsWithoutResolveFn<T extends AnyGenericConfig> = Is<
    Parameters<GenericConfigFn<T>>,
    [ReturnType<GenericConfigFn<T>>]
  >;

  export type ResolveFn<T extends AnyGenericConfig> = (
    ...params: Parameters<GenericConfigFn<T>>
  ) => ReturnType<GenericConfigFn<T>>;
}
//
export function GenericConfig<T extends AnyGenericConfig>(
  genericConfig: T,
  ...[]: [
    ...If<IsWithoutArgs<T>, [], [configArgs: GenericConfigArgs<T>]>,
    ...If<
      GenericConfig.IsWithoutResolveFn<T>,
      [],
      [resolve: GenericConfig.ResolveFn<T>]
    >
  ]
): Promise<ReturnType<T>>;

export async function GenericConfig(
  genericConfig,
  resolveOrArgs?,
  maybeResolve?
) {
  if (genericConfig === undefined) return;

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

export type ConfigFactory<T, U extends any[] = []> = GenericConfig<
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

export type ConfigOrFactory<T, U extends any[] = []> = T | ConfigFactory<T, U>;

export function ConfigOrFactory<T>(
  config: ConfigOrFactory<T, []> | undefined
): Promise<T | undefined>;
export function ConfigOrFactory<T, U extends any[]>(
  config: ConfigOrFactory<T, U> | undefined,
  args: U | (() => Awaitable<U>)
): Promise<T | undefined>;
export async function ConfigOrFactory(
  config,
  args: any[] | (() => Awaitable<any[]>) = []
) {
  if (typeof config !== "function") {
    return config;
  }
  return GenericConfig(
    config as ConfigFactory<any, [any]>,
    (typeof args === "function" ? await args() : args) as [never]
  );
}
