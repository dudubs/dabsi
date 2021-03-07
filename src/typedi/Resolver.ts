import { Constructor } from "@dabsi/common/typings2/Constructor";
import { CallStackInfo } from "@dabsi/typedi/CallStackInfo";

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

export type FnResolver<T> = (context: ResolverMap<any>) => T;

export type TypeResolver<T> = Constructor<T>;

export type Resolver<T = any> =
  | CustomResolver<T>
  | FnResolver<T>
  | TypeResolver<T>;

export type Resolved<T extends Resolver> = T extends Resolver<infer U>
  ? U
  : never;

export interface IResolver {
  checkSymbol: typeof checkSymbol;
  resolveSymbol: typeof resolveSymbol;
}

export const IResolver: IResolver = <any>{
  createResolver: (csi: CallStackInfo, args: any[]): any => {
    throw new TypeError();
  },
  checkSymbol,
  resolveSymbol,
};

export const Resolver: IResolver = IResolver;
