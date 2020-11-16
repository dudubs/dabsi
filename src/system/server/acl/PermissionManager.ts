import { Connection } from "typeorm";
import { EntityDataSource } from "../../../typedata/entity-data/EntityDataSource";
import { Inject } from "../../../typedi/Inject";
import { Permission } from "./Permission";
import { splitToken } from "./splitToken";

export class PermissionManager {
  constructor(@Inject() public connection: Connection) {}

  async addToken(to: "user" | "group", key: string, token: string) {
    const source = EntityDataSource.create(Permission, this.connection)
      .of(to, key)
      .of("ownerToken", token);

    if (await source.hasRow()) {
      return "ALREADY_EXISTS" as const;
    }

    await source.insert([...splitToken(token)].map(token => ({ token })));

    return "ADDED" as const;
  }

  removeToken(to: "user" | "group", key: string, token: string) {
    return EntityDataSource.create(Permission, this.connection)
      .of(to, key)
      .filter({ ownerToken: token })
      .delete();
  }
}
