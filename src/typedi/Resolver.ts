import { Constructor } from "@dabsi/common/typings2/Constructor";
import { getTypeToken } from "@dabsi/typedi/getTypeToken";
import { Consumer } from "@dabsi/typedi/consumer";
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

export type CustomResolver<T> = {
  [resolveSymbol](context: ResolverMap<any>): T;
  [checkSymbol]?(context: ResolverMap<any>): void;
};

export type ArrowResolver<T> = (context: ResolverMap<any>) => T;

export type TypeResolver<T> = Constructor<T>;

export type Resolver<T = any> =
  | CustomResolver<T>
  | ArrowResolver<T>
  | TypeResolver<T>;

export type Resolved<T extends Resolver> = T extends Resolver<infer U>
  ? U
  : never;

export interface IResolver extends Consumer {
  checkSymbol: typeof checkSymbol;
  resolveSymbol: typeof resolveSymbol;
  <T extends object = any>(): new () => T;
  <T>(provider: TypeResolver<T>, resolver?: Resolver<T>): ResolverMap<T>;
}

export const Resolver: IResolver = <any>function _Resolver(...args) {
  if (
    args.length === 2 &&
    Array.isArray(args[0]) &&
    typeof args[1] === "function"
  ) {
    return Consumer(args[0] as any, args[1]);
  }

  if (args.length) {
    const [type, resolver] = args;
    return {
      [getTypeToken(type)]:
        resolver ??
        (() => {
          throw new ResolveError(`No resolve for ${type.name}.`);
        }),
    };
  }

  class _ResolverClass {
    constructor() {
      throw new Error(`Can't create instance of ${this.constructor.name}.`);
    }
  }

  return _ResolverClass;
};

Resolver.checkSymbol = checkSymbol;
Resolver.resolveSymbol = resolveSymbol;
