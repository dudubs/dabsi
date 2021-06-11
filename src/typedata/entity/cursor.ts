import {
  Connection,
  EntityManager,
  EntityMetadata,
  ObjectType,
  QueryRunner,
  Repository,
} from "typeorm";
import { ColumnMetadata } from "typeorm/metadata/ColumnMetadata";
import { entries } from "@dabsi/common/object/entries";
import { DataEntityRelation } from "@dabsi/typeorm/relations";
import { DataExp } from "@dabsi/typedata/exp/exp";
import { DataQueryBuilder } from "@dabsi/typedata/query/builder";
import { DataCursor } from "@dabsi/typedata/cursor";
import { DataFieldsTranslator } from "@dabsi/typedata/fieldsTranslator";
import { DataTypeInfo } from "@dabsi/typedata/typeInfo";
import { DataEntityTranslator } from "@dabsi/typedata/entity/translator";
import {
  DataEntityMetadata,
  getDataEntityMetadata,
} from "@dabsi/typedata/entity/metadata";
import { DataEntityKey } from "@dabsi/typedata/entity/key";
import { DataQuery } from "@dabsi/typedata/query/exp";
import { getEntityMetadata } from "@dabsi/typedata/entity/typeormMetadata";

export type BaseDataEntityCursor = {
  typeInfo: DataTypeInfo;

  filter: DataExp<any> | undefined;

  parent: DataEntityCursorParent | undefined;

  relationKeys: {
    relation: DataEntityRelation;
    key: DataEntityKey;
  }[];

  columnKeys: { metadata: ColumnMetadata; key: any }[];
};

export type DataEntityCursorParent = BaseDataEntityCursor & {
  relation: DataEntityRelation;
  relationKey: DataEntityKey;
};

export type DataEntityCursor = BaseDataEntityCursor & {
  connection: Connection;

  cursor: DataCursor;

  // repository: Repository<any>;

  queryRunner: QueryRunner;

  entityInfo: DataEntityMetadata;

  entityManager: EntityManager;

  entityMetadata: EntityMetadata;
};

export namespace DataEntityCursor {
  export function create(
    queryRunner: QueryRunner,
    cursor: DataCursor,
    entityType: Function
  ): DataEntityCursor {
    const connection = queryRunner.connection;
    for (const propertyName of cursor.root) {
      const entityMetadata = getEntityMetadata(connection, entityType);
      const relationMetadata = entityMetadata.relations.find(
        r => r.propertyName === propertyName
      );
      entityType = <Function>relationMetadata!.type;
    }

    let typeInfo = DataTypeInfo.get(entityType);
    let parent: DataEntityCursor["parent"] = undefined;

    for (const path of cursor.location) {
      updateTypeInfo(path.type);

      const relation = new DataEntityRelation(
        connection,
        typeInfo.type,
        path.propertyName,
        true
      );

      parent = {
        filter: DataExp(
          new DataFieldsTranslator(cursor.selection.fields || {}).translate(
            path.filter
          ),
          path.keys.length ? { $is: path.keys } : undefined
        ),
        typeInfo,
        parent,
        relation,
        relationKey: DataEntityKey.parse(
          relation.right.entityMetadata,
          path.key
        ),

        ...getChildKeys(typeInfo.type, path.keyMap),
      };

      const entityType = relation.left.entityType;
      const relationTypeInfo = typeInfo.relations?.[path.propertyName];

      if (relationTypeInfo) {
        if (relationTypeInfo.type !== entityType) {
          throw new Error(`relation type is not left entity type.`);
        }
        typeInfo = relationTypeInfo;
      } else {
        typeInfo = DataTypeInfo.get(entityType);
      }
    }

    updateTypeInfo(cursor.type);

    const entityMetadata = getEntityMetadata(connection, typeInfo.type);

    return {
      connection,
      cursor,
      queryRunner,
      entityManager: connection.createEntityManager(queryRunner),
      typeInfo,

      filter: DataExp(
        new DataFieldsTranslator(cursor.selection.fields || {}).translate(
          cursor.filter
        ),
        cursor.keys.length ? { $is: cursor.keys } : undefined
      ),
      entityMetadata,
      entityInfo: getDataEntityMetadata(entityMetadata),
      parent,
      ...getChildKeys(typeInfo.type, cursor.keyMap),
    };

    function updateTypeInfo(childTypeName: string) {
      if (!childTypeName) return typeInfo;
      const childTypeInfo = typeInfo.children?.[childTypeName];
      if (!childTypeInfo)
        throw new Error(
          `No have childType "${childTypeName}" for "${typeInfo.name}".`
        );
      typeInfo = childTypeInfo;
    }

    function getChildKeys(entityType: Function, keyMap: Record<string, any>) {
      const columnKeys: DataEntityCursor["columnKeys"] = [];
      const relationKeys: DataEntityCursor["relationKeys"] = [];

      const DataEntityMetadata = getDataEntityMetadata(
        getEntityMetadata(connection, entityType)
      );

      for (const [propertyName, value] of entries(keyMap)) {
        const relation = DataEntityMetadata.propertyRelationMap[propertyName];
        if (relation) {
          const key = DataEntityKey.parse(relation.right.entityMetadata, value);
          relationKeys.push({
            relation,
            key,
          });
          continue;
        }

        const columnMetadata =
          DataEntityMetadata.propertyColumnMetadataMap[propertyName];
        if (columnMetadata) {
          columnKeys.push({ metadata: columnMetadata, key: value });
          continue;
        }
        throw new Error(`No have property ${entityType.name}.${propertyName}`);
      }

      return {
        columnKeys,
        relationKeys,
      };
    }
  }

  export function createFromConnection(
    connection: Connection,
    cursor: DataCursor,
    entityType: ObjectType<any>
  ): DataEntityCursor {
    return create(connection.createQueryRunner(), cursor, entityType);
  }

  export function buildQuery(cursor: DataEntityCursor): DataQuery {
    const query: DataQuery = {
      from: cursor.entityMetadata.tableName,
      alias: "r_" + cursor.entityMetadata.tableName,
    };
    const qb = new DataQueryBuilder(query);

    join(qb.query.alias, cursor);

    let schema = qb.query.alias;
    for (let path = cursor.parent; path; path = path.parent) {
      schema = path.relation.join(
        "INNER",
        qb,
        schema,
        path.relationKey.object!
      );
      join(schema, path);
    }

    return query;
    function join(
      schema: string,
      path: DataEntityCursorParent | DataEntityCursor
    ) {
      if (path.filter !== undefined) {
        qb.filter({
          $at: {
            [schema]: new DataEntityTranslator(
              cursor.connection,
              path.typeInfo,
              qb,
              schema
            ).translate(path.filter),
          },
        });
      }
      for (const { relation, key } of path.relationKeys) {
        relation.join("INNER", qb, schema, key.object);
      }
      qb.filter({
        $and: path.columnKeys.map(column => ({
          $at: {
            [schema]: [column.metadata.propertyName, "=", [column.key]],
          },
        })),
      });
    }
  }
}
