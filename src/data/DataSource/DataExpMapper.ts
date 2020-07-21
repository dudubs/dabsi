import {DataExp, NamedCompareOperator, Parameter, StringDataExp} from "../../json-exp/DataExp";
import {DataExpTranslator} from "../../json-exp/DataExpTranslator";

export class DataExpMapper<T> extends DataExpTranslator<any, DataExp<T>> {
    False: DataExp<T> = false;
    True: DataExp<T> = true;

    Null: DataExp<T> = null;

    translateHasExp(propertyName: string, subExp: DataExp<any>): DataExp<T> {
        return <DataExp<any>>{$has: subExp !== undefined ? {[propertyName]: subExp} : propertyName};
    }

    translateAs(unionKey: string, exp: DataExp<any>): DataExp<T> {
        return <DataExp<any>>{$as: {[unionKey]: exp}}
    }

    translateIfNull(exp: DataExp<T>, alt_value: DataExp<T>): DataExp<T> {
        return {$ifNull: [exp, alt_value]};
    }

    translateIf(condition: DataExp<T>, expIfTrue: DataExp<T>, expIfFalse: DataExp<T>): DataExp<T> {
        return {$if: [condition, expIfTrue, expIfFalse]};
    }

    translateIsNull(inverse: boolean, exp: DataExp<T>): DataExp<T> {
        return inverse ? {$isNotNull: exp} : {$isNull: exp};
    }

    translateIs(inverse: boolean, keys: string[]): DataExp<T> {
        return inverse ? {$isNot: keys} : {$is: keys}
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

    translateCountExp(propertyName: string, subExp: DataExp<any>): DataExp<T> {
        return <DataExp<any>>{
            $count: subExp !== undefined ?
                {[propertyName]: subExp} :
                propertyName
        };
    }

    translateFieldExp(key: StringDataExp<T>): DataExp<T> {
        return key;
    }

    translateIn(inverse: boolean, where: DataExp<T>, values: DataExp<T>[]): DataExp<T> {
        return [where, inverse ? "$notIn" : "$in", values];
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


/*


    EntityDataSource.create(AUnion)
        .as("aChild1")






 */
