import { DataEntityKey } from "@dabsi/typedata/data-entity/DataEntityKey";
import { EntityMetadata } from "typeorm";

export function getEntityKeySql(
  { primaryColumns, connection: { driver } }: EntityMetadata,
  entityKey: DataEntityKey
) {
  return {
    sql: primaryColumns
      .toSeq()
      .map(column => `${driver.escape(column.databaseName)}=?`)
      .join(" AND "),
    params: primaryColumns
      .toSeq()
      .map(column => entityKey.object[column.propertyName])
      .toArray(),
  };
}
