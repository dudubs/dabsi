import { DataQuery } from "@dabsi/typedata/query/exp";
import { QueryRunner } from "typeorm";
import { DataQueryTranslatorToSql } from "./sqlTranslator";

export class DataQueryRunner {
  constructor(public queryRunner: QueryRunner) {}

  protected _getSqlAndParameters(
    query: DataQuery,
    withoutFields: boolean
  ): [string, any[]] {
    return DataQueryTranslatorToSql.getQueryAndParameters(
      this.queryRunner.connection,
      query,
      [],
      { withoutFields }
    );
  }

  getRows(query: DataQuery): Promise<any[]> {
    const [sql, parameters] = this._getSqlAndParameters(query, false);
    // console.log(formatSql(query));
    return this.queryRunner.query(sql, parameters);
  }

  protected async _count(query: DataQuery, maxCount: number) {
    const [sql, params] = this._getSqlAndParameters(
      maxCount ? { ...query, take: maxCount } : query,
      true
    );
    const sqlCount = `SELECT COUNT(*) AS value ${sql}`;
    const [{ value = 0 } = {}] = await this.queryRunner.query(sqlCount, params);
    return value;
  }

  async has(query: DataQuery): Promise<boolean> {
    return Boolean(await this._count(query, 1));
  }

  async count(query: DataQuery): Promise<number> {
    return await this._count(query, 0);
  }
}
