import { defined } from "@dabsi/common/object/defined";
import { RpcResolverBuilder } from "@dabsi/modules/rpc/RpcResolverBuilder";
import { ConsumeResolver, Resolver } from "@dabsi/typedi";
import { Rpc, RpcType } from "@dabsi/typerpc2";
import { RpcConfigurator } from "@dabsi/typerpc2/RpcConfig";

export function RpcResolverGenerator<T extends Rpc>(
  rpcType: RpcType<T>
): ConsumeResolver<RpcConfigurator<T>> {
  return Resolver.forward(context =>
    defined(
      Resolver.resolve(RpcResolverBuilder, context).generateResolver(rpcType),
      () => `No resolver generator for ${rpcType.name}.`
    )
  );
}
