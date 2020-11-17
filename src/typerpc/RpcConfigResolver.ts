import { AnyRpc, RpcConfig, RpcUnresolvedConfig } from "./Rpc";
import { _consume, _consumeMap } from "../typedi/internal/_consume";
import {
  ResolveMapType,
  Resolver,
  ResolverMap,
  ResolverType,
} from "../typedi/Resolver";

export function RpcConfigResolver<T extends AnyRpc, U extends ResolverMap<any>>(
  rpc: T,
  resolvers: U,
  callback: (context: ResolveMapType<U>) => RpcUnresolvedConfig<T>
): Resolver<RpcUnresolvedConfig<T>> {
  return _consumeMap(resolvers, context => {
    return RpcConfig(rpc, callback(context));
  });
}
