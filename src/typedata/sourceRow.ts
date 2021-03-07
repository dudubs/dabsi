import { WithDataKey } from "@dabsi/typedata/key";
import { DataRelationKeys } from "@dabsi/typedata/relation";
import { DataRow } from "@dabsi/typedata/row";
import { DataSource } from "@dabsi/typedata/source";
import { DataUpdateRow } from "@dabsi/typedata/value";
import { RebaseType, WithBaseType } from "./BaseType";

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
  ): DataSource<RebaseType<T>> {
    if (filterThis) return this[source].filter({ $is: this.$key });
    return this[source];
  }

  at<T extends AnyBasedDataRow, K extends DataRelationKeys<T>>(
    this: T,
    propertyName: K
  ): DataSource.At<T, K> {
    return <any>this.getSource().at(propertyName, this.$key);
  }

  delete<T extends AnyBasedDataRow>(this: T) {
    return this.getSource().delete(this.$key);
  }

  remove<T extends AnyBasedDataRow>(this: T) {
    return this.getSource().remove(this.$key);
  }

  update<T extends AnyBasedDataRow>(
    this: T,
    value: DataUpdateRow<RebaseType<T>>
  ) {
    return this.getSource().update(this.$key, value);
  }

  reload<T extends AnyBasedDataRow>(this: T): Promise<DataRow<RebaseType<T>>> {
    return this.getSource().getOrFail(this.$key);
  }
}
