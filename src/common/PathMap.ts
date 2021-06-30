import { defined } from "@dabsi/common/object/defined";

/*


*/

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
    offset: number,
    length: number
  ): IterableIterator<V> {
    const node = this._getNode(key, path, offset, length);
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

  protected _getLastChildKey(
    key: K,
    path: string[],
    length: number
  ): K | undefined {
    if (!this.getChildKey) return;

    for (let index = 0; length > index; index++) {
      const pathKey = path[index];
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
        const node = pm._getNode(baseKey, [], 0, 0);
        if (node?.value !== undefined) {
          yield node.value;
        }
      }
    }
  }

  /** @deprecated use findSuffix() */
  find(key: K, path: string[]): IterableIterator<V> {
    return this._findSuffix(key, path, path.length);
  }

  *findSuffix(key: K, path: string[]): IterableIterator<V> {
    for (const pm of this._findParents()) {
      yield* pm._findSuffix(key, path, path.length);
    }
  }

  protected *_findSuffix(
    key: K,
    path: string[],
    length: number
  ): IterableIterator<V> {
    // a.b.c.d.e
    //   b.c.d.e
    //     c.d.e
    //       d.e
    //         e

    yield* this._findByChildKeys(key, path, 0, length);

    if (this.getChildKey) {
      let childKey = key;

      for (let offset = 0; length > offset; offset++) {
        const pathKey = path[offset];
        childKey = this.getChildKey(childKey, pathKey)!;
        if (typeof childKey === undefined) break;
        yield* this._findByChildKeys(childKey, path, offset + 1, length);
      }
    }

    if (length) {
      const lastChildKey = this._getLastChildKey(key, path, length);
      if (lastChildKey !== undefined) {
        yield* this._findByBaseKey(lastChildKey);
      }
    }
  }

  *findPrefix(key: K, path: string[]) {
    for (const pm of this._findParents()) {
      yield* pm._findPrefix(key, path);
    }
  }

  protected *_findPrefix(key: K, path: string[]) {
    //             {L, O} L=Length, O=Offset
    // a           {0, 0}
    // a.b         {1, 0}
    //   b         {1, 1}
    // a.b.c       {2, 0}
    //   b.c       {2, 1}
    //     c       {2, 2}
    // a.b.c.d     {3, 0}
    //   b.c.d     {3, 1}
    //     c.d     {3, 2}
    //       d     {3, 3}
    // a.b.c.d.e   {4, 0}
    //   b.c.d.e   {4, 1}
    //     c.d.e   {4, 2}
    //       d.e   {4, 3}
    //         e   {4, 4}

    for (let length = 0; path.length + 1 > length; length++) {
      yield* this._findSuffix(key, path, length);
    }
  }

  protected _getNode(
    key: K,
    path: string[],
    offset: number,
    length: number
  ): PathMapNode<V> | undefined {
    let node = this.map.touch(key, () => ({}));
    for (let index = offset; length > index; index++) {
      const pathKey = path[index];
      node = node.children?.[pathKey]!;
      if (!node) return;
    }
    return node;
  }

  update(key: K, path: string[], callback: (value: V | undefined) => V): this {
    const node = this._touchNode(key, path);
    node.value = callback(node.value);
    return this;
  }

  set(key: K, path: string[], value: V): this {
    this._touchNode(key, path).value = value;
    return this;
  }

  has(key: K, path: string[]): boolean {
    return this.get(key, path) !== undefined;
  }

  get(key: K, path: string[]): undefined | V {
    for (const value of this.findSuffix(key, path)) {
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
