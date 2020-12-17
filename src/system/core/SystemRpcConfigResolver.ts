import { SystemModule } from "@dabsi/system/core/SystemModule";
import { CustomResolver, Resolver } from "@dabsi/typedi/Resolver";
import {
  AnyResolverMap,
  checkResolverMap,
} from "@dabsi/typedi/resolvers/ObjectResolver";
import { RpcResolvedConfig, RpcUnresolvedConfig } from "@dabsi/typerpc/Rpc";
import { Consumer } from "@dabsi/typedi/Consumer";
import { AnyRpc } from "@dabsi/typerpc/Rpc";
import { RpcConfigResolver } from "@dabsi/typerpc/RpcConfigResolver";

function _SystemRpcConfigResolver<T extends AnyRpc>(
  rpc: T,
  nextContext,
  getRpcConfigResolver: (sm: SystemModule) => RpcConfigResolver<T>
): CustomResolver<(context?) => RpcUnresolvedConfig<T>> {
  return Resolver.toCheck(
    Consumer([SystemModule, c => c], (sm, context) => {
      return nextContext => {
        const cr = getRpcConfigResolver(sm);
        return rpc.resolveRpcConfig(
          Resolver.resolve(cr, Resolver.createContext(nextContext, context))
        );
      };
    }),
    context => {
      const sm = Resolver.resolve(SystemModule, context);
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
      _SystemRpcConfigResolver<T>(rpc, nextContext, sm =>
        sm.createRpcConfigResolver(rpc)
      ),
    ],
    getUnresolvedConfig => context => {
      return rpc.resolveRpcConfig(getUnresolvedConfig(context)) as Promise<
        RpcResolvedConfig<T>
      >;
    }
  );
};
export default SystemRpcConfigResolver;
