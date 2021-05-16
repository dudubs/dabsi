import { Rpc, RpcType } from "./";
import { getChildRpcType } from "./getRpcMetadata";

type Node<V> = { value?: V; nodeMap?: Record<string, Node<V>> };

export class RpcChildMap<V> {
  protected _map = new Map<RpcType, Map<number, Node<V>>>();

  constructor(protected parent?: RpcChildMap<V>) {}

  isEmpty() {
    return this._map.size === 0;
  }

  set(rpcType: RpcType, childKeys: string[], value: V): void {
    let node = this._map
      .touch(rpcType, () => new Map())
      .touch(childKeys.length, () => ({}));
    for (const childKey of childKeys) {
      node = (node.nodeMap ||= {})[childKey] = {};
    }
    node.value = value;
  }

  protected *_findPathsWithItems(): IterableIterator<RpcChildMap<V>> {
    for (let map: RpcChildMap<V> = this; map; map = map.parent!) {
      if (!map.isEmpty()) {
        yield map;
      }
    }
  }

  get(rpcType: RpcType, childKeys: string[]): V | undefined {
    for (const map of this._findPathsWithItems()) {
      for (const value of map._findByChildKeys(rpcType, childKeys)) {
        return value;
      }
    }
    rpcType = getChildRpcType(rpcType, childKeys);
    return this._getByBase(Object.getPrototypeOf(rpcType));
  }

  protected _getByBase(rpcType: RpcType): V | undefined {
    for (
      ;
      rpcType && rpcType !== Rpc;
      rpcType = Object.getPrototypeOf(rpcType)
    ) {
      for (const map of this._findPathsWithItems()) {
        if (map.isEmpty()) continue;
        const node = map._map.get(rpcType)?.get(0);
        if (node?.value !== undefined) {
          return node.value;
        }
      }
    }
  }

  protected *_findByChildKeysWithOffset(
    rpcType: RpcType,
    childKeys: string[],
    offset: number
  ): IterableIterator<V> {
    let node = this._map.get(rpcType)?.get(childKeys.length - offset);

    for (let index = offset; node && childKeys.length > index; index++) {
      const childKey = childKeys[index];
      node = node.nodeMap?.[childKey];
    }
    if (node?.value !== undefined) {
      yield node.value;
    }
  }

  protected *_findByChildKeys(
    rpcType: RpcType,
    childKeys: string[]
  ): IterableIterator<V> {
    yield* this._findByChildKeysWithOffset(rpcType, childKeys, 0);

    for (const [index, childKey] of childKeys.entries()) {
      rpcType = getChildRpcType(rpcType, childKey);

      yield* this._findByChildKeysWithOffset(rpcType, childKeys, index + 1);
    }
  }
}
