import {DataExp, NamedCompareOperator, Parameter, StringDataExp} from "../../json-exp/DataExp";
import {DataExpTranslator} from "../../json-exp/DataExpTranslator";

export class DataExpMapper<T> extends DataExpTranslator<any, DataExp<any>> {
    False: DataExp<any> = false;
    True: DataExp<any> = true;

    Null: DataExp<any> = null;

    translateHasAt(inverse: boolean, propertyName: string, exp: DataExp<any>): DataExp<any> {
        return <DataExp<any>>{[inverse?"$notHasAt":"$hasAt"]: exp !== undefined ? {[propertyName]: exp} : propertyName};
    }

    translateAs(unionKey: string, exp: DataExp<any>): DataExp<any> {
        return <DataExp<any>>{$as: {[unionKey]: exp}}
    }

    translateIfNull(exp: DataExp<any>, alt_value: DataExp<any>): DataExp<any> {
        return {$ifNull: [exp, alt_value]};
    }

    translateIf(condition: DataExp<any>, expIfTrue: DataExp<any>, expIfFalse: DataExp<any>): DataExp<any> {
        return {$if: [condition, expIfTrue, expIfFalse]};
    }

    translateIsNull(inverse: boolean, exp: DataExp<any>): DataExp<any> {
        return inverse ? {$isNotNull: exp} : {$isNull: exp};
    }

    translateIs(inverse: boolean, keys: string[]): DataExp<any> {
        return inverse ? {$isNot: keys} : {$is: keys}
    }

    translateAnd(exps: DataExp<any>[]): DataExp<any> {
        return {$and: exps};
    }

    translateOr(exps: DataExp<any>[]): DataExp<any> {
        return {$or: exps};
    }

    translateAt(key: string, exp: DataExp<any>): DataExp<any> {
        return <any>{$at: {[key]: exp}};
    }

    translateCompare(op: NamedCompareOperator, left: DataExp<any>, right: DataExp<any>): DataExp<any> {
        return [left, op, right];
    }

    translateConcat(exps: DataExp<any>[]): DataExp<any> {
        return {$concat: exps};
    }

    translateCountAt(propertyName: string, subExp: DataExp<any>): DataExp<any> {
        return <DataExp<any>>{
            $countAt: subExp !== undefined ?
                {[propertyName]: subExp} :
                propertyName
        };
    }

    translateFieldExp(key: StringDataExp<any>): DataExp<any> {
        return key;
    }

    translateIn(inverse: boolean, where: DataExp<any>, values: DataExp<any>[]): DataExp<any> {
        return [where, inverse ? "$notIn" : "$in", values];
    }

    translateLength(exp: DataExp<any>): DataExp<any> {
        return {$length: exp};
    }

    translateNot(exp: DataExp<any>): DataExp<any> {
        return {$not: exp};
    }

    translateParameter(value: Parameter): DataExp<any> {
        switch (typeof value) {
            case "boolean":
            case "number":
                return value;
            default:
                return [value]
        }
    }

}


/*


    EntityDataSource.create(DUnion)
        .as("aChild1")






 */
