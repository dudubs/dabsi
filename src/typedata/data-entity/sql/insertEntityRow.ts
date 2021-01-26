import { DataEntityKey } from "@dabsi/typedata/data-entity/DataEntityKey";
import { ObjectLiteral, QueryRunner } from "typeorm";

export async function insertEntityRow(
  queryRunner: QueryRunner,
  entityType: Function,
  row: ObjectLiteral
) {
  const {
    connection,
    connection: { driver },
  } = queryRunner;
  const entityMetadata = connection.getMetadata(entityType);

  row = { ...row };
  Object.setPrototypeOf(row, entityType.prototype);
  entityMetadata.beforeInsertListeners.forEach(l => {
    l.execute(row);
  });

  const columns = Object.keys(row);
  const sql = `INSERT INTO ${driver.escape(entityMetadata.tableName)} ${
    columns.length
      ? `(${columns
          .toSeq()
          .map(x => driver.escape(x))
          .join(",")}) VALUES (${columns
          .toSeq()
          .map(() => "?")
          .join(",")})`
      : "DEFAULT VALUES"
  }`;
  const params = columns.map(column => row[column]);

  const lastId = await queryRunner.query(sql, params);

  const entityKeyObject = entityMetadata.primaryColumns
    .toSeq()
    .map(c => {
      return [
        c.propertyName,
        (row[c.propertyName] = row[c.propertyName] ?? lastId),
      ];
    })
    .fromEntrySeq()
    .toObject();

  return {
    object: entityKeyObject,
    text: DataEntityKey.stringify(entityMetadata, entityKeyObject),
  };
}
