import { hasKeys } from "@dabsi/common/object/hasKeys";
import { Fn } from "@dabsi/common/typings2/Fn";

const adapterSymbol = Symbol("adapterSymbol");
export interface Adapter<T> {
  empty(): T;
  clone(obj: T): T;
  isEmpty(obj: T): boolean;

  // map
  getKey(obj: T, key): any;
  setKey(obj: T, key, value): T;
  handleDelete(obj: T, keys: any[]): T;
  hasKey(obj: T, key): boolean;

  // list
  addItems(obj: T, items: any[]): T;
  removeItems(obj: T, items: any[]): T;

  hasItem(obj: T, item): boolean;
}

type OmitArg<T extends any[]> = T extends [any, ...infer U] ? U : never;

export default function <K extends keyof Adapter<any>>(
  method: K,
  o,
  ...args: OmitArg<Parameters<Extract<Adapter<any>[K], Fn>>>
): ReturnType<Extract<Adapter<any>[K], Fn>> {
  return o[adapterSymbol][method](o, ...args);
}

function define<T>(type: { prototype: T }, adapter: Adapter<T>) {
  Object.defineProperty(type.prototype, adapterSymbol, {
    enumerable: false,
    value: adapter,
  });
}

define(Object, {
  empty() {
    return {};
  },
  isEmpty(obj) {
    return !hasKeys(obj);
  },
  clone(obj) {
    return { ...obj };
  },
  getKey(obj, key) {
    return obj[key];
  },
  setKey(obj, key, value) {
    if (!obj) obj = {};
    obj[key] = value;
    return obj;
  },
  handleDelete(obj, keys) {
    keys.forEach(key => {
      delete obj[key];
    });
    return obj;
  },
  hasKey(obj, key) {
    return key in obj;
  },
  addItems() {
    throw new TypeError();
  },
  removeItems(obj, items) {
    items.forEach(item => {
      delete obj[item];
    });
    return obj;
  },
  hasItem(obj, item) {
    return item in obj;
  },
});

define(Set, {
  empty() {
    return new Set();
  },
  isEmpty(obj) {
    return obj.size === 0;
  },
  clone(obj) {
    return new Set(obj.keys());
  },
  getKey(obj, key) {
    return obj.has(key);
  },
  setKey(obj, key, value) {
    if (value) {
      obj.add(key);
    } else {
      obj.delete(key);
    }
    return obj;
  },
  handleDelete(obj, keys) {
    keys.forEach(key => {
      obj.delete(key);
    });
    return obj;
  },
  hasKey(obj, key) {
    return obj.has(key);
  },
  addItems(obj, items) {
    items.forEach(item => obj.add(item));
    return obj;
  },
  removeItems(obj, items) {
    items.forEach(item => obj.delete(item));
    return obj;
  },
  hasItem(obj, item) {
    return obj.has(item);
  },
});

define(Map, {
  empty() {
    return new Map();
  },
  isEmpty(obj) {
    return obj.size === 0;
  },
  clone(obj) {
    return new Map(obj.entries());
  },
  getKey(obj, key) {
    return obj.get(key);
  },
  setKey(obj, key, value) {
    obj.set(key, value);
    return obj;
  },
  handleDelete(obj, keys) {
    keys.forEach(key => {
      obj.delete(key);
    });
    return obj;
  },
  hasKey(obj, key) {
    return obj.has(key);
  },
  addItems() {
    throw new TypeError();
  },
  removeItems(obj, items) {
    items.forEach(item => obj.delete(item));
    return obj;
  },
  hasItem(obj, item) {
    return obj.has(item);
  },
});

define(Array, {
  empty() {
    return [];
  },
  isEmpty(obj) {
    return obj.length === 0;
  },
  clone(obj) {
    return [...obj];
  },
  getKey(obj, key) {
    return obj[key];
  },
  setKey(obj, key, value) {
    return obj.map((item, i) => (i === key ? value : item));
  },
  handleDelete(obj, keys) {
    const uniqueKeys = new Set(keys);
    return obj.filter((_, i) => !uniqueKeys.has(i));
  },
  hasKey(obj, key) {
    return key >= 0 && obj.length > key - 1;
  },
  addItems(obj, items) {
    items.forEach(item => obj.push(item));
    return obj;
  },
  removeItems(obj, items) {
    const uniqueItems = new Set(items);
    return obj.filter(value => !uniqueItems.has(value));
  },
  hasItem() {
    return false;
  },
});
