import { Connection } from "typeorm";
import { DataQuery } from "./DataQueryExp";
import { QueryExpTranslatorToSql } from "./QueryExpTranslatorToSql";

export abstract class AbstractDataQueryRunner {
  abstract getCount(): Promise<number>;
  abstract hasRows(): Promise<boolean>;
  abstract getRows(): Promise<any[]>;
}

export class EntityDataQueryRunner extends AbstractDataQueryRunner {
  constructor(
    public connection: Connection,
    public query: DataQuery,
    public alias = "r_" + query.from
  ) {
    super();
  }
  getQueryAndParameters(): [string, any[]] {
    const translator = this.createTranslator();
    return [translator.translateQuery(this.query), translator.parameters];
  }
  createTranslator() {
    return new QueryExpTranslatorToSql([], this.connection, this.alias);
  }

  getRows(): Promise<any> {
    const [query, parameters] = this.getQueryAndParameters();
    return this.connection.query(query, parameters);
  }

  hasRows(): Promise<boolean> {
    const translator = this.createTranslator();
    const query = `SELECT COUNT(*) value FROM (${translator.translateQuery({
      ...this.query,
      take: 1,
    })}) _rec`;
    return this.connection.query(query, translator.parameters).then(rows => {
      return (rows[0]?.value ?? 0) > 0;
    });
  }
  async getCount(): Promise<number> {
    const translator = this.createTranslator();
    const query = translator.translateQuery(this.query);

    return this.connection
      .query(
        `SELECT COUNT(*) value FROM (${query}) _rec`,
        translator.parameters
      )
      .then(rows => {
        return rows[0]?.value ?? 0;
      });
  }
}
