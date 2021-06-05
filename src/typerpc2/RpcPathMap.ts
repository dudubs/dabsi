import { inspect } from "@dabsi/logging/inspect";
import { getRpcMetadata } from "@dabsi/typerpc2/getRpcMetadata";
import { RpcLocation } from "@dabsi/typerpc2/RpcLocation";
import { Rpc, RpcType } from ".";

type Node<V> = { value?: V; nodeMap?: Record<string, Node<V>> };

export default class RpcPathMap<V> {
  protected _map = new Map<RpcType, Map<number, Node<V>>>();

  constructor(protected parent?: RpcPathMap<V>) {}

  isEmpty() {
    return this._map.size === 0;
  }

  setByLocation(rpcLocation: RpcLocation<any>, value: V) {
    this.set(rpcLocation.rpcRootType, rpcLocation.path, value);
  }

  touchByLocation(rpcLocation: RpcLocation<any>, callback: () => V): V {
    return this.touch(rpcLocation.rpcRootType, rpcLocation.path, callback);
  }

  touch(rpcType: RpcType, path: string[], callback: () => V): V {
    let value = this.get(rpcType, path);
    if (value !== undefined) return value;
    this.set(rpcType, path, (value = callback()));
    return value;
  }

  set(rpcType: RpcType, path: string[], value: V): this {
    let node = this._map
      .touch(rpcType, () => new Map())
      .touch(path.length, () => ({}));
    for (const memberKey of path) {
      node = (node.nodeMap ||= {})[memberKey] = {};
    }
    node.value = value;
    return this;
  }

  protected *_findPathsWithItems(): IterableIterator<RpcPathMap<V>> {
    for (let map: RpcPathMap<V> = this; map; map = map.parent!) {
      if (!map.isEmpty()) {
        yield map;
      }
    }
  }
  getByLocation(rpcLocation: RpcLocation<any>) {
    for (const map of this._findPathsWithItems()) {
      for (const value of map._findByChildKeys(
        rpcLocation.rpcRootType,
        rpcLocation.path
      )) {
        return value;
      }
    }

    if (rpcLocation.rpcType) {
      return this._getByBase(Object.getPrototypeOf(rpcLocation.rpcType));
    }
  }

  get(rpcType: RpcType, path: string[]): V | undefined {
    return this.getByLocation(new RpcLocation(rpcType, path));
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
    path: string[],
    offset: number
  ): IterableIterator<V> {
    let node = this._map.get(rpcType)?.get(path.length - offset);

    for (let index = offset; node && path.length > index; index++) {
      const memberKey = path[index];
      node = node.nodeMap?.[memberKey];
    }
    if (node?.value !== undefined) {
      yield node.value;
    }
  }

  protected *_findByChildKeys(
    rpcType: RpcType,
    path: string[]
  ): IterableIterator<V> {
    const rootRpcType = rpcType;
    yield* this._findByChildKeysWithOffset(rpcType, path, 0);

    for (const [index, memberKey] of path.entries()) {
      const metadata = getRpcMetadata(rpcType);
      rpcType = metadata.childTypeMap[memberKey];
      if (!rpcType) {
        if (path.length > index + 1) {
          throw new Error(
            `Invalid rpc-path ${inspect({
              rpcType: rootRpcType,
              path: path.slice(index),
            })}`
          );
        }
        return;
      }
      yield* this._findByChildKeysWithOffset(rpcType, path, index + 1);
    }
  }
}
