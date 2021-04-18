interface TouchableMap<K, V> {
  touch(key: K, create: (key: K) => V, set?: (value: V, key: K) => void): V;
}

declare global {
  interface Map<K, V> extends TouchableMap<K, V> {}
  interface WeakMap<K extends object, V> extends TouchableMap<K, V> {}
}

[WeakMap, Map].forEach(mapType => {
  mapType.prototype.touch = Map.prototype.touch = function (
    keyOrFactory,
    create,
    set?
  ) {
    const key = keyOrFactory;
    if (this.has(key)) return this.get(key);
    const value = create(key);
    this.set(key, value);
    set?.(value, key);
    return value;
  };
});

export {};
