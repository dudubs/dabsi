import { Connection, EntityMetadata, ObjectType, Repository } from "typeorm";
import { ColumnMetadata } from "typeorm/metadata/ColumnMetadata";
import { entries } from "../../common/object/entries";
import { inspect } from "../../logging";
import { DataQueryBuilder } from "../data-query/DataQueryBuilder";
import { EntityDataExpToQebTranslator } from "./EntityDataExpToQebTranslator";
import { EntityRelation } from "../../typeorm/relations";
import { DataCursor } from "../DataCursor";
import { DataExp } from "../data-exp/DataExp";
import { DataFieldsTranslator } from "../DataFieldsTranslator";
import { DataTypeInfo } from "../DataTypeInfo";
import { EntityDataKey } from "./EntityDataKey";
import { EntityDataInfo, getEntityDataInfo } from "./EntityDataInfo";

export type EntityDataCursorBase = {
  typeInfo: DataTypeInfo;

  filter: DataExp<any>;

  parent: EntityDataCursorParent | undefined;

  relationKeys: {
    relation: EntityRelation;
    key: object;
  }[];

  columnKeys: { metadata: ColumnMetadata; key: any }[];
};

export type EntityDataCursorParent = EntityDataCursorBase & {
  relation: EntityRelation;
  relationKey: object;
};

export type EntityDataCursor = EntityDataCursorBase & {
  connection: Connection;

  cursor: DataCursor;

  repository: Repository<any>;

  entityInfo: EntityDataInfo;

  entityMetadata: EntityMetadata;
};

const __doNotTranslateFilter = false;

export namespace EntityDataCursor {
  export function create(
    connection: Connection,
    cursor: DataCursor,
    entityType: ObjectType<any>
  ): EntityDataCursor {
    let typeInfo = DataTypeInfo.get(entityType);
    let parent: EntityDataCursor["parent"] = undefined;

    for (const path of cursor.location) {
      updateTypeInfo(path.type);

      const relation = new EntityRelation(
        connection,
        typeInfo.type,
        path.propertyName,
        true
      );

      parent = {
        filter: __doNotTranslateFilter
          ? path.filter
          : new DataFieldsTranslator(cursor.selection.fields || {}).translate(
              path.filter
            ),
        typeInfo,
        parent,
        relation,
        relationKey: EntityDataKey.parse(
          relation.right.entityMetadata,
          path.key
        ),
        ...getChildKeys(typeInfo.type, path.keys),
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

    const entityMetadata = connection.getMetadata(typeInfo.type);

    return {
      connection,
      cursor,
      repository: connection.getRepository(typeInfo.type),
      typeInfo,

      filter: __doNotTranslateFilter
        ? cursor.filter
        : new DataFieldsTranslator(cursor.selection.fields || {}).translate(
            cursor.filter
          ),
      entityMetadata,
      entityInfo: getEntityDataInfo(entityMetadata),
      parent,
      ...getChildKeys(typeInfo.type, cursor.keys),
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

    function getChildKeys(
      entityType: Function,
      dataChildKeys: Record<string, any>
    ) {
      const columnKeys: EntityDataCursor["columnKeys"] = [];
      const relationKeys: EntityDataCursor["relationKeys"] = [];

      const EntityDataInfo = getEntityDataInfo(
        connection.getMetadata(entityType)
      );

      for (const [propertyName, value] of entries(dataChildKeys)) {
        const relation = EntityDataInfo.propertyNameToRelation[propertyName];
        if (relation) {
          const key = EntityDataKey.parse(relation.right.entityMetadata, value);
          relationKeys.push({ relation, key: key });
          continue;
        }

        const columnMetadata =
          EntityDataInfo.propertyNameToColumnMetadata[propertyName];
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

  export function createQueryBuilder(cursor: EntityDataCursor) {
    const qb = DataQueryBuilder.createRoot(
      cursor.repository.metadata.tableName
    );
    join(qb.query.alias, cursor);

    let schema = qb.query.alias;
    for (let path = cursor.parent; path; path = path.parent) {
      schema = path.relation.joinQeb("INNER", qb, schema, path.relationKey!);
      join(schema, path);
    }

    return qb;

    function join(
      schema: string,
      path: EntityDataCursorParent | EntityDataCursor
    ) {
      if (path.filter !== undefined) {
        qb.filter({
          $at: {
            [schema]: new EntityDataExpToQebTranslator(
              cursor.connection,
              path.typeInfo,
              qb,
              schema
            ).translate(path.filter),
          },
        });
      }
      for (const { relation, key } of path.relationKeys) {
        relation.joinQeb("INNER", qb, schema, key);
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
