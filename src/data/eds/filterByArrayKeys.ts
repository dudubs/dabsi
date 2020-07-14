import {EntityMetadata, SelectQueryBuilder} from "typeorm";
import {ColumnMetadata} from "typeorm/metadata/ColumnMetadata";
import {definedAt} from "../../common/object/definedAt";
import {ArrayKey} from "./ArrayKey";
import {getEntityDataInfo} from "./getEntityDataInfo";
import {createQueryBuilderParameter} from "./createQueryBuilderParameter";


export function filterByArrayKeys(
    qb: SelectQueryBuilder<any>,
    entityMetadata: EntityMetadata,
    joinSchema: string,
    joinColumns: ColumnMetadata[],
    keys: ArrayKey[],
): string {
    if (joinColumns.length !== entityMetadata.primaryColumns.length)
        throw new Error(`Can't join`)

    const {connection: {driver}} = entityMetadata;

    const info = getEntityDataInfo(entityMetadata);

    if (joinColumns.length === 1) {
        return `${joinSchema}.${driver.escape(
            joinColumns[0].databaseName
        )} IN (${
            createQueryBuilderParameter(
                qb,
                keys.map(key => key[
                    info.primaryPropertyNameToIndex[
                        definedAt(joinColumns[0], "referencedColumn").propertyName
                        ]
                    ]),
                true
            )
        })`
    }

    return keys
        .toSeq().map(key => joinColumns
            .toSeq().map(column =>
                `${joinSchema}.${driver.escape(column.databaseName)}=${
                    createQueryBuilderParameter(qb, key[
                        info.primaryPropertyNameToIndex[
                            definedAt(column, "referencedColumn").propertyName
                            ]
                        ])
                }`
            )
            .join(" AND ")
        )
        .join(" OR ")
}
