import { Connection } from "typeorm";
import { DataExp, DataParameterExp } from "@dabsi/typedata/exp/exp";
import AbstractDataQueryTranslatorToSql from "@dabsi/typedata/entity/abstractSqlTranslator";
import { DataEntityLoader } from "@dabsi/typedata/entity/loader";
import { DataQuery, DataQueryExp } from "@dabsi/typedata/query/exp";
import { DataQueryTranslator } from "@dabsi/typedata/query/translator";

@DataQueryTranslator<string>()
export class DataQueryTranslatorToSql
  extends AbstractDataQueryTranslatorToSql
  implements DataQueryTranslator<string> {
  constructor(
    connection: Connection,
    schema: string,
    public parameters: any[]
  ) {
    super(connection, schema);
  }

  static createFromEntityLoader(loader: DataEntityLoader, parameters: any[]) {
    return new DataQueryTranslatorToSql(
      loader.connection,
      loader.qb.query.alias,
      parameters
    );
  }

  static translateFromEntityLoader(
    loader: DataEntityLoader,
    parameters: any[]
  ) {
    return this.createFromEntityLoader(loader, parameters).translateQuery(
      loader.qb.query
    );
  }

  static getQueryAndParameters(
    connection: Connection,
    query: DataQuery,
    parameters: any[] = []
  ): [sql: string, parameters: any[]] {
    const sql = new DataQueryTranslatorToSql(
      connection,
      query.alias,
      parameters
    ).translateQuery(query);
    return [sql, parameters];
  }

  static getQueryAndParametersForExp(
    connection: Connection,
    aliasName: string,
    exp: DataQueryExp,
    parameters: any[] = []
  ): [sql: string, parameters: any[]] {
    const sql = new DataQueryTranslatorToSql(
      connection,
      aliasName,
      parameters
    ).translate(exp);
    return [sql, parameters];
  }

  translateParameter(value: DataParameterExp): string {
    this.parameters.push(value);
    return "?";
  }

  translateAt(propertyKey: string, exp: DataExp<any>): string {
    return new DataQueryTranslatorToSql(
      this.connection,
      propertyKey,
      this.parameters
    ).translate(exp);
  }
}
