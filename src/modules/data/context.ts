import { Constructor } from "@dabsi/common/typings2/Constructor";
import { DataSource } from "@dabsi/typedata/source";

export class DataContext {
  constructor(public getSource: <T>(type: Constructor<T>) => DataSource<T>) {}
}
