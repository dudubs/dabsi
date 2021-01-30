import { DataQuery } from "@dabsi/typedata/query/exp";
import { QueryRunner } from "typeorm";
import { DataQueryTranslatorToSql } from "./sqlTranslator";

export default class DataQueryRunner {
  constructor(public query: DataQuery, public queryRunner: QueryRunner) {}

  getQueryAndParameters(): [string, any[]] {
    return DataQueryTranslatorToSql.getQueryAndParameters(
      this.queryRunner.connection,
      this.query
    );
  }

  getRows(): Promise<any> {
    const [query, parameters] = this.getQueryAndParameters();
    // console.log(formatSql(query));
    return this.queryRunner.query(query, parameters);
  }

  hasRows(): Promise<boolean> {
    const [sql, params] = this.getQueryAndParameters();
    const query = `SELECT COUNT(*) value FROM (SELECT * FROM (${sql}) x LIMIT 1) _rec`;
    return this.queryRunner.query(query, params).then(rows => {
      return (rows[0]?.value ?? 0) > 0;
    });
  }

  async getCountRows(): Promise<number> {
    const [sql, params] = this.getQueryAndParameters();
    return this.queryRunner
      .query(`SELECT COUNT(*) value FROM (${sql}) _rec`, params)
      .then(rows => {
        return rows[0]?.value ?? 0;
      });
  }
}
