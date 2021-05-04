import { mapObject } from "@dabsi/common/object/mapObject";
import { RpcType } from "./";
import { getRpcChildType } from "./getRpcMetadata";

type Node<V> = { value?: V; nodeMap?: Record<string, Node<V>> };

export class RpcChildMap<V> {
  protected _map = new Map<RpcType, Node<V>>();

  constructor(protected parent?: RpcChildMap<V>) {}

  set(rpcType: RpcType, childKeys: string[], value: V): void {
    let node = this._map.touch(rpcType, () => ({}));
    for (const childKey of childKeys) {
      node = (node.nodeMap ||= {})[childKey] = {};
    }
    node.value = value;
  }

  get(rpcType: RpcType, childKeys: string[]): V | undefined {
    for (const value of this.find(rpcType, childKeys)) {
      return value;
    }
    return this.parent?.get(rpcType, childKeys);
  }

  protected *_find(
    rpcType: RpcType,
    childKeys: string[],
    offset: number
  ): IterableIterator<V> {
    let node = this._map.get(rpcType);
    for (let index = offset; node && childKeys.length > index; index++) {
      const childKey = childKeys[index];
      node = node.nodeMap?.[childKey];
    }
    if (node?.value !== undefined) {
      yield node.value;
    }
  }

  *find(rpcType: RpcType, childKeys: string[]): IterableIterator<V> {
    yield* this._find(rpcType, childKeys, 0);

    for (const [index, childKey] of childKeys.entries()) {
      rpcType = getRpcChildType(rpcType, childKey);
      yield* this._find(rpcType, childKeys, index + 1);
    }
  }
}
