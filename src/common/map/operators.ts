import { Seq } from "immutable4";

interface _Map<K, V> {
  touch(key: K, callback: (key: K) => V): V;
}
declare global {
  interface Map<K, V> extends _Map<K, V> {}
  interface WeakMap<K extends object, V> extends _Map<K, V> {}
}

[WeakMap, Map].forEach(mapType => {
  mapType.prototype.touch = Map.prototype.touch = function (
    keyOrFactory,
    callback?
  ) {
    const key = keyOrFactory;
    if (this.has(key)) return this.get(key);
    const value = callback(key);
    this.set(key, value);
    return value;
  };
});

export {};
