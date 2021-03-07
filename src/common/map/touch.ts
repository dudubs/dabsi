interface _Map<K, V> {
  touch(
    key: K,
    callback: (key: K) => V,
    afterCallback?: (value: V, key: K) => void
  ): V;
}

declare global {
  interface Map<K, V> extends _Map<K, V> {}
  interface WeakMap<K extends object, V> extends _Map<K, V> {}
}

[WeakMap, Map].forEach(mapType => {
  mapType.prototype.touch = Map.prototype.touch = function (
    keyOrFactory,
    callback,
    afterCallback?
  ) {
    const key = keyOrFactory;
    if (this.has(key)) return this.get(key);
    const value = callback(key);
    this.set(key, value);
    afterCallback?.(value, key);
    return value;
  };
});

export {};
