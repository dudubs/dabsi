import crypto from "crypto";
import { createConnection } from "typeorm";
import { DataRow } from "../../typedata/DataRow";
import { EntityDataSource } from "../../typedata/eds/EntityDataSource";
import { Provider } from "../../typedi/Provider";
import { Resolver } from "../../typedi/Resolver";
import { configureRpcService } from "../../typerpc/Rpc";
import { SystemApp } from "../common/SystemApp";
import { PermissionData } from "./acl/Permission";
import { User } from "./acl/User";
import { SystemAppConfig } from "./SystemAppConfig";
import {
  GetDataSourceResolver,
  SystemSession,
  SystemSessionResolver,
} from "./SystemContextResolver";

import { SystemEntities } from "./SystemEntities";

export namespace SystemTester {
  export let testUser: DataRow<User>;
  export let testAdmin: DataRow<User>;
  export let testSessionAsUser: DataRow<SystemSession>;
  export let testSessionAsGuest: DataRow<SystemSession>;
  export let testSessionAsAdmin: DataRow<SystemSession>;

  beforeAll(async () => {
    await createConnection({
      // name: "default",
      type: "sqlite",
      database: ":memory:",
      entities: SystemEntities,
      synchronize: true,
    });

    const sessions = await EntityDataSource.create(SystemSession);
    const users = EntityDataSource.create(User);
    const perms = EntityDataSource.create(PermissionData);

    testUser = await users.insert({
      firstName: "test",
      lastName: "user",
    });

    testAdmin = await users.insert({
      firstName: "test",
      lastName: "admin",
    });

    // await perms.as("USER").insert({
    //   user: testAdmin.$id,
    //   token: ":ADMIN:",
    // });

    testSessionAsUser = await sessions.insert({
      user: testUser.$id,
      timeout: new Date().getTime(),
      token: generateRandomToken(),
    });

    testSessionAsAdmin = await sessions.insert({
      user: testAdmin.$id,
      timeout: new Date().getTime(),
      token: generateRandomToken(),
    });

    testSessionAsGuest = await sessions.insert({
      timeout: new Date().getTime(),
      token: generateRandomToken(),
    });
  });

  export function testSystemAs(type: "user" | "admin" | "guest") {
    configureRpcService(
      SystemApp,
      Resolver.checkAndResolve(SystemAppConfig, {
        ...GetDataSourceResolver.provide(() => type =>
          EntityDataSource.create(type)
        ),
        ...SystemSessionResolver.provide(() => {
          switch (type) {
            case "user":
              return testSessionAsUser;
            case "admin":
              return testSessionAsAdmin;
            case "guest":
              return testSessionAsGuest;
          }
        }),
      })
    );
  }
}

export function generateRandomToken() {
  return crypto.randomBytes(128).toString("base64");
}
