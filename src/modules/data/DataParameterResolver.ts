import AsyncProcess from "@dabsi/common/async/AsyncProcess";
import { Constructor } from "@dabsi/common/typings2/Constructor";
import { DataParameter } from "@dabsi/modules/data/common/DataParameter";
import DataContext, {
  getRowKeyParameter,
} from "@dabsi/modules/data/DataContext";
import { DataRowTicker } from "@dabsi/modules/data/DataRowTicker";
import { RpcResolver } from "@dabsi/modules/rpc/RpcResolver";
import { DataExp } from "@dabsi/typedata/exp/exp";
import { Resolver } from "@dabsi/typedi";
import { ResolverDeps } from "@dabsi/typedi/consume";
import { Rpc } from "@dabsi/typerpc";
import { createRpcHandler } from "@dabsi/typerpc/createRpcHandler";
import { RpcError } from "@dabsi/typerpc/RpcError";
import { RpcLocation } from "@dabsi/typerpc/RpcLocation";

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
  const RowKeyParameter = getRowKeyParameter(rowType);
  return RpcResolver(
    rpcLocation,

    {
      options: (optionsResolver || (() => null)) as Resolver<null | {
        filter?: DataExp<any>;
        check?(row: DataRowTicker<any>);
      }>,
      process: AsyncProcess,
      data: DataContext,
      getConfigurator: Resolver.injector(
        {
          rowKey: RowKeyParameter,
        },
        RpcResolver(rpcLocation.toParameterialLocation())
      ),
    },
    c => $ =>
      $((rpcType, rowKey) => {
        const rowTicker = c.data.getRow(rowType, rowKey);

        if (c.options?.filter !== undefined) {
          c.process.catch(async () => {
            const { filtered } = await rowTicker.pick({
              filtered: c.options!.filter,
            });
            if (!filtered) {
              throw new Error(
                `DataParameter is out of filter (${rowType.name}#${rowKey})`
              );
            }
          });
        }

        rowTicker.push(async row => {
          if (!row?.$key) {
            throw new RpcError(
              `Invalid data parameter ${rowType.name} #${rowKey}.`
            );
          }
        });

        c.options?.check?.(rowTicker);

        return createRpcHandler(
          rpcType,
          c.getConfigurator({
            rowKey: new RowKeyParameter(rowKey),
          })
        );
      })
  );
}

// rpcResolver
