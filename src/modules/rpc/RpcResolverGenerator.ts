import { defined } from "@dabsi/common/object/defined";
import { RpcResolverMap } from "@dabsi/modules/rpc/RpcResolverMap";
import { CustomResolver, Resolver } from "@dabsi/typedi";
import { Rpc, RpcType } from "@dabsi/typerpc2";
import { RpcConfigurator } from "@dabsi/typerpc2/RpcConfig";

export function RpcResolverGenerator<T extends Rpc>(
  rpcType: RpcType<T>
): CustomResolver<RpcConfigurator<T>> {
  return Resolver.forward(context =>
    defined(
      Resolver.resolve(RpcResolverMap, context).generateResolver(rpcType),
      () => `No resolver generator for ${rpcType.name}.`
    )
  );
}
