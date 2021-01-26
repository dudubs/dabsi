import { SelectQueryBuilder } from "typeorm";
import { entries } from "@dabsi/common/object/entries";
import { hasKeys } from "@dabsi/common/object/hasKeys";
import { DataExp, DataParameterExp } from "@dabsi/typedata/exp/exp";
import AbstractDataQueryTranslatorToSql from "@dabsi/typedata/entity/abstractSqlTranslator";
import { DataQuery } from "@dabsi/typedata/query/exp";
import { DataQueryTranslator } from "@dabsi/typedata/query/translator";

let counter = 0;

@DataQueryTranslator<string>()
export class DataQueryTranslatorToSqb
  extends AbstractDataQueryTranslatorToSql
  implements DataQueryTranslator<string> {
  readonly driver;

  constructor(public qb: SelectQueryBuilder<any>, schema: string) {
    super(qb.connection, schema);
  }

  translateAt(propertyKey: string, exp: DataExp<any>): string {
    return new DataQueryTranslatorToSqb(this.qb, propertyKey).translate(exp);
  }

  translateParameter(value: DataParameterExp): string {
    const id = "p_" + ++counter;
    this.qb.setParameter(id, value);
    return ":" + id;
  }

  static build(qb: SelectQueryBuilder<any>, query: DataQuery) {
    const translator = new DataQueryTranslatorToSqb(qb, qb.alias);

    qb.expressionMap.selects.length = 0;

    if (hasKeys(query.fields)) {
      for (const [aliasName, exp] of entries(query.fields)) {
        qb.expressionMap.selects.push({
          aliasName,
          selection: translator.translate(exp),
        });
      }
    } else {
      qb.expressionMap.selects.push({
        selection: "*",
      });
    }

    qb.expressionMap.take = query.take;
    qb.expressionMap.skip = query.skip;

    if (query.where !== undefined) {
      qb.andWhere(translator.translate(query.where));
    }

    for (let [aliasName, join] of entries(query.joins)) {
      const condition =
        join.condition !== undefined
          ? translator.translate(join.condition)
          : "";

      switch (join.type) {
        case "INNER":
          qb.innerJoin(join.from, aliasName, condition);
          break;
        case "LEFT":
          qb.leftJoin(join.from, aliasName, condition);
          break;
        default:
          throw new Error(`Invalid join type ${join.type}`);
      }
    }

    for (const order of query.order || []) {
      qb.addOrderBy(
        translator.translate(order.by),
        order.sort,
        order.nulls === "FIRST"
          ? "NULLS FIRST"
          : order.nulls === "LAST"
          ? "NULLS LAST"
          : undefined
      );
    }
  }
}
