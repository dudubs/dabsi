import { inspect } from "@dabsi/logging/inspect";
import { RpcResolverGenerator } from "@dabsi/modules/rpc/RpcResolverGenerator";
import { Consumer, Resolver } from "@dabsi/typedi";
import { ConsumeArgs, ResolverDeps } from "@dabsi/typedi/consume";
import { Rpc, RpcLocation } from "@dabsi/typerpc";
import { ConfigFactory } from "@dabsi/typerpc/GenericConfig";
import { RpcConfigurator } from "@dabsi/typerpc/RpcConfig";
import { RpcMemberHandler } from "@dabsi/typerpc/RpcHandler";
import { RpcTypeOrLocation } from "@dabsi/typerpc/RpcTypeOrLocation";

export type RpcLocationConfigurator<T> =
  //
  T extends Rpc
    ? RpcConfigurator<T>
    : // T
      ConfigFactory<RpcMemberHandler<T>>;

export interface RpcResolver<T> extends Consumer<RpcLocationConfigurator<T>> {
  rpcLocation: RpcLocation<T>;
  rpcOriginalResolver: Resolver<T>;
}

// ----------------------------------

export function RpcResolver<T, U extends ResolverDeps>(
  rpcTypeOrLocation: RpcTypeOrLocation<T>
): Resolver<RpcLocationConfigurator<T>>;

export function RpcResolver<T, U extends ResolverDeps>(
  rpcTypeOrLocation: RpcTypeOrLocation<T>,
  ...args: ConsumeArgs<RpcLocationConfigurator<T>, U>
): RpcResolver<T>;

export function RpcResolver(rpcTypeOrLocation?, ...args): any {
  const rpcLocation = RpcTypeOrLocation(rpcTypeOrLocation);

  if (args.length === 0) {
    return Resolver.forward(context =>
      Resolver
        //
        .resolve(RpcResolverGenerator, context)
        .getResolver(rpcLocation)
    );
  }

  if (args.length === 1) {
    throw new Error("use RpcResolverBuilder()");
  }

  if (args.length === 2) {
    return RpcResolver.bindToLocation(
      rpcLocation,
      ConsumeArgs(args as [{}, () => any])!
    );
  }

  throw new Error(`Invalid arguments ${inspect(args)}`);
}

// ----------------------------------

export const BaseRpcResolver: RpcResolver<any> = Object.setPrototypeOf(
  {
    [inspect.custom](this: RpcResolver<any>) {
      return `<RpcResolver ${this.rpcLocation.innerInspect()}>`;
    },
  },
  Function.prototype
) as any;

export namespace RpcResolver {
  export function bindToLocation<T>(
    rpcTypeOrLocation: RpcTypeOrLocation<T>,
    resolver: Resolver<RpcLocationConfigurator<T>>
  ): RpcResolver<T>;

  export function bindToLocation(rpcTypeOrLocation, resolver) {
    if ((<RpcResolver<any>>resolver).rpcLocation === rpcTypeOrLocation) {
      return resolver;
    }

    const rpcLocation = RpcTypeOrLocation(rpcTypeOrLocation);
    const originalResolver = resolver.rpcOriginalResolver || resolver;
    const boundResolver = Resolver.forward(
      () => originalResolver
    ) as RpcResolver<any>;

    boundResolver.rpcOriginalResolver = resolver;
    boundResolver.rpcLocation = rpcLocation;
    Object.setPrototypeOf(boundResolver, BaseRpcResolver);

    return boundResolver;
  }
}
