import crypto from "crypto";
import { Connection } from "typeorm";
import { mapObjectAsync } from "../../common/object/mapObject";
import { ExtractKeys } from "../../common/typings2/ExtractKeys";
import { Tester } from "../../jasmine/Tester";
import { DataRow } from "../../typedata/DataRow";
import { DataEntitySource } from "../../typedata/data-entity/DataEntitySource";
import { createTestConnection } from "../../typedata/tests/TestConnection";
import { _provide } from "../../typedi/internal/_provide";
import { Resolver } from "../../typedi/Resolver";
import { configureRpcService } from "../../typerpc/Rpc";
import { SystemApp } from "../common/SystemApp";
import { PermissionManager } from "./acl/PermissionManager";
import { User } from "./acl/User";
import { ADMIN_TOKEN } from "./AdminAppConfig";
import { SystemAppConfig } from "./SystemAppConfig";
import { SystemRequestResolvers } from "./SystemRequestResolvers";
import { SystemSession } from "./SystemSession";

import { SystemEntities } from "./SystemEntities";

export const SystemTester = Tester.beforeAll(async t => ({
  connection: await createTestConnection(SystemEntities),
}))
  .beforeAll(async t => {
    const users = DataEntitySource.create(User, t.connection);

    return {
      context: {
        ...SystemRequestResolvers,
        ...Resolver.provide(Connection, () => t.connection),
      },
      users: {
        regular: await users.insert({
          firstName: "regular",
          lastName: "test",
        }),
        admin: await users.insert({
          firstName: "admin",
          lastName: "test",
          loginName: "admin",
        }),
      },
    };
  })

  .beforeAll(async t => {
    const pm = Resolver.checkAndResolve(PermissionManager, t.context);
    await pm.addToken("user", t.users.admin.$key, ADMIN_TOKEN);

    const systemSessions = DataEntitySource.create(SystemSession, t.connection);

    return {
      sessions: {
        ...(<Record<keyof typeof t.users, DataRow<SystemSession>>>(
          await mapObjectAsync(t.users, user =>
            systemSessions.insert({
              user: user.$key,
              timeout: new Date().getTime(),
              token: generateRandomToken(),
            })
          )
        )),
        anonymous: await systemSessions.insert({
          timeout: new Date().getTime(),
          token: generateRandomToken(),
        }),
      },
    };
  })
  .beforeAll(async t => ({}));

export function testSystemAs(
  k: ExtractKeys<typeof SystemTester.sessions, DataRow<SystemSession>>
) {
  configureRpcService(
    SystemApp,
    Resolver.checkAndResolve(SystemAppConfig, {
      ...SystemTester.context,
      ...Resolver.provide(
        DataRow(SystemSession),
        () => SystemTester.sessions[k]
      ),
    })
  );
}

export function generateRandomToken() {
  return crypto.randomBytes(128).toString("base64");
}
