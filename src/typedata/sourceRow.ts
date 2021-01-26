import { GetBaseType, WithBaseType } from "./BaseType";
import { WithDataKey } from "@dabsi/typedata/key";
import { DataRow } from "@dabsi/typedata/row";
import { DataSource, DataSourceAt } from "@dabsi/typedata/source";
import { DataUpdate } from "@dabsi/typedata/value";
import { DataRelationKeys } from "@dabsi/typedata/relation";

export type BasedDataRow<T> = WithDataKey & WithBaseType<T> & DataSourceRow;

export type AnyBasedDataRow = BasedDataRow<any>;

const source = Symbol("dataSource");

export class DataSourceRow {
  constructor(protected _source: DataSource<any>) {
    this[source] = _source;
  }

  getSource<T extends AnyBasedDataRow>(
    this: T,
    filterThis: boolean = false
  ): DataSource<GetBaseType<T>> {
    if (filterThis) return this[source].filter({ $is: this.$key });
    return this[source];
  }

  at<T extends AnyBasedDataRow, K extends DataRelationKeys<GetBaseType<T>>>(
    this: T,
    propertyName: K
  ): DataSourceAt<GetBaseType<T>, K> {
    return this.getSource().at(propertyName, this.$key);
  }

  delete<T extends AnyBasedDataRow>(this: T) {
    return this.getSource().delete(this.$key);
  }

  remove<T extends AnyBasedDataRow>(this: T) {
    return this.getSource().remove(this.$key);
  }

  update<T extends AnyBasedDataRow>(
    this: T,
    value: DataUpdate<GetBaseType<T>>
  ) {
    return this.getSource().update(this.$key, value);
  }

  reload<T extends AnyBasedDataRow>(this: T): Promise<DataRow<GetBaseType<T>>> {
    return this.getSource().getOrFail(this.$key);
  }
}
