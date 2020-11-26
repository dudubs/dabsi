import { entries } from "../../../common/object/entries";
import { hasKeys } from "../../../common/object/hasKeys";
import { values } from "../../../common/object/values";

export class AclTokenTree {
  token?: string;
  children: Record<string, AclTokenTree> = {};

  *getBases(): IterableIterator<string> {
    const hasChildren = hasKeys(this.children);
    if (this.token && !hasChildren) {
      yield this.token;
    } else if (hasChildren) {
      for (const child of values(this.children)) {
        yield* child.getBases();
      }
    }
  }

  getTable(): { token: string; subTokens: string[] }[][] {
    const table: { token; subTokens }[][] = [];
    for (const { depth, token, subTokens } of this.flat()) {
      (table[depth] || (table[depth] = [])).push({
        token,
        subTokens,
      });
    }
    return table;
  }

  *flat(depth = 0) {
    const nextDepth = depth + (this.token ? 1 : 0);
    const subTokens: string[] = [];
    for (const child of values(this.children)) {
      for (const subChild of child.flat(nextDepth)) {
        subTokens.push(subChild.token);
        yield subChild;
      }
    }
    if (this.token) {
      yield {
        depth: depth,
        token: this.token,
        subTokens,
      };
    }
  }

  add(token: string): this {
    let node: AclTokenTree = this;
    for (const part of token.split("/")) {
      node = node.children[part] || (node.children[part] = new AclTokenTree());
    }
    node.token = token;
    return this;
  }
}
