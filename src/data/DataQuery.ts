import {JSONExp} from "../json-exp/JSONExp";
import {DataItem} from "./DataItem";

export type DataOrder<T> = {
    by: JSONExp<T>,
    sort: "ASC" | "DESC",
    nulls?: "FIRST" | "LAST"
};


export type DataQuery<T> = DataFindOptions<T> & {

    count?: boolean;
}

export type DataFindOptions<T> = {

    filter?: JSONExp<T>;

    order?: DataOrder<T>[];

    skip?: number;

    take?: number;

};

export type DataQueryResult<T> = {
    count?: number,
    items: DataItem<T>[];
}

