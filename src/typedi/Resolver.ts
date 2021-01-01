import { Constructor } from "@dabsi/common/typings2/Constructor";
import { CallStackInfo } from "@dabsi/typedi/CallStackInfo";

export type ResolverMap<T> = Record<string, Resolver<T>>;

export type ResolveMapType<T extends ResolverMap<any>> = {
  [K in keyof T]: ResolverType<T[K]>;
};

export const checkResolveSymbol = Symbol("checkResolve");

export const resolveSymbol = Symbol("resolve");

export type CustomResolver<T> = {
  [resolveSymbol](context: ResolverMap<any>): T;
  [checkResolveSymbol]?(context: ResolverMap<any>): void;
};

export type FnResolver<T> = (context: ResolverMap<any>) => T;

export type TypeResolver<T> = Constructor<T>;

// TODO: Function implements CustromResolver()
export type Resolver<T = any> =
  | CustomResolver<T>
  | FnResolver<T>
  | TypeResolver<T>;

export type ResolverType<T extends Resolver> = T extends Resolver<infer U>
  ? U
  : never;

export function _Resolver(...args) {
  const callStackInfo = new CallStackInfo(new Error(), __filename);
  return Resolver.createResolver(callStackInfo, args);
}
export interface IResolver {
  checkSymbol: typeof checkResolveSymbol;
  resolveSymbol: typeof resolveSymbol;
  createResolver(csi: CallStackInfo, args: any[]): any;
}

export const IResolver: IResolver = <any>{
  createResolver: (csi: CallStackInfo, args: any[]): any => {
    throw new TypeError();
  },
  checkSymbol: checkResolveSymbol,
  resolveSymbol: resolveSymbol,
};

Object.setPrototypeOf(IResolver, Function.prototype);
Object.setPrototypeOf(_Resolver, IResolver);

export const Resolver: IResolver = <any>_Resolver;

export type AnyResolverMap<T = any> = Record<string, Resolver<T>>;
