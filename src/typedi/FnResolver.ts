import { Constructor } from "../common/typings2/Constructor";
import { Type } from "../common/typings2/Type";
import { logBeforeEach } from "../jasmine/logBeforeEach";
import { checkResolverSymbol } from "./checkResolver";
import { checkTypeResolver } from "./checkTypeResolver";
import { provideType } from "./provideType";
import { resolveSymbol } from "./resolve";
import { ResolverMap, CustomResolver, Resolver } from "./Resolver";
import { resolveType } from "./resolveType";

export type FnResolver<T> = (context: ResolverMap<any>) => T;

export type TypeResolver<T> = Constructor<T>;

declare global {
  interface Function {
    toCheck<T>(
      this: (context: ResolverMap<any>) => T,
      check: (context: ResolverMap<any>) => void
    ): CustomResolver<T>;

    provide<T>(this: Type<T>, resolver: Resolver<T>): ResolverMap<T>;
  }
}

Function.prototype[resolveSymbol] = function (context) {
  if (this.prototype) {
    return resolveType(this, context);
  } else {
    return this(context);
  }
};

Function.prototype[checkResolverSymbol] = function (context) {
  if (this.prototype) {
    checkTypeResolver(this, context);
  }
};

Function.prototype.toCheck = function (checkFn) {
  return {
    [resolveSymbol]: this,
    [checkResolverSymbol]: checkFn,
  };
};

Function.prototype.provide = function (resolver) {
  return provideType(this, resolver);
};
