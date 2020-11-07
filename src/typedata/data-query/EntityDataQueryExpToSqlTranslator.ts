import { Connection } from "typeorm";
import { DataExp, DataParameterExp } from "../data-exp/DataExp";
import { EntityDataExpTranslator } from "../entity-data/EntityDataExpTranslator";
import { EntityDataLoader } from "../entity-data/EntityDataLoader";
import { DataQuery } from "./DataQueryExp";
import { DataQueryExpTranslator } from "./DataQueryExpTranslator";

@DataQueryExpTranslator<string>()
export class EntityDataQueryExpToSqlTranslator
  extends EntityDataExpTranslator<any>
  implements DataQueryExpTranslator<string> {
  constructor(
    public connection: Connection,
    public schema: string,
    public parameters: any[]
  ) {
    super();
  }

  static createFromEntityLoader(loader: EntityDataLoader, parameters: any[]) {
    return new EntityDataQueryExpToSqlTranslator(
      loader.connection,
      loader.qb.query.alias,
      parameters
    );
  }

  static getQueryAndParameters(
    connection: Connection,
    query: DataQuery,
    parameters: any[] = []
  ): [sql: string, parameters: any[]] {
    const sql = new EntityDataQueryExpToSqlTranslator(
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
    return new EntityDataQueryExpToSqlTranslator(
      this.connection,
      propertyKey,
      this.parameters
    ).translate(exp);
  }
}
