import { mapObject } from "@dabsi/common/object/mapObject";
import { Field, AsField, AsFieldType } from "@dabsi/struct/Field";

export interface RecordField<V> extends Field<Record<string, V>> {
  value: Field<V>;
}

export function RecordField<V extends AsField<any>>(
  value: V
): RecordField<AsFieldType<V>> {
  return {
    value: Field(value),
    unpack(value) {
      return mapObject(value || {}, value => this.value.unpack(value));
    },
    pack(value) {
      return mapObject(value, value => this.value.pack(value));
    },
  };
}

declare module "@dabsi/struct/Field" {
  namespace Field {
    let record: typeof RecordField;
  }
}

Field.record = RecordField;
