import { Connection } from "typeorm";
import { DataExp, DataParameterExp } from "@dabsi/typedata/data-exp/DataExp";
import { AbstractDataEntityQueryExpTranslator } from "@dabsi/typedata/data-entity/AbstractDataEntityQueryExpTranslator";
import { DataEntityLoader } from "@dabsi/typedata/data-entity/DataEntityLoader";
import { DataQuery } from "@dabsi/typedata/data-query/DataQueryExp";
import { DataQueryExpTranslator } from "@dabsi/typedata/data-query/DataQueryExpTranslator";

@DataQueryExpTranslator<string>()
export class DataEntityQueryExpTranslatorToSql
  extends AbstractDataEntityQueryExpTranslator
  implements DataQueryExpTranslator<string> {
  constructor(
    connection: Connection,
    schema: string,
    public parameters: any[]
  ) {
    super(connection, schema);
  }

  static createFromEntityLoader(loader: DataEntityLoader, parameters: any[]) {
    return new DataEntityQueryExpTranslatorToSql(
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
    const sql = new DataEntityQueryExpTranslatorToSql(
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
    return new DataEntityQueryExpTranslatorToSql(
      this.connection,
      propertyKey,
      this.parameters
    ).translate(exp);
  }
}
