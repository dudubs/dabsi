import { getDataEntityInfo } from "@dabsi/typedata/data-entity/DataEntityInfo";
import { DataEntityKey } from "@dabsi/typedata/data-entity/DataEntityKey";
import { ObjectLiteral, QueryRunner } from "typeorm";
import { getEntityKeySql } from "./getEntityKeySql";

export async function updateEntityRow(
  queryRunner: QueryRunner,
  entityType: Function,
  entityKey: DataEntityKey,
  row: ObjectLiteral
) {
  const {
    connection,
    connection: { driver },
  } = queryRunner;

  const columns = Object.keys(row);
  const entityMetadata = connection.getMetadata(entityType);
  const entityInfo = getDataEntityInfo(entityMetadata);
  const entityKeyFilter = getEntityKeySql(entityMetadata, entityKey);

  const sql = `UPDATE ${driver.escape(entityMetadata.tableName)} SET ${columns
    .toSeq()
    .map(
      column =>
        `${driver.escape(
          entityInfo.propertyDatabaseNameMap[column] || column
        )}=?`
    )
    .join(",")} WHERE ${entityKeyFilter.sql}`;

  await queryRunner.query(
    sql,
    columns
      .toSeq()
      .map(column => row[column])
      .concat(entityKeyFilter.params)
      .toArray()
  );
}
