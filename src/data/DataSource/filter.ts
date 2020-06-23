// select * exclude keys with fields
import {JSONExp} from "../../json-exp/JSONExp";
import {DataCursor} from "../DataCursor";
import {DataSource} from "./DataSource";

declare module "./DataSource" {
    interface DataSource<T> {
        filter: typeof filter;
    }
}

DataSource.prototype.filter = filter;

function filter<T>(this: DataSource<T>,
                   ...exps: JSONExp<T>[]): DataSource<T> {
    return this.withCursor(
        DataCursor.filter(this.cursor, exps)
    )

}
