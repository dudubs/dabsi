import { WithDataKey } from "./DataKey";
import { BaseDataRow, BaseDataRowType } from "./DataRow";
import { DataSource, DataSourceAt } from "./DataSource";
import { DataValues } from "./DataValues";
import { RelationKeys } from "./Relation";

export type AnyDataSourceRow = WithDataKey & BaseDataRow<any> & DataSourceRow;

export class DataSourceRow {
  constructor(
    public getSource: <T extends AnyDataSourceRow>(
      this: T
    ) => DataSource<BaseDataRowType<T>>
  ) {}

  at<T extends AnyDataSourceRow, K extends RelationKeys<BaseDataRowType<T>>>(
    this: T,
    propertyName: K
  ): DataSourceAt<BaseDataRowType<T>, K> {
    return this.getSource().at(propertyName, this.$key);
  }

  delete<T extends AnyDataSourceRow>(this: T) {
    return this.getSource().delete(this.$key);
  }

  remove<T extends AnyDataSourceRow>(this: T) {
    return this.getSource().remove(this.$key);
  }

  update<T extends AnyDataSourceRow>(
    this: T,
    values: DataValues<BaseDataRowType<T>>
  ) {
    return this.getSource().remove(this.$key);
  }

  reload<T extends AnyDataSourceRow>(this: T): Promise<T> {
    return this.getSource().getOrFail(this.$key);
  }
}
