import { Type } from "@dabsi/common/typings2/Type";
import { DataValue } from "@dabsi/typedata/value";

export class RichTextPackContext {
  packEntityKey(entityKey: string) {}

  packEntity<T>(type: Type<T>, data: DataValue<T>) {}

  //
}
