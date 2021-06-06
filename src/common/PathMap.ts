type PathMapNode<V> = {
  value?: V;
  children?: Record<string, PathMapNode<V>>;
};
export default class PathMap<K, V> {
  readonly map = new Map<K, PathMapNode<V>>();

  constructor(readonly parent?: PathMap<K, V>) {}

  getChildKey?(key: K, pathKey: string): K | undefined;

  getBaseKey?(key: K): K | undefined;

  protected _touchNode(key, path) {
    let node = this.map.touch(key, () => ({}));
    for (const pathKey of path) {
      node = (node.children ||= {})[pathKey] ||= {};
    }
    return node;
  }

  protected *_findAllWithOffset(key, path, offset) {
    const node = this._getNode(key, path, offset);
    if (node?.value !== undefined) {
      yield node.value;
    }
  }

  protected *_findParents() {
    for (let pm = this as PathMap<K, V>; pm; pm = pm.parent!) {
      if (pm.map.size) {
        yield pm;
      }
    }
  }

  *findAll(key: K, path: string[]): IterableIterator<V> {
    for (const pm of this._findParents()) {
      yield* pm._findAllWithOffset(key, path, 0);

      if (this.getChildKey) {
        let childKey = key;
        for (const [index, pathKey] of path.entries()) {
          childKey = this.getChildKey(childKey, pathKey)!;
          if (typeof childKey !== "string") break;
          yield* pm._findAllWithOffset(childKey, path, index + 1);
        }
      }
    }
    {
      for (
        let baseKey = key;
        baseKey !== undefined;
        baseKey = this.getBaseKey?.(baseKey)!
      ) {
        for (const pm of this._findParents()) {
          const node = pm._getNode(baseKey, []);
          if (node && "value" in node) {
            yield node.value!;
          }
        }
      }
    }
  }

  protected _getNode(key, path: string[], offset = 0) {
    let node = this.map.touch(key, () => ({}));
    for (let index = offset; path.length > index; index++) {
      const pathKey = path[index];
      node = node.children?.[pathKey]!;
      if (!node) return;
    }
    return node;
  }

  set(key: K, path: string[], value: V): this {
    this._touchNode(key, path).value = value;
    return this;
  }

  has(key: K, path: string[]): boolean {
    return (
      this._getNode(key, path) !== undefined ||
      this.parent?.has(key, path) ||
      false
    );
  }

  get(key: K, path: string[]): undefined | V {
    return this._getNode(key, path)?.value ?? this.parent?.get(key, path);
  }
}
