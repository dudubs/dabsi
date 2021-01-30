import { Type } from "@dabsi/common/typings2/Type";
import { DataSource } from "@dabsi/typedata/source";

export class DataContext {
  constructor(public getSource: <T>(type: Type<T>) => DataSource<T>) {}
}
