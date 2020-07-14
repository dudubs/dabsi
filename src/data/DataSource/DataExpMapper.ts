import {DataExp, StringDataExp, NamedCompareOperator, Parameter} from "../../json-exp/DataExp";
import {DataExpTranslator} from "../../json-exp/DataExpTranslator";

export class DataExpMapper<T> extends DataExpTranslator<any, DataExp<T>> {
    False: DataExp<T> = false;
    True: DataExp<T> = true;

    Null: DataExp<T> = null;

    translateIfNull(exp: DataExp<T>, alt_value: DataExp<T>): DataExp<T> {
        return {$ifNull: [exp, alt_value]};
    }

    translateIf(condition: DataExp<T>, expIfTrue: DataExp<T>, expIfFalse: DataExp<T>): DataExp<T> {
        return {$if: [condition, expIfTrue, expIfFalse]};
    }

    translateIsNull(exp: DataExp<T>): DataExp<T> {
        return {$isNull: exp};
    }

    translateIsNotNull(exp: DataExp<T>): DataExp<T> {
        return {$isNotNull: exp};
    }

    translateIs(key: string): DataExp<T> {
        return {$is: key}
    }

    translateAnd(exps: DataExp<T>[]): DataExp<T> {
        return {$and: exps};
    }

    translateOr(exps: DataExp<T>[]): DataExp<T> {
        return {$or: exps};
    }

    translateAt(key: string, exp: DataExp<any>): DataExp<T> {
        return <any>{$at: {[key]: exp}};
    }

    translateCompare(op: NamedCompareOperator, left: DataExp<T>, right: DataExp<T>): DataExp<T> {
        return [left, op, right];
    }

    translateConcat(exps: DataExp<T>[]): DataExp<T> {
        return {$concat: exps};
    }

    translateCountExp(key: string, where: DataExp<any>, /*TODO: translateHasExp */maxCount: number): DataExp<T> {

        return {
            $count: where ? <any>{
                [key]: where
            } : key
        };
    }

    translateFieldExp(key: StringDataExp<T>): DataExp<T> {
        return key;
    }

    translateFromExp(key: string, take: DataExp<any>, where: DataExp<any>): DataExp<T> {
        return {
            $from: <any>{
                [key]: {
                    take,
                    where
                }
            }
        };
    }

    translateIn(where: DataExp<T>, values: DataExp<T>[]): DataExp<T> {
        return [where, "$in", values];
    }

    translateNotIn(where: DataExp<T>, values: DataExp<T>[]): DataExp<T> {
        return [where, "$notIn", values];
    }

    translateLength(exp: DataExp<T>): DataExp<T> {
        return {$length: exp};
    }

    translateNot(exp: DataExp<T>): DataExp<T> {
        return {$not: exp};
    }

    translateValue(value: Parameter): DataExp<T> {
        return {$value: value};
    }

}
