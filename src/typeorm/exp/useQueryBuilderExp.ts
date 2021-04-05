import { SelectQueryBuilder } from "typeorm";
import Lazy from "@dabsi/common/patterns/Lazy";
import { DataSort } from "@dabsi/typedata/order";
import { DataTypeInfo } from "@dabsi/typedata/typeInfo";
import { DataExp } from "@dabsi/typedata/exp/exp";
import { DataQueryBuilder } from "@dabsi/typedata/query/builder";
import { DataQueryTranslatorToSqb } from "@dabsi/typedata/query/sqbTranslator";
import { DataEntityTranslator } from "@dabsi/typedata/entity/translator";

declare module "typeorm" {
  interface SelectQueryBuilder<Entity> {
    exp(exp: DataExp<Entity>): string;

    exp(exp: DataExp<any>, schema: string): string;

    selectExp(exp: DataExp<Entity>, aliasName?: string): this;

    buildSelectExp(aliasName: string, exp: DataExp<Entity>): this;

    addSelectExp(exp: DataExp<Entity>, aliasName?: string): this;

    whereExp(exp: DataExp<Entity>): this;

    andWhereExp(exp: DataExp<Entity>): this;

    orWhereExp(exp: DataExp<Entity>): this;

    orderByExp(
      exp: DataExp<Entity>,
      order?: "ASC" | "DESC",
      nulls?: "NULLS FIRST" | "NULLS LAST"
    ): this;

    addOrderByExp(
      exp: DataExp<Entity>,
      sort?: DataSort,
      nulls?: "NULLS FIRST" | "NULLS LAST"
    ): this;
  }
}

export const useQueryBuilderExp = Lazy(() => {
  const qb = SelectQueryBuilder.prototype;

  qb.exp = function <T>(this: SelectQueryBuilder<T>, exp: DataExp<T>) {
    const metadata = this.expressionMap.mainAlias!.metadata;
    const query = {
      from: metadata.tableName,
      alias: this.alias,
    };
    const qebTranslator = new DataEntityTranslator(
      metadata.connection,
      DataTypeInfo.get(<Function>metadata.target),
      new DataQueryBuilder(query),
      this.alias
    );

    const sqbTranslator = new DataQueryTranslatorToSqb(this, this.alias);

    const queryExp = qebTranslator.translate(exp);

    const sqlExp = sqbTranslator.translate(queryExp);

    DataQueryTranslatorToSqb.build(this, query);

    return sqlExp;
  };

  install("where");
  install("andWhere");
  install("orWhere");

  install("select");
  install("addSelect");
  install("orderBy");
  install("addOrderBy");

  qb.buildSelectExp = function (
    this: SelectQueryBuilder<any>,
    aliasName,
    exp: DataExp<any>
  ) {
    if (!this.expressionMap.selects[0]?.aliasName) {
      return this.selectExp(exp, aliasName);
    } else {
      return this.addSelectExp(exp, aliasName);
    }
  };

  function install(prop) {
    qb[prop + "Exp"] = function (this: SelectQueryBuilder<any>, exp, ...args) {
      if (exp === undefined) return this;
      return this[prop](this.exp(exp), ...args);
    };
  }
});
