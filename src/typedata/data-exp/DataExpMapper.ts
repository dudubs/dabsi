import { DataCompareOperatorExp } from "@dabsi/typedata/data-exp/DataCompareOperatorExp";
import { DataExp, DataParameterExp } from "@dabsi/typedata/data-exp/DataExp";
import { DataExpTranslator } from "@dabsi/typedata/data-exp/DataExpTranslator";

export class DataExpMapper extends DataExpTranslator<DataExp<any>> {
  False: DataExp<any> = false;

  True: DataExp<any> = true;

  Null: DataExp<any> = null;

  translateHas(
    inverse: boolean,
    propertyName: string,
    exp: DataExp<any>
  ): DataExp<any> {
    return <DataExp<any>>{
      [inverse ? "$notHas" : "$has"]:
        exp !== undefined ? { [propertyName]: exp } : propertyName,
    };
  }

  translateFind(relationName, exp) {
    return { $find: { [relationName]: exp } };
  }

  translateAs(unionKey: string, exp: DataExp<any>): DataExp<any> {
    return <DataExp<any>>{ $as: { [unionKey]: exp } };
  }

  translateIfNull(exp: DataExp<any>, alt_value: DataExp<any>): DataExp<any> {
    return { $ifNull: [exp, alt_value] };
  }

  translateBase(exp: DataExp<any>): DataExp<any> {
    return { $base: exp };
  }

  translateIf(
    condition: DataExp<any>,
    expIfTrue: DataExp<any>,
    expIfFalse: DataExp<any>
  ): DataExp<any> {
    return { $if: [condition, expIfTrue, expIfFalse] };
  }

  translateIsNull(inverse: boolean, exp: DataExp<any>): DataExp<any> {
    return inverse ? { $isNotNull: exp } : { $isNull: exp };
  }

  translateIs(inverse: boolean, keys: string[]): DataExp<any> {
    return inverse ? { $isNot: keys } : { $is: keys };
  }

  translateAnd(exps: DataExp<any>[]): DataExp<any> {
    return { $and: exps };
  }

  translateOr(exps: DataExp<any>[]): DataExp<any> {
    return { $or: exps };
  }

  translateAt(propertyKey: string, exp: DataExp<any>): DataExp<any> {
    return <any>{ $at: { [propertyKey]: exp } };
  }

  translateCompare(
    op: DataCompareOperatorExp.Base,
    inverse: boolean,
    left: DataExp<any>,
    right: DataExp<any>
  ): DataExp<any> {
    return [left, inverse ? DataCompareOperatorExp.inverseMap[op] : op, right];
  }

  translateConcat(exps: DataExp<any>[]): DataExp<any> {
    return { $concat: exps };
  }

  translateCount(propertyName: string, subExp: DataExp<any>): DataExp<any> {
    return <DataExp<any>>{
      $count: subExp !== undefined ? { [propertyName]: subExp } : propertyName,
    };
  }

  translateField(propertyName: string): DataExp<any> {
    return propertyName;
  }

  translateIn(
    inverse: boolean,
    where: DataExp<any>,
    values: DataExp<any>[]
  ): DataExp<any> {
    return [where, inverse ? "$notIn" : "$in", values];
  }

  translateLength(exp: DataExp<any>): DataExp<any> {
    return { $length: exp };
  }

  translateNot(exp: DataExp<any>): DataExp<any> {
    return { $not: exp };
  }

  translateParameter(value: DataParameterExp): DataExp<any> {
    switch (typeof value) {
      case "boolean":
      case "number":
        return value;
      default:
        return [value];
    }
  }
}
