import { defined } from "../common/object/defined";
import { firstEntry } from "../common/object/firstEntry";
import { JSONExprTranslator } from "./JSONExprTranslator";
export const StaticOperators = {
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
export class StaticExprTranslator extends JSONExprTranslator {
    translateLogical(all, exps) {
        return value => {
            for (const exp of exps) {
                if (this.translate(exp)(value)) {
                    if (!all)
                        return true;
                }
                return all;
            }
        };
    }
    translateComplex(c) {
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
                    const where = this.translate(c.value.where);
                    const take = this.translate(c.value.take);
                    if (Array.isArray(array)) {
                        const row = array.find(item => where(item));
                        if (c.value.take) {
                            return take(row);
                        }
                        return row;
                    }
                    return null;
                };
            case "concat":
                return value => c.value.map(e => this.translate(e)(value))
                    .join("");
        }
        return super.translateComplex(c);
    }
    translateCount(key, where, limit) {
        return row => {
            const _where = where && new StaticExprTranslator().translate(where);
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
                }
                else {
                    return items.length;
                }
            }
            else {
                return 0;
            }
        };
    }
    translateCompare(op, left, right) {
        return value => {
            const leftValue = this.translate(left)(value);
            if (leftValue == null)
                return false;
            const rightValue = this.translate(right)(value);
            if (rightValue == null)
                return false;
            return StaticOperators[op](leftValue, rightValue);
        };
    }
}
export function StaticExpr(value, expr) {
    return new StaticExprTranslator().translate(expr)(value);
}
