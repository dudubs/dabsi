// TODO: DataSelectExp

import {DataCursor} from "../DataCursor";
import {DataFields, DataRow} from "../DataFields";
import {DataSource} from "./DataSource";
import {parseSelectArgs} from "./parseSelectArgs";

/// DataSelector
declare module "./DataSource" {

    interface DataSource<T> {
        select: typeof select;
    }
}


DataSource.prototype.select = select;

// select keys
function select<T, K extends keyof T>
(this: DataSource<T>, keys: K[]):
    DataSource<Pick<T, K>>

// select keys with fields
function select<T, K extends keyof T, Fields extends DataFields<T>>
(this: DataSource<T>, keys: K[], fields: Fields):
    DataSource<Pick<T, K> & DataRow<T, Fields>>

// select fields
function select<T, Fields extends DataFields<T>>
(this: DataSource<T>, fields: Fields):
    DataSource<DataRow<T, Fields>>


function select(this: DataSource<any>,
                keysOrFields: string[] | DataFields<any>,
                maybeFields?: DataFields<any>): any {
    const {keys, fields} = parseSelectArgs({keysOrFields, maybeFields})
    return this.withCursor(
        DataCursor.extend(
            DataCursor.pick(this.cursor, keys),
            DataCursor.translateFields(this.cursor, fields)
        )
    )
}


