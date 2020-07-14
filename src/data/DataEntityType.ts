import {DataItem} from "./DataItem";
import {DataSource} from "./DataSource";

export type  DataEntityType = {
    at(this: DataItem<any>, key: string): DataSource<any>
};

export function DataEntityType(source, baseType) {
    return Object.setPrototypeOf({...DataEntityType.prototype}, baseType ?? Object.prototype)
}

export type DataEntity<T> = DataItem<T> & {
    source: DataSource<T>,
    at
    save
    delete
    remove
}

// entities()
// entityOrFail()
