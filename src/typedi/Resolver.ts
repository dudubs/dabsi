import { CallStackInfo } from "./CallStackInfo";
import { FnResolver, TypeResolver } from "./resolvers/FnResolver";
import { checkAndResolve } from "./operators/checkAndResolve";
import { checkResolver, checkResolverSymbol } from "./operators/checkResolver";
import { checkResolverContext } from "./operators/checkResolverContext";
import { resolve, resolveSymbol } from "./resolve";
import { ObjectResolver } from "./resolvers/ObjectResolver";
import { TokenResolver } from "./resolvers/TokenResolver";
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
    new CallStackInfo(new Error()),
    `token:${count++}_${name || "unknown"}`
  );
}

Resolver.touch = Touch;
Resolver.resolve = resolve;
Resolver.check = checkResolver;
Resolver.checkContext = checkResolverContext;
Resolver.checkAndResolve = checkAndResolve;
Resolver.object = ObjectResolver;
