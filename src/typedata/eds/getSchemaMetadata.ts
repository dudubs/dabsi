import {EntityMetadata, SelectQueryBuilder} from "typeorm";
import {defined} from "../../common/object/defined";

export function getSchemaMetadata(
    qb: SelectQueryBuilder<any>,
    schema: string
): EntityMetadata {
    return defined(
        defined(qb.expressionMap.aliases.find(alias => alias.name == schema),
            () => `No alias "${schema}".`)
            .metadata,
        () =>  `No metadata for alias "${schema}".`
    )
}
