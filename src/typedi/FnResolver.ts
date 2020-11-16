import { Constructor, Type } from "../common/typings";
import { logBeforeEach } from "../jasmine/logBeforeEach";
import { checkSymbol } from "./internal/_check";
import { _checkType } from "./internal/_checkType";
import { _provide } from "./internal/_provide";
import { resolveSymbol } from "./internal/_resolve";
import { ResolverMap, CustomResolver, Resolver } from "./Resolver";
import { _resolveType } from "./internal/_resolveType";

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
    return _resolveType(this, context);
  } else {
    return this(context);
  }
};

Function.prototype[checkSymbol] = function (context) {
  if (this.prototype) {
    _checkType(this, context);
  }
};

Function.prototype.toCheck = function (checkFn) {
  return {
    [resolveSymbol]: this,
    [checkSymbol]: checkFn,
  };
};

Function.prototype.provide = function (resolver) {
  return _provide(this, resolver);
};
