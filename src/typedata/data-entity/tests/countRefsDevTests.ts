import { logBeforeEach } from "@dabsi/jasmine/logBeforeEach";
import { formatSql } from "@dabsi/system-old/server/acl/formatSql";
import getTestDataConnection, {
  XEntity,
} from "@dabsi/typedata/data-entity/tests/getTestDataConnection";
import {
  ASource,
  BSource,
  CSource,
} from "@dabsi/typedata/data-entity/tests/utils";
import { DEntity } from "@dabsi/typedata/tests/BaseEntities";
import { AEntity } from "@dabsi/typeorm/relations/tests/TestEntities";
import { EntityMetadata } from "typeorm";

xit("", async () => {
  const row = await ASource.insert({});
  console.log("----");

  await row.update({ aText: "foo" });
});

xit("", async () => {
  const joins: string[] = [];

  const a1 = await ASource.insert({
    oneAToOneB: await BSource.insertKey({}),
    oneAToOneC: await CSource.insertKey({}),
  });

  await a1.at("manyAToManyB").insert({});
  await a1.at("manyAToManyB").insert({});

  await ASource.insertKey({
    // oneAToOneB: await BSource.insertKey({}),
    oneAToOneC: await CSource.insertKey({}),
  });

  await ASource.insertKey({
    oneAToOneB: await BSource.insertKey({}),
    // oneAToOneC: await CSource.insertKey({}),
  });

  await ASource.insertKey({
    // oneAToOneB: await BSource.insertKey({}),
    // oneAToOneC: await CSource.insertKey({}),
  });

  const entityType = AEntity;

  const connection = getTestDataConnection();
  const entityMetadata = connection.getMetadata(entityType);
  const escape = text => connection.driver.escape(text);
  const entitySchema = entityMetadata.tableName;

  const selects = [
    ...entityMetadata.primaryColumns
      .toSeq()
      .map(pc => `entityTable.${escape(pc.databaseName)}`),
  ];

  const countAliases: string[] = [];
  const countSelects: string[] = [];
  function getCountRefSql(
    entityMetadata: EntityMetadata,
    entitySchema: string
  ) {
    const escape = value => entityMetadata.connection.driver.escape(value);
    return entityMetadata.connection.entityMetadatas
      .toSeq()
      .flatMap(em => em.relations)
      .filter(rm => rm.isOwning)
      .filter(rm => rm.type === entityMetadata.target)
      .map(rm => {
        const [relationTableName, relationJoinColumns] = rm.joinTableName
          ? [rm.joinTableName, rm.inverseJoinColumns]
          : [rm.entityMetadata.tableName, rm.joinColumns];
        return `(SELECT COUNT(*) FROM ${escape(
          relationTableName
        )} AS _REL WHERE ${relationJoinColumns
          .toSeq()
          .map(
            jc =>
              `_REL.${jc.databaseName}=${escape(entitySchema)}.${
                jc.referencedColumn!.databaseName
              }`
          )
          .join(" AND ")})`;
      })
      .join(" + ");
  }

  connection.entityMetadatas
    .toSeq()
    .flatMap(em => em.relations)
    .filter(rm => rm.type === entityType)
    .filter(rm => rm.isOwning)

    .forEach(rm => {
      const relationSchema = `${rm.entityMetadata.tableName}_${rm.propertyName}`;
      const countAlias = "count:" + relationSchema;

      const [relationTableName, relationJoinColumns] = rm.joinTableName
        ? [rm.joinTableName, rm.inverseJoinColumns]
        : [rm.entityMetadata.tableName, rm.joinColumns];

      countAliases.push(countAlias);
      const sql = `(SELECT COUNT(*) FROM ${escape(
        relationTableName
      )} AS relTable WHERE ${relationJoinColumns
        .toSeq()
        .map(
          jc =>
            `relTable.${jc.databaseName}=entityTable.${
              jc.referencedColumn!.databaseName
            }`
        )
        .join(" AND ")})`;

      countSelects.push(sql);

      // selects.push(sql + ` AS ${escape(countAlias)}`);
    });

  selects.push(
    `(${getCountRefSql(entityMetadata, "entityTable")}) AS countRefs`
  );
  let sql = `SELECT ${selects.join(",")} FROM ${escape(
    entityMetadata.tableName
  )} AS entityTable ${joins.join(" ")}`;

  // sql = `SELECT *, (${countAliases
  //   .toSeq()
  //   .map(cn => `X.${escape(cn)}`)
  //   .join(" + ")}) as totalCountRefs FROM (${sql}) AS X`;

  console.log(formatSql(sql));

  console.log(await connection.query(sql));
});
