import { defined } from "@dabsi/common/object/defined";
import { RpcResolverLike } from "@dabsi/modules/rpc/RpcResolver";
import { RpcResolverBuilder } from "@dabsi/modules/rpc/RpcResolverBuilder";
import { ConsumeResolver, Resolver } from "@dabsi/typedi";
import { Rpc, RpcType } from "@dabsi/typerpc2";
import { RpcConfigurator } from "@dabsi/typerpc2/RpcConfig";
import { RpcTypeOrLocation } from "@dabsi/typerpc2/RpcTypeOrLocation";

export function RpcResolverGenerator<T>(
  rpcType: RpcTypeOrLocation<T>
): RpcResolverLike<T> {
  return Resolver.forward(context =>
    defined(
      Resolver.resolve(RpcResolverBuilder, context).generateResolver(rpcType),
      () => `No resolver generator for ${rpcType}.`
    )
  );
}
