import {JSONExp} from "../json-exp/JSONExp";
import {DataFields, DataRow} from "./DataFields";

export type DataSort<T> = {
    by: JSONExp<T>,
    type: "ASC" | "DESC",
    nulls?: "FIRST" | "LAST"
};

export class DataQuery<T, Fields extends DataFields<T>> {

    filter?: JSONExp<T> = undefined;

    order?: DataSort<T>[] = [];

    fields: Fields;

    skip?: number;

    take?: number;

    count?: boolean;
}

export type DataQueryItem<T, Fields extends DataFields<T>> =
    { key: string, row: DataRow<T, Fields> };

export type DataQueryResult<T, Fields extends DataFields<T>> = {
    count?: number,
    items: Array<DataQueryItem<T, Fields>>;
}
