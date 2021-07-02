import { defined } from "@dabsi/common/object/defined";
import TableMap from "@dabsi/common/TableMap";
import { inspect } from "@dabsi/logging/inspect";
import { IndexedIterable } from "immutable";

/*


*/

export type PathMapKey<K> = readonly [K, string[]];

type PathMapNode<V> = {
  value?: V;
  children?: Record<string, PathMapNode<V>>;
};

export default class PathMap<K, V> {
  readonly map = new Map<K, PathMapNode<V>>();

  constructor(readonly parent?: PathMap<K, V>) {}

  atPathKey?(key: K, pathKey: string): K | undefined;

  getPathKeys?(key: K): string[];

  getBaseKey?(key: K): K | undefined;

  protected _atValidPathKey(key: K, pathKey: string): K {
    return defined(
      this.atPathKey!(key, pathKey),
      () => `Invalid atPathKey ${inspect({ key, pathKey })}`
    );
  }

  protected _touchNode([key, path]: PathMapKey<K>): PathMapNode<V> {
    let node = this.map.touch(key, () => ({}));
    for (const pathKey of path) {
      node = (node.children ||= {})[pathKey] ||= {};
    }
    return node;
  }

  protected *_findParents() {
    for (
      let parent = this as PathMap<K, V>;
      parent !== undefined;
      parent = parent.parent!
    ) {
      if (!parent.map.size) continue;
      yield parent;
    }
  }

  getChildKey([key, path]: PathMapKey<K>): K | undefined {
    for (const [index, pathKey] of path.entries()) {
      key = this.atPathKey!(key, pathKey)!;
      if (key === undefined) {
        //
        if (path.length - index === 1) {
          return undefined;
        }
        throw new Error(
          `Invalid getChildKey ${inspect({
            key,
            path,
            index,
            pathKey,
          })}`
        );
      }
    }
    return key;
  }

  *find(
    direction: "UP" | "DOWN" | "SUFFIX",
    key: PathMapKey<K>
  ): IterableIterator<V> {
    for (const childKey of this.look(direction, key)) {
      for (const parent of this._findParents()) {
        const node = parent._getNode(childKey);
        if (node?.value !== undefined) {
          yield node.value;
        }
      }
    }
  }

  look(
    direction: "UP" | "DOWN" | "SUFFIX",
    key: PathMapKey<K>
  ): IterableIterator<PathMapKey<K>> {
    switch (direction) {
      case "DOWN":
        return this._lookDown(key, new Set(), new Set());
      case "UP":
        return this._lookUp(key, new Set());
      case "SUFFIX":
        return this._lookSuffix(key);
    }
  }

  protected *_lookUp(
    [key, path]: PathMapKey<K>,
    rootKeys: Set<K>
  ): IterableIterator<PathMapKey<K>> {
    if (!path.length && !rootKeys.touch(key)) return;

    yield [key, path];

    if (path.length) {
      yield* this._lookUp([key, path.slice(0, path.length - 1)], rootKeys);
    }

    const childKey = this.getChildKey([key, path]);

    if (childKey !== undefined) {
      yield* this._lookUp([childKey, []], rootKeys);

      const baseKey = this.getBaseKey!(childKey);
      if (baseKey) {
        yield* this._lookUp([baseKey, []], rootKeys);
      }
    }
  }

  protected *_lookSuffix([key, path]: PathMapKey<K>): IterableIterator<
    PathMapKey<K>
  > {
    yield [key, path];

    for (const [index, pathKey] of path.entries()) {
      key = this.atPathKey!(key, pathKey)!;
      if (!key) {
        // expect is the last
        if (path.length - index !== 1) {
          throw new Error(
            `Invalid path ${[
              path.slice(0, index).join("/"),
              "-->",
              ...path.slice(index + 1).join("/"),
            ]}`
          );
        }
        break;
      }
      yield [key, path.slice(index + 1)];
    }

    while ((key = this.getBaseKey!(key)!) !== undefined) {
      yield [key, []];
    }
  }

  protected *_lookDown(
    [key, path]: PathMapKey<K>,
    rootKeys: Set<K>,
    cycleKeys: Set<K>
  ): IterableIterator<[key: K, path: string[]]> {
    // for: abc
    // **********
    // ab^c
    // ^c
    // ^c^d
    // ^c^d^e

    if (!path.length && !rootKeys.touch(key)) return;

    yield [key, path];

    const childKey = this.getChildKey([key, path]);
    if (childKey !== undefined) {
      if (cycleKeys.has(childKey)) return;

      for (const pathKey of this.getPathKeys!(childKey)) {
        yield* this._lookDown(
          [key, [...path, pathKey]],
          rootKeys,
          new Set(cycleKeys).add(childKey)
        );
      }

      if (path.length) {
        yield* this._lookDown([childKey, []], rootKeys, new Set());
      }
    }

    if (!path.length) {
      const baseKey = this.getBaseKey!(key);
      if (baseKey) {
        yield* this._lookDown([baseKey, []], rootKeys, new Set());
      }
    }
  }

  protected _getNode([key, path]: PathMapKey<K>): PathMapNode<V> | undefined {
    let node = this.map.touch(key, () => ({}));
    for (const pathKey of path) {
      node = node.children?.[pathKey]!;
      if (!node) return;
    }
    return node;
  }

  update(key: PathMapKey<K>, callback: (value: V | undefined) => V): this {
    const node = this._touchNode(key);
    node.value = callback(node.value);
    return this;
  }

  set(key: PathMapKey<K>, value: V): this {
    this._touchNode(key).value = value;
    return this;
  }

  has(key: PathMapKey<K>): boolean {
    for (const _ of this.find("SUFFIX", key)) {
      return true;
    }
    return false;
  }

  get(key: PathMapKey<K>): V | undefined {
    for (const value of this.find("SUFFIX", key)) {
      return value;
    }
  }

  touch(key: PathMapKey<K>, callback: () => V): V {
    const value = this.get(key);
    if (value !== undefined) return value;
    const node = this._touchNode(key);
    if (node.value === undefined) {
      node.value = callback();
    }
    return node.value;
  }
}
