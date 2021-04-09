import { WeakMapFactory } from "@dabsi/common/map/mapFactory";
import { Constructor } from "@dabsi/common/typings2/Constructor";
import { DataRowTicker } from "@dabsi/modules/data/rowTicker";
import { DataTicker } from "@dabsi/modules/data/ticker";
import { CustomResolverFactory, Resolver, ResolverMap } from "@dabsi/typedi";

export type DataKeyContext = {
  new (key: string | null): { $key: string | null; rowType: Function };
};

export const DataKeyContext = WeakMapFactory(
  (rowType: Function): DataKeyContext => {
    class KeyContext {
      rowType = rowType;
      constructor(public $key: string | null) {}
    }
    Object.defineProperty(KeyContext, "name", {
      value: `DataKeyContext(${rowType.name})`,
    });
    return KeyContext;
  }
);

export function DataRowContext<T>(
  rowType: Constructor<T>
): CustomResolverFactory<DataRowTicker<T>> {
  return Resolver(
    [DataTicker, Resolver.optional(DataKeyContext(rowType))],
    (dataTicker, rowKey) => {
      return dataTicker.getRowTicker(rowType, rowKey?.$key || null);
    }
  );
}

DataRowContext.assign = (rowType, rowKey?: string): ResolverMap => {
  return Resolver.Context([new (DataKeyContext(rowType))(rowKey || null)]);
};
