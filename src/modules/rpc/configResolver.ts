import { inspect } from "@dabsi/logging/inspect";
import { ResolvedMap, ResolverMap } from "@dabsi/typedi";
import { CallStackAnchor } from "@dabsi/typedi/CallStackAnchor";
import { RpcConfig } from "@dabsi/typerpc/Rpc";
import { Resolver } from "../../typedi";
import { AnyRpc, RpcUnresolvedConfig } from "../../typerpc/Rpc";

export type RpcConfigResolver<T extends AnyRpc> = Resolver<
  RpcUnresolvedConfig<T>
> & {
  rpc: T;
};

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
  callback: (context: ResolvedMap<U>) => RpcUnresolvedConfig<T>
): RpcConfigResolver<T> {
  // TOOD: save stack info

  const anchor = CallStackAnchor.capture(RpcConfigResolver);
  // stackInfo = {};
  let resolver = Resolver<any, any>(resolvers, context => {
    return RpcConfig(rpc, callback(context));
  });

  resolver = Resolver.catch(resolver, error => {
    throw error.at(inspect(resolver));
  });

  resolver[inspect.custom] = () => {
    return `<RpcConfigResolver${
      rpc.rpcType?.name ? ` for ${rpc.rpcType.name}` : ""
    } ${anchor.description}>`;
  };
  Object.assign(resolver, {
    rpc,
  });

  isRpcConfigResolverSet.add(resolver);
  return resolver as any;
}
