import { Constructor } from "@dabsi/common/typings2/Constructor";
import { CallStackAnchor } from "@dabsi/common/CallStackAnchor";
import {
  CustomResolverFn,
  ResolvedDeps,
  ResolverDeps,
} from "@dabsi/typedi/custom";
import { ResolveError } from "@dabsi/typedi/ResolveError";

export type ResolverMap<T = any> = Record<string, Resolver<T>>;

export type ObjectResolver<T extends object> = {
  [K in keyof T]: Resolver<T[K]>;
};

export type ResolvedMap<T extends ResolverMap<any>> = {
  [K in keyof T]: Resolved<T[K]>;
};

export const checkSymbol = Symbol("checkResolve");

export const resolveSymbol = Symbol("resolve");

export const providableSymbol = Symbol("providable");

export type ArrowResolver<T> = (context: ResolverMap<any>) => T;

export type ProvidableResolver<T> = Constructor<T> & {
  [providableSymbol]?: true;
};

export type CustomResolver<T> = {
  new (context: ResolverMap): T;
  [providableSymbol]: false;
};

export type Resolver<T = any> = ArrowResolver<T> | Constructor<T>;

export type Resolved<T extends Resolver> = T extends Resolver<infer U>
  ? U
  : never;

export interface IResolver {
  checkSymbol: typeof checkSymbol;
  providableSymbol: typeof providableSymbol;
  resolveSymbol: typeof resolveSymbol;

  <T extends object = {}>(): new (context: ResolverMap) => T;

  <T extends ProvidableResolver<any>>(
    provider: T,
    resolver?: Resolver<InstanceType<T>>
  ): ResolverMap<any>;

  <T extends ProvidableResolver<any>, U extends ResolverDeps>(
    provider: T,
    deps: U,
    resolver?: CustomResolverFn<InstanceType<T>, U>
  ): ResolverMap<any>;

  <T, U extends ResolverDeps>(
    deps: U,
    factory: CustomResolverFn<T, U>
  ): CustomResolver<T>;
}

export function Resolver<T = {}>(): new (context: ResolverMap) => T;

export function Resolver<T extends ProvidableResolver<any>>(
  provider: T,
  resolver?: Resolver<InstanceType<T>>
): ResolverMap<any>;

export function Resolver<
  T extends ProvidableResolver<any>,
  U extends ResolverDeps
>(
  provider: T,
  deps: U,
  resolver?: CustomResolverFn<InstanceType<T>, U>
): ResolverMap<any>;

export function Resolver<T, U extends ResolverDeps>(
  deps: U,
  factory: CustomResolverFn<T, U>
): CustomResolver<T>;

export function Resolver<T extends ResolverDeps>(
  deps: T
): CustomResolver<ResolvedDeps<T>>;

export function Resolver(...args) {
  //
  if (!args.length) return Providable;

  const [arg0] = args;
  if (
    args.length === 1 &&
    (Array.isArray(arg0) || Object.getPrototypeOf(arg0 === Object.prototype))
  ) {
    if (Array.isArray(arg0)) {
      return Resolver.array(arg0);
    }
    if (Object.getPrototypeOf(arg0) === Object.prototype) {
      return Resolver.object(arg0);
    }
  }

  // TODO: Resolver.locate(resolver, anchor)

  if (args.length === 3) {
    const [provider, deps, resolver] = args;
    args = [provider, Resolver.custom(deps, resolver)];
  }

  if (args.length === 2 && typeof args[1] === "function") {
    const [deps, factory] = args;
    if (
      Array.isArray(deps) ||
      Object.getPrototypeOf(deps) === Object.prototype
    ) {
      return Resolver.custom(deps, factory);
    }
  }

  if (args.length) {
    const [type, resolver] = args;
    if (type[Resolver.providableSymbol] === false) {
      throw new Error(`"${type.name}" is not providable.`);
    }

    return {
      [Resolver.Providability.token(type)]:
        resolver ??
        (() => {
          throw new ResolveError(`No resolve for ${type.name}.`);
        }),
    };
  }

  throw new TypeError("No overload.");
}
class Providable {
  constructor(context: ResolverMap) {
    return Resolver.resolve(this.constructor as any, context);
  }
}

Resolver.checkSymbol = checkSymbol;
Resolver.resolveSymbol = resolveSymbol;
Resolver.providableSymbol = providableSymbol;
