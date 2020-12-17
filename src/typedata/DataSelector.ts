import { Constructor } from "@dabsi/common/typings2/Constructor";
import { Type } from "@dabsi/common/typings2/Type";
import {
  AnyDataSelection,
  DataSelection,
} from "@dabsi/typedata/data-selection/DataSelection";
import { DataSelectionRow } from "@dabsi/typedata/data-selection/DataSelectionRow";
import { DataSource } from "@dabsi/typedata/DataSource";
import { DataTypeInfo } from "@dabsi/typedata/DataTypeInfo";

export function DataSelector<T, S extends DataSelection<T>>(
  type: Constructor<T>,
  selection: S
): {
  new (): DataSelectionRow<T, S>;

  select(source: DataSource<T>): DataSource<DataSelectionRow<T, S>>;
} {
  const typeInfo = DataTypeInfo.get(type);

  Selector[DataTypeInfo.symbol] = {
    ...typeInfo,
    selection: DataSelection.merge(
      typeInfo.selection,
      selection as AnyDataSelection
    ),
  };

  Selector.select = function (source: DataSource<any>) {
    return source.updateCursor({
      selection: DataSelection.merge(source.cursor.selection, <any>selection),
    });
  };

  return <any>Selector;

  function Selector() {
    throw new Error();
  }
}
