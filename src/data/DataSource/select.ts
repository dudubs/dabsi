import {DataFields, DataRow} from "../DataFields";
import {DataSource} from "./DataSource";

declare module "./DataSource" {
    interface DataSource<T> {
        select: typeof select;
        extend: typeof extend;
    }
}


DataSource.prototype.select = select;
DataSource.prototype.extend = extend;

// select keys
function select<T, K extends keyof T>
(this: DataSource<T>, keys: K[]):
    DataSource<Omit<T, K>>

// select keys with fields
function select<T, K extends keyof T, Fields extends DataFields<T>>
(this: DataSource<T>, keys: K[], fields: Fields):
    DataSource<Omit<T, K> & DataRow<T, Fields>>

// select fields
function select<T, Fields extends DataFields<T>>
(this: DataSource<T>, fields: Fields):
    DataSource<DataRow<T, Fields>>


function select(this: DataSource<any>,
                keysOrFields: string[] | DataFields<any>,
                maybeFields?: DataFields<any>): any {
    const {keys, fields} = parseSelectArgs({keysOrFields, maybeFields})
    return this.withCursor(this.cursor.pick(keys).extend(fields))
}


// select * exclude keys with fields
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
    return this.withCursor(this.cursor.omit(keys).extend(fields))
}


function parseSelectArgs({keysOrFields, maybeFields}): {
    fields: DataFields<any>,
    keys: string[]
} {
    if (Array.isArray(keysOrFields)) {
        return {keys: keysOrFields, fields: maybeFields ?? {}}
    } else {
        return {keys: [], fields: keysOrFields}
    }
}
