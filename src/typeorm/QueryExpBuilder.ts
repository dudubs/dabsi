import {Connection} from "typeorm/index";
import {entries} from "../common/object/entries";
import {hasKeys} from "../common/object/hasKeys";
import {keys} from "../common/object/keys";
import {DataKey} from "../data/DataItem";
import {ColumnLoader} from "../data/eds/QueryBuilderSelector";
import {DataExp} from "../json-exp/DataExp";
import {Query, QueryExp} from "./QueryExp";
import {SQLQueryTranslator} from "./SQLQueryTranslator";

export class QueryExpBuilder {

    constructor(
        public connection: Connection,
        public query: Query,
        public alias = "r_" + query.from
    ) {
    }

    get fields() {
        return this.query.fields || (this.query.fields = {});
    }

    get joins(): NonNullable<Query['joins']> {
        return this.query.joins || (this.query.joins = {});
    }

    get order(): NonNullable<Query['order']> {
        return this.query.order || (this.query.order = []);
    }

    join(alias: string, name: string,
         type: "LEFT" | "INNER",
         condition: DataExp<any>): this {

        if (this.joins[alias])
            throw new Error(`Can't override join ${name}`);
        this.joins[alias] = {type, condition, from: name}
        return this;
    }

    filter(exp: DataExp<any>): this {
        this.query.where = DataExp(this.query.where, exp);
        return this;
    }

    selectColumn(schema: string, name: string): ColumnLoader {
        return this.select(
            schema + '_c_' + name,
            {$at: {[schema]: name}}
        )
    }

    select(aliasName: string, selection: QueryExp): ColumnLoader {
        const prevSelection = this.fields[aliasName];
        if (prevSelection !== undefined) {
            if (!isDeepEqual(selection, prevSelection)) {
                throw new Error(`Can't override selection ${aliasName}.`)
            }
            return raw => raw[aliasName];
        }
        this.fields[aliasName] = selection;
        return raw => raw[aliasName]
    }

    getQueryAndParameters(): [string, any[]] {
        const parameters = [];
        const translator = new SQLQueryTranslator(
            parameters,
            this.connection,
            this.alias
        )

        let query = this.query;

        if (query.fields && hasKeys(query.fields)) {
            for (let [aliasName, selection] of entries(query.fields)) {

            }
        }
        return [translator.translateQuery(this.query), parameters]
    }

    getMany(): Promise<any> {
        const [query, parameters] = this.getQueryAndParameters();
        return this.connection.query(query, parameters)
    }
}


function isDeepEqual(a, b) {
    if (a === b)
        return true;
    if (typeof a !== typeof b) return false;
    if (Array.isArray(a) && Array.isArray(b)) {
        if (a.length !== b.length)
            return false;
        for (const [index, av] of a.entries()) {
            if (!isDeepEqual(av, b[index])) {
                return false
            }
        }
        return true;
    }


    for (const [ak, av] of entries(a)) {
        if (!isDeepEqual(av, b[ak])) {
            return false;
        }
    }
    for (const bk of keys(b)) {
        if (!(bk in a)) {
            return false;
        }
    }

    return true;


}
