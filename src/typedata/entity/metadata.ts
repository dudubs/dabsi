import { mapArrayToObject } from "@dabsi/common/array/mapArrayToObject";
import { WeakMapFactory } from "@dabsi/common/map/mapFactory";
import { DataEntityRelation } from "@dabsi/typeorm/relations";
import { EntityMetadata } from "typeorm";
import { ColumnMetadata } from "typeorm/metadata/ColumnMetadata";
import { RelationMetadata } from "typeorm/metadata/RelationMetadata";

export type DataEntityMetadata = ReturnType<typeof getDataEntityMetadata>;

export const getDataEntityMetadata = WeakMapFactory(
  (metadata: EntityMetadata) => {
    const propertyRelationMetadataMap: Record<string, RelationMetadata> = {};
    const propertyColumnMetadataMap: Record<string, ColumnMetadata> = {};
    const notRelationColumnKeys: string[] = [];
    const propertyRelationMap: Record<string, DataEntityRelation> = {};

    for (const column of metadata.columns) {
      propertyColumnMetadataMap[column.propertyName] = column;
      if (!column.relationMetadata) {
        if (
          column.target === metadata.target ||
          (<Function>metadata.target).prototype instanceof
            <Function>column.target
        ) {
          notRelationColumnKeys.push(column.propertyName);
        }
      }
    }

    for (let relation of metadata.relations) {
      propertyRelationMetadataMap[relation.propertyName] = relation;
      propertyRelationMap[relation.propertyName] = new DataEntityRelation(
        metadata.connection,
        <Function>metadata.target,
        relation.propertyName,
        false
      );
    }

    return {
      propertyColumnMetadataMap,
      notRelationColumnKeys,
      propertyRelationMap,
      propertyRelationMetadataMap,
      primaryPropertyNameToIndex: mapArrayToObject(
        metadata.primaryColumns,
        (column, index) => [column.propertyName, index]
      ),
    };
  }
);
