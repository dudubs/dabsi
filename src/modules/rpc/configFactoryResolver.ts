import RpcModule from ".";
import { ResolverContext, CustomResolver, Resolver } from "../../typedi";
import { ResolveError } from "../../typedi/ResolveError";
import { AnyRpc, RpcResolvedConfig } from "../../typerpc/Rpc";
import { RpcConfigResolver } from "./configResolver";

export type RpcConfigFactory<T extends AnyRpc> = (
  context?: ResolverContext
) => Promise<RpcResolvedConfig<T>>;

export default function RpcConfigFactoryResolver<T extends AnyRpc>(
  rpc: T,
  {
    create = false,
    context: rpcContext = {},
  }: {
    create?: boolean;
    context?: ResolverContext;
  } = {}
): CustomResolver<RpcConfigFactory<T>> {
  return Resolver.toCheck(
    Resolver.consume([RpcModule, c => c], (rpcModule, context) => {
      const rpcConfigResolver = getRpcConfigResolver(rpcModule);

      return childContext => {
        const rpcConfig = Resolver.resolve(
          rpcConfigResolver,
          Resolver.createContext(context, childContext || {})
        );

        return <Promise<RpcResolvedConfig<T>>>rpc.resolveRpcConfig(rpcConfig);
      };
    }),
    childContext => {
      const rpcConfigResolver = getRpcConfigResolver(
        Resolver.resolve(RpcModule, childContext)
      );
      Resolver.checkObject(rpcContext, childContext);
      Resolver.check(
        rpcConfigResolver,
        Resolver.createContext(childContext, rpcContext)
      );
    }
  );

  function getRpcConfigResolver(
    rpcModule: RpcModule
  ): RpcConfigResolver<AnyRpc> {
    const rpcConfigResolver = create
      ? rpcModule.generateRpcConfigResolver(rpc)
      : rpcModule.getRpcConfigResolver(rpc);

    if (!rpcConfigResolver) {
      throw new ResolveError(`Can't resolve rpc config.`);
    }
    return rpcConfigResolver;
  }
}
