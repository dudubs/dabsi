import { EntityMetadata, ValueTransformer } from "typeorm";
import { ColumnMetadata } from "typeorm/metadata/ColumnMetadata";
import { RelationMetadata } from "typeorm/metadata/RelationMetadata";
import { mapArrayToObject } from "@dabsi/common/array/mapArrayToObject";
import { WeakMapFactory } from "@dabsi/common/map/mapFactory";
import { setDefinedValue } from "@dabsi/common/object/setDefinedValue";
import { EntityRelation } from "@dabsi/typeorm/relations";
import { mergeValueTransformer } from "@dabsi/typeorm/mergeValueTransformer";

/*
    columns (data, relation)
    dataColumns
    relationColumn
 */

export type DataEntityInfo = ReturnType<typeof getDataEntityInfo>;

export const getDataEntityInfo = WeakMapFactory((metadata: EntityMetadata) => {
  // TODO: use EntityMetadata.propertyMap
  const propertyNameToRelationMetadata: Record<string, RelationMetadata> = {};
  const propertyNameToTransformer: Record<string, ValueTransformer> = {};
  const propertyNameToColumnMetadata: Record<string, ColumnMetadata> = {};
  const nonRelationColumnKeys: string[] = [];
  const dataColumns: ColumnMetadata[] = [];
  const propertyNameToRelation: Record<string, EntityRelation> = {};

  for (const column of metadata.columns) {
    propertyNameToColumnMetadata[column.propertyName] = column;
    if (!column.relationMetadata) {
      dataColumns.push(column);
      if (
        column.target === metadata.target ||
        (<Function>metadata.target).prototype instanceof <Function>column.target
      ) {
        nonRelationColumnKeys.push(column.propertyName);
      }
    }
    setDefinedValue(
      propertyNameToTransformer,
      column.propertyName,
      Array.isArray(column.transformer)
        ? mergeValueTransformer(column.transformer)
        : column.transformer
    );
  }

  for (let relation of metadata.relations) {
    propertyNameToRelationMetadata[relation.propertyName] = relation;
    propertyNameToRelation[relation.propertyName] = new EntityRelation(
      metadata.connection,
      <Function>metadata.target,
      relation.propertyName,
      false
    );
  }

  return {
    propertyNameToColumnMetadata,
    nonRelationColumnKeys,
    propertyNameToTransformer,
    propertyNameToRelation,

    propertyNameToRelationMetadata,
    primaryPropertyNameToIndex: mapArrayToObject(
      metadata.primaryColumns,
      (column, index) => [column.propertyName, index]
    ),
    dataColumns,
  };
});
