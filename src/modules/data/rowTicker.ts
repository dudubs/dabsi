import { Tick } from "@dabsi/common/async/Tick";
import { Ticker } from "@dabsi/common/async/Ticker";
import { Constructor } from "@dabsi/common/typings2/Constructor";
import { DataContext } from "@dabsi/modules/data/context";
import { DataRowLoader } from "@dabsi/modules/data/rowLoader";
import { DataExp } from "@dabsi/typedata/exp/exp";
import { DataRow } from "@dabsi/typedata/row";
import { DataSelectionRow } from "@dabsi/typedata/selection/row";
import {
  AnyDataSelection,
  DataPickableKeys,
  DataSelection,
} from "@dabsi/typedata/selection/selection";
import { DataSource } from "@dabsi/typedata/source";
import { DataEmptySource } from "@dabsi/typedata/source/emptySource";
import { BasedDataRow, DataSourceRow } from "@dabsi/typedata/sourceRow";
import { DataUpdateRow } from "@dabsi/typedata/value";

export class DataRowTicker<T = any> {
  filter: DataExp<T> | undefined = undefined;

  protected _selection: AnyDataSelection = { pick: [] };

  protected _callbacks: ((row: any, tick: number) => Promise<void>)[] = [];

  constructor(
    protected data: DataContext,
    protected rowType: Constructor<T>,
    protected rowKey: string | null,
    protected runner: (callback: () => Promise<void>) => void
  ) {}

  get $key(): string | null {
    return this.rowKey;
  }

  getSource<T>(this: DataRowTicker<T>): DataSource<T> {
    if (!this.rowKey) return new DataEmptySource<T>();
    return this.data.getSource(this.rowType).of(this.rowKey);
  }

  async update<T>(this: DataRowTicker<T>, row: DataUpdateRow<T>) {
    await this.getSource().update(row);
  }

  async run(tick: number) {
    const { _callbacks } = this;
    if (!_callbacks.length) return;
    this._callbacks = [];

    const row = await this.getSource()
      .filter(this.filter)
      .select(this._selection as {})
      .get();

    await Promise.all(
      _callbacks.map(
        //
        async callback => callback(row, tick)
      )
    );
  }

  push(callback: (row: any, tick: number) => Promise<void>) {
    if (this._callbacks.length === 0) {
      this.runner(() => this.run(0));
    }
    this._callbacks.push(callback);
  }

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
