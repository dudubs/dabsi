type PathMapNode<V> = {
  value?: V;
  children?: Record<string, PathMapNode<V>>;
};
export default class PathMap<K, V> {
  readonly map = new Map<K, PathMapNode<V>>();

  constructor(readonly parent?: PathMap<K, V>) {}

  getChildKey?(key: K, pathKey: string): K | undefined;

  getBaseKey?(key: K): K | undefined;

  protected _touchNode(key: K, path: string[]): PathMapNode<V> {
    let node = this.map.touch(key, () => ({}));
    for (const pathKey of path) {
      node = (node.children ||= {})[pathKey] ||= {};
    }
    return node;
  }

  protected *_findByChildKeys(
    key: K,
    path: string[],
    offset: number
  ): IterableIterator<V> {
    const node = this._getNode(key, path, offset);
    if (node?.value !== undefined) {
      yield node.value;
    }
  }

  protected *_findParents(): IterableIterator<PathMap<K, V>> {
    for (let pm = this as PathMap<K, V>; pm; pm = pm.parent!) {
      if (pm.map.size) {
        yield pm;
      }
    }
  }

  protected _getLastChildKey(key: K, path: string[]): K | undefined {
    if (!this.getChildKey) return;
    for (const pathKey of path) {
      key = this.getChildKey(key, pathKey)!;
      if (key === undefined) return;
    }
    return key;
  }

  protected *_findByBaseKey(key: K): IterableIterator<V> {
    for (const pm of this._findParents()) {
      for (
        let baseKey = key;
        baseKey !== undefined;
        baseKey = this.getBaseKey?.(baseKey)!
      ) {
        const node = pm._getNode(baseKey, []);
        if (node?.value !== undefined) {
          yield node.value;
        }
      }
    }
  }

  *find(key: K, path: string[]): IterableIterator<V> {
    for (const pm of this._findParents()) {
      yield* pm._findByChildKeys(key, path, 0);

      if (this.getChildKey) {
        let childKey = key;
        for (const [index, pathKey] of path.entries()) {
          childKey = this.getChildKey(childKey, pathKey)!;
          if (typeof childKey === undefined) break;
          yield* pm._findByChildKeys(childKey, path, index + 1);
        }
      }
    }

    const lastChildKey = this._getLastChildKey(key, path);
    if (lastChildKey !== undefined) {
      yield* this._findByBaseKey(lastChildKey);
    }
  }

  protected _getNode(
    key: K,
    path: string[],
    offset = 0
  ): PathMapNode<V> | undefined {
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
    return this.get(key, path) !== undefined;
  }

  get(key: K, path: string[]): undefined | V {
    for (const value of this.find(key, path)) {
      return value;
    }
  }

  touch(key: K, path: string[], callback: () => V): V {
    let value = this.get(key, path);
    if (value !== undefined) {
      return value;
    }
    this.set(key, path, (value = callback()));
    return value;
  }
}
