import { Constructor } from "@dabsi/common/typings2/Constructor";
import {
  ConsumeFactory,
  ResolvedDeps,
  ResolverDeps,
} from "@dabsi/typedi/consume";
import getProviderToken from "@dabsi/typedi/getProviderToken";
import { ResolveError } from "@dabsi/typedi/ResolveError";
import { ResolverOrConsumeArgs } from "@dabsi/typedi/ResolverOrConsumeArgs";

export type ResolverMap<T = any> = Record<string, Resolver<T>>;

export type ObjectResolver<T extends object> = {
  [K in keyof T]: Resolver<T[K]>;
};

export type ResolvedMap<T extends ResolverMap<any>> = {
  [K in keyof T]: Resolved<T[K]>;
};

// Provider, FunctionalResolver, Consumeabial
export const checkSymbol = Symbol("check");

export const resolveSymbol = Symbol("resolve");

export const providableSymbol = Symbol("providable");

// Customer
export type Factory<T> = (context: ResolverMap<any>) => T;

export type Provider<T> = Constructor<T> & {
  [providableSymbol]?: true;
};

// TokenableResolver
export type Consumer<T> = {
  new (context: ResolverMap): T;
  [providableSymbol]: false;
};

export type Resolver<T = any> = Factory<T> | Provider<T> | Consumer<T>;

export type Resolved<T extends Resolver> = T extends Resolver<infer U>
  ? U
  : never;

export function Resolver<T = {}>(): new (context: ResolverMap) => T;

export function Resolver<P extends Provider<T>, T, Deps extends ResolverDeps>(
  provider: P,
  ...args: ResolverOrConsumeArgs<T, Deps>
): ResolverMap;

export function Resolver<T, U extends ResolverDeps>(
  deps: U,
  factory: ConsumeFactory<T, U>
): Consumer<T>;

export function Resolver<T extends ResolverDeps>(
  deps: T
): Consumer<ResolvedDeps<T>>;

export function Resolver(...args) {
  //
  if (!args.length) return _Provider;

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

  if (args.length === 3) {
    const [provider, deps, resolver] = args;
    args = [provider, Resolver.consume(deps, resolver)];
  }

  if (args.length === 2 && typeof args[1] === "function") {
    const [deps, factory] = args;
    if (
      Array.isArray(deps) ||
      Object.getPrototypeOf(deps) === Object.prototype
    ) {
      return Resolver.consume(deps, factory);
    }
  }

  if (args.length) {
    const [type, resolver] = args;
    if (type[Resolver.providableSymbol] === false) {
      throw new Error(`"${type.name}" is not providable.`);
    }

    return {
      [getProviderToken(type)]:
        resolver ??
        (() => {
          throw new ResolveError(`No resolve for ${type.name}.`);
        }),
    };
  }

  throw new TypeError("No overload.");
}
class _Provider {
  constructor(context: ResolverMap) {
    return Resolver.resolve(this.constructor as any, context);
  }
}

Resolver.checkSymbol = checkSymbol;
Resolver.resolveSymbol = resolveSymbol;
Resolver.providableSymbol = providableSymbol;
