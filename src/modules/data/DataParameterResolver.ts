import { Constructor } from "@dabsi/common/typings2/Constructor";
import { ExtractKeys } from "@dabsi/common/typings2/ExtractKeys";
import { DataParameter } from "@dabsi/modules/data/DataParameter";
import { DataRowTicker } from "@dabsi/modules/data/DataRowTicker";
import { DataTicker } from "@dabsi/modules/data/DataTicker";
import { RpcMemberResolver, RpcResolver } from "@dabsi/modules/rpc/RpcResolver";
import { DataExp } from "@dabsi/typedata/exp/exp";
import { Resolver } from "@dabsi/typedi";
import { ResolverDeps } from "@dabsi/typedi/consume";
import { Rpc, RpcMemberKey, RpcType } from "@dabsi/typerpc2";
import { createRpcHandler } from "@dabsi/typerpc2/createRpcHandler";
import { getChildRpcType } from "@dabsi/typerpc2/getRpcMetadata";
import { RpcError } from "@dabsi/typerpc2/RpcError";
import { RpcMembers } from "@dabsi/typerpc2/RpcMembers";

export function DataParameterResolver<
  T extends Rpc,
  U extends ResolverDeps,
  K extends RpcMemberKey<T>,
  R
>(
  rpcType: RpcType<T>,
  parametrialKey: K & ExtractKeys<T, DataParameter<any>>,
  rowType: Constructor<R>,
  optionsResolver?: Resolver<{
    filter?: DataExp<R>;
    check?(ticker: DataRowTicker<R>): void;
  }>
): RpcMemberResolver<T[K]>;
export function DataParameterResolver(
  rpcType,
  parametrialKey,
  rowType,
  optionsResolver
) {
  return RpcResolver(
    rpcType as RpcType<Rpc & Record<string, DataParameter<any>>>,
    parametrialKey,
    [
      Resolver.injector(
        {
          ticker: DataRowTicker,
        },
        RpcResolver(
          //
          <any>getChildRpcType(rpcType, parametrialKey)
        )
      ),
      DataTicker,
      optionsResolver || (() => null),
    ],
    (
      getConfigurator,
      dataTicker,
      options: { check?(ticker: DataRowTicker); filter? } | null
    ) => $ =>
      $((rpcType, rowKey) => {
        const ticker = dataTicker.getRowTicker(rowType, rowKey);

        if (options?.filter !== undefined) {
          ticker.filter = { $and: [ticker.filter, options.filter] };
        }
        ticker.push(async row => {
          if (!row?.$key) {
            throw new RpcError(
              `Invalid data parameter ${rowType.name} #${rowKey}.`
            );
          }
        });

        options?.check?.(ticker);

        return createRpcHandler(
          rpcType,
          getConfigurator({
            ticker,
          })
        );
      })
  );
}

// rpcResolver
