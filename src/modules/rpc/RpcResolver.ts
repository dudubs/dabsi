import defined from "@dabsi/common/object/defined";
import { inspect } from "@dabsi/logging/inspect";
import { RpcResolverGenerator } from "@dabsi/modules/rpc/RpcResolverGenerator";
import { ForwardResolver, Resolver } from "@dabsi/typedi";
import { ConsumeArgs, ResolverDeps } from "@dabsi/typedi/consume";
import { Rpc, RpcLocation } from "@dabsi/typerpc";
import { ConfigFactory } from "@dabsi/typerpc/GenericConfig";
import { RpcConfigurator } from "@dabsi/typerpc/RpcConfig";
import { RpcMemberHandler } from "@dabsi/typerpc/RpcHandler";
import { RpcTypeOrLocation } from "@dabsi/typerpc/RpcTypeOrLocation";

export class RpcBoundResolver<T>
  implements ForwardResolver<RpcConfiguratorAt<T>> {
  constructor(
    readonly location: RpcLocation<T>,
    readonly resolver: Resolver<RpcConfiguratorAt<T>>
  ) {}

  [Resolver.forwardSymbol](): Resolver<RpcConfiguratorAt<T>> {
    return this.resolver;
  }

  [inspect.custom]() {
    return `<RpcBoundResolver ${this.location.innerInspect()}>`;
  }
}

export type RpcConfiguratorAt<T> =
  //
  T extends Rpc
    ? RpcConfigurator<T>
    : // T
      ConfigFactory<RpcMemberHandler<T>>;

export type RpcResolver<T> = Resolver<RpcConfiguratorAt<T>>;

// ----------------------------------

export function RpcResolver<T, U extends ResolverDeps>(
  typeOrLocation: RpcTypeOrLocation<T>
): Resolver<RpcConfiguratorAt<T>>;

export function RpcResolver<T, U extends ResolverDeps>(
  typeOrLocation: RpcTypeOrLocation<T>,
  ...args: ConsumeArgs<RpcConfiguratorAt<T>, U>
): RpcBoundResolver<T>;

export function RpcResolver(typeOrLocation?, ...args): any {
  const location = RpcTypeOrLocation(typeOrLocation);

  if (args.length === 0) {
    return Resolver.forward(context =>
      Resolver
        //
        .resolve(RpcResolverGenerator, context)
        .getResolver(location)
    );
  }

  if (args.length === 1) {
    throw new Error("use RpcResolverBuilder()");
  }

  if (args.length === 2) {
    return new RpcBoundResolver(
      location,
      ConsumeArgs(args as [{}, () => any])!
    );
  }

  throw new Error(`Invalid arguments ${inspect(args)}`);
}
