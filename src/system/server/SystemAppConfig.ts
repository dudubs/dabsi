import { Consumer } from "../../typedi/Consumer";
import { RpcConfig } from "../../typerpc/Rpc";
import { DevLoginUser, SystemApp } from "../common/SystemApp";

import { User, UserFullName } from "./acl/User";
import { AdminAppConfig } from "./AdminAppConfig";
import { SystemContextResolver } from "./SystemContextResolver";
import { UserAppConfig } from "./UserAppConfig";

declare global {
  interface TypeRefs {
    [DevLoginUser]: { fullName: string };
  }
}

export const SystemAppConfig = Consumer(
  [SystemContextResolver, UserAppConfig, AdminAppConfig],
  ({ session, getDataSource }, userConfig, adminConfig) =>
    RpcConfig(SystemApp, {
      async logout() {
        await session.update({ user: null });
      },
      async getLoginInfo() {
        if (!session.user) {
          return { type: "FAILED" };
        }
        return {
          type: "SUCCESS",
          fullName: session.user.fullName,
        };
      },
      user: userConfig,
      admin: adminConfig,
      devLogin: $ => {
        const users = getDataSource(User).pick({
          fullName: UserFullName,
        });
        return $({
          inputConfig: $ =>
            $({
              source: users,
              columns: { label: "fullName" },
            }),
          async submit(user) {
            await session.update({ user: user.$key });
            return { value: { helloTo: user.fullName } };
          },
        });
      },
    })
);
