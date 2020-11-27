import { inspect } from "../logging/inspect";
import { CallStackInfo } from "../typedi/CallStackInfo";
import { _consumeMap } from "../typedi/Consumer";
import { ResolveError } from "../typedi/ResolveError";
import { ResolveMapType, Resolver, ResolverMap } from "../typedi/Resolver";
import { AnyRpc, RpcConfig, RpcError, RpcUnresolvedConfig } from "./Rpc";

export type RpcConfigResolver<T extends AnyRpc> = Resolver<
  RpcUnresolvedConfig<T>
> & { rpc: T };

export function RpcConfigResolver<T extends AnyRpc, U extends ResolverMap<any>>(
  rpc: T,
  resolvers: U,
  callback: (context: ResolveMapType<U>) => RpcUnresolvedConfig<T>
): RpcConfigResolver<T> {
  // TOOD: save stack info

  const callStackInfo = new CallStackInfo(new Error(), __filename);
  // stackInfo = {};
  let resolver = _consumeMap(resolvers, context => {
    return RpcConfig(rpc, callback(context));
  });

  resolver = Resolver.catch(resolver, error => {
    throw new ResolveError(`by ${inspect(resolver)}`, error);
  });

  resolver[inspect.custom] = () => {
    return `<RpcConfigResolver ${callStackInfo.description}>`;
  };
  (resolver as any).rpc = rpc;

  return resolver as any;
}
