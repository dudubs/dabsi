import { SingleCall } from "@dabsi/common/patterns/SingleCall";
import { RpcResolverBuilder } from "@dabsi/modules/rpc/RpcResolverBuilder";
import { ConsumeResolver, Resolver, ResolverLike } from "@dabsi/typedi";
import { ConsumeFactory, ResolverDeps } from "@dabsi/typedi/consume";
import {
  Rpc,
  RpcContextualMember,
  RpcParametrialMember,
  RpcType,
} from "@dabsi/typerpc2";
import { createRpcHandler } from "@dabsi/typerpc2/createRpcHandler";
import { ConfigFactory } from "@dabsi/typerpc2/GenericConfig";
import {
  AnyRpcWithConfig,
  isRpcTypeWithConfig,
  RpcConfigurator,
} from "@dabsi/typerpc2/RpcConfig";
import {
  RpcHandler,
  RpcMemberHandler,
  RpcMemberKey,
} from "@dabsi/typerpc2/RpcHandler";

const __isRpcResolver = Symbol("__isRpcResolver");
// TODO: RpcResolver() -> Resolve handler by configurator. RpcConfigurator: || Handler..

export interface RpcResolver<T extends Rpc>
  extends ConsumeResolver<RpcConfigurator<T>> {
  rpcType: RpcType<T>;
}

export interface RpcMemberResolver<T extends Rpc, K extends RpcMemberKey<T>>
  extends ConsumeResolver<RpcMemberFactory<T[K]>> {
  rpcType: RpcType<T>;
  rpcMemberKey: K;
}

export type RpcMemberFactory<T> = ConfigFactory<RpcMemberHandler<T>>;

export function RpcResolver<T extends Rpc>(
  rpcType: RpcType<T>
): ResolverLike<RpcResolver<T>>;

export function RpcResolver<
  T extends Rpc,
  K extends RpcMemberKey<T>,
  U extends ResolverDeps
>(
  rpcType: RpcType<T>,
  rpcMemberKey: K,
  deps: U,
  factory: ConsumeFactory<RpcMemberFactory<T[K]>, U>
): RpcMemberResolver<T, K>;

export function RpcResolver<T extends Rpc, K extends RpcMemberKey<T>>(
  rpcType: RpcType<T>,
  rpcMemberKey: K
): ResolverLike<RpcMemberResolver<T, K>>;

export function RpcResolver<T extends Rpc, U extends ResolverDeps>(
  rpcType: RpcType<T>,
  deps: U,
  factory: ConsumeFactory<RpcConfigurator<T>, U>
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
      const map = Resolver.resolve(RpcResolverBuilder, context);
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

  const resolver = Resolver.consume(deps as [], factory) as RpcResolver<any>;

  resolver.rpcType = rpcType;
  resolver[__isRpcResolver] = true;
  if (memberKey) {
    ((resolver as any) as RpcMemberResolver<any, any>).rpcMemberKey = memberKey;
  }
  return resolver;
}

export function isRpcResolver(
  o
): o is RpcResolver<any> | RpcMemberResolver<any, any> {
  return o?.[__isRpcResolver] === true;
}
