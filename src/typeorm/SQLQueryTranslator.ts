import {strict} from "assert";
import {Connection, SelectQueryBuilder} from "typeorm/index";
import {entries} from "../common/object/entries";
import {DataExp, Parameter} from "../json-exp/DataExp";
import {SQLDataExpTranslator} from "./exp/SQLDataExpTranslator";
import {Query, QueryExpTypes} from "./QueryExp";


export type SelectExpTranslateMethod<T> = {
    [K in keyof QueryExpTypes]: (
        exp: QueryExpTypes[K]
    ) => T
}
    ;

// TODO: MongoQueryTranslator;

export class SQLQueryTranslator extends SQLDataExpTranslator<any>
    implements SelectExpTranslateMethod<string> {

    constructor(
        public parameters: any[],
        public connection: Connection,
        public schema: string
    ) {
        super();
    }


    get driver() {
        return this.connection.driver
    }

    $count(exp: QueryExpTypes["$count"]): string {
        return this.translateCount(exp)
    }

    $has(exp: QueryExpTypes["$has"]): string {
        return this.translateHas(false, exp)
    }

    $notHas(exp: QueryExpTypes["$notHas"]): string {
        return this.translateHas(true, exp)
    }

    $query(exp: QueryExpTypes["$query"]): string {
        return this.translateQuery(exp);
    }

    protected escape(name: string) {
        this.driver.escape(name)
    }

    translateQuerySelect(query: Query) {
        let sql = "";
        for (let [aliasName, selection] of entries(query.fields)) {
            sql += (sql ? ", " : "")
                + this.translate(selection)
                + ' AS ' + this.escape(aliasName)
        }
        return sql || "*"
    }

    translateQueryJoins(query: Query) {
        let sql = "";
        for (let [aliasName, join] of entries(query.joins)) {
            if (sql) {
                sql += ", ";
            }
            switch (join.type) {
                case "LEFT":
                case "INNER":
                    sql += join.type + " JOIN";
                    break;
                default:
                    throw new Error(`Invalid join type: ${join.type}`)
            }
            sql += " " + join.from + " AS " + aliasName;

            if (join.condition !== undefined) {
                sql += " ON " + this.translate(join.condition)
            }
        }
        return sql;
    }

    translateQuery(query: Query): string {

        return (
            "SELECT " + this.translateQuerySelect(query)
            + " FROM " + this.escape(query.from) + " AS " + this.schema
            + this.translateQueryJoins(query)
            + (query.where !== undefined ? " WHERE " + this.translate(query.where) : "")
            + (query.order?.length ? " ORDER BY " + query.order.toSeq()
                .map(order => {
                    let sql = this.translate(order.by);
                    switch (order.sort) {
                        case "ASC":
                        case "DESC":
                            sql += " " + order.sort;
                            break;
                        default:
                            throw new Error(`Invalid query order sort: ${order.sort}`)
                    }
                    switch (order.nulls) {
                        case "FIRST":
                        case "LAST":
                            sql += " NULLS " + order.nulls
                            break;
                        case undefined:
                            break;
                        default:
                            throw new Error(`Invalid query order nulls: ${order.nulls}`)
                    }
                    return sql;
                })
                .join(", ") : "")
            + new SelectQueryBuilderHelper(this.connection).translatePosition(
                query.skip,
                query.take
            )
        )

    }

    translateCount(query: Query): string {
        return `(SELECT COUNT(*) value FROM (${this.translateQuery(query)}) _count)`
    }

    translateHas(inverse: boolean, query: Query): string {
        return this.translateCompare(
            inverse ? '$equals' : '$greaterThan',
            this.translateCount({
                ...query,
                take: 1
            }),
            '0'
        )
    }

    translateParameter(value: Parameter): string {
        this.parameters.push(value);
        return "?";
    }

    translateAt(key: string, exp: DataExp<any>): string {
        return new SQLQueryTranslator(
            this.parameters,
            this.connection,
            key).translate(exp)
    }

    translateAs(childKey: string, exp: DataExp<any>): string {
        throw new Error()
    }

    translateCountAt(propertyName: string, subExp: DataExp<any>): string {
        throw new Error()
    }

    translateHasAt(inverse: boolean, propertyName: string, exp: DataExp<any>): string {
        throw new Error()
    }

    translateIs(inverse: boolean, keys: string[]): string {
        throw new Error()
    }


}


class SelectQueryBuilderHelper extends SelectQueryBuilder<any> {

    translatePosition(skip: number | undefined, take: number | undefined): string {
        this.expressionMap.take = take;
        this.expressionMap.skip = skip;
        return this.createLimitOffsetExpression()
    }
}

