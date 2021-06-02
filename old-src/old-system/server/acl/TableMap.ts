import { entries } from "@dabsi/common/object/entries";

export type TableMapNode<V> = {
  value?: V;
  children: Record<string, TableMapNode<V>>;
};

export class TableMap<V> {
  readonly root: TableMapNode<V> = { children: {} };

  *flat(
    node: TableMapNode<V> = this.root,
    keys: string[] = []
  ): IterableIterator<{ node: TableMapNode<V>; keys: string[] }> {
    if (keys.length !== 0) yield { node, keys };
    for (const [key, child] of entries(node.children)) {
      yield* this.flat(child, [...keys, key]);
    }
  }

  set(keys: string[], value: V): this {
    let node = this.root;
    for (const key of keys) {
      node =
        node.children[key] ||
        (node.children[key] = {
          children: {},
        });
    }
    node.value = value;
    return this;
  }

  get(keys: string[]): V | undefined {
    let node = this.root;
    for (const key of keys) {
      node = node.children[key];
      if (!node) return;
    }
    return node.value;
  }

  has(keys: string[]): boolean {
    let node = this.root;
    for (const key of keys) {
      node = node.children[key];
      if (!node) return false;
    }
    return "value" in node;
  }
}
