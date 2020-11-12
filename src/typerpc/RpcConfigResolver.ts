import { AnyRpc, RpcConfig, RpcUnresolvedConfig } from "./Rpc";
import { _consume } from "../typedi/internal/_consume";
import { Resolver, ResolverType } from "../typedi/Resolver";

export function RpcConfigResolver<
  T extends AnyRpc,
  C extends Record<string, Resolver>
>(
  rpc: T,
  resolvers: C,
  callback: (
    context: { [K in keyof C]: ResolverType<C[K]> }
  ) => RpcUnresolvedConfig<T>
): Resolver<RpcUnresolvedConfig<T>> {
  return _consume(resolvers, context => {
    return RpcConfig(rpc, callback(context));
  });
}
