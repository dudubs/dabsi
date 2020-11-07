import { Connection } from "typeorm";
import { AclExp } from "./AclExp";
import { AclQuery } from "./AclQuery";
import { AclTokenTree } from "./AclTokenTree";

export class AclRequest {
  protected allowed: AclExp[] = [];
  protected denied: AclExp[] = [];

  protected tokenTree = new AclTokenTree();

  constructor(protected connection: Connection, protected userKey: string) {}

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

  ask(): Promise<boolean> {
    return new AclQuery(this.connection).askFor(this.userKey).ask({
      $all: [
        ...this.tokenTree.getBases(),
        {
          $privilege: {
            allow: this.allowed,
            deny: this.denied,
          },
        },
      ],
    });
  }
}

/*

  ADMIN/

  ADMIN/FORUMS

  ADMIN/BLOGS

  `PERMISSION:ADMIN/BLOGS` OR `PERMISSION/ADMIN`

 */
