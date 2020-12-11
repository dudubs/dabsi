import { Field, AsField, AsFieldType } from "./Field";

export interface SetField<V> extends Field<Set<V>> {
  value: Field<V>;
}

export function SetField<V extends AsField<any>>(
  value: V
): SetField<NonNullable<AsFieldType<V>>> {
  return {
    value: Field(value),
    pack(value) {
      const items: any[] = [];
      for (let item of value) {
        item = this.value.pack(item);
        if (item != null) items.push(item);
      }
      return items;
    },
    unpack(value) {
      const set = new Set<any>();
      if (Array.isArray(value)) {
        for (let item of value) {
          item = this.value.unpack(item);
          if (item != null) set.add(item);
        }
      }
      return set;
    },
  };
}

declare module "./Field" {
  namespace Field {
    let set: typeof SetField;
  }
}

Field.set = SetField;
