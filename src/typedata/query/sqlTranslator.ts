import AbstractDataQueryTranslatorToSql from "@dabsi/typedata/entity/abstractSqlTranslator";
import { DataExp, DataParameterExp } from "@dabsi/typedata/exp/exp";
import { DataQuery } from "@dabsi/typedata/query/exp";
import { DataQueryTranslator } from "@dabsi/typedata/query/translator";
import { Connection } from "typeorm";

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

  static getQueryAndParameters(
    connection: Connection,
    query: DataQuery,
    parameters: any[] = [],
    { withoutFields = false } = {}
  ): [sql: string, parameters: any[]] {
    const translator = new DataQueryTranslatorToSql(
      connection,
      query.alias,
      parameters
    );
    return [
      withoutFields
        ? translator.translateQueryWithoutFields(query)
        : translator.translateQuery(query),
      parameters,
    ];
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
