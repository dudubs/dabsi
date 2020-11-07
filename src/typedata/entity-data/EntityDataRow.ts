import { Type } from "../../common/typings";
import { DataSelectionRow } from "../data-selection/DataSelectionRow";
import { DataRow } from "../DataRow";
import { DataSourceRow } from "../DataSourceRow";
import { EntityDataSource } from "./EntityDataSource";

export function EntityDataRow<T>(
  entityType: Type<T>,
  key: string
): DataRow<DataSelectionRow<T, { pick: [] }>> {
  return <any>(
    new DataSourceRow(EntityDataSource.create(entityType).filter({ $is: key }))
  );
}
