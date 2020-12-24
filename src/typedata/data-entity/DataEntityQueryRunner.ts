import { DataEntityQueryExpTranslatorToSql } from "@dabsi/typedata/data-entity/DataEntityQueryExpTranslatorToSql";
import { DataQuery } from "@dabsi/typedata/data-query/DataQueryExp";
import { QueryRunner } from "typeorm";

export default class DataEntityQueryRunner {
  constructor(public query: DataQuery, public queryRunner: QueryRunner) {}

  getQueryAndParameters(): [string, any[]] {
    return DataEntityQueryExpTranslatorToSql.getQueryAndParameters(
      this.queryRunner.connection,
      this.query
    );
  }

  getRows(): Promise<any> {
    const [query, parameters] = this.getQueryAndParameters();
    return this.queryRunner.query(query, parameters);
  }

  hasRow(): Promise<boolean> {
    const [sql, params] = this.getQueryAndParameters();
    const query = `SELECT COUNT(*) value FROM (SELECT * FROM (${sql}) x LIMIT 1) _rec`;
    return this.queryRunner.query(query, params).then(rows => {
      return (rows[0]?.value ?? 0) > 0;
    });
  }

  async getCount(): Promise<number> {
    const [sql, params] = this.getQueryAndParameters();
    return this.queryRunner
      .query(`SELECT COUNT(*) value FROM (${sql}) _rec`, params)
      .then(rows => {
        return rows[0]?.value ?? 0;
      });
  }
}
