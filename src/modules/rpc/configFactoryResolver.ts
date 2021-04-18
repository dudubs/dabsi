import { RpcModule2 } from "@dabsi/modules/rpc";
import { CustomResolver, Resolver, ResolverMap } from "@dabsi/typedi";
import { ResolveError } from "@dabsi/typedi/ResolveError";
import { AnyRpc, RpcResolvedConfig, RpcType } from "../../typerpc/Rpc";
import { RpcConfigResolver } from "./configResolver";

export type RpcConfigFactory<T extends AnyRpc> = (
  context?: ResolverMap
) => Promise<RpcResolvedConfig<T>>;

export default function RpcConfigFactoryResolver<T extends AnyRpc>(
  rpc: T,
  {
    generate = false,
    context: rpcContext = {},
  }: {
    // TODO: automatic generate if is cycle
    generate?: boolean;
    context?: ResolverMap;
  } = {}
): CustomResolver<RpcConfigFactory<T>> {
  return Resolver.chainCheck(
    Resolver([RpcModule2, c => c], (rpcModule, context) => {
      const rpcConfigResolver = getRpcConfigResolver(rpcModule);
      return childContext => {
        const rpcConfig = Resolver.resolve(
          rpcConfigResolver,
          Resolver.Context.create(context, childContext || {})
        );

        return <Promise<RpcResolvedConfig<T>>>rpc.resolveRpcConfig(rpcConfig);
      };
    }),
    childContext => {
      const rpcConfigResolver = getRpcConfigResolver(
        Resolver.resolve(RpcModule2, childContext)
      );
      Resolver.checkObject(rpcContext, childContext);
      Resolver.check(
        rpcConfigResolver,
        Resolver.Context.create(childContext, rpcContext)
      );
    }
  );

  function getRpcConfigResolver(
    rpcModule: RpcModule2
  ): RpcConfigResolver<AnyRpc> {
    const rpcConfigResolver = generate
      ? rpcModule.generateConfigResolver(rpc)
      : rpcModule.getConfigResolver(rpc);

    if (!rpcConfigResolver) {
      throw new ResolveError(`Can't resolve rpc config.`);
    }
    return rpcConfigResolver;
  }
}
