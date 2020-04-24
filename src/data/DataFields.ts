import {JSONExp, JSONExpType} from "../json-exp/JSONExp";

export const DataAll = "*";
export type DataAll = "*";

export type DataFields<T> = Record<string, JSONExp<T>> | DataAll | [Record<string, JSONExp<T>>];

export type DataMapFields<T> = Record<string, JSONExp<T>>;

export type DataMapRow<T, F extends DataMapFields<T>> =
    { [K in keyof F]: JSONExpType<T, F[K]> };

export type DataRow<T, F extends DataFields<T>> =
    F extends "*" ? T :
        F extends [DataMapFields<T>] ? DataMapRow<T, F[0]> & Omit<T, keyof F[0]> :
            F extends DataMapFields<T> ? DataMapRow<T, F> : never;

// "*"
