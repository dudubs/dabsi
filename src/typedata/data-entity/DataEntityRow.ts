import { Type } from "../../common/typings2/Type";
import { DataSelectionRow } from "../data-selection/DataSelectionRow";
import { DataRow } from "../DataRow";
import { DataSourceRow } from "../DataSourceRow";
import { DataEntitySource } from "./DataEntitySource";

export function DataEntityRow<T>(
  entityType: Type<T>,
  key: string
): DataRow<DataSelectionRow<T, { pick: [] }>> {
  return <any>(
    new DataSourceRow(DataEntitySource.create(entityType).filter({ $is: key }))
  );
}
