import { firstDefinedEntry } from "../../common/object/firstDefinedEntry";
import { mapObjectToArray } from "../../common/object/mapObjectToArray";
import {
  DataComparatorExp,
  DataCompareOperator,
  DataExp,
  DataExpTypes,
  DataNamedCompareOperator,
  DataParameterExp,
  DataStringExp,
  DataSymbolicCompareOperator,
} from "./DataExp";
import { ExpNode } from "./getExpNode";

const SymbolicToNamedOperator: Record<
  DataSymbolicCompareOperator,
  DataNamedCompareOperator
> = {
  "^=": "$startsWith",
  "$=": "$endsWith",
  "*=": "$contains",
  "=": "$equals",
  "!=": "$notEquals",
  "<": "$lessThan",
  "<=": "$lessThanOrEqual",
  ">": "$greaterThan",
  ">=": "$greaterThanOrEqual",
};

export type DataExpTranslatorMethods<T, U> = {
  [K in keyof DataExpTypes<T>]: (exp: DataExpTypes<T>[K]) => U;
};

export abstract class DataExpTranslator<T, U>
  implements DataExpTranslatorMethods<T, U> {
  abstract translateCompare(op: DataNamedCompareOperator, left: U, right: U): U;

  abstract True: U;

  abstract False: U;

  abstract Null: U;

  abstract translateParameter(value: DataParameterExp): U;

  abstract translateField(propertyName: DataStringExp<T>): U;

  abstract translateIn(inverse: boolean, where: U, values: U[]): U;

  translateInExp(inverse: boolean, where: DataExp<T>, values: DataExp<T>[]): U {
    if (values.length === 0) return this.True;

    if (values.length === 1)
      return this.translateCompare(
        inverse ? "$notEquals" : "$equals",
        this.translate(where),
        this.translate(values[0])
      );

    return this.translateIn(
      inverse,
      this.translate(where),
      values.map(value => this.translate(value))
    );
  }

  translateCompareExp(
    op: DataNamedCompareOperator,
    left: DataExp<T>,
    right: DataExp<T>
  ): U {
    return this.translateCompare(
      op,
      this.translate(left),
      this.translate(right)
    );
  }

  translateArrayExp(exp: DataExp<T> & any[]): U {
    if (exp.length === 1) return this.translateParameter(exp[0]);

    if (exp.length === 3) {
      // [exp, op, exp]
      const [left, op, right] = exp;
      switch (op) {
        case "$in":
          return this.translateInExp(false, left, <DataExp<T>[]>right);
        case "$notIn":
          return this.translateInExp(true, left, <DataExp<T>[]>right);
      }
      return this.translateCompareExp(
        SymbolicToNamedOperator[<DataCompareOperator>op] ?? op,
        left,
        <DataExp<T>>right
      );
    } else if (exp.length === 2) {
      // [exp, {op: parameter}]
      const [left, opToValue] = exp;
      const [op, value] = firstDefinedEntry(opToValue);
      switch (op) {
        case "$in":
          return this.translateInExp(
            false,
            left,
            value.map(value => [value])
          );
        case "$notIn":
          return this.translateInExp(
            true,
            left,
            value.map(value => [value])
          );
      }
      return this.translate([
        left,
        <DataCompareOperator>op,
        { $parameter: value },
      ]);
    }
    throw new TypeError(`Invalid JSONArrayExp ${exp}`);
  }

  translateObjectExp(exp: DataExp<T> & object): U {
    if (Array.isArray(exp)) {
      return this.translateArrayExp(exp);
    }
    const [key, value] = firstDefinedEntry(<Record<string, any>>exp);
    if (key.startsWith("$")) {
      return this[key](value);
    }

    return this.translateAnd(
      mapObjectToArray(<any>exp, (exp, key) =>
        this.translateAtFieldExp(<any>key, <any>exp)
      )
    );
  }

  translate(exp: DataExp<T>): U {
    switch (typeof exp) {
      case "boolean":
        return exp ? this.True : this.False;

      case "number":
        return this.translateParameter(exp);

      case "undefined":
        return this.True;

      case "string":
        return this.translateField(exp);

      case "object":
        if (!exp) return this.Null;
        return this.translateObjectExp(exp);
    }
    throw new Error(`Can't translate ${JSON.stringify(exp)}`);
  }

  translateAtFieldExp<K extends DataStringExp<T>>(
    key: K,
    fieldExp: DataComparatorExp<T, Extract<T[K], DataParameterExp>>
  ): U {
    switch (typeof fieldExp) {
      case "object":
        if (Array.isArray(fieldExp)) {
          const [op, exp] = fieldExp;
          return this.translate([key, <DataCompareOperator>op, exp]);
        } else {
          const [op, value] = firstDefinedEntry(<Record<string, any>>fieldExp);

          switch (op) {
            case "$in":
              return this.translateInExp(
                false,
                key,
                value.map(value => [value])
              );
            case "$notIn":
              return this.translateInExp(
                true,
                key,
                value.map(value => [value])
              );
          }

          return this.translate([
            <DataStringExp<T>>key,
            <DataCompareOperator>op,
            { $parameter: value },
          ]);
        }
      case "boolean":
      case "string":
      case "number":
        return this.translateCompareExp("$equals", key, {
          $parameter: fieldExp,
        });
    }
    throw new TypeError(`Invalid FieldExp ${key}: ${JSON.stringify(fieldExp)}`);
  }

  abstract translateConcat(exps: U[]): U;

  abstract translateAnd(exps: U[]): U;

  abstract translateOr(exps: U[]): U;

  abstract translateIs(inverse: boolean, keys: string[]): U;

  $is(exp: DataExpTypes<T>["$is"]): U {
    if (typeof exp === "string") return this.translateIs(false, [exp]);
    return this.translateIs(false, exp);
  }

  $isNot(exp: DataExpTypes<T>["$is"]): U {
    if (typeof exp === "string") return this.translateIs(true, [exp]);
    return this.translateIs(true, exp);
  }

  abstract translateCount(propertyName: string, subExp: DataExp<any>): U;

  abstract translateAt(propertyKey: string, exp: DataExp<any>): U;

  abstract translateLength(exp: U): U;

  abstract translateNot(exp: U): U;

  translateNode() {}

  $length(exp: DataExpTypes<T>["$length"]): U {
    return this.translateLength(this.translate(exp));
  }

  $and(exps: DataExpTypes<T>["$and"]): U {
    if (exps.find(x => x === false) === false) {
      return this.translate(false);
    }
    return this.translateAnd(exps.map(exp => this.translate(exp)));
  }

  $or(exp: DataExpTypes<T>["$or"]): U {
    if (exp.find(x => x === true) === true) {
      return this.translate(true);
    }
    return this.translateOr(exp.map(exp => this.translate(exp)));
  }

  abstract translateIsNull(inverse: boolean, exp: U): U;

  abstract translateAs(childKey: string, exp: DataExp<any>): U;

  $as(exp: DataExpTypes<T>["$as"]): U {
    const [childKey, childExp] = firstDefinedEntry(exp);
    return this.translateAs(childKey, childExp);
  }

  abstract translateBase(exp: DataExp<T>): U;

  $base(exp: DataExpTypes<any>["$base"]): U {
    return this.translateBase(exp);
  }

  $at(exp: DataExpTypes<any>["$at"]): U {
    const [key, subExp] = firstDefinedEntry(exp);
    return this.translateAt(<any>key, subExp);
  }

  $isNull(exp: DataExpTypes<T>["$isNull"]): U {
    return this.translateIsNull(false, this.translate(exp));
  }

  $isNotNull(exp: DataExpTypes<T>["$isNotNull"]): U {
    return this.translateIsNull(true, this.translate(exp));
  }

  abstract translateIfNull(exp: U, alt_value: U): U;

  $ifNull([left, _else]: DataExpTypes<T>["$ifNull"]): U {
    return this.translateIfNull(this.translate(left), this.translate(_else));
  }

  $concat(exp: DataExpTypes<T>["$concat"]): U {
    return this.translateConcat(exp.map(exp => this.translate(exp)));
  }

  $count(exp: DataExpTypes<T>["$count"]): U {
    if (typeof exp === "string") {
      return this.translateCount(exp, undefined);
    } else if (typeof exp === "object") {
      const [propertyName, subExp] = firstDefinedEntry(exp);
      return this.translateCount(propertyName, subExp);
    }
    throw new TypeError();
  }

  abstract translateHas(
    inverse: boolean,
    propertyName: string,
    exp: DataExp<any>
  ): U;

  $has(exp: DataExpTypes<T>["$has"], inverse = false): U {
    if (typeof exp === "string") {
      return this.translateHas(inverse, exp, undefined);
    } else if (typeof exp === "object") {
      const [propertyName, subExp] = firstDefinedEntry(exp as any);
      return this.translateHas(inverse, propertyName, subExp);
    }
    throw new TypeError(`Invalid "has" Exp`);
  }

  // TODO: translateHas(inverse, ...
  $notHas(exp: DataExpTypes<T>["$has"]): U {
    return this.$has(exp, true);
  }

  $search(exp: DataExpTypes<T>["$search"]): U {
    const words = exp.text.split(/[\s\t\r\n]+/g).filter(text => text);
    if (words.length === 0) return this.True;

    let searchInExp: DataExp<any>;
    let inverse: boolean;

    if ("in" in exp) {
      searchInExp = exp.in;
      inverse = false;
    } else {
      inverse = true;
      searchInExp = exp.notIn;
    }

    return this.translate({
      $and: words.map(word => [
        searchInExp,
        inverse ? "$notContains" : "$contains",
        { $parameter: word },
      ]),
    });
  }

  $parameter(exp: DataExpTypes<T>["$parameter"]): U {
    return this.translateParameter(exp);
  }

  $join<K>([exps, sep]: DataExpTypes<T>["$join"]): U {
    const $concat: DataExp<T>[] = [];
    for (const [index, exp] of exps.entries()) {
      if (index) $concat.push({ $parameter: sep });
      $concat.push(exp);
    }
    return this.translate({ $concat });
  }

  $not<K>(exp: DataExpTypes<T>["$not"]): U {
    if (exp && typeof exp === "object" && "$not" in exp)
      return this.translate(exp.$not);
    return this.translateNot(this.translate(exp));
  }

  abstract translateIf(condition: U, then: U, _else: U): U;

  $if<K>(exp: DataExpTypes<T>["$if"]): U {
    if (Array.isArray(exp)) {
      return this.translateIf(
        this.translate(exp[0]),
        this.translate(exp[1]),
        this.translate(exp[2] ?? null)
      );
    } else {
      return this.translateIf(
        this.translate(exp.condition),
        this.translate(exp.then),
        this.translate(exp.else ?? null)
      );
    }
  }

  $case(cases: DataExpTypes<T>["$case"]): U {
    const translate = (index: number) => {
      const exp = cases[index];
      if (!exp) return this.Null;
      const [condition, then] = Array.isArray(exp) ? exp : [exp.if, exp.then];
      return this.translateIf(
        this.translate(condition),
        this.translate(then),
        translate(index + 1)
      );
    };
    return translate(0);
  }
}
