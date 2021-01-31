import { entries } from "@dabsi/common/object/entries";
import { DataOperatorExp } from "@dabsi/typedata/exp/operator";
import { DataExp } from "@dabsi/typedata/exp/exp";
import { DataTranslator } from "@dabsi/typedata/exp/translator";
import { DataQuery } from "@dabsi/typedata/query/exp";
import { DataQueryTranslator } from "@dabsi/typedata/query/translator";
import { Connection, SelectQueryBuilder } from "typeorm";
import { hasKeys } from "@dabsi/common/object/hasKeys";
import { mapObjectToArray } from "@dabsi/common/object/mapObjectToArray";
import { inspect } from "@dabsi/logging/inspect";

const sqlOperatorMap: Record<DataOperatorExp.Base, string> = {
  $equals: "=",
  $lessThan: "<",
  $lessThanOrEqual: "<=",
  $greaterThan: ">",
  $greaterThanOrEqual: ">=",

  $startsWith: " LIKE ",
  $endsWith: " LIKE ",
  $contains: " LIKE ",
} as const;

const sqlInverseOperatorMap: Record<DataOperatorExp.Base, string> = {
  $equals: "!=",
  $lessThan: ">=",
  $lessThanOrEqual: ">",
  $greaterThan: "<=",
  $greaterThanOrEqual: "<",

  $startsWith: " NOT LIKE ",
  $endsWith: " NOT LIKE ",
  $contains: " NOT LIKE ",
} as const;

export default abstract class AbstractDataQueryTranslatorToSql
  extends DataTranslator<string>
  implements DataQueryTranslator<string> {
  True = "1";

  False = "0";

  Null = "NULL";

  constructor(public connection: Connection, public schema: string) {
    super();
  }

  protected escape(name: string): string {
    return this.connection.driver.escape(name);
  }

  translateCountRefs(): any {
    throw new Error("Not support.");
  }

  translateIsNull(inverse: boolean, exp: string): string {
    return `${exp} IS${inverse ? " NOT" : ""} NULL`;
  }

  translateAdd(exps: string[]): string {
    return `(${exps.join("+")})`;
  }

  translateAnd(exps: string[]): string {
    exps =
      // optimization
      exps.filter(exp => exp !== this.True);
    if (1 >= exps.length) return exps[0] ?? this.True;
    return `(${exps.join(" AND ")})`;
  }

  translateOr(exps: string[]): string {
    // optimization
    for (const exp of exps) {
      if (exp === this.True) {
        return exp;
      }
    }
    if (1 >= exps.length) return exps[0] ?? this.True;
    return `(${exps.join(" OR ")})`;
  }

  translateCompare(
    op: DataOperatorExp.Base,
    inverse: boolean,
    left: string,
    right: string
  ): string {
    let sqlOp = inverse ? sqlInverseOperatorMap[op] : sqlOperatorMap[op];

    switch (op) {
      case "$startsWith":
        right = this.translateConcat([right, "'%'"]);
        break;

      case "$endsWith":
        right = this.translateConcat(["'%'", right]);
        break;

      case "$contains":
        right = this.translateConcat(["'%'", right, "'%'"]);
    }

    return `${left}${sqlOp}${right}`;
  }

  counter = 0;

  translateBase(exp: DataExp<any>): string {
    return this.translate(exp);
  }

  translateField(field: string): string {
    return `${this.escape(this.schema)}.${this.escape(field)}`;
  }

  translateLength(exp: string): string {
    return `LENGTH(${exp})`;
  }

  translateNot(exp: string): string {
    return `NOT ${exp}`;
  }

  translateIf(
    condition: string,
    expIfTrue: string,
    expIfFalse: string
  ): string {
    switch (this.connection.driver.options.type) {
      case "sqlite":
        return `(CASE WHEN ${condition} THEN ${expIfTrue} ELSE ${expIfFalse} END)`;

      default:
        return `IF(${condition},${expIfTrue},${expIfFalse})`;
    }
  }

  translateConcat(exps: string[]): string {
    switch (this.connection.driver.options.type) {
      case "sqlite":
        return `(${exps.join("||")})`;
      default:
        return `CONCAT(${exps.join(",")})`;
    }
  }

  translateIn(inverse: boolean, where: string, values: string[]): string {
    return `${where}${inverse ? " NOT" : ""} IN (${values.join(",")})`;
  }

  translateIfNull(exp: string, alt_value: string): string {
    return `IFNULL(${exp},${alt_value})`;
  }

  translateAs(childKey: string, exp: DataExp<any>): string {
    throw new Error("Not support.");
  }

  translateCount(propertyName: string, subExp: DataExp<any>): string {
    throw new Error("Not support.");
  }

  translateHas(
    inverse: boolean,
    propertyName: string,
    condition: DataExp<any>
  ): string {
    throw new Error("Not support.");
  }

  translateFind(relationName: string, exp: DataExp<any>): string {
    throw new Error("Not support.");
  }

  translateIs(inverse: boolean, keys: string[]): string {
    throw new Error("Not support.");
  }

  translateQueryCount(query: DataQuery): string {
    return `(SELECT COUNT(*) AS value ${this.translateQueryWithoutFields(
      query
    )})`;
  }
  translateQueryFind(query: DataQuery): string {
    return "1";
  }

  translateQueryHas(inverse: boolean, query: DataQuery): string {
    return this.translateCompare(
      inverse ? "$equals" : "$greaterThan",
      false,
      this.translateQueryCount({
        ...query,
        take: 1,
      }),
      "0"
    );
  }

  translateQueryFields(query: DataQuery) {
    let sql = "";
    for (let [aliasName, selection] of entries(query.fields)) {
      sql +=
        (sql ? ", " : "") +
        "(" +
        this.translate(selection) +
        ")" +
        " AS " +
        this.escape(aliasName);
    }
    return sql || "*";
  }

  translateQueryJoins(query: DataQuery) {
    let sql = "";
    for (let [aliasName, join] of entries(query.joins)) {
      switch (join.type) {
        case "LEFT":
        case "INNER":
          sql += " " + join.type + " JOIN";
          break;
        default:
          throw new Error(`Invalid join type: ${join.type}`);
      }

      if (hasKeys(join.fields)) {
        sql += `(SELECT ${mapObjectToArray(
          join.fields!,
          (exp, field) => `${this.translate(exp)} AS ${this.escape(field)}`
        )} FROM ${this.escape(join.from)} AS ${aliasName})`;
      } else {
        sql += " " + this.escape(join.from);
      }

      sql += " AS " + this.escape(aliasName);

      if (join.condition !== undefined) {
        sql += " ON " + this.translate(join.condition);
      }
    }
    return sql;
  }

  translateQuery(query: DataQuery): string {
    return (
      "SELECT " +
      this.translateQueryFields(query) +
      this.translateQueryWithoutFields(query)
    );
  }

  translateQueryWithoutFields(query: DataQuery): string {
    return (
      " FROM " +
      this.escape(query.from) +
      " AS " +
      this.escape(query.alias ?? this.schema) +
      this.translateQueryJoins(query) +
      (query.where !== undefined
        ? " WHERE " + this.translate(query.where)
        : "") +
      (query.order?.length
        ? " ORDER BY " +
          query.order
            .toSeq()
            .map(order => {
              let sql = this.translate(order.by);
              switch (order.sort) {
                case "ASC":
                case "DESC":
                  sql += " " + order.sort;
                  break;
                default:
                  throw new Error(`Invalid query order sort: ${order.sort}`);
              }
              switch (order.nulls) {
                case "FIRST":
                case "LAST":
                  sql += " NULLS " + order.nulls;
                  break;
                case undefined:
                  break;
                default:
                  throw new Error(`Invalid query order nulls: ${order.nulls}`);
              }
              return sql;
            })
            .join(", ")
        : "") +
      new SelectQueryBuilderHelper(this.connection).translatePosition(
        query.skip,
        query.take
      )
    );
  }
}

class SelectQueryBuilderHelper extends SelectQueryBuilder<any> {
  translatePosition(
    skip: number | undefined,
    take: number | undefined
  ): string {
    this.expressionMap.take = take;
    this.expressionMap.skip = skip;
    return this.createLimitOffsetExpression();
  }
}
