import RpcModule from ".";

import { ResolveError } from "@dabsi/typedi/ResolveError";
import { AnyResolverMap, CustomResolver, Resolver } from "@dabsi/typedi";
import {
  AnyRpc,
  RpcResolvedConfig,
  RpcUnresolvedConfig,
} from "@dabsi/typerpc/Rpc";
import { RpcConfigResolver } from "@dabsi/typerpc/RpcConfigResolver";

function _SystemRpcConfigResolver<T extends AnyRpc>(
  rpc: T,
  nextContext,
  getRpcConfigResolver: (sm: RpcModule) => RpcConfigResolver<T>
): CustomResolver<(context?) => RpcUnresolvedConfig<T>> {
  return Resolver.toCheck(
    Resolver.consume([RpcModule, c => c], (sm, context) => {
      return nextContext => {
        const cr = getRpcConfigResolver(sm);
        return rpc.resolveRpcConfig(
          Resolver.resolve(cr, Resolver.createContext(nextContext, context))
        ) as RpcUnresolvedConfig<T>;
      };
    }),
    context => {
      const sm = Resolver.resolve(RpcModule, context);
      const cr = getRpcConfigResolver(sm);
      Resolver.checkObject(nextContext, context);
      Resolver.check(cr, Resolver.createContext(nextContext, context));
    }
  );
}

export function SystemRpcConfigResolver<T extends AnyRpc>(
  rpc: T,
  nextContext?: AnyResolverMap
): CustomResolver<(context?: AnyResolverMap) => RpcUnresolvedConfig<T>> {
  return _SystemRpcConfigResolver(rpc, nextContext, sm =>
    sm.getRpcConfigResolver(rpc)
  );
}

SystemRpcConfigResolver.create = function <T extends AnyRpc>(
  rpc: T,
  nextContext?: AnyResolverMap
): CustomResolver<(context?: AnyResolverMap) => Promise<RpcResolvedConfig<T>>> {
  return Resolver.consume(
    [
      _SystemRpcConfigResolver(rpc, nextContext, sm => {
        const configResolver = sm.createRpcConfigResolver(rpc);
        if (!configResolver) {
          throw new ResolveError(``);
        }
        return configResolver;
      }),
    ],
    getUnresolvedConfig => context => {
      return rpc.resolveRpcConfig(getUnresolvedConfig(context)) as Promise<
        RpcResolvedConfig<T>
      >;
    }
  );
};
export default SystemRpcConfigResolver;
