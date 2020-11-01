import { AclCriterion, AnyAclCriterion } from "./AclCriterion";
import { AclRequest } from "./AclRequest";

export class AclPrivilege {
  protected allowCriterions: AnyAclCriterion[] = [];
  protected denyCriterions: AnyAclCriterion[] = [];

  allow<T, U = T>(criterion: AclCriterion<T, U>): this {
    this.allowCriterions.push(criterion as AnyAclCriterion);
    return this;
  }

  deny<T, U = T>(options: AclCriterion<T, U>): this {
    this.denyCriterions.push(options as AnyAclCriterion);
    return this;
  }
}

export class AclTokens<T extends Record<string, (p: AclPrivilege) => void>> {
  constructor(public request: AclRequest, public tokens: T) {}

  protected registered = new Set<string>();

  async review(): Promise<Record<keyof T, boolean>> {
    let sql = `1`;

    throw new Error();
  }

  register<K extends string & keyof T>(...keys: K[]) {
    for (const key of keys) {
      if (!this.registered.has(key)) {
        this.registered.add(key);
        this.tokens[key](this.request);
      }
    }
  }
}
