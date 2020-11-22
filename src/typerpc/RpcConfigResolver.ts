import { UndefinedIfIsUndefined } from "../common/typings2/UndefinedIfIsUndefined";
import { AnyRpc, RpcConfig, RpcUnresolvedConfig } from "./Rpc";
import { Consumer, _consumeMap } from "../typedi/Consumer";
import {
  ResolveMapType,
  Resolver,
  ResolverMap,
  ResolverType,
} from "../typedi/Resolver";
export type RpcConfigResolver<T extends AnyRpc> = Resolver<
  RpcUnresolvedConfig<T>
> & { rpc: T };
export function RpcConfigResolver<T extends AnyRpc, U extends ResolverMap<any>>(
  rpc: T,
  resolvers: U,
  callback: (context: ResolveMapType<U>) => RpcUnresolvedConfig<T>
): RpcConfigResolver<T> {
  const resolver = _consumeMap(resolvers, context => {
    return RpcConfig(rpc, callback(context));
  });
  (resolver as any).rpc = rpc;
  return resolver as any;
}
