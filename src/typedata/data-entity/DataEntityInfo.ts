import { mapArrayToObject } from "@dabsi/common/array/mapArrayToObject";
import { WeakMapFactory } from "@dabsi/common/map/mapFactory";
import { mergeValueTransformer } from "@dabsi/typeorm/mergeValueTransformer";
import { DataEntityRelation } from "@dabsi/typeorm/relations";
import { EntityMetadata, ValueTransformer } from "typeorm";
import { ColumnMetadata } from "typeorm/metadata/ColumnMetadata";
import { RelationMetadata } from "typeorm/metadata/RelationMetadata";

/*
    columns (data, relation)
    dataColumns
    relationColumn
 */

export type DataEntityInfo = ReturnType<typeof getDataEntityInfo>;

export const getDataEntityInfo = WeakMapFactory((metadata: EntityMetadata) => {
  // TODO: use EntityMetadata.propertyMap
  const propertyRelationMapMetadata: Record<string, RelationMetadata> = {};
  const propertyNameToTransformer: Record<string, ValueTransformer> = {};
  const propertyNameToColumnMetadata: Record<string, ColumnMetadata> = {};
  const nonRelationColumnKeys: string[] = [];
  const dataColumns: ColumnMetadata[] = [];
  const propertyRelationMap: Record<string, DataEntityRelation> = {};

  const propertyDatabaseNameMap: Record<string, string> = {};

  for (const column of metadata.columns) {
    propertyDatabaseNameMap[column.propertyName] = column.databaseName;

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

    const transformer = Array.isArray(column.transformer)
      ? mergeValueTransformer(column.transformer)
      : column.transformer;

    if (transformer !== undefined) {
      propertyNameToTransformer[column.propertyName] = transformer;
    }
  }

  for (let relation of metadata.relations) {
    propertyRelationMapMetadata[relation.propertyName] = relation;
    propertyRelationMap[relation.propertyName] = new DataEntityRelation(
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
    propertyRelationMap,
    propertyDatabaseNameMap,
    propertyRelationMapMetadata,
    primaryPropertyNameToIndex: mapArrayToObject(
      metadata.primaryColumns,
      (column, index) => [column.propertyName, index]
    ),
    dataColumns,
  };
});
