import { ArrayOrItem } from "@dabsi/common/array/ArrayOrItem";
import { mapObjectToArray } from "@dabsi/common/object/mapObjectToArray";
import { RpcResolverBuilder } from "@dabsi/modules/rpc/RpcResolverBuilder";
import { ConsumeResolver, Resolver } from "@dabsi/typedi";
import { ConsumeArgs, ResolverDeps } from "@dabsi/typedi/consume";
import { isRpcType, Rpc, RpcChild, RpcType } from "@dabsi/typerpc2";
import {
  RpcConfigurator,
  RpcMemberConfigurator,
} from "@dabsi/typerpc2/RpcConfig";
import { RpcMemberKey } from "@dabsi/typerpc2/RpcHandler";
import { RpcLocation } from "@dabsi/typerpc2/RpcLocation";

export type RpcResolverLike<T> = Resolver<RpcMemberConfigurator<T>>;

export type RpcResolverMap<T extends Rpc> = {
  [K in RpcMemberKey<T>]?: ArrayOrItem<
    | ((rpcLocation: RpcLocation<T[K]>) => RpcResolver<T[K]>)
    | (T[K] extends RpcChild<infer U> ? RpcResolverMap<U> : never)
  >;
};

export interface RpcResolver<T>
  extends ConsumeResolver<RpcMemberConfigurator<T>> {
  rpcLocation: RpcLocation<any>;
}

// --------------------------------

// inject (rpcTypeOrLocation)
// provide (rpcTypeOrLocation, ...consume)

export function RpcResolver<T extends Rpc>(
  rpcType: RpcType<T>
): RpcResolverLike<T>;

export function RpcResolver<T>(rpcLocation: RpcLocation<T>): RpcResolverLike<T>;

export function RpcResolver<T extends Rpc, U extends ResolverDeps>(
  rpcType: RpcType<T>,
  ...args: ConsumeArgs<RpcConfigurator<T>, U>
): RpcResolver<T>;

export function RpcResolver<T, U extends ResolverDeps>(
  rpcLocation: RpcLocation<T>,
  ...args: ConsumeArgs<RpcMemberConfigurator<T>, U>
): RpcResolver<T>;

export function RpcResolver<T extends Rpc>(
  rpcType: RpcType<T>,
  rpcResolverArg: RpcResolverMap<T>
): any[];

export function RpcResolver(rpcLocation, ...args): any {
  if (isRpcType(rpcLocation)) {
    rpcLocation = new RpcLocation(rpcLocation, []);
  }

  if (args.length === 0) {
    const getResolver = context =>
      Resolver.resolve(RpcResolverBuilder, context).getResolver(rpcLocation);
    return Resolver.create(
      context => Resolver.resolve(getResolver(context), context),
      context => Resolver.check(getResolver(context), context)
    );
  }

  if (args.length === 1) {
    if (typeof args[0] === "function") {
      return args[0](rpcLocation);
    }
    if (Array.isArray(args[0])) {
      return args[0].map(arg => RpcResolver(rpcLocation, arg));
    }
    return mapObjectToArray(args[0], (arg, memberKey) => {
      return RpcResolver(rpcLocation.at(memberKey), arg);
    });
  }

  const resolver = <RpcResolver<any>>ConsumeArgs(args as ConsumeArgs<any, any>);
  resolver.rpcLocation = rpcLocation;
  Object.setPrototypeOf(resolver, RpcResolver);
  return resolver;
}

export function isRpcResolver(o): o is RpcResolver<any> {
  return typeof o === "function" && o.isPrototypeOf(RpcResolver);
}
