import { Field, AsField, AsFieldType } from "./Field";

export interface MapField<K, V> extends Field<Map<K, V>> {
  key: Field<K>;
  value: Field<V>;
}

export function MapField<K extends AsField<any>, V extends AsField<any>>(
  key: K,
  value: V
): MapField<NonNullable<AsFieldType<K>>, AsFieldType<V>> {
  return {
    key: Field(key),
    value: Field(value),
    pack(map) {
      const entries: [any, any][] = [];
      for (const [key, value] of map.entries()) {
        entries.push([this.key.pack(key), this.value.pack(value)]);
      }
      return entries;
    },
    unpack(entries) {
      const map = new Map();
      if (Array.isArray(entries)) {
        for (let [key, value] of entries) {
          key = this.key.unpack(key);
          if (key != null) {
            map.set(key, this.value.unpack(value));
          }
        }
      }
      return map;
    },
  };
}

declare module "@dabsi/struct/Field" {
  namespace Field {
    export { MapField as map };
  }
}

Field.map = MapField;
