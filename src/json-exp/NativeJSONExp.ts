import {JSONExp, JSONExpTypes, JSONFieldKey, JSONNamedOperator, JSONPrimitive} from "./JSONExp";
import {JSONExpTranslator} from "./JSONExpTranslator";

export type NativeExp<T> = (value: T) => any;

const NativeOperators: Record<JSONNamedOperator, (a, b) => any> = {
    $equals: (a, b) => a === b,
    $notEquals: (a, b) => a !== b,
    $lessThan: (a, b) => a < b,
    $lessThanOrEqual: (a, b) => a <= b,
    $greaterThan: (a, b) => a > b,
    $greaterThanOrEqual: (a, b) => a >= b,
    $startsWith: (a, b) => String(a).startsWith(String(b)),
    $endsWith: (a, b) => String(a).endsWith(String(b)),
    $contains: (a, b) => String(a).indexOf(String(b)) > -1,
};

export class NativeJSONExpTranslator<T> extends JSONExpTranslator<T, NativeExp<T>> {

    constructor(
        public getRowId: (row) => string | number | undefined
    ) {
        super();
    }

    True = () => true;

    False = () => false;

    translateAll(exps: NativeExp<T>[]): NativeExp<T> {
        return value => {
            for (let exp of exps) {
                if (!exp(value))
                    return false;
            }
            return true;
        };
    }

    translateConcat(exps: NativeExp<T>[]): NativeExp<T> {
        return value => exps.map(exp => exp(value)).join()
    }

    translateAny(exps: NativeExp<T>[]): NativeExp<T> {
        return value => {
            for (let exp of exps) {
                if (exp(value))
                    return true;
            }
            return false;
        };
    }

    translateFromExp(key: string, take: JSONExp<any>, where: JSONExp<any>): NativeExp<T> {
        throw new Error()
    }

    translateFieldExp(key: JSONFieldKey<T>): NativeExp<T> {
        return value => value[key];
    }

    translateValue(value: JSONPrimitive): NativeExp<T> {
        return () => value
    }

    translateAt(key: string, expr: JSONExp<any>): NativeExp<T> {
        // @ts-ignore
        const get = this.translate(exp);
        return row => {
            const unknownValue = row[key];
            const value = Array.isArray(unknownValue) ? unknownValue[0] : unknownValue;
            if (value == null)
                return null;
            return get(value);
        };
    }


    translateCountExp(key: string, where: JSONExp<any>, maxCount: number): NativeExp<T> {
        return row => {
            // @ts-ignore
            const _where = where && this.translate(where);
            const items = row[key];
            if (Array.isArray(items)) {
                if (_where) {
                    let count = 0;
                    for (const item of items) {
                        if (_where(item)) {
                            count++;
                            if (count === maxCount)
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

    translateIs(exp: T): NativeExp<T> {
        const id = this.getRowId(exp);
        if (!id)
            throw new Error(`Not id for ${exp}`)
        return value => {
            return id === this.getRowId(exp)
        }
    }


    translateLength(exp: NativeExp<T>): NativeExp<T> {
        return value => String(exp(value) ?? "").length
    }

    translateNot(exp: NativeExp<T>): NativeExp<T> {
        return value => !exp(value)
    }

    translateCompare(op: JSONNamedOperator, left: NativeExp<T>, right: NativeExp<T>): NativeExp<T> {
        return value => {
            const leftValue = left(value);
            if (leftValue == null)
                return false;
            const rightValue = right(value);
            if (rightValue == null)
                return false;
            return NativeOperators[op](
                leftValue,
                rightValue
            );
        };
    }

    translateIn(where: NativeExp<T>, values: NativeExp<T>[]): NativeExp<T> {
        return value => {
            const left = where(value);
            for (let right of values) {
                if (right(value) === left) {
                    return true;
                }
            }
            return false;
        }
    }

}
