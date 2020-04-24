import {ArrayTypeOrObject, KeysByValue} from "../common/typings";
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

    all(exps: NativeExp<T>[]): NativeExp<T> {
        return value => {
            for (let exp of exps) {
                if (!exp(value))
                    return false;
            }
            return true;
        };
    }

    concat(exps: NativeExp<T>[]): NativeExp<T> {
        return value => exps.map(exp => exp(value)).join()
    }

    any(exps: NativeExp<T>[]): NativeExp<T> {
        return value => {
            for (let exp of exps) {
                if (exp(value))
                    return true;
            }
            return false;
        };
    }

    translateFrom(key: string, take: JSONExp<any>, where: JSONExp<any>): NativeExp<T> {
        throw new Error()
    }

    translateField(key: JSONFieldKey<T>): NativeExp<T> {
        return value => value[key];
    }

    translateValue(value: JSONPrimitive): NativeExp<T> {
        return () => value
    }

    translateAt<K extends KeysByValue<T, object>>(key: K, exp: JSONExp<ArrayTypeOrObject<T[K]>>): NativeExp<T> {
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


    translateCount(key: string, where: JSONExp<any>, maxCount: number): NativeExp<T> {
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

    $is(exp: JSONExpTypes<T>["$is"]): NativeExp<T> {
        const id = this.getRowId(exp);
        if (!id)
            throw new Error(`Not id for ${exp}`)
        return value => {
            return id === this.getRowId(exp)
        }
    }

    $length(exp: JSONExpTypes<T>["$length"]): NativeExp<T> {
        return value => String(value ?? "").length
    }

    $not(exp: JSONExpTypes<T>["$not"]): NativeExp<T> {
        return value => !this.translate(exp)(value)
    }

    translateCompare(op: JSONNamedOperator, left: JSONExp<T>, right: JSONExp<T>): NativeExp<T> {
        return value => {
            const leftValue = this.translate(left)(value);
            if (leftValue == null)
                return false;
            const rightValue = this.translate(right)(value);
            if (rightValue == null)
                return false;
            return NativeOperators[op](
                leftValue,
                rightValue
            );
        }
    }

    translateIn(where: JSONExp<T>, values: JSONExp<T>[]): NativeExp<T> {
        return this.translate({
            $any: values.map((value): JSONExp<T> => [
                where,
                "$equals",
                value
            ])
        })
    }
}
