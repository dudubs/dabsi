import { Constructor } from "@dabsi/common/typings2/Constructor";
import { DataSource } from "@dabsi/typedata/source";

export type DataSourceFactory = <T>(type: Constructor<T>) => DataSource<T>;

export class DataContext {
  constructor(public getSource: DataSourceFactory) {}
}
