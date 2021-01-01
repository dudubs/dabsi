import { CallStackInfo } from "@dabsi/typedi/CallStackInfo";
import { catchResolveError } from "@dabsi/typedi/operators/catchResolveError";
import { checkAndResolve } from "@dabsi/typedi/operators/checkAndResolve";
import {
  checkResolver,
  checkResolverSymbol,
} from "@dabsi/typedi/operators/checkResolver";
import { checkResolverContext } from "@dabsi/typedi/operators/checkResolverContext";
import { createResolverContext } from "@dabsi/typedi/operators/createResolverContext";
import toCheck from "@dabsi/typedi/operators/toCheck";
import { resolve, resolveSymbol } from "@dabsi/typedi/resolve";
import { FnResolver, TypeResolver } from "@dabsi/typedi/resolvers/FnResolver";
import {
  AnyResolverMap,
  ObjectResolver,
} from "@dabsi/typedi/resolvers/ObjectResolver";
import { TokenResolver } from "@dabsi/typedi/resolvers/TokenResolver";
import { resolveType } from "@dabsi/typedi/resolveType";
import { Touch } from "@dabsi/typedi/Touch";
import { tryResolve } from "@dabsi/typedi/tryResolve";

export type ResolverMap<T> = Record<string, Resolver<T>>;

export type ResolveMapType<T extends ResolverMap<any>> = {
  [K in keyof T]: ResolverType<T[K]>;
};

export type CustomResolver<T> = {
  [resolveSymbol](context: ResolverMap<any>): T;
  [checkResolverSymbol]?(context: ResolverMap<any>): void;
};

// TODO: Function implements CustromResolver()
export type Resolver<T = any> =
  | CustomResolver<T>
  | FnResolver<T>
  | TypeResolver<T>;

export type ResolverType<T extends Resolver> = T extends Resolver<infer U>
  ? U
  : never;

let count = 0;

export function Resolver<T>(
  name?: string /* or __filename */
): TokenResolver<T> {
  return new TokenResolver(
    new CallStackInfo(new Error(), __filename),
    `token:${count++}_${name || "unknown"}`
  );
}

Resolver.touch = Touch;
Resolver.resolve = resolve;
Resolver.check = checkResolver;

Resolver.checkContext = checkResolverContext;
Resolver.checkAndResolve = checkAndResolve;
Resolver.object = ObjectResolver;
Resolver.catch = catchResolveError;
Resolver.toCheck = toCheck;
Resolver.resolveType = resolveType;
Resolver.createContext = createResolverContext;
Resolver.try = tryResolve;

Resolver.provide = function (
  context: AnyResolverMap,
  ...args: AnyResolverMap[]
) {
  Object.assign(context, ...args);
};
