import {defined} from "../common/object/defined";
import {firstEntry} from "../common/object/firstEntry";
import {JSONOperator, JSONExpr} from "./JSONExpr";
import {JSONComplexExpr, JSONExprTranslator} from "./JSONExprTranslator";

export type StaticExpr<T> = (value: T) => any;

export const StaticOperators: Record<JSONOperator, any> = {
    equals: (a, b) => a === b,
    notEquals: (a, b) => a !== b,
    lessThan: (a, b) => a < b,
    lessThanOrEqual: (a, b) => a <= b,
    greaterThan: (a, b) => a > b,
    greaterThanOrEqual: (a, b) => a >= b,
    startsWith: (a, b) => String(a).startsWith(String(b)),
    endsWith: (a, b) => String(a).endsWith(String(b)),
    contains: (a, b) => String(a).indexOf(String(b)) > -1,
};

export class StaticExprTranslator<T> extends JSONExprTranslator<T, StaticExpr<T>> {


    translateLogical(all: boolean, exps: JSONExpr<T>[]): StaticExpr<T> {
        return value => {
            for (const exp of exps) {
                if (this.translate(exp)(value)) {
                    if (!all)
                        return true;
                }
                return all
            }
        };
    }

    translateComplex(c: JSONComplexExpr<T>): StaticExpr<T> {

        switch (c.type) {
            case "value":
                return () => c.value;
            case "field":
                return value => value[c.value];
            case "not":
                return value => !this.translate(c.value)(value);
            case "boolean":
                return () => c.value;
            case "at":
                const [key, expr] = defined(firstEntry(c.value));
                const get = this.translate(expr);
                return row => {
                    const unknownValue = row[key];
                    const value = Array.isArray(unknownValue) ? unknownValue[0] : unknownValue;
                    if (value == null)
                        return null;
                    return get(value);
                };
            case "is":
                return value => value === c.value;
            case "find":
                return row => {
                    const array = row[c.value.of];
                    const where = this.translate(<any>c.value.where);
                    const take = this.translate(<any>c.value.take);
                    if (Array.isArray(array)) {
                        const row = array.find(item => where(item));
                        if (c.value.take) {
                            return take(row)
                        }
                        return row;
                    }
                    return null;
                }
            case "concat":
                return value => c.value.map(e => this.translate(e)(value))
                    .join("")

        }

        return super.translateComplex(c);
    }


    translateCount<K extends keyof T>(key: K, where: JSONExpr<T[K]>, limit: number): StaticExpr<T> {
        return row => {
            const _where = where && new StaticExprTranslator<T[K]>().translate(where);
            const items = row[key];
            if (Array.isArray(items)) {
                if (_where) {
                    let count = 0;
                    for (const item of items) {
                        if (_where(item)) {
                            count++;
                            if (count === limit)
                                break;
                        }

                    }
                    return count;
                } else {
                    return items.length;
                }
            } else {
                return 0
            }
        };
    }

    translateCompare(op: JSONOperator, left: JSONExpr<T>, right: JSONExpr<T>): StaticExpr<T> {
        return value => {
            const leftValue = this.translate(left)(value);
            if (leftValue == null)
                return false;
            const rightValue = this.translate(right)(value);
            if (rightValue == null)
                return false;
            return StaticOperators[op](
                leftValue,
                rightValue
            );
        }
    }
}

export function StaticExpr<T>(value: T, expr: JSONExpr<T>): any {
    return new StaticExprTranslator<T>().translate(expr)(value)
}
