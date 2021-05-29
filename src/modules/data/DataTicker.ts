// TODO: rename to DataRowFetcher
import AsyncProcess from "@dabsi/common/async/AsyncProcess";
import { WeakMapFactory } from "@dabsi/common/map/mapFactory";
import { Constructor } from "@dabsi/common/typings2/Constructor";
import { DataSourceFactory2 } from "@dabsi/modules/DbModule";

import { Injectable } from "@dabsi/typedi";
import { DataRowTicker } from "./DataRowTicker";

// DataTicker

export type DataRowTickerMap = Map<Function, Map<string, DataRowTicker>>;

const getRowTickerMap = WeakMapFactory(
  (prcoess: AsyncProcess): DataRowTickerMap => {
    const map: DataRowTickerMap = new Map();
    prcoess.push(tick =>
      Promise.all(
        map
          .toSeq("values")
          .flatMap(rows => rows.toSeq("values"))
          .map(row => row.run(tick))
      )
    );
    return map;
  }
);

@Injectable()
export class DataTicker {
  constructor(
    //
    protected process: AsyncProcess,
    protected getDataSource: DataSourceFactory2
  ) {}

  getRowTicker<T>(
    rowType: Constructor<T>,
    rowKey: string | null
  ): DataRowTicker<T> {
    if (!rowKey)
      return new DataRowTicker(this.getDataSource, rowType, null, callback => {
        this.process.push(callback);
      });
    return getRowTickerMap(this.process)
      .touch(rowType, () => new Map())
      .touch(
        rowKey,
        () =>
          new DataRowTicker(this.getDataSource, rowType, rowKey, callback => {
            this.process.push(() => {
              return callback();
            });
          })
      );
  }
}
