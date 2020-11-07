import { Connection } from "typeorm";
import { EntityDataSource } from "../../../typedata/entity-data/EntityDataSource";
import { Permission } from "./Permission";

export namespace PermissionManager {
  export async function add(
    connection: Connection,
    to: "user" | "group",
    key: string,
    token: string
  ) {
    const source = EntityDataSource.create(Permission, connection)
      .of(to, key)
      .of("ownerToken", token);

    if (await source.hasRow()) {
      return "ALREADY_EXISTS" as const;
    }

    let subToken = "";
    for (const key of token.split("/")) {
      subToken += (subToken ? "/" : "") + key;
      await source.insert({ token: subToken });
    }

    return "ADDED" as const;
  }

  export function remove(
    connection: Connection,
    to: "user" | "group",
    key: string,
    token: string
  ) {
    return EntityDataSource.create(Permission, connection)
      .of(to, key)
      .filter({ ownerToken: token })
      .delete();
  }
}
