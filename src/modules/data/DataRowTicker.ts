import { defined } from "@dabsi/common/object/defined";
import { Constructor } from "@dabsi/common/typings2/Constructor";

import { DataRowLoader } from "@dabsi/modules/data/DataRowLoader";
import { DataSourceFactory2 } from "@dabsi/modules/DataSourceFactory2";
import { DataExp } from "@dabsi/typedata/exp/exp";
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
  filter: DataExp<T> | undefined = undefined;

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
    return this.getSource().at(relationPropertyName, this._key);
  }

  // TODO: updateBeforeFetch, updateAfterFetch
  async update<T>(this: DataRowTicker<T>, row: DataUpdateRow<T>) {
    // TODO: update on tick: runUpdate(), runFetch()
    await this.getSource().update(this._key, row);
  }

  protected get _key(): string {
    return defined(this.$key, () => `No "${this.rowType.name}" key`);
  }

  async delete() {
    return this.getSource().delete(this._key);
  }

  async run(tick: number) {
    const { _callbacks } = this;
    if (!_callbacks.length) return;
    this._callbacks = [];

    const row = await this.getSource()
      .of(this._key)
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

  fetch2!: <T, S extends DataSelection<T>>(
    this: DataRowTicker<T>,
    selection: S
  ) => S;

  fetch<
    T,
    K extends DataPickableKeys<T>,
    S extends Omit<DataSelection<T>, "pick"> = {}
  >(
    this: DataRowTicker<T>,
    keys: K[],
    selection?: S
  ): Promise<DataRow<DataSelectionRow<T, S & { pick: K[] }>>>;

  fetch<T, S extends DataSelection<T>>(
    this: DataRowTicker<T>,
    selection: S
  ): Promise<DataRow<DataSelectionRow<T, S>>>;

  fetch(keysOrSel, maybeSel?) {
    if (!this.$key) return Promise.resolve({});

    const selection: AnyDataSelection = Array.isArray(keysOrSel)
      ? {
          ...maybeSel,
          pick: keysOrSel,
        }
      : keysOrSel;

    const selLoader = DataRowLoader(
      this._selection,
      selection as AnyDataSelection
    );

    return new Promise(resolve => {
      this.push(async (row, tick) => {
        resolve(row ? selLoader(row) : {});
      });
    });
  }
}
