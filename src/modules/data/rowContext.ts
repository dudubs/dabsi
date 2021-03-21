import { WeakMapFactory } from "@dabsi/common/map/mapFactory";
import { Constructor } from "@dabsi/common/typings2/Constructor";
import { DataRowTicker } from "@dabsi/modules/data/rowTicker";
import { DataTicker } from "@dabsi/modules/data/ticker";
import { CustomResolver, Resolver, ResolverMap } from "@dabsi/typedi";

// TODO: getRowTickerResolver

const getRowKeyResolver = WeakMapFactory(() => Resolver.token<string>());

export function DataRowContext<T>(
  rowType: Constructor<T>
): CustomResolver<DataRowTicker<T>> {
  return Resolver.consume(
    [DataTicker, Resolver.try(getRowKeyResolver(rowType))],
    (ticker, rowKey) => {
      return ticker.getRowTicker(rowType, rowKey || null);
    }
  );
}

DataRowContext.provide = (rowType, rowKey?: string): ResolverMap => {
  return getRowKeyResolver(rowType).provide(rowKey);
};
