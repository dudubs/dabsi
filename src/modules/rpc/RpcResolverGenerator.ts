import { defined } from "@dabsi/common/object/defined";
import { RpcLocationConfigurator } from "@dabsi/modules/rpc/RpcResolver";
import { RpcResolverBuilder } from "@dabsi/modules/rpc/RpcResolverBuilder";
import { Resolver } from "@dabsi/typedi";
import { RpcTypeOrLocation } from "@dabsi/typerpc2/RpcTypeOrLocation";

export function RpcResolverGenerator<T>(
  rpcType: RpcTypeOrLocation<T>
): Resolver<RpcLocationConfigurator<T>> {
  return Resolver.forward(context =>
    defined(
      Resolver.resolve(RpcResolverBuilder, context).generateResolver(rpcType),
      () => `No resolver generator for ${rpcType}.`
    )
  );
}
