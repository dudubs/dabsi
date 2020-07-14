// select * exclude keys with fields
import {DataExp} from "../../json-exp/DataExp";
import {DataSource} from "./DataSource";


declare module "./DataSource" {
    interface DataSource<T> {
        filter: typeof filter;
    }
}

DataSource.prototype.filter = filter;

function filter<T>(this: DataSource<T>,
                   ...exps: DataExp<T>[]): DataSource<T> {
    const filter = DataExp({$and: exps});
    if (typeof filter === "undefined")
        return this;
    return this.withCursor({
        ...this.cursor,
        filter: DataExp(this.cursor.filter, filter)
    })

}
