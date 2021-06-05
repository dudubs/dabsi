import { Constructor } from "@dabsi/common/typings2/Constructor";
import { DataParameter } from "@dabsi/modules/data/common/DataParameter";
import { DataRowContext } from "@dabsi/modules/data/DataRowContext";
import { DataRowTicker } from "@dabsi/modules/data/DataRowTicker";
import { DataTicker } from "@dabsi/modules/data/DataTicker";
import { RpcResolver } from "@dabsi/modules/rpc/RpcResolver";
import { DataExp } from "@dabsi/typedata/exp/exp";
import { Resolver } from "@dabsi/typedi";
import { ResolverDeps } from "@dabsi/typedi/consume";
import { Rpc } from "@dabsi/typerpc2";
import { createRpcHandler } from "@dabsi/typerpc2/createRpcHandler";
import { RpcError } from "@dabsi/typerpc2/RpcError";
import { RpcLocation } from "@dabsi/typerpc2/RpcLocation";

export function DataParameterResolver<T extends Rpc, U extends ResolverDeps, R>(
  rpcLocation: RpcLocation<DataParameter<T>>,
  rowType: Constructor<R>,
  optionsResolver?: Resolver<{
    filter?: DataExp<R>;
    check?(ticker: DataRowTicker<R>): void;
  }>
): RpcResolver<DataParameter<T>>;
export function DataParameterResolver(
  rpcLocation: RpcLocation<DataParameter<any>>,
  rowType,
  optionsResolver
) {
  return RpcResolver(
    rpcLocation,
    [
      Resolver.injector(
        {
          rowKey: DataRowContext.Key(rowType),
        },
        RpcResolver(rpcLocation.toParameterialLocation())
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
        const rowTicker = dataTicker.getRowTicker(rowType, rowKey);

        if (options?.filter !== undefined) {
          rowTicker.filter = { $and: [rowTicker.filter, options.filter] };
        }
        rowTicker.push(async row => {
          if (!row?.$key) {
            throw new RpcError(
              `Invalid data parameter ${rowType.name} #${rowKey}.`
            );
          }
        });

        options?.check?.(rowTicker);

        return createRpcHandler(
          rpcType,
          getConfigurator({
            rowKey: new (DataRowContext.Key(rowType))(rowKey),
          })
        );
      })
  );
}

// rpcResolver
