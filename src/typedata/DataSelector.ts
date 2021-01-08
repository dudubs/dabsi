import { Constructor } from "@dabsi/common/typings2/Constructor";
import {
  AnyDataSelection,
  DataSelection,
} from "@dabsi/typedata/data-selection/DataSelection";
import { DataSelectionRow } from "@dabsi/typedata/data-selection/DataSelectionRow";
import { DataSource } from "@dabsi/typedata/DataSource";
import { DataTypeInfo } from "@dabsi/typedata/DataTypeInfo";

export interface DataSelector<T, S extends DataSelection<T>> {
  new (): DataSelectionRow<T, S>;

  select(selection: DataSelection<T>): void;
}

export function DataSelector<T, S extends DataSelection<T>>(
  type: Constructor<T>,
  selection: S
): DataSelector<T, S> {
  const typeInfo = DataTypeInfo.get(type);

  const newTypeInfo = (Selector[DataTypeInfo.symbol] = {
    ...typeInfo,
    selection: DataSelection.merge(
      typeInfo.selection,
      selection as AnyDataSelection
    ),
  });

  Selector.select = function (selection) {
    Selector[DataTypeInfo.symbol] = {
      ...newTypeInfo,
      selection: DataSelection.merge(newTypeInfo.selection, selection),
    };
  };

  return <any>Selector;

  function Selector() {
    throw new Error();
  }
}
