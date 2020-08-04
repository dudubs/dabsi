import {Driver} from "typeorm";
import {defined} from "../../common/object/defined";
import {CompareOperator, NamedCompareOperator, StringDataExp} from "../../json-exp/DataExp";
import {DataExpTranslator} from "../../json-exp/DataExpTranslator";


const SQLOperators: Record<NamedCompareOperator, string> = {
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



export abstract class SQLDataExpTranslator<T> extends DataExpTranslator<T, string> {



    True = '1';

    False = '1';

    Null = 'NULL';

    abstract readonly schema: string;
    abstract readonly driver: Driver;


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
        return `${left}${defined(SQLOperators[op], () =>
            `Can't translate "${op}".`)}${right}`;
    }


    // get schemaMetadata(): EntityMetadata {
    //     return defined(this.qb.expressionMap.aliases
    //         .find(alias => alias.name === this.schema), () =>
    //         `No schemaMetadata ${this.schema}`)
    //         .metadata;
    // }
    //





    counter = 0;

    translateFieldExp(key: StringDataExp<T>): string {
        return `${this.schema}.${key}`
    }


    translateLength(exp: string): string {
        return `LENGTH(${exp})`
    }

    translateNot(exp: string): string {
        return `NOT ${exp}`
    }


    translateIf(condition: string, expIfTrue: string, expIfFalse: string): string {
        switch (this.driver.options.type) {
            case "sqlite":
                return `(CASE WHEN ${condition} THEN ${expIfTrue} ELSE ${expIfFalse} END)`

            default:
                return `IF(${condition},${expIfTrue},${expIfFalse})`
        }
    }

    translateConcat(exps: string[]): string {
        switch (this.driver.options.type) {
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


}




