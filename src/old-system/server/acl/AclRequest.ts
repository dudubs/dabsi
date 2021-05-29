import { Connection } from "typeorm";
import { hasKeys } from "@dabsi/common/object/hasKeys";
import { AclExp } from "@dabsi/system-old/server/acl/AclExp";
import { AclQuery } from "@dabsi/system-old/server/acl/AclQuery";
import { AclTokenTree } from "@dabsi/system-old/server/acl/AclTokenTree";

export class AclRequest {
  protected allowed: AclExp[] = [];
  protected denied: AclExp[] = [];

  protected tokenTree = new AclTokenTree();

  constructor(
    protected connection: Connection,
    protected userKey: string | undefined
  ) {}

  allow(...exps: AclExp[]): this {
    exps = exps.filter(exp => {
      if (typeof exp === "string") {
        this.tokenTree.add(exp);
        return false;
      }
      return true;
    });

    this.allowed.push(...exps);
    return this;
  }

  deny(...exps: AclExp[]): this {
    this.denied.push(...exps);
    return this;
  }

  protected createQuery() {
    if (!this.userKey) {
      throw new Error("No user for AclRequest.");
    }
    return new AclQuery(this.connection).askFor(this.userKey);
  }

  review<K extends string>(
    expMap: Record<K, AclExp>
  ): Promise<Record<K, boolean>> {
    return this.createQuery().askMap(expMap);
  }

  async ask(): Promise<boolean> {
    if (
      this.allowed.length ||
      this.denied.length ||
      hasKeys(this.tokenTree.children)
    )
      return this.createQuery().ask({
        $any: [
          "ROOT",
          {
            $all: [
              ...this.tokenTree.getBases(),
              {
                $privilege: {
                  allow: this.allowed,
                  deny: this.denied,
                },
              },
            ],
          },
        ],
      });
    return true;
  }
}

export const AclResolvers = {
  aclReq: AclRequest,
};
