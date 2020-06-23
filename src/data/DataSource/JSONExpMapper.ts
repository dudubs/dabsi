import {JSONExp, JSONFieldKey, JSONNamedOperator, JSONPrimitive} from "../../json-exp/JSONExp";
import {JSONExpTranslator} from "../../json-exp/JSONExpTranslator";

export class JSONExpMapper<T> extends JSONExpTranslator<any, JSONExp<T>> {
    False: JSONExp<T> = false;
    True: JSONExp<T> = true;

    Null: JSONExp<T> = null;

    translateIfNull(exp: JSONExp<T>, alt_value: JSONExp<T>): JSONExp<T> {
        return {$ifNull:[exp,alt_value]};
    }

    translateIf(condition: JSONExp<T>, expIfTrue: JSONExp<T>, expIfFalse: JSONExp<T>): JSONExp<T> {
        return {$if: [condition, expIfTrue, expIfFalse]};
    }

    translateIsNull(exp: JSONExp<T>): JSONExp<T> {
        return {$isNull: exp};
    }

    translateIsNotNull(exp: JSONExp<T>): JSONExp<T> {
        return {$isNotNull: exp};
    }

    translateIs(key: string): JSONExp<T> {
        return {$is: key}
    }

    translateAll(exps: JSONExp<T>[]): JSONExp<T> {
        return {$and: exps};
    }

    translateAny(exps: JSONExp<T>[]): JSONExp<T> {
        return {$or: exps};
    }

    translateAt(key: string, exp: JSONExp<any>): JSONExp<T> {
        return <any>{$at: {[key]: exp}};
    }

    translateCompare(op: JSONNamedOperator, left: JSONExp<T>, right: JSONExp<T>): JSONExp<T> {
        return [left, op, right];
    }

    translateConcat(exps: JSONExp<T>[]): JSONExp<T> {
        return {$concat: exps};
    }

    translateCountExp(key: string, where: JSONExp<any>, maxCount: number): JSONExp<T> {
        return {
            $count: <any>{
                [key]: where
            }
        };
    }

    translateFieldExp(key: JSONFieldKey<T>): JSONExp<T> {
        return key;
    }

    translateFromExp(key: string, take: JSONExp<any>, where: JSONExp<any>): JSONExp<T> {
        return {
            $from: <any>{
                [key]: {
                    take,
                    where
                }
            }
        };
    }

    translateIn(where: JSONExp<T>, values: JSONExp<T>[]): JSONExp<T> {
        return [where, "$in", values];
    }


    translateLength(exp: JSONExp<T>): JSONExp<T> {
        return {$length: exp};
    }

    translateNot(exp: JSONExp<T>): JSONExp<T> {
        return {$not: exp};
    }

    translateValue(value: JSONPrimitive): JSONExp<T> {
        return {$value: value};
    }

}
