import { DataEntityKey } from "@dabsi/typedata/data-entity/DataEntityKey";
import { QueryRunner } from "typeorm";
import { getEntityKeySql } from "./getEntityKeySql";

export default async function (
  queryRunner: QueryRunner,
  entityType: Function,
  entityKey: DataEntityKey
) {
  const {
    connection,
    connection: { driver },
  } = queryRunner;

  const entityMetadata = connection.getMetadata(entityType);
  const entityKeyFilter = getEntityKeySql(entityMetadata, entityKey);

  const sql = `DELETE FROM ${driver.escape(entityMetadata.tableName)} WHERE ${
    entityKeyFilter.sql
  }`;

  await queryRunner.query(sql, entityKeyFilter.params);
}
