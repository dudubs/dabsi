import { Field, AsField } from "@dabsi/struct/Field";

declare module "./Field" {
  namespace Field {
    export { ArrayField as array };
  }
}

export interface ArrayField<T> extends Field<T[]> {
  item: Field<T>;
}

export function ArrayField<T extends AsField<any>>(item: T): ArrayField<T> {
  return {
    item: Field(item),
    pack(value) {
      return value.map(item => this.item.pack(item));
    },
    unpack(value) {
      if (Array.isArray(value))
        return value.map(item => this.item.unpack(item));
      return [];
    },
  };
}

Field.array = ArrayField;
