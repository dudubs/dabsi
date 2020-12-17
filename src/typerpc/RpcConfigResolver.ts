import { inspect } from "@dabsi/logging/inspect";
import { CallStackInfo } from "@dabsi/typedi/CallStackInfo";
import { Consumer } from "@dabsi/typedi/Consumer";
import {
  CustomResolver,
  ResolveMapType,
  Resolver,
  ResolverMap,
} from "@dabsi/typedi/Resolver";
import { AnyResolverMap } from "@dabsi/typedi/resolvers/ObjectResolver";
import { AnyRpc, RpcConfig, RpcUnresolvedConfig } from "@dabsi/typerpc/Rpc";
import { checkResolverSymbol } from "./../typedi/operators/checkResolver";
import { resolveSymbol } from "./../typedi/resolve";

export type RpcConfigResolver<T extends AnyRpc> = CustomResolver<
  RpcUnresolvedConfig<T>
> & {
  rpc: T;
};

export const RpcContextResolver = Resolver<AnyResolverMap>();
export const RpcConfigResolverMap = Resolver<
  Record<any, Resolver<RpcUnresolvedConfig<AnyRpc>>>
>();

const isRpcConfigResolverSet = new WeakSet();

export function isRpcConfigResolver(obj): obj is RpcConfigResolver<AnyRpc> {
  return obj && isRpcConfigResolverSet.has(obj);
}

export function RpcConfigResolver<T extends AnyRpc, U extends ResolverMap<any>>(
  rpc: T,
  resolvers: U,
  callback: (context: ResolveMapType<U>) => RpcUnresolvedConfig<T>
): RpcConfigResolver<T> {
  // TOOD: save stack info

  const callStackInfo = new CallStackInfo(new Error(), __filename);
  // stackInfo = {};
  let resolver = Consumer<any, any>(resolvers, context => {
    return RpcConfig(rpc, callback(context));
  });

  resolver = Resolver.catch(resolver, error => {
    throw error.at(inspect(resolver));
  });

  resolver[inspect.custom] = () => {
    return `<RpcConfigResolver${
      rpc.rpcType?.name ? ` for ${rpc.rpcType.name}` : ""
    } ${callStackInfo.description}>`;
  };
  Object.assign(resolver, {
    rpc,
  });

  isRpcConfigResolverSet.add(resolver);
  return resolver as any;
}
