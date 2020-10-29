import {DataRow} from "./DataRow";
import {DataSource} from "./DataSource";

export type  DataEntityType = {
    at(this: DataRow<any>, key: string): DataSource<any>
};

export function DataEntityType(source, baseType) {
    return Object.setPrototypeOf({...DataEntityType.prototype}, baseType ?? Object.prototype)
}

export type DataEntity<T> = DataRow<T> & {
    source: DataSource<T>,
    at
    save
    delete
    remove
}

// entities()
// entityOrFail()
