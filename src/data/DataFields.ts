import {JSONExp, JSONExpType} from "../json-exp/JSONExp";

export const DataAll = "*";
export type DataAll = "*";

export type DataFields<T> = Record<string, JSONExp<T>>;

export type DataRow<T, F extends DataFields<T>> =
    { [K in keyof F]: JSONExpType<T, F[K]> };

