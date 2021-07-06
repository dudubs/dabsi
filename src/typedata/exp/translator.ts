import { firstDefinedEntry } from "@dabsi/common/object/firstDefinedEntry";
import { mapObjectToArray } from "@dabsi/common/object/mapObjectToArray";
import { DataOperatorExp } from "@dabsi/typedata/exp/operator";

import {
  DataCompareExp,
  DataExp,
  DataExpTypes,
  DataParameterExp,
} from "@dabsi/typedata/exp/exp";
import defined from "@dabsi/common/object/defined";
import { OneOrMany } from "@dabsi/common/array/OneOrMany";
import { DataKeyOrKeys } from "@dabsi/typedata/key";

type T = any;
type O = DataExpTypes<T>;

export type IDataTranslator<U> = {
  [K in keyof O]: (exp: O[K]) => U;
};

export abstract class DataTranslator<U> implements IDataTranslator<U> {
  abstract True: U;

  abstract False: U;

  abstract Null: U;

  abstract translateCompare(
    op: DataOperatorExp.Base,
    inverse: boolean,
    left: U,
    right: U
  ): U;

  abstract translateAdd(exps: U[]): U;

  abstract translateParameter(value: DataParameterExp): U;

  abstract translateField(field: string): U;

  abstract translateCountRefs(type: "all" | "any"): U;

  abstract translateIn(inverse: boolean, where: U, values: U[]): U;

  abstract translateConcat(exps: U[]): U;

  abstract translateAnd(exps: U[]): U;

  abstract translateOr(exps: U[]): U;

  abstract translateIs(inverse: boolean, keys: string[]): U;

  abstract translateCount(propertyName: string, subExp: DataExp<any>): U;

  abstract translateAt(propertyKey: string, exp: DataExp<any>): U;

  abstract translateLength(exp: U): U;

  abstract translateNot(exp: U): U;

  abstract translateIsNull(inverse: boolean, exp: U): U;

  abstract translateAs(childKey: string, exp: DataExp<any>): U;

  abstract translateBase(exp: DataExp<T>): U;

  abstract translateIfNull(exp: U, alt_value: U): U;

  abstract translateHas(
    inverse: boolean,
    propertyName: string,
    condition: DataExp<any>
  ): U;

  abstract translateIf(condition: U, then: U, _else: U): U;

  protected _translateIn(
    inverse: boolean,
    where: DataExp<T>,
    values: DataExp<T>[]
  ): U {
    if (values.length === 0) return this.True;

    if (values.length === 1)
      return this.translateCompare(
        "$equals",
        inverse,
        this.translate(where),
        this.translate(values[0])
      );

    return this.translateIn(
      inverse,
      this.translate(where),
      values.map(value => this.translate(value))
    );
  }

  protected _translateCompare(
    op: DataOperatorExp.Base,
    inverse: boolean,
    left: DataExp<T>,
    right: DataExp<T>
  ): U {
    return this.translateCompare(
      op,
      inverse,
      this.translate(left),
      this.translate(right)
    );
  }

  translateArray(exp: any[]): U {
    if (exp.length === 1) {
      return this.translateParameter(exp[0]);
    }

    if (exp.length === 3) {
      // [exp, op, exp]
      const [left, op, right] = exp;

      switch (op) {
        case "$in":
          return this._translateIn(false, left, <DataExp<T>[]>right);
        case "$notIn":
          return this._translateIn(true, left, <DataExp<T>[]>right);
      }

      const [inverse, base] = defined(DataOperatorExp.map[op], () => {
        return `Invalid operator like "${op}".`;
      });

      return this._translateCompare(
        <any>base,
        inverse,
        left,
        <DataExp<T>>right
      );
    } else if (exp.length === 2) {
      // [exp, {op: parameter}]
      const [left, opToValue] = exp;
      const [op, value] = firstDefinedEntry(opToValue);
      switch (op) {
        case "$in":
          return this._translateIn(
            false,
            left,
            value.map(value => [value])
          );
        case "$notIn":
          return this._translateIn(
            true,
            left,
            value.map(value => [value])
          );
      }
      return this.translate([left, op, { $param: value }]);
    }
    throw new TypeError(`Invalid JSONArrayExp ${exp}`);
  }

  translateOperator(type, value) {
    return this[type](value);
  }

  translateObject(exp: object): U {
    if (Array.isArray(exp)) {
      return this.translateArray(exp);
    }
    const [key, value] = firstDefinedEntry(<Record<string, any>>exp);
    if (key.startsWith("$")) {
      return this.translateOperator(key, value);
    }

    return this.translateAnd(
      mapObjectToArray(<any>exp, (exp, key) =>
        this.translateCompareToField(<any>key, <any>exp)
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
        return this.translateObject(exp);
    }
    throw new Error(`Can't translate ${JSON.stringify(exp)}`);
  }

  translateCompareToField(
    key: string,
    compareExp: DataCompareExp<any, DataParameterExp>
  ): U {
    switch (typeof compareExp) {
      case "object":
        if (Array.isArray(compareExp)) {
          const [op, exp] = compareExp;
          return this.translate([key, op, exp]);
        } else {
          const [op, value] = firstDefinedEntry(
            <Record<string, any>>compareExp
          );

          switch (op) {
            case "$in":
              return this._translateIn(
                false,
                key,
                value.map(value => [value])
              );
            case "$notIn":
              return this._translateIn(
                true,
                key,
                value.map(value => [value])
              );
          }

          return this.translate([key, op, { $param: value }]);
        }
      case "boolean":
      case "string":
      case "number":
        return this._translateCompare("$equals", false, key, {
          $param: compareExp,
        });
    }
    throw new TypeError(
      `Invalid FieldExp ${key}: ${JSON.stringify(compareExp)}`
    );
  }

  $is(exp: O["$is"]): U {
    return this.translateIs(false, DataKeyOrKeys(exp));
  }

  $isNot(exp: O["$is"]): U {
    return this.translateIs(true, DataKeyOrKeys(exp));
  }

  $length(exp: O["$length"]): U {
    return this.translateLength(this.translate(exp));
  }

  $and(exp: O["$and"]): U {
    if (exp.find(x => x === false) === false) {
      return this.translate(false);
    }
    return this.translateAnd(exp.map(exp => this.translate(exp)));
  }

  $or(exp: O["$or"]): U {
    if (exp.find(x => x === true) === true) {
      return this.translate(true);
    }
    return this.translateOr(exp.map(exp => this.translate(exp)));
  }

  $as(exp: O["$as"]): U {
    const [childKey, childExp] = firstDefinedEntry(exp);
    return this.translateAs(childKey, childExp);
  }

  $base(exp: DataExpTypes<any>["$base"]): U {
    return this.translateBase(exp);
  }

  $at(exp: DataExpTypes<any>["$at"]): U {
    const [key, subExp] = Array.isArray(exp) ? exp : firstDefinedEntry(exp);
    return this.translateAt(<any>key, subExp);
  }

  $isNull(exp: O["$isNull"]): U {
    return this.translateIsNull(false, this.translate(exp));
  }

  $isNotNull(exp: O["$isNotNull"]): U {
    return this.translateIsNull(true, this.translate(exp));
  }

  $ifNull([left, _else]: O["$ifNull"]): U {
    return this.translateIfNull(this.translate(left), this.translate(_else));
  }

  $concat(exp: O["$concat"]): U {
    return this.translateConcat(exp.map(exp => this.translate(exp)));
  }

  $count(exp: O["$count"]): U {
    if (typeof exp === "string") {
      return this.translateCount(exp, undefined);
    } else if (typeof exp === "object") {
      const [propertyName, subExp] = firstDefinedEntry(exp);
      return this.translateCount(propertyName, subExp);
    }
    throw new TypeError();
  }

  $has(exp: O["$has"], inverse = false): U {
    if (typeof exp === "string") {
      return this.translateHas(inverse, exp, undefined);
    } else if (typeof exp === "object") {
      const [propertyName, subExp] = firstDefinedEntry(exp as any);
      return this.translateHas(inverse, propertyName, subExp);
    }
    throw new TypeError(`Invalid "has" Exp`);
  }

  // TODO: translateHas(inverse, ...
  $notHas(exp: O["$has"]): U {
    return this.$has(exp, true);
  }

  abstract translateFind(relationName: string, exp: DataExp<any>);

  $find(relationNameExpMap: O["$find"]): U {
    const [realtionName, exp] = firstDefinedEntry(relationNameExpMap);
    return this.translateFind(realtionName, exp);
  }

  $search(exp: O["$search"]): U {
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
        { $param: word },
      ]),
    });
  }

  $param(exp: O["$param"]): U {
    return this.translateParameter(exp);
  }

  $join<K>([exps, sep]: O["$join"]): U {
    const $concat: DataExp<T>[] = [];
    for (const [index, exp] of exps.entries()) {
      if (index) $concat.push({ $param: sep });
      $concat.push(exp);
    }
    return this.translate({ $concat });
  }

  $not<K>(exp: O["$not"]): U {
    if (exp && typeof exp === "object" && "$not" in exp)
      return this.translate(exp.$not);
    return this.translateNot(this.translate(exp));
  }

  $if<K>(exp: O["$if"]): U {
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

  $case(cases: O["$case"]): U {
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

  $add(exp: O["$add"]): U {
    return this.translateAdd(exp.map(exp => this.translate(exp)));
  }

  $countRefs(type) {
    return this.translateCountRefs(type);
  }
}
