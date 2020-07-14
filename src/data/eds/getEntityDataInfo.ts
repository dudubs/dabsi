import {EntityMetadata, ValueTransformer} from "typeorm";
import {ColumnMetadata} from "typeorm/metadata/ColumnMetadata";
import {RelationMetadata} from "typeorm/metadata/RelationMetadata";
import {mapArrayToObject} from "../../common/array/mapArrayToObject";
import {WeakMapFactory} from "../../common/map/mapFactory";
import {setDefinedValue} from "../../common/object/setDefinedValue";
import {mergeValueTransformer} from "./mergeValueTransformer";


/*
    columns (data, relation)
    dataColumns
    relationColumn
 */
export const getEntityDataInfo = WeakMapFactory((metadata: EntityMetadata) => {

    const propertyNameToOneRelation: Record<string, RelationMetadata> = {};
    const propertyNameToRelationMetadata: Record<string, RelationMetadata> = {};
    const propertyNameToTransformer: Record<string, ValueTransformer> = {};
    const propertyNamesWithRelation = new Set();


    const dataColumns: ColumnMetadata[] = [];

    for (const column of metadata.columns) {

        if (!column.relationMetadata) {
            dataColumns.push(column);
        }

        setDefinedValue(propertyNameToTransformer, column.propertyName,
            Array.isArray(column.transformer) ?
                mergeValueTransformer(column.transformer) :
                column.transformer
        )
    }

    for (let relation of metadata.relations) {
        propertyNamesWithRelation.add(relation.propertyName);

        relation.propertyName && (
            propertyNameToRelationMetadata[relation.propertyName] = relation
        )
        ;
        if (relation.isManyToOne || relation.isOneToOne)
            propertyNameToOneRelation[relation.propertyName] =
                relation;
    }

    return {
        propertyNameToOneRelation,
        propertyNameToTransformer,
        propertyNamesWithRelation,
        propertyNameToRelationMetadata,
        primaryPropertyNameToIndex: mapArrayToObject(metadata.primaryColumns,
            (column, index) => [column.propertyName, index]),
        dataColumns

    }
})

