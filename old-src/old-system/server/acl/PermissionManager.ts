import { Connection } from "typeorm";
import { DataEntitySource } from "@dabsi/typedata/entity/source";
import { Inject } from "@dabsi/typedi";
import { Permission } from "@dabsi/old-system/server/uac/Permission";
import { splitToken } from "@dabsi/old-system/server/uac/splitToken";

export class PermissionManager {
  constructor(@Inject() public connection: Connection) {}

  async addToken(to: "user" | "group", key: string, token: string) {
    const source = DataEntitySource.createFromConnection(
      Permission,
      () => this.connection
    )
      .of(to, key)
      .of("ownerToken", token);

    if (await source.has()) {
      return "ALREADY_EXISTS" as const;
    }

    await source.insertAndFetch(
      [...splitToken(token)].map(token => ({ token }))
    );

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
