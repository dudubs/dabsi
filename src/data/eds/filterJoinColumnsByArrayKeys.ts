import {EntityMetadata, SelectQueryBuilder} from "typeorm";
import {ColumnMetadata} from "typeorm/metadata/ColumnMetadata";
import {definedAt} from "../../common/object/definedAt";
import {ArrayKey} from "./ArrayKey";
import {createQbArrayParameter, createQbParameter} from "./createQueryBuilderParameter";
import {getEntityDataInfo} from "./getEntityDataInfo";


export function filterJoinColumnsByArrayKeys(
    qb: SelectQueryBuilder<any>,
    entityMetadata: EntityMetadata,
    joinSchema: string,
    joinColumns: ColumnMetadata[],
    keys: ArrayKey[],
): string {
    if (joinColumns.length !== entityMetadata.primaryColumns.length)
        throw new Error(`Can't join`)

    const {connection: {driver}} = entityMetadata;

    const entityDataInfo = getEntityDataInfo(entityMetadata);

    if (joinColumns.length === 1) {
        return `${joinSchema}.${driver.escape(
            joinColumns[0].databaseName
        )} IN (${
            createQbArrayParameter(
                qb,
                keys.map(key => key[
                    entityDataInfo.primaryPropertyNameToIndex[
                        definedAt(joinColumns[0], "referencedColumn").propertyName
                        ]
                    ]),
            )
        })`
    }

    return keys
        .toSeq().map(key => joinColumns
            .toSeq().map(column =>
                `${joinSchema}.${driver.escape(column.databaseName)}=${
                    createQbParameter(qb, key[
                        entityDataInfo.primaryPropertyNameToIndex[
                            definedAt(column, "referencedColumn").propertyName
                            ]
                        ])
                }`
            )
            .join(" AND ")
        )
        .join(" OR ")
}
