import {QueryBuilder} from "typeorm";
import {ColumnMetadata} from "typeorm/metadata/ColumnMetadata";
import {definedAt} from "../../common/object/defined";

export function _matchJoinColumns(joinColumns: ColumnMetadata[],
                                  leftSchema: string,
                                  rightSchema: string) {
    return joinColumns
        .map(jc => `${leftSchema}.${jc.databaseName}=${rightSchema}.${
            definedAt(jc, "referencedColumn").databaseName
        }`).join(" AND ")
}

