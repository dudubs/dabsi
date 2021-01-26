import { Connection } from "typeorm";
import { DataEntitySource } from "@dabsi/typedata/data-entity/DataEntitySource";
import { Inject } from "@dabsi/typedi";
import { Permission } from "@dabsi/system-old/server/acl/Permission";
import { splitToken } from "@dabsi/system-old/server/acl/splitToken";

export class PermissionManager {
  constructor(@Inject() public connection: Connection) {}

  async addToken(to: "user" | "group", key: string, token: string) {
    const source = DataEntitySource.createFromConnection(
      Permission,
      () => this.connection
    )
      .of(to, key)
      .of("ownerToken", token);

    if (await source.hasRows()) {
      return "ALREADY_EXISTS" as const;
    }

    await source.insert([...splitToken(token)].map(token => ({ token })));

    return "ADDED" as const;
  }

  removeToken(to: "user" | "group", key: string, token: string) {
    return DataEntitySource.createFromConnection(
      Permission,
      () => this.connection
    )
      .of(to, key)
      .filter({ ownerToken: token })
      .delete();
  }
}
