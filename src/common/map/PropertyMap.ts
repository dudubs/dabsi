import { BaseMap } from "./BaseMap";

export type PropertyMapOptions = {
  bind?: boolean;
  configurable?: boolean;
  enumerable?: boolean;
};
export type PropertyMap<K extends object, V> = BaseMap<K, V>;

export function PropertyMap<K extends object, V = any>(
  key: PropertyKey = Symbol(),
  { bind, configurable, enumerable = false }: PropertyMapOptions = {}
): BaseMap<K, V> {
  return {
    get(obj: K): V | undefined {
      if (bind && typeof obj[key] === "function") return obj[key].bind(obj);
      return obj[key];
    },
    has(obj: K): boolean {
      return key in obj;
    },
    set(obj: K, value: V): BaseMap<K, V> {
      if (!configurable || !enumerable) {
        Object.defineProperty(obj, key, {
          value,
          enumerable,
          configurable,
        });
      } else {
        obj[key] = value;
      }

      return this;
    },
    delete(obj: K) {
      delete obj[key];
    },
  };
}
