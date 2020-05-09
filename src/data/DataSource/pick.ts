import {DataFields} from "../DataFields";
import {DataSource} from "./DataSource";


declare module "./DataSource" {

    interface DataSource<T> {
        pick: typeof _pick;
    }
}

DataSource.prototype.pick = _pick;

function _pick<T, K extends keyof T, Fields extends DataFields<T>>(
    this: DataSource<T>, keys: string & K):
    PickedDataSource<T, K> {

    throw new Error()
}

export type PickedDataSource<T, K extends keyof T> = DataSource<Pick<T, K>>;

/*
 */
