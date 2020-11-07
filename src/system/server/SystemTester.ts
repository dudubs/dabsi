import crypto from "crypto";
import { createConnection, getConnection } from "typeorm";
import { mapObject } from "../../common/object/mapObject";
import { Type } from "../../common/typings";
import { DataRow } from "../../typedata/DataRow";
import { EntityDataSource } from "../../typedata/entity-data/EntityDataSource";
import {
  createTestConnection,
  TestConnection,
} from "../../typedata/tests/TestConnection";
import { Provider } from "../../typedi/Provider";
import { Resolver } from "../../typedi/Resolver";
import { configureRpcService } from "../../typerpc/Rpc";
import { SystemApp } from "../common/SystemApp";
import { Tester } from "../../jasmine/Tester";
import { User } from "./acl/User";
import { ADMIN_PERMISSION } from "./AdminAppConfig";
import { SystemAppConfig } from "./SystemAppConfig";
import {
  ConnectionResolver,
  GetDataSourceResolver,
  SystemSession,
  SystemSessionResolver,
} from "./SystemContextResolver";

import { SystemEntities } from "./SystemEntities";

export function createDataSourceTester<T extends Record<string, Type<any>>>(
  entities: T
): { [K in keyof T]: T[K]["prototype"] } {
  const getConnection = TestConnection(entities);
  return <any>(
    mapObject(entities, type => EntityDataSource.create(type, getConnection))
  );
}

export const SystemTester2 = Tester.beforeAll(async t => ({
  connection: await createTestConnection(SystemEntities),
}))
  .beforeAll(async t => ({
    systemSessions: EntityDataSource.create(SystemSession, () => t.connection),
    users: EntityDataSource.create(User, () => t.connection),
  }))
  .beforeAll(async t => ({
    testUser: await t.users.insert({ firstName: "test", lastName: "user" }),
    testAdmin: await t.users.insert({ firstName: "test", lastName: "admin" }),
  }))
  .beforeAll(async t => {
    await t.testAdmin.at("permissions").insert({
      token: ADMIN_PERMISSION,
    });

    return {
      testUserSession: t.systemSessions.insert({
        user: t.testUser.$key,
        timeout: new Date().getTime(),
        token: generateRandomToken(),
      }),
      testAdminSession: t.systemSessions.insert({
        user: t.testAdmin.$key,
        timeout: new Date().getTime(),
        token: generateRandomToken(),
      }),
      testAnonymousSession: t.systemSessions.insert({
        timeout: new Date().getTime(),
        token: generateRandomToken(),
      }),
    };
  })
  .beforeAll(async t => ({
    testSystemAs(session: DataRow<SystemSession>) {
      configureRpcService(
        SystemApp,
        Resolver.checkAndResolve(SystemAppConfig, {
          ...ConnectionResolver.provide(() => getConnection()),
          ...SystemSessionResolver.provide(() => session),
        })
      );
    },
  }))
  .beforeAll(async t => ({}));
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

    testUser = await users.insert({
      firstName: "test",
      lastName: "user",
    });

    testAdmin = await users.insert({
      firstName: "test",
      lastName: "admin",
    });

    // await perms.as("USER").insert({
    //   user: testAdmin.$key,
    //   token: ":ADMIN:",
    // });

    testSessionAsUser = await sessions.insert({
      user: testUser.$key,
      timeout: new Date().getTime(),
      token: generateRandomToken(),
    });

    testSessionAsAdmin = await sessions.insert({
      user: testAdmin.$key,
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
        ...ConnectionResolver.provide(() => getConnection()),
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
