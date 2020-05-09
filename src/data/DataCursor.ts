import {JSONExp} from "../json-exp/JSONExp";
import {DataFields} from "./DataFields";
import {DataItem} from "./DataItem";
import {DataFieldsItem} from "./DataQuery";
import {DataSource} from "./DataSource";

export interface DataCursorInit<T> {

    fields: Record<string, {
        loader: (data) => any,
        expression: JSONExp<T>
    }>;
}

export interface DefaultDataCursInit {
    fields: {};
}

export class DataCursor<T, Fields extends DataFields<T>> {

    constructor(
        public source: DataSource<T>,
        public fields: Fields
    ) {


    }

    async getOne(): Promise<DataFieldsItem<T, Fields>> {
        throw new Error()
    }

    async getMany() {

    }
}

