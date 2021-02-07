import { Type } from "@dabsi/common/typings2/Type";
import { DataSelectionRow } from "@dabsi/typedata/selection/row";
import { DataRow } from "@dabsi/typedata/row";
import { DataSourceRow } from "@dabsi/typedata/sourceRow";
import { DataEntitySource } from "@dabsi/typedata/entity/source";
import { Constructor } from "@dabsi/common/typings2/Constructor";

export function DataEntityRow<T>(
  entityType: Constructor<T>,
  key: string
): DataRow<DataSelectionRow<T, { pick: [] }>> {
  return <any>(
    new DataSourceRow(
      DataEntitySource.createFromConnection(entityType).filter({ $is: key })
    )
  );
}
