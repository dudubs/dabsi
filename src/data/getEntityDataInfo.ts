import {EntityMetadata, ValueTransformer} from "typeorm";
import {RelationMetadata} from "typeorm/metadata/RelationMetadata";
import {WeakMapFactory} from "../common/map/mapFactory";

export const getEntityDataInfo = WeakMapFactory((entityMetadata: EntityMetadata) => {

    const propertyNameToOneRelationMetadata: Record<string, RelationMetadata> = {};
    const propertyNameToTransformer: Record<string, ValueTransformer> = {};

    for (let column of entityMetadata.columns) {
        if (column.transformer) {
            if (Array.isArray(column.transformer)) {
                column.transformer.reduce((prev, next) => {
                    return {
                        to(value: any): any {
                            return next.to(prev.to(value))
                        },
                        from(value: any): any {
                            return prev.from(next.from(value))
                        }
                    }
                })
            } else {
                propertyNameToTransformer[column.propertyName] = column.transformer;
            }
        }
    }

    for (let relationMetadata of entityMetadata.relations) {
        if (relationMetadata.isManyToOne || relationMetadata.isOneToOne)
            propertyNameToOneRelationMetadata[relationMetadata.propertyName] =
                relationMetadata;
    }

    return {
        propertyNameToOneRelationMetadata,
        propertyNameToTransformer
    }
})
