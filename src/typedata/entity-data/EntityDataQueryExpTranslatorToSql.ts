import { Connection } from "typeorm";
import { DataExp, DataParameterExp } from "../data-exp/DataExp";
import { AbstractEntityDataQueryExpTranslator } from "./AbstractEntityDataQueryExpTranslator";
import { EntityDataLoader } from "./EntityDataLoader";
import { DataQuery } from "../data-query/DataQueryExp";
import { DataQueryExpTranslator } from "../data-query/DataQueryExpTranslator";

@DataQueryExpTranslator<string>()
export class EntityDataQueryExpTranslatorToSql
  extends AbstractEntityDataQueryExpTranslator
  implements DataQueryExpTranslator<string> {
  constructor(
    connection: Connection,
    schema: string,
    public parameters: any[]
  ) {
    super(connection, schema);
  }

  static createFromEntityLoader(loader: EntityDataLoader, parameters: any[]) {
    return new EntityDataQueryExpTranslatorToSql(
      loader.connection,
      loader.qb.query.alias,
      parameters
    );
  }

  static translateFromEntityLoader(
    loader: EntityDataLoader,
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
    const sql = new EntityDataQueryExpTranslatorToSql(
      connection,
      query.alias,
      parameters
    ).translateQuery(query);
    return [sql, parameters];
  }

  translateParameter(value: DataParameterExp): string {
    this.parameters.push(value);
    return "?";
  }

  translateAt(propertyKey: string, exp: DataExp<any>): string {
    return new EntityDataQueryExpTranslatorToSql(
      this.connection,
      propertyKey,
      this.parameters
    ).translate(exp);
  }
}
