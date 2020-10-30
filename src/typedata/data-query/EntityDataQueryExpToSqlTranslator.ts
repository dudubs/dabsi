import { Connection } from "typeorm";
import { DataExp, Parameter } from "../data-exp/DataExp";
import { EntityDataCursor } from "../entity-data/EntityDataCursor";
import { EntityDataExpTranslator } from "../entity-data/EntityDataExpTranslator";
import { EntityDataLoader } from "../entity-data/EntityDataLoader";
import { DataQuery } from "./DataQueryExp";
import { DataQueryExpTranslator } from "./DataQueryExpTranslator";

@DataQueryExpTranslator<string>()
export class EntityDataQueryExpToSqlTranslator
  extends EntityDataExpTranslator<any>
  implements DataQueryExpTranslator<string> {
  constructor(
    public parameters: any[],
    public connection: Connection,
    public schema: string
  ) {
    super();
  }

  static getQueryAndParameters(
    connection: Connection,
    query: DataQuery,
    parameters: any[] = []
  ): [sql: string, parameters: any[]] {
    const sql = new EntityDataQueryExpToSqlTranslator(
      parameters,
      connection,
      query.alias
    ).translateQuery(query);
    return [sql, parameters];
  }

  translateParameter(value: Parameter): string {
    this.parameters.push(value);
    return "?";
  }

  translateAt(propertyKey: string, exp: DataExp<any>): string {
    return new EntityDataQueryExpToSqlTranslator(
      this.parameters,
      this.connection,
      propertyKey
    ).translate(exp);
  }
}
