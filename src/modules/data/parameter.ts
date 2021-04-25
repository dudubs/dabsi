import { AsyncProcess2 } from "@dabsi/common/async/AsyncProcess2";
import { Awaitable } from "@dabsi/common/typings2/Async";
import { Constructor } from "@dabsi/common/typings2/Constructor";
import { DataRowContext } from "@dabsi/modules/data/rowContext";
import { DataRowTicker } from "@dabsi/modules/data/rowTicker";
import { DataTicker } from "@dabsi/modules/data/DataTicker";
import RpcConfigFactoryResolver from "@dabsi/modules/rpc/configFactoryResolver";
import { RpcResolver } from "@dabsi/modules/rpc/RpcResolver";
import { DataExp } from "@dabsi/typedata/exp/exp";
import { ResolvedMap, Resolver, ResolverMap } from "@dabsi/typedi";
import { ConfigFactory } from "@dabsi/old-typerpc/ConfigFactory";
import { AnyRpc } from "@dabsi/old-typerpc/Rpc";
import { RpcParameter } from "@dabsi/old-typerpc/rpc-parameter/rpc";
import { RpcError } from "@dabsi/old-typerpc/RpcError";

export type DataParameter = RpcParameter<{ Target: AnyRpc; Data: string }>;

export function DataParameterConfigResolver<T, U extends ResolverMap>(
  rpc: DataParameter,
  rowType: Constructor<T>,
  //
  resolverMap?: U,
  createConfig?: ConfigFactory<
    {
      filter?: DataExp<T>;
      check?(fetch: DataRowTicker<T>): Awaitable;
    },
    [ResolvedMap<U>]
  >
): RpcResolver<DataParameter> {
  return RpcResolver(
    rpc,
    {
      rowTickerResolver: DataTicker,
      process: AsyncProcess2,
      context: Resolver.object(resolverMap || {}),
      createTargetConfig: RpcConfigFactoryResolver(rpc.children.target, {
        context: DataRowContext.assign(rowType),
      }),
    },
    c => async ($, rowKey) => {
      if (!rowKey) {
        throw new RpcError(`No row key.`);
      }

      const rowTicker = c.rowTickerResolver.getRowTicker(rowType, rowKey);

      rowTicker.push(async row => {
        if (!row?.$key) {
          throw new RpcError(
            `Invalid data parameter ${rowType.name} #${rowKey}.`
          );
        }
      });

      const config = (await ConfigFactory(createConfig, [c.context])) || {};

      if (config?.filter) {
        rowTicker.filter = DataExp(rowTicker.filter, config.filter);
      }

      if (config?.check) {
        c.process.push(async () => config.check!(rowTicker));
      }

      return $(
        c.createTargetConfig(
          //
          DataRowContext.assign(rowType, rowKey)
        )
      );
    }
  );
}
