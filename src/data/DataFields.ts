import {DataExp, DataExpType} from "../json-exp/DataExp";

export type DataFields<T> = Record<string, DataExp<T>>;

export type DataRow<T, F extends DataFields<T>> =
    { [K in keyof F]: DataExpType<T, F[K]> };

