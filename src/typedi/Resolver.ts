import { _check, checkSymbol } from "./internal/_check";
import { _checkAndResolve } from "./internal/_checkAndResolve";
import { _checkContext } from "./internal/_checkContext";
import { _checkType } from "./internal/_checkType";
import { _consume } from "./internal/_consume";
import { _resolverMap } from "./internal/_resolverMap";
import { _provide } from "./internal/_provide";
import { _resolve, resolveSymbol } from "./internal/_resolve";
import { _arrayResolver } from "./internal/_arrayResolver";
import { _resolveType } from "./internal/_resolveType";
import { _touch } from "./internal/_touch";
import { FnResolver, TypeResolver } from "./FnResolver";
import { creatTokenResolver, TokenResolver } from "./TokenResolver";

export type ResolverMap<T> = Record<string, Resolver<T>>;

export type ResolveMapType<T extends ResolverMap<any>> = {
  [K in keyof T]: ResolverType<T[K]>;
};

export type CustomResolver<T> = {
  [resolveSymbol](context: ResolverMap<any>): T;
  [checkSymbol]?(context: ResolverMap<any>): void;
};

export type Resolver<T = any> =
  | CustomResolver<T>
  | FnResolver<T>
  | TypeResolver<T>;

export type ResolverType<T extends Resolver> = T extends Resolver<infer U>
  ? U
  : never;

export function Resolver<T>(name?: string): TokenResolver<T> {
  return creatTokenResolver(name || "unknown", new Error());
}
Resolver.touch = _touch;
Resolver.resolve = _resolve;
Resolver.provide = _provide;
Resolver.check = _check;
Resolver.checkContext = _checkContext;
Resolver.checkAndResolve = _checkAndResolve;
Resolver.checkType = _checkType;
Resolver.resolveType = _resolveType;
Resolver.consume = _consume;
Resolver.array = _arrayResolver;
Resolver.object = _resolverMap;

declare global {
  interface String extends CustomResolver<string> {}
  interface Number extends CustomResolver<number> {}
  interface Boolean extends CustomResolver<boolean> {}
  interface Date extends CustomResolver<Date> {}
}
[String, Number, Boolean, Date].forEach(type => {
  type.prototype[resolveSymbol] = function () {
    return this as any;
  };
});
