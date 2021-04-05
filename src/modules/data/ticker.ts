import { Ticker } from "@dabsi/common/async/Ticker";
import { WeakMapFactory } from "@dabsi/common/map/mapFactory";
import { Constructor } from "@dabsi/common/typings2/Constructor";
import { DataContext } from "@dabsi/modules/data/context";
import { Injectable } from "@dabsi/typedi";
import { DataRowTicker } from "./rowTicker";

// DataTicker

export type DataRowTickerMap = Map<Function, Map<string, DataRowTicker>>;

const getRowTickerMap = WeakMapFactory(
  (ticker: Ticker): DataRowTickerMap => {
    const map = new Map();
    ticker.push(tick =>
      Promise.all(
        map
          .toSeq()
          .toIndexedSeq()
          .flatMap(rows =>
            rows
              .toSeq()
              .toIndexedSeq()
              .map(row => row.run(tick))
          )
      )
    );
    return map;
  }
);

@Injectable()
export class DataTicker {
  constructor(protected ticker: Ticker, protected data: DataContext) {}

  getRowTicker<T>(
    rowType: Constructor<T>,
    rowKey: string | null
  ): DataRowTicker<T> {
    if (!rowKey)
      return new DataRowTicker(this.data, rowType, null, callback => {
        this.ticker.push(callback);
      });
    return getRowTickerMap(this.ticker)
      .touch(rowType, () => new Map())
      .touch(
        rowKey,
        () =>
          new DataRowTicker(this.data, rowType, rowKey, callback => {
            this.ticker.push(callback);
          })
      );
  }
}
