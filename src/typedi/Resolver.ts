import { CodeStackInfo } from "./CodeStackInfo";
import { FnResolver, TypeResolver } from "./FnResolver";
import { checkAndResolve } from "./checkAndResolve";
import { checkResolver, checkResolverSymbol } from "./checkResolver";
import { checkResolverContext } from "./checkResolverContext";
import { resolve, resolveSymbol } from "./resolve";
import { ObjectResolver } from "./ObjectResolver";
import { TokenResolver } from "./TokenResolver";
import { Touch } from "./Touch";

export type ResolverMap<T> = Record<string, Resolver<T>>;

export type ResolveMapType<T extends ResolverMap<any>> = {
  [K in keyof T]: ResolverType<T[K]>;
};

export type CustomResolver<T> = {
  [resolveSymbol](context: ResolverMap<any>): T;
  [checkResolverSymbol]?(context: ResolverMap<any>): void;
};

export type Resolver<T = any> =
  | CustomResolver<T>
  | FnResolver<T>
  | TypeResolver<T>;

export type ResolverType<T extends Resolver> = T extends Resolver<infer U>
  ? U
  : never;

let count = 0;

export function Resolver<T>(name?: string): TokenResolver<T> {
  return new TokenResolver(
    new CodeStackInfo(new Error()),
    `token:${count++}_${name || "unknown"}`
  );
}

Resolver.touch = Touch;
Resolver.resolve = resolve;
Resolver.check = checkResolver;
Resolver.checkContext = checkResolverContext;
Resolver.checkAndResolve = checkAndResolve;
Resolver.object = ObjectResolver;

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
