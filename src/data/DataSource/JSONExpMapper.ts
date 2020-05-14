import {mapObject} from "../../common/object/mapObject";
import {JSONExp, JSONFieldKey, JSONNamedOperator, JSONPrimitive} from "../../json-exp/JSONExp";
import {JSONExpTranslator} from "../../json-exp/JSONExpTranslator";
import {DataFields} from "../DataFields";

export class JSONExpMapper<T> extends JSONExpTranslator<any, JSONExp<T>> {
    False: JSONExp<T> = false;
    True: JSONExp<T> = true;


    translateKey(key: string): JSONExp<T> {
        return {$key: key}
    }

    translateAll(exps: JSONExp<T>[]): JSONExp<T> {
        return {$all: exps};
    }

    translateAny(exps: JSONExp<T>[]): JSONExp<T> {
        return {$any: exps};
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

    translateIs(exp: any): JSONExp<T> {
        return {$is: exp};
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
