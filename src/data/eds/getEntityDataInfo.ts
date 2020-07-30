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

    // TODO: use EntityMetadata.propertyMap
    const propertyNameToRelationMetadata: Record<string, RelationMetadata> = {};
    const propertyNameToTransformer: Record<string, ValueTransformer> = {};
    const propertyNameToColumn: Record<string, ColumnMetadata> = {};
    const nonRelationColumnKeys: string[] = [];
    const dataColumns: ColumnMetadata[] = [];


    for (const column of metadata.columns) {

        propertyNameToColumn[column.propertyName] = column;


        if (!column.relationMetadata) {
            dataColumns.push(column);
            if (column.target === metadata.target || (

                (<Function>metadata.target).prototype
                instanceof
                (<Function>column.target)
            )) {
                nonRelationColumnKeys.push(column.propertyName)
            }
        }

        setDefinedValue(propertyNameToTransformer, column.propertyName,
            Array.isArray(column.transformer) ?
                mergeValueTransformer(column.transformer) :
                column.transformer
        )
    }

    for (let relation of metadata.relations) {
        propertyNameToRelationMetadata[relation.propertyName] = relation;
    }

    return {
        propertyNameToColumn,
        nonRelationColumnKeys,
        propertyNameToTransformer,

        propertyNameToRelationMetadata,
        primaryPropertyNameToIndex: mapArrayToObject(metadata.primaryColumns,
            (column, index) => [column.propertyName, index]),
        dataColumns,

    }
})

