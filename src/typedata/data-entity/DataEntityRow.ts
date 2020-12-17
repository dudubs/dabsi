import { Type } from "@dabsi/common/typings2/Type";
import { DataSelectionRow } from "@dabsi/typedata/data-selection/DataSelectionRow";
import { DataRow } from "@dabsi/typedata/DataRow";
import { DataSourceRow } from "@dabsi/typedata/DataSourceRow";
import { DataEntitySource } from "@dabsi/typedata/data-entity/DataEntitySource";

export function DataEntityRow<T>(
  entityType: Type<T>,
  key: string
): DataRow<DataSelectionRow<T, { pick: [] }>> {
  return <any>(
    new DataSourceRow(DataEntitySource.create(entityType).filter({ $is: key }))
  );
}
