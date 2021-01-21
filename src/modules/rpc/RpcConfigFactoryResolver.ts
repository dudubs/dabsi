import RpcModule from ".";
import { AnyResolverMap, CustomResolver, Resolver } from "../../typedi";
import { ResolveError } from "../../typedi/ResolveError";
import { AnyRpc, RpcResolvedConfig } from "../../typerpc/Rpc";
import { RpcConfigResolver } from "./RpcConfigResolver";

export default function RpcConfigFactoryResolver<T extends AnyRpc>(
  rpc: T,
  {
    create = false,
    context: rpcContext = {},
  }: {
    create?: boolean;
    context?: AnyResolverMap;
  } = {}
): CustomResolver<(context?: AnyResolverMap) => RpcResolvedConfig<T>> {
  return Resolver.toCheck(
    Resolver.consume([RpcModule, c => c], (rpcModule, context) => {
      const rpcConfigResolver = getRpcConfigResolver(rpcModule);
      return rpcContext => {
        return <RpcResolvedConfig<T>>(
          rpc.resolveRpcConfig(
            Resolver.resolve(
              rpcConfigResolver,
              Resolver.createContext(rpcContext, context)
            )
          )
        );
      };
    }),
    context => {
      const rpcConfigResolver = getRpcConfigResolver(
        Resolver.resolve(RpcModule, context)
      );
      Resolver.checkObject(rpcContext, context);
      Resolver.check(
        rpcConfigResolver,
        Resolver.createContext(rpcContext, context)
      );
    }
  );

  function getRpcConfigResolver(
    rpcModule: RpcModule
  ): RpcConfigResolver<AnyRpc> {
    const rpcConfigResolver = create
      ? rpcModule.createRpcConfigResolver(rpc)
      : rpcModule.getRpcConfigResolver(rpc);

    if (!rpcConfigResolver) {
      throw new ResolveError(`Can't resolve rpc config.`);
    }
    return rpcConfigResolver;
  }
}
