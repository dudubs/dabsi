import { reversed } from "@dabsi/common/array/reversed";

type Node<V> = {
  children?: Record<string, Node<V>>;
  value?: V;
};

export class TableMap<V> {
  protected _root: Node<V> = {};

  protected _touchNode(keys: string[]): Node<V> {
    let node = this._root;
    for (const key of keys) {
      node = (node.children ||= {})[key] ||= {};
    }
    return node;
  }

  set(keys: string[], value: V): this {
    this._touchNode(keys).value = value;
    return this;
  }

  get(keys: string[]): V | undefined {
    let node = this._root;
    for (const key of keys) {
      if (!(node = node.children?.[key]!)) {
        return;
      }
    }
    return node.value;
  }

  delete(keys: string[]): void {
    let node = this._root;
    for (const key of keys) {
      if (!(node = node.children?.[key]!)) {
        return;
      }
    }
  }

  touch(keys: string[], callback: () => V): V {
    return (this._touchNode(keys).value ??= callback());
  }
}

export default TableMap;
