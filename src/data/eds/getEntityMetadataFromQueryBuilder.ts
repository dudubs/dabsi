import {EntityMetadata, SelectQueryBuilder} from "typeorm";
import {defined} from "../../common/object/defined";

export function getEntityMetadataFromQueryBuilder(
    qb: SelectQueryBuilder<any>,
    aliasName: string
): EntityMetadata {
    return defined(
        defined(qb.expressionMap.aliases.find(alias => alias.name == aliasName),
            () => `No alias "${aliasName}".`)
            .metadata,
        () =>  `No metadata for alias "${aliasName}".`
    )
}
