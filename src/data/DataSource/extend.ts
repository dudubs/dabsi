// select * exclude keys with fields
import {DataCursor} from "../DataCursor";
import {DataFields, DataRow} from "../DataFields";
import {DataSource} from "./DataSource";
import {parseSelectArgs} from "./parseSelectArgs";

declare module "./DataSource" {
    interface DataSource<T> {
        extend: typeof extend;
    }
}


DataSource.prototype.extend = extend;

function extend<T, K extends keyof T, Fields extends DataFields<T>>
(this: DataSource<T>, keys: K[], fields: Fields):
    DataSource<Omit<T, K> & DataRow<T, Fields>>
// select * exclude keys
function extend<T, K extends keyof T>
(this: DataSource<T>, keys: K[]):
    DataSource<Omit<T, K>>
// select * with fields
function extend<T, Fields extends DataFields<T>>
(this: DataSource<T>, fields: Fields):
    DataSource<T & DataRow<T, Fields>>
function extend(this: DataSource<any>,
                keysOrFields: string[] | DataFields<any>,
                maybeFields?: DataFields<any>): DataSource<any> {
    const {keys, fields} = parseSelectArgs({keysOrFields, maybeFields});
    return this.withCursor(
        DataCursor.extend(
            DataCursor.omit(this.cursor, keys),
            DataCursor.translateFields(this.cursor, fields)
        )
    )
}
