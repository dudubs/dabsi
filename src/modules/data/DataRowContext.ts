import { Constructor } from "@dabsi/common/typings2/Constructor";
import { DataRowTicker } from "@dabsi/modules/data/DataRowTicker";
import { DataTicker } from "@dabsi/modules/data/DataTicker";
import { ConsumeResolver, Resolver } from "@dabsi/typedi";

export type DataRowContextKeyType = {
  rowType: Function;
  new (key: string | null): { $key: string | null };
};

export function DataRowContext<T>(
  rowType: Constructor<T>
): ConsumeResolver<DataRowTicker<T>> {
  return Resolver(
    [DataTicker, Resolver.optional(DataRowContext.Key(rowType))],
    (dataTicker, rowKey) => {
      return dataTicker.getRowTicker(rowType, rowKey?.$key || null);
    }
  );
}

DataRowContext.Key = function (rowType: Function) {
  class _ {
    static rowType = rowType;
    constructor(public $key: string | null) {}
  }
  Object.defineProperty(_, "name", {
    value: `<DataRowContext.Key ${rowType.name}>`,
  });
  return _;
};
