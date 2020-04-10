import {defined} from "../common/object/defined";
import {firstEntry} from "../common/object/firstEntry";
import {Union} from "../common/typings";
import {JSONExpr, JSONExprTypes, JSONOperator} from "./JSONExpr";

export type JSONComplexExpr<T> = Union<{
    [K in keyof JSONExprTypes<T>]: {
        type: K,
        value: JSONExprTypes<T>[K]
    }
}>;

export abstract class JSONExprTranslator<T, U> {

    abstract translateCompare(op: JSONOperator, left: JSONExpr<T>, right: JSONExpr<T>): U;

    abstract translateCount<K extends keyof T>(key: K, where: JSONExpr<T[K]>,
                                               limit: number): U;

    abstract translateLogical(all: boolean, exps: JSONExpr<T>[]): U;

    translateComplex(c: JSONComplexExpr<T>): U {
        switch (c.type) {
            case "all":
            case "any":
                if (1 >= c.value.length)
                    return this.translate(c.value[0]);

                return this.translateLogical(c.type === "all", c.value);

            case "count":
                if (typeof c.value === "string") {
                    return this.translateCount(c.value, undefined, 0);
                } else if (typeof c.value === "object") {
                    return this.translateCount(c.value.of,
                        <any>c.value.where,
                        c.value.limit ?? 0);
                }
        }
        throw new Error(`No translator for ${c.type}`);
    }

    translate(expr: JSONExpr<T>): U {
        switch (typeof expr) {
            case "undefined":
                return this.translate({boolean: true});

            case "string":
                return this.translate({field: expr});

            case "object":
                if (Array.isArray(expr)) {
                    const [left, op, right] = expr;
                    return this.translateCompare(op, left, right)
                } else if (typeof expr === "object") {
                    const [type, value] = defined(firstEntry(expr));
                    return this.translateComplex({type, value})
                }
        }
        throw new Error(`Can't translate ${JSON.stringify(expr)}`)
    }
}


