import { Constructor } from "@dabsi/common/typings2/Constructor";
import {
  AnyDataSelection,
  DataSelection,
} from "@dabsi/typedata/selection/selection";
import { DataSelectionRow } from "@dabsi/typedata/selection/row";
import { DataSource } from "@dabsi/typedata/source";
import { DataTypeInfo } from "@dabsi/typedata/typeInfo";

export interface DataSelector<T, S extends DataSelection<T>> {
  new (): DataSelectionRow<T, S>;
}

export function DataSelector<T, S extends DataSelection<T>>(
  type: Constructor<T>,
  selection: S
): DataSelector<T, S> {
  const typeInfo = DataTypeInfo.get(type);

  const newTypeInfo = {
    ...typeInfo,
    selection: DataSelection.merge(
      typeInfo.selection,
      selection as AnyDataSelection
    ),
  };
  Selector[DataTypeInfo.symbol] = newTypeInfo;

  Object.defineProperty(Selector, "name", {
    value: `DataSelector<${typeInfo.name}>`,
  });

  return <any>Selector;

  function Selector() {
    throw new Error();
  }
}
