import { WeakMapFactory } from "@dabsi/common/map/mapFactory";
import { entries } from "@dabsi/common/object/entries";
import { mapObject } from "@dabsi/common/object/mapObject";
import { DataExp } from "@dabsi/typedata/exp/exp";
import { DataQuery, DataQueryExp } from "@dabsi/typedata/query/exp";
import { isDeepEqual } from "@dabsi/typeorm/utils/QueryExpBuilder";

export type ColumnLoader = (raw: object) => any;

export class DataQueryBuilder {
  constructor(public query: DataQuery) {}

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
