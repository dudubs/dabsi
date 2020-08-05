import {Connection, SelectQueryBuilder} from "typeorm/index";
import {defined} from "../../common/object/defined";
import {entries} from "../../common/object/entries";
import {CompareOperator, DataExp, NamedCompareOperator, Parameter, StringDataExp} from "../../json-exp/DataExp";
import {DataExpTranslator} from "../../json-exp/DataExpTranslator";
import {Query} from "../QueryExp";


const SqlOperators: Record<NamedCompareOperator, string> = {
    $equals: '=',
    $notEquals: '!=',
    $lessThan: '<',
    $lessThanOrEqual: '<=',
    $greaterThan: '>',
    $greaterThanOrEqual: '>=',

    $startsWith: ' LIKE ',
    $endsWith: ' LIKE ',
    $contains: ' LIKE ',

    $notStartsWith: ' NOT LIKE ',
    $notEndsWith: ' NOT LIKE ',
    $notContains: ' NOT LIKE '
};


// TODO: cancel
export abstract class DataExpTranslatorToSql<T> extends DataExpTranslator<T, string> {


    True = '1';

    False = '1';

    Null = 'NULL';

    abstract readonly schema: string;

    abstract readonly connection: Connection;

    protected escape(name: string): string {
        return this.connection.driver.escape(name)
    }

    translateIsNull(inverse: boolean, exp: string): string {
        return `${exp} IS${inverse ? " NOT" : ""} NULL`;
    }

    translateAnd(exps: string[]): string {
        exps =
            // optimization
            exps.filter(exp => exp !== this.True)
        if (1 >= exps.length)
            return exps[0] ?? this.True;
        return `(${exps.join(' AND ')})`
    }

    translateOr(exps: string[]): string {
        // optimization
        for (const exp of exps) {
            if (exp === this.True) {
                return exp;
            }
        }
        if (1 >= exps.length)
            return exps[0] ?? this.True;
        return `(${exps.join(' OR ')})`
    }

    translateCompare(op: CompareOperator, left: string, right: string): string {
        switch (op) {
            case "$startsWith":
            case "$notStartsWith":
                right = this.translateConcat([right, "'%'"]);
                break;

            case "$endsWith":
            case "$notEndsWith":
                right = this.translateConcat(["'%'", right]);
                break;

            case "$contains":
            case "$notContains":
                right = this.translateConcat(["'%'", right, "'%'"]);
                break;
        }
        return `${left}${defined(SqlOperators[op], () =>
            `Can't translate "${op}".`)}${right}`;
    }


    counter = 0;

    translateFieldExp(key: StringDataExp<T>): string {
        return `${this.escape(this.schema)}.${this.escape(key)}`
    }


    translateLength(exp: string): string {
        return `LENGTH(${exp})`
    }

    translateNot(exp: string): string {
        return `NOT ${exp}`
    }


    translateIf(condition: string, expIfTrue: string, expIfFalse: string): string {
        switch (this.connection.driver.options.type) {
            case "sqlite":
                return `(CASE WHEN ${condition} THEN ${expIfTrue} ELSE ${expIfFalse} END)`

            default:
                return `IF(${condition},${expIfTrue},${expIfFalse})`
        }
    }

    translateConcat(exps: string[]): string {
        switch (this.connection.driver.options.type) {
            case "sqlite":
                return `(${exps.join("||")})`;
            default:
                return `CONCAT(${exps.join(",")})`
        }
    }


    translateIn(inverse: boolean, where: string, values: string[]): string {
        return `${where}${inverse ? " NOT" : ""} IN (${
            values.join(",")
        })`
    }

    translateIfNull(exp: string, alt_value: string): string {
        return `IFNULL(${exp},${alt_value})`
    }


    translateAs(childKey: string, exp: DataExp<any>): string {
        throw new Error('Not support.')
    }

    translateCountAt(propertyName: string, subExp: DataExp<any>): string {
        throw new Error('Not support.')
    }

    translateHasAt(inverse: boolean, propertyName: string, exp: DataExp<any>): string {
        throw new Error('Not support.')
    }

    translateIs(inverse: boolean, keys: string[]): string {
        throw new Error('Not support.')
    }


    translateCount(query: Query): string {
        return `(SELECT COUNT(*) AS value FROM (${
            this.translateQuery(query)
        }) AS _rec)`
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

            switch (join.type) {
                case "LEFT":
                case "INNER":
                    sql += " " + join.type + " JOIN";
                    break;
                default:
                    throw new Error(`Invalid join type: ${join.type}`)
            }
            sql += " " + this.escape(join.from) + " AS " + this.escape(aliasName);

            if (join.condition !== undefined) {
                sql += " ON " + this.translate(join.condition)
            }
        }
        return sql;
    }


    translateQuery(query: Query): string {

        return (
            "SELECT " + this.translateQuerySelect(query)
            + " FROM " + this.escape(query.from) + " AS " + this.escape(query.as ?? this.schema)
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
}


class SelectQueryBuilderHelper extends SelectQueryBuilder<any> {

    translatePosition(skip: number | undefined, take: number | undefined): string {
        this.expressionMap.take = take;
        this.expressionMap.skip = skip;
        return this.createLimitOffsetExpression()
    }
}

