import {SelectQueryBuilder} from "typeorm";
import {defined} from "../common/object/defined";
import {firstEntry} from "../common/object/firstEntry";
import {JSONValueExpr, JSONExpr, JSONOperator} from "./JSONExpr";
import {JSONComplexExpr, JSONExprTranslator} from "./JSONExprTranslator";

let counter = 0;

export class SQLExprTranslator<T> extends JSONExprTranslator<T, string> {
    constructor(public qb: SelectQueryBuilder<T>,
                public schema: string) {
        super();

    }

    translateLogical(all: boolean, exps: JSONExpr<T>[]): string {
        return `(${
            exps.map(exp => this.translate(exp))
                .join(all ? " AND " : " OR ")
        })`
    }

    translateCompare(op: JSONOperator, left: JSONExpr<T>, right: JSONExpr<T>): string {
        return "";
    }

    translateCount<K extends keyof T>(key: K, where: JSONExpr<T[K]>, limit: number): string {
        return "";
    }


    translateValue(value: JSONValueExpr): string {
        const key = `value_${counter++}`
        this.qb.setParameter(key, value);
        return ':' + key;
    }

    /*

        at: { users }
        atArray: { of:"users", where: "", take: "" }
     */
    translateComplex(c: JSONComplexExpr<T>): string {
        switch (c.type) {
            case "not":
                return `NOT ${this.translate(c.value)}`;
            case "concat":
                return this.translateConcat(c.value);
            case "value":
                return this.translateValue(c.value);
            case "is":
                const metadata = defined(this.qb.expressionMap.mainAlias?.metadata,
                    'No metadata');

                return this.translate({
                    all: metadata.primaryColumns.map(
                        primaryColumn => [
                            <keyof T>primaryColumn.databaseName,
                            "equals",
                            {value: c.value[defined(primaryColumn.referencedColumn).propertyName]}
                        ]
                    )
                });

            case "at":
                const [key, expr] = defined(firstEntry(c.value));
                const schema = this.schema + '_' + key;
                if (this.qb.expressionMap.joinAttributes.find(j => j.alias.name === schema))
                    this.qb.leftJoin(`${this.schema}.${key}`, schema);
                return new SQLExprTranslator(this.qb, schema).translateValue(expr)

        }
        return super.translateComplex(c);
    }

    translateConcat(exps: JSONExpr<T>[]) {
        if (this.qb.connection.driver.options.type === "sqlite") {
            return `(${exps.map(exp => this.translate(exp)).join("||")})`
        } else {
            return `CONCAT(${exps.map(exp => this.translate(exp)).join(",")})`
        }
    }
}

