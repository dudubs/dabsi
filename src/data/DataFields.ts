import {DataExp, DataExpType} from "../json-exp/DataExp";

export type DataFields<T> = Record<string, DataExp<T>>;

export type DataFieldsRow<T, Fields> =
    { [K in keyof Fields]: DataExpType<T, Fields[K]> };

