import { Connection } from "typeorm";
import { DataExp } from "../typedata/DataExp";
import { DataQuery, DataQueryExp } from "./DataQueryExp";
import { QueryExpTranslatorToSql } from "./QueryExpTranslatorToSql";
import { isDeepEqual } from "./utils/QueryExpBuilder";

export type ColumnLoader = (raw: object) => any;

export class DataQueryBuilderOld {
  constructor(
    public connection: Connection,
    public query: DataQuery,
    public alias = "r_" + query.from
  ) {}

  get fields() {
    return this.query.fields || (this.query.fields = {});
  }

  get joins(): NonNullable<DataQuery["joins"]> {
    return this.query.joins || (this.query.joins = {});
  }

  get order(): NonNullable<DataQuery["order"]> {
    return this.query.order || (this.query.order = []);
  }

  join(
    alias: string,
    name: string,
    type: "LEFT" | "INNER",
    condition: DataExp<any>
  ): this {
    if (this.joins[alias]) throw new Error(`Can't override join ${name}`);
    this.joins[alias] = { type, condition, from: name };
    return this;
  }

  filter(exp: DataExp<any>): this {
    this.query.where = DataExp(this.query.where, exp);
    return this;
  }

  selectColumn(schema: string, name: string): ColumnLoader {
    return this.select(schema + "_c_" + name, { $at: { [schema]: name } });
  }

  select(aliasName: string, selection: DataQueryExp): ColumnLoader {
    const prevSelection = this.fields[aliasName];
    if (prevSelection !== undefined) {
      if (!isDeepEqual(selection, prevSelection)) {
        throw new Error(`Can't override selection ${aliasName}.`);
      }
      return raw => raw[aliasName];
    }
    this.fields[aliasName] = selection;
    return raw => raw[aliasName];
  }

  createTranslator() {
    return new QueryExpTranslatorToSql([], this.connection, this.alias);
  }

  getQueryAndParameters(): [string, any[]] {
    const translator = this.createTranslator();
    return [translator.translateQuery(this.query), translator.parameters];
  }

  getRows(): Promise<any> {
    const [query, parameters] = this.getQueryAndParameters();
    return this.connection.query(query, parameters);
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
}

export class DataQueryBuilder {
  constructor(
    public query: DataQuery // public alias = "r_" + query.from
  ) {}

  build(): DataQuery {
    ///
  }
  get fields() {
    return this.query.fields || (this.query.fields = {});
  }

  get joins(): NonNullable<DataQuery["joins"]> {
    return this.query.joins || (this.query.joins = {});
  }

  get order(): NonNullable<DataQuery["order"]> {
    return this.query.order || (this.query.order = []);
  }

  join(
    alias: string,
    name: string,
    type: "LEFT" | "INNER",
    condition: DataExp<any>
  ): this {
    if (this.joins[alias]) throw new Error(`Can't override join ${name}`);
    this.joins[alias] = { type, condition, from: name };
    return this;
  }

  filter(exp: DataExp<any>): this {
    this.query.where = DataExp(this.query.where, exp);
    return this;
  }

  selectColumn(schema: string, name: string): ColumnLoader {
    return this.select(schema + "_c_" + name, { $at: { [schema]: name } });
  }

  select(aliasName: string, selection: DataQueryExp): ColumnLoader {
    const prevSelection = this.fields[aliasName];
    if (prevSelection !== undefined) {
      if (!isDeepEqual(selection, prevSelection)) {
        throw new Error(`Can't override selection ${aliasName}.`);
      }
      return raw => raw[aliasName];
    }
    this.fields[aliasName] = selection;
    return raw => raw[aliasName];
  }
}
