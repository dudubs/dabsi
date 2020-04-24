import {QueryBuilder} from "typeorm";
import {ColumnMetadata} from "typeorm/metadata/ColumnMetadata";
import {definedAt} from "../../common/object/defined";

export function _matchJoinColumns(joinColumns: ColumnMetadata[],
                                  alias: string,
                                  referenceAlias: string) {
    return joinColumns
        .map(jc => `${alias}.${jc.databaseName}=${referenceAlias}.${
            definedAt(jc, "referencedColumn").databaseName
        }`).join(" AND ")
}

export function _mergeQueryParameters(target: QueryBuilder<any>,
                                      source: QueryBuilder<any>) {
    target.setParameters({
        ...target.getParameters(),
        ...source.getParameters()
    })

}
