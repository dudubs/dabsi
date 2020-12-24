import SystemRpcModule from "@dabsi/system/core/SystemRpcModule";
import { CustomResolver, Resolver } from "@dabsi/typedi/Resolver";
import {
  AnyResolverMap,
  checkResolverMap,
} from "@dabsi/typedi/resolvers/ObjectResolver";
import { RpcResolvedConfig, RpcUnresolvedConfig } from "@dabsi/typerpc/Rpc";
import { Consumer } from "@dabsi/typedi/Consumer";
import { AnyRpc } from "@dabsi/typerpc/Rpc";
import { RpcConfigResolver } from "@dabsi/typerpc/RpcConfigResolver";
import { ResolveError } from "@dabsi/typedi/ResolveError";

function _SystemRpcConfigResolver<T extends AnyRpc>(
  rpc: T,
  nextContext,
  getRpcConfigResolver: (sm: SystemRpcModule) => RpcConfigResolver<T>
): CustomResolver<(context?) => RpcUnresolvedConfig<T>> {
  return Resolver.toCheck(
    Consumer([SystemRpcModule, c => c], (sm, context) => {
      return nextContext => {
        const cr = getRpcConfigResolver(sm);
        return rpc.resolveRpcConfig(
          Resolver.resolve(cr, Resolver.createContext(nextContext, context))
        ) as RpcUnresolvedConfig<T>;
      };
    }),
    context => {
      const sm = Resolver.resolve(SystemRpcModule, context);
      const cr = getRpcConfigResolver(sm);
      checkResolverMap(nextContext, context);
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
  return Consumer(
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
