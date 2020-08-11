import {Connection} from "typeorm";
import {DataExp} from "../json-exp/DataExp";
import {Query, QueryExp} from "./QueryExp";
import {QueryExpTranslatorToSql} from "./QueryExpTranslatorToSql";
import {isDeepEqual} from "./utils/QueryExpBuilder";

export type ColumnLoader = (raw: object) => any;

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


    createTranslator() {
        return new QueryExpTranslatorToSql(
            [],
            this.connection,
            this.alias
        )
    }

    getQueryAndParameters(): [string, any[]] {
        const translator = this.createTranslator();
        return [translator.translateQuery(this.query),
            translator.parameters]
    }

    getMany(): Promise<any> {
        const [query, parameters] = this.getQueryAndParameters();
        return this.connection.query(query, parameters)
    }

    async count(): Promise<number> {
        const translator = this.createTranslator();
        const query = translator.translateQuery(this.query);

        return this.connection.query(`SELECT COUNT(*) value FROM (${query}) _rec`,
            translator.parameters).then(rows => {
            return rows[0]?.value ?? 0
        })
    }

    has(): Promise<boolean> {
        const translator = this.createTranslator();
        const query = `SELECT COUNT(*) value FROM (${
            translator.translateQuery({
                ...this.query,
                take: 1
            })
        }) _rec`;
        return this.connection.query(query, translator.parameters).then(rows => {
            return (rows[0]?.value ?? 0) > 0
        })
    }
}


