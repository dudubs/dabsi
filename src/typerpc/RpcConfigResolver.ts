import { AnyRpcMap } from "./rpc-map/RpcMap";
import { AnyResolverMap } from "./../typedi/resolvers/ObjectResolver";
import { inspect } from "../logging/inspect";
import { CallStackInfo } from "../typedi/CallStackInfo";
import { _consumeMap } from "../typedi/Consumer";
import { ResolveError } from "../typedi/ResolveError";
import {
  CustomResolver,
  ResolveMapType,
  ResolverMap,
} from "../typedi/Resolver";
import { Resolver } from "./../typedi/Resolver";
import { AnyRpc, RpcConfig, RpcUnresolvedConfig } from "./Rpc";
import { WeakId } from "../common/WeakId";
import { mapObjectToArray } from "../common/object/mapObjectToArray";

export type RpcConfigResolver<T extends AnyRpc> = CustomResolver<
  RpcUnresolvedConfig<T>
> & {
  rpc: T;
};

export const RpcContextResolver = Resolver<AnyResolverMap>();
export const RpcConfigResolverMap = Resolver<
  Record<any, Resolver<RpcUnresolvedConfig<AnyRpc>>>
>();

export function RpcConfigResolver<T extends AnyRpc, U extends ResolverMap<any>>(
  rpc: T,
  resolvers: U,
  callback: (context: ResolveMapType<U>) => RpcUnresolvedConfig<T>,
  check?: (context) => void
): RpcConfigResolver<T> {
  // TOOD: save stack info

  const callStackInfo = new CallStackInfo(new Error(), __filename);
  // stackInfo = {};
  let resolver = _consumeMap(resolvers, context => {
    return RpcConfig(rpc, callback(context));
  });

  if (check) {
    resolver = Resolver.toCheck(resolver, check);
  }

  resolver = Resolver.catch(resolver, error => {
    throw new ResolveError(`by ${inspect(resolver)}, ${error.message}`);
  });

  resolver[inspect.custom] = () => {
    return `<RpcConfigResolver ${callStackInfo.description}>`;
  };
  Object.assign(resolver, {
    rpc,
  });

  return resolver as any;
}
