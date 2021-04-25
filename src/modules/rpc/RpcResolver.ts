import { mapArrayToObject } from "@dabsi/common/array/mapArrayToObject";
import { mapObject } from "@dabsi/common/object/mapObject";
import { RpcResolverMap } from "@dabsi/modules/rpc/RpcResolverMap";
import { CustomResolver, Resolver, ResolverLike } from "@dabsi/typedi";
import { CustomResolverFn, ResolverDeps } from "@dabsi/typedi/custom";
import { Rpc, RpcType } from "@dabsi/typerpc2";
import { ConfigFactory } from "@dabsi/typerpc2/GenericConfig";
import { getRpcMetadata } from "@dabsi/typerpc2/getRpcMetadata";
import { BaseObjectInput, ObjectInput } from "@dabsi/typerpc2/object-input/rpc";
import { RpcConfigurator } from "@dabsi/typerpc2/RpcConfig";
import {
  RpcChildKey,
  RpcHandler,
  RpcMemberHandler,
  RpcMemberKey,
} from "@dabsi/typerpc2/RpcHandler";

const __isRpcResolver = Symbol("__isRpcResolver");

export interface RpcResolver<T extends Rpc>
  extends CustomResolver<RpcConfigurator<T>> {
  rpcType: RpcType<T>;
}

export interface RpcMemberResolver<T extends Rpc, K extends RpcMemberKey<T>>
  extends CustomResolver<ConfigFactory<RpcMemberHandler<T[K]>>> {
  rpcType: RpcType<T>;
  rpcMemberKey: K;
}

export function RpcResolver<T extends Rpc>(
  rpcType: RpcType<T>
): ResolverLike<RpcResolver<T>>;

export function RpcResolver<
  T extends Rpc,
  K extends RpcMemberKey<T>,
  U extends ResolverDeps
>(
  rpcType: RpcType<T>,
  rpcMemberKey: string & K,
  deps: U,
  factory: CustomResolverFn<ConfigFactory<RpcMemberHandler<T[K]>>, U>
): RpcMemberResolver<T, K>;

export function RpcResolver<T extends Rpc, K extends RpcMemberKey<T>>(
  rpcType: RpcType<T>,
  rpcMemberKey: K
): ResolverLike<RpcMemberResolver<T, K>>;

export function RpcResolver<T extends Rpc, U extends ResolverDeps>(
  rpcType: RpcType<T>,
  deps: U,
  factory: CustomResolverFn<RpcConfigurator<T>, U>
): RpcResolver<T>;

export function RpcResolver<T extends Rpc>(
  rpcType: RpcType<T>
): ResolverLike<RpcResolver<T>>;

export function RpcResolver(rpcType: RpcType, memberKeyOrDeps?, ...args) {
  let memberKey: string | undefined = undefined;
  let deps: any[];
  let factory;
  if (typeof memberKeyOrDeps === "string") {
    memberKey = memberKeyOrDeps;
    [deps, factory] = args;
  } else {
    deps = memberKeyOrDeps;
    [factory] = args;
  }

  if (!deps) {
    const getResolver = (context): Resolver => {
      const map = Resolver.resolve(RpcResolverMap, context);
      return memberKey
        ? map.getMemberResolver(rpcType, memberKey)
        : map.getResolver(rpcType);
    };
    return Resolver.create(
      context => Resolver.resolve<any>(getResolver(context), context),
      context => {
        Resolver.check(getResolver(context), context);
      }
    );
  }

  const resolver = Resolver.custom(deps as [], factory) as RpcResolver<any>;
  resolver.rpcType = rpcType;
  resolver[__isRpcResolver] = true;
  if (memberKey) {
    (resolver as RpcMemberResolver<any, any>).rpcMemberKey = memberKey;
  }
  return resolver;
}

export function isRpcResolver(
  o
): o is RpcResolver<any> | RpcMemberResolver<any, any> {
  return o?.[__isRpcResolver] === true;
}
