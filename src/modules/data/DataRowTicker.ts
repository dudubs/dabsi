import { defined } from "@dabsi/common/object/defined";
import { Constructor } from "@dabsi/common/typings2/Constructor";
import { DataRowLoader } from "@dabsi/modules/data/DataRowLoader";
import { DataSourceFactory2 } from "@dabsi/modules/DbModule";
import { User } from "@dabsi/system/acl/entities/User";
import { DataExp } from "@dabsi/typedata/exp/exp";
import { DataFields } from "@dabsi/typedata/fields";
import { DataRelationKeys } from "@dabsi/typedata/relation";
import { DataRow } from "@dabsi/typedata/row";
import { DataSelectionRow } from "@dabsi/typedata/selection/row";
import {
  AnyDataSelection,
  DataPickableKeys,
  DataSelection,
} from "@dabsi/typedata/selection/selection";
import { DataSource } from "@dabsi/typedata/source";
import { DataUpdateRow } from "@dabsi/typedata/value";

export class DataRowTicker<T = any> {
  filter: DataExp<T> = undefined;

  protected _selection: AnyDataSelection = { pick: [] };

  protected _callbacks: ((row: any, tick: number) => Promise<void>)[] = [];

  constructor(
    protected getDataSource: DataSourceFactory2,
    protected rowType: Constructor<T>,
    protected rowKey: string | null,
    protected runner: (callback: () => Promise<void>) => void
  ) {}

  get $key(): string | null {
    return this.rowKey;
  }

  getSource<T>(this: DataRowTicker<T>): DataSource<T> {
    return this.getDataSource(this.rowType);
  }

  at<T, K extends DataRelationKeys<T>>(
    this: DataRowTicker<T>,
    relationPropertyName: K
  ): DataSource.At<T, K> {
    return <any>this.getSource().at(relationPropertyName, this._definedKey);
  }

  // TODO: updateBeforeFetch, updateAfterFetch
  async update<T>(this: DataRowTicker<T>, row: DataUpdateRow<T>) {
    // TODO: update on tick: runUpdate(), runFetch()
    await this.getSource().update(this._definedKey, row);
  }

  protected get _definedKey(): string {
    return defined(this.$key, () => `No "${this.rowType.name}" key`);
  }

  async delete() {
    return this.getSource().delete(this._definedKey);
  }

  async run(tick: number) {
    const { _callbacks } = this;
    if (!_callbacks.length) return;
    this._callbacks = [];

    const row = await this.getSource()
      .of(this._definedKey)
      .filter(this.filter)
      .select(this._selection as {})
      .get();

    // reset selection
    this._selection = { pick: [] };

    await Promise.all(_callbacks.map(async callback => callback(row, tick)));
  }

  push(callback: (row: any, tick: number) => Promise<void>) {
    if (this._callbacks.length === 0) {
      this.runner(() => {
        return this.run(0);
      });
    }

    this._callbacks.push(callback);
  }

  select<T, S extends DataSelection<T>>(
    this: DataRowTicker<T>,
    selection: S
  ): Promise<DataRow<DataSelectionRow<T, S>>> {
    const loader = DataRowLoader(
      this._selection,
      selection as AnyDataSelection
    );
    return new Promise(resolve => {
      this.push(async row => {
        resolve(row ? loader(row) : {});
      });
    });
  }

  pick2!: <T, K extends DataPickableKeys<T>>(
    this: DataRowTicker<T>,
    keys: readonly K[]
  ) => any;

  pick<T, F extends DataFields<T>>(
    this: DataRowTicker<T>,
    fields: F
  ): PromisedDataRow<T, { fields: F }>;

  pick<T, K extends DataPickableKeys<T>>(
    this: DataRowTicker<T>,
    keys: readonly K[]
  ): PromisedDataRow<T, { pick: K[] }>;

  pick<T, K extends DataPickableKeys<T>, F extends DataFields<T>>(
    this: DataRowTicker<T>,
    keys: readonly K[],
    fields: F
  ): PromisedDataRow<T, { pick: K[]; fields: F }>;

  pick(keysOrFields, maybeFields?) {
    let keys;
    let fields;

    if (Array.isArray(keysOrFields)) {
      [keys, fields] = [keysOrFields, maybeFields || {}];
    } else {
      [keys, fields] = [undefined, keysOrFields];
    }

    return this.select({ pick: keys, fields });
  }
}

type PromisedDataRow<T, S> = Promise<DataRow<DataSelectionRow<T, S>>>;
