import { mapObjectToArray } from "@dabsi/common/object/mapObjectToArray";
import { RpcResolverBuilder } from "@dabsi/modules/rpc/RpcResolverBuilder";
import { ConsumeResolver, Resolver } from "@dabsi/typedi";
import { ConsumeFactory, ResolverDeps } from "@dabsi/typedi/consume";
import { Rpc, RpcType } from "@dabsi/typerpc2";
import { ConfigFactory } from "@dabsi/typerpc2/GenericConfig";
import {
  RpcConfigurator,
  RpcMemberConfigurator,
} from "@dabsi/typerpc2/RpcConfig";
import { RpcChildKey, RpcMemberKey } from "@dabsi/typerpc2/RpcHandler";

// TODO: RpcResolver() -> Resolve handler by configurator. RpcConfigurator: || Handler..

export interface RpcResolver<T extends Rpc>
  extends ConsumeResolver<RpcConfigurator<T>> {
  rpcType: RpcType;
}

export interface RpcMemberResolver<T>
  extends ConsumeResolver<RpcMemberConfigurator<T>> {
  rpcType: RpcType;
  rpcMemberKey: string;
}

export type RpcResolverFactory<T extends Rpc> = {
  $createRpcResolver(rpcType: RpcType<T>): RpcResolver<T>;
};
export function RpcResolver<T extends Rpc>(
  rpcType: RpcType<T>
): Resolver<RpcConfigurator<T>>;

export function RpcResolver<T extends Rpc>(
  rpcType: RpcType<T>,
  memberConfiguratorResolverMap: {
    [K in RpcMemberKey<T>]?:
      | Resolver<RpcMemberConfigurator<T[K]>>
      | RpcResolverFactory<T[K]>;
  }
): any[];

export function RpcResolver<
  T extends Rpc,
  K extends RpcMemberKey<T>,
  U extends ResolverDeps
>(
  rpcType: RpcType<T>,
  rpcMemberKey: K,
  deps: U,
  memberConfiguratorFactory: ConsumeFactory<RpcMemberConfigurator<T[K]>, U>
): RpcMemberResolver<T[K]>;

export function RpcResolver<T extends Rpc, K extends RpcMemberKey<T>>(
  rpcType: RpcType<T>,
  rpcMemberKey: K
): Resolver<RpcMemberConfigurator<T[K]>>;

export function RpcResolver<T extends Rpc, U extends ResolverDeps>(
  rpcType: RpcType<T>,
  deps: U,
  factory: ConsumeFactory<RpcConfigurator<T>, U>
): RpcResolver<T>;

export function RpcResolver<T extends Rpc>(
  rpcType: RpcType<T>
): Resolver<RpcConfigurator<T>>;

export function RpcResolver(rpcType: RpcType, memberKeyOrDeps?, ...args): any {
  if (args.length === 0 && typeof memberKeyOrDeps === "object") {
    return mapObjectToArray(memberKeyOrDeps, (resolver, memberKey) => {
      if (typeof resolver.rpcType === "function") {
        throw new Error(`Can't override rpc-resolver type.`);
      }

      resolver.rpcType = rpcType;
      resolver.rpcMemberKey = memberKey;

      Object.setPrototypeOf(resolver, RpcResolver);
      return resolver;
    });
  }

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

  const resolver = Resolver(deps as [], factory) as RpcResolver<any>;

  Object.setPrototypeOf(resolver, RpcResolver);

  resolver.rpcType = rpcType;

  if (memberKey) {
    ((resolver as any) as RpcMemberResolver<any>).rpcMemberKey = memberKey;
  }
  return resolver;
}

export function isRpcResolver(
  o
): o is RpcResolver<any> | RpcMemberResolver<any> {
  return typeof o === "function" && o.isPrototypeOf(RpcResolver);
}
