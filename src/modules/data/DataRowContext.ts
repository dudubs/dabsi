import { WeakMapFactory } from "@dabsi/common/map/mapFactory";
import { Constructor } from "@dabsi/common/typings2/Constructor";
import { DataRowTicker } from "@dabsi/modules/data/DataRowTicker";
import { DataTicker } from "@dabsi/modules/data/DataTicker";
import { ConsumeResolver, Resolver, ResolverMap } from "@dabsi/typedi";

export type DataRowKeyContext = {
  new (key: string | null): { $key: string | null; rowType: Function };
};

export const DataRowKeyContext = WeakMapFactory(
  (rowType: Function): DataRowKeyContext => {
    class _ {
      rowType = rowType;
      constructor(public $key: string | null) {}
    }
    Object.defineProperty(_, "name", {
      value: `DataRowKeyContext(${rowType.name})`,
    });
    return _;
  }
);

export function DataRowContext<T>(
  rowType: Constructor<T>
): ConsumeResolver<DataRowTicker<T>> {
  return Resolver(
    [DataTicker, Resolver.optional(DataRowKeyContext(rowType))],
    (dataTicker, rowKey) => {
      return dataTicker.getRowTicker(rowType, rowKey?.$key || null);
    }
  );
}

DataRowContext.assign = (rowType, rowKey?: string): ResolverMap => {
  const rowKeyContext = DataRowKeyContext(rowType);
  return Resolver.Context.assign({}, [new rowKeyContext(rowKey || null)]);
};
