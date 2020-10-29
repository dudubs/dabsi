import { Connection } from "typeorm";
import { DataExp, Parameter } from "../typedata/DataExp";
import { DataExpTranslatorToSql } from "./exp/DataExpTranslatorToSql";
import { QueryExpTranslator } from "./QueryExpTranslator";

@QueryExpTranslator<string>()
export class QueryExpTranslatorToSql
  extends DataExpTranslatorToSql<any>
  implements QueryExpTranslator<string> {
  constructor(
    public parameters: any[],
    public connection: Connection,
    public schema: string
  ) {
    super();
  }

  translateParameter(value: Parameter): string {
    this.parameters.push(value);
    return "?";
  }

  translateAt(propertyKey: string, exp: DataExp<any>): string {
    return new QueryExpTranslatorToSql(
      this.parameters,
      this.connection,
      propertyKey
    ).translate(exp);
  }
}
