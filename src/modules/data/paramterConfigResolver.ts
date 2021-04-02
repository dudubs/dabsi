import { Ticker } from "@dabsi/common/async/Ticker";
import { Awaitable } from "@dabsi/common/typings2/Async";
import { Constructor } from "@dabsi/common/typings2/Constructor";
import { DataContext } from "@dabsi/modules/data/context";
import { DataRowContext } from "@dabsi/modules/data/rowContext";
import { DataRowTicker } from "@dabsi/modules/data/rowTicker";
import { DataTicker } from "@dabsi/modules/data/ticker";

import RpcConfigFactoryResolver from "@dabsi/modules/rpc/configFactoryResolver";
import { RpcConfigResolver } from "@dabsi/modules/rpc/configResolver";
import { DataExp } from "@dabsi/typedata/exp/exp";
import { ResolvedMap, Resolver, ResolverMap } from "@dabsi/typedi";
import { ConfigFactory } from "@dabsi/typerpc/ConfigFactory";
import { AnyRpc } from "@dabsi/typerpc/Rpc";
import { RpcParameter } from "@dabsi/typerpc/rpc-parameter/RpcParameter";
import { RpcError } from "@dabsi/typerpc/RpcError";

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
): RpcConfigResolver<DataParameter> {
  return RpcConfigResolver(
    rpc,
    {
      rowTickerResolver: DataTicker,
      ticker: Ticker,
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
        const promise = config.check(rowTicker);
        c.ticker.push(() => promise);
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
