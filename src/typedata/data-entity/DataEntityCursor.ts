import { Connection, EntityMetadata, ObjectType, Repository } from "typeorm";
import { ColumnMetadata } from "typeorm/metadata/ColumnMetadata";
import { entries } from "@dabsi/common/object/entries";
import { EntityRelation } from "@dabsi/typeorm/relations";
import { DataExp } from "@dabsi/typedata/data-exp/DataExp";
import { DataQueryBuilder } from "@dabsi/typedata/data-query/DataQueryBuilder";
import { DataCursor } from "@dabsi/typedata/DataCursor";
import { DataFieldsTranslator } from "@dabsi/typedata/DataFieldsTranslator";
import { DataTypeInfo } from "@dabsi/typedata/DataTypeInfo";
import { DataEntityExpTranslatorToDataQueryExp } from "@dabsi/typedata/data-entity/DataEntityExpTranslatorToDataQueryExp";
import {
  DataEntityInfo,
  getDataEntityInfo,
} from "@dabsi/typedata/data-entity/DataEntityInfo";
import { DataEntityKey } from "@dabsi/typedata/data-entity/DataEntityKey";

export type DataEntityCursorBase = {
  typeInfo: DataTypeInfo;

  filter: DataExp<any>;

  parent: DataEntityCursorParent | undefined;

  relationKeys: {
    relation: EntityRelation;
    key: DataEntityKey;
  }[];

  columnKeys: { metadata: ColumnMetadata; key: any }[];
};

export type DataEntityCursorParent = DataEntityCursorBase & {
  relation: EntityRelation;
  relationKey: DataEntityKey;
};

export type DataEntityCursor = DataEntityCursorBase & {
  connection: Connection;

  cursor: DataCursor;

  repository: Repository<any>;

  entityInfo: DataEntityInfo;

  entityMetadata: EntityMetadata;
};

const __doNotTranslateFilter = false;

export namespace DataEntityCursor {
  export function create(
    connection: Connection,
    cursor: DataCursor,
    entityType: ObjectType<any>
  ): DataEntityCursor {
    for (const propertyName of cursor.root) {
      const entityMetadata = connection.getMetadata(entityType);
      const relationMetadata = entityMetadata.relations.find(
        r => r.propertyName === propertyName
      );
      entityType = <Function>relationMetadata!.type;
    }

    let typeInfo = DataTypeInfo.get(entityType);
    let parent: DataEntityCursor["parent"] = undefined;

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
        relationKey: DataEntityKey.parse(
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
      entityInfo: getDataEntityInfo(entityMetadata),
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
      const columnKeys: DataEntityCursor["columnKeys"] = [];
      const relationKeys: DataEntityCursor["relationKeys"] = [];

      const DataEntityInfo = getDataEntityInfo(
        connection.getMetadata(entityType)
      );

      for (const [propertyName, value] of entries(dataChildKeys)) {
        const relation = DataEntityInfo.propertyNameToRelation[propertyName];
        if (relation) {
          const key = DataEntityKey.parse(relation.right.entityMetadata, value);
          relationKeys.push({
            relation,
            key,
          });
          continue;
        }

        const columnMetadata =
          DataEntityInfo.propertyNameToColumnMetadata[propertyName];
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

  export function createQueryBuilder(
    cursor: DataEntityCursor,
    aliasName?: string
  ) {
    const qb = DataQueryBuilder.createRoot(
      cursor.repository.metadata.tableName,
      aliasName
    );
    join(qb.query.alias, cursor);

    let schema = qb.query.alias;
    for (let path = cursor.parent; path; path = path.parent) {
      schema = path.relation.joinQeb(
        "INNER",
        qb,
        schema,
        path.relationKey.object!
      );
      join(schema, path);
    }

    return qb;

    function join(
      schema: string,
      path: DataEntityCursorParent | DataEntityCursor
    ) {
      if (path.filter !== undefined) {
        qb.filter({
          $at: {
            [schema]: new DataEntityExpTranslatorToDataQueryExp(
              cursor.connection,
              path.typeInfo,
              qb,
              schema
            ).translate(path.filter),
          },
        });
      }
      for (const { relation, key } of path.relationKeys) {
        relation.joinQeb("INNER", qb, schema, key.object);
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
