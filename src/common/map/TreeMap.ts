import { inspect } from "@dabsi/logging/inspect";

export default class TreeMap<K> {
  protected _childMap = new Map<K, Set<K>>();
  protected _parentMap = new Map<K, K>();

  set(key: K, parentKey: K) {
    this._parentMap.set(key, parentKey);

    for (const rootKey of this.parents(parentKey, true)) {
      this._childMap.touch(rootKey, () => new Set()).add(key);
    }
  }

  delete(key: K) {
    this._parentMap.delete(key);
    if (this._childMap.get(key)?.size) {
      throw new Error(`Can't delete parent ${inspect(key)}.`);
    }
    this._childMap.delete(key);

    for (const parentKey of this.parents(key, false)) {
      this._childMap.get(parentKey)!.delete(key);
    }
  }

  *children(
    key: K,
    reversed: boolean,
    includeThis: boolean
  ): IterableIterator<K> {
    if (!reversed && includeThis) {
      yield key;
    }
    for (const childKey of this._childMap.get(key) || []) {
      yield* this.children(childKey, reversed, true);
    }
    if (reversed && includeThis) {
      yield key;
    }
  }

  *parents(key: K, includeThis: boolean): IterableIterator<K> {
    for (
      key = includeThis ? key : this._parentMap.get(key)!;
      key !== undefined;
      key = this._parentMap.get(key)!
    ) {
      yield key;
    }
  }
}
