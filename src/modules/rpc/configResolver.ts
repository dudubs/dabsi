import { inspect } from "@dabsi/logging/inspect";
import { Resolver } from "@dabsi/typedi";
import { CallStackAnchor } from "@dabsi/common/CallStackAnchor";
import { CustomResolverFn, ResolverDeps } from "@dabsi/typedi/custom";
import { AnyRpc, RpcConfig, RpcUnresolvedConfig } from "@dabsi/typerpc/Rpc";

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

export function RpcConfigResolver<T extends AnyRpc, U extends ResolverDeps>(
  rpc: T,
  resolvers: U,
  callback: CustomResolverFn<RpcUnresolvedConfig<T>, U>
): RpcConfigResolver<T> {
  const anchor = CallStackAnchor.capture(RpcConfigResolver);

  // stackInfo = {};
  let resolver: Resolver = <any>Resolver.custom(
    (resolvers as any) as [],
    context => {
      return RpcConfig(rpc, callback(context));
    }
  );

  resolver = Resolver.catchOnCheck(resolver, error => {
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
