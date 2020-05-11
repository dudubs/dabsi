import {JSONExp} from "../json-exp/JSONExp";
import {DataFields, DataRow} from "./DataFields";
import {DataItem} from "./DataItem";

export type DataOrder<T> = {
    by: JSONExp<T>,
    sort: "ASC" | "DESC",
    nulls?: "FIRST" | "LAST"
};

export class DataQuery<T, Fields extends DataFields<T>> {

    keys?: string[]

    filter?: JSONExp<T> = undefined;

    order?: DataOrder<T>[] = [];

    fields: Fields;

    skip?: number;

    take?: number;

    count?: boolean;
}

export type DataFieldsItem<T, Fields extends DataFields<T>> =
    DataItem<DataRow<T, Fields>>;

export type DataQueryResult<T, Fields extends DataFields<T>> = {
    count?: number,
    items: Array<DataFieldsItem<T, Fields>>;
}
