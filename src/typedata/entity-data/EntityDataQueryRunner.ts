import { Connection } from "typeorm";
import { AbstractDataQueryRunner } from "../data-query/AbstractDataQueryRunner";
import { DataQuery } from "../data-query/DataQueryExp";
import { EntityDataQueryExpToSqlTranslator } from "../data-query/EntityDataQueryExpToSqlTranslator";

export class EntityDataQueryRunner extends AbstractDataQueryRunner {
  constructor(public connection: Connection, public query: DataQuery) {
    super();
  }

  getQueryAndParameters(): [string, any[]] {
    return EntityDataQueryExpToSqlTranslator.getQueryAndParameters(
      this.connection,
      this.query
    );
  }

  getRows(): Promise<any> {
    const [query, parameters] = this.getQueryAndParameters();
    return this.connection.query(query, parameters);
  }

  hasRows(): Promise<boolean> {
    const [sql, params] = this.getQueryAndParameters();
    const query = `SELECT COUNT(*) value FROM (SELECT * FROM (${sql}) x LIMIT 1) _rec`;
    return this.connection.query(query, params).then(rows => {
      return (rows[0]?.value ?? 0) > 0;
    });
  }

  async getCount(): Promise<number> {
    const [sql, params] = this.getQueryAndParameters();
    return this.connection
      .query(`SELECT COUNT(*) value FROM (${sql}) _rec`, params)
      .then(rows => {
        return rows[0]?.value ?? 0;
      });
  }
}
