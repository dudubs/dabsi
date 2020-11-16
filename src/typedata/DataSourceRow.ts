import { GetBaseType, WithBaseType } from "./BaseType";
import { WithDataKey } from "./DataKey";
import { DataRow } from "./DataRow";
import { DataSource, DataSourceAt } from "./DataSource";
import { DataUpdate } from "./DataValue";
import { RelationKeys } from "./Relation";

export type BasedDataRow<T> = WithDataKey & WithBaseType<T> & DataSourceRow;

export type AnyBasedDataRow = BasedDataRow<any>;

const source = Symbol("dataSource");

export class DataSourceRow {
  constructor(protected _source: DataSource<any>) {
    this[source] = _source;
  }

  getSource<T extends AnyBasedDataRow>(this: T): DataSource<GetBaseType<T>> {
    return this[source];
  }

  at<T extends AnyBasedDataRow, K extends RelationKeys<GetBaseType<T>>>(
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
