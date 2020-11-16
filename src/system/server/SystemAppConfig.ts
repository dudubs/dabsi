import { Resolver } from "../../typedi";
import { _consume } from "../../typedi/internal/_consume";
import { RpcConfig } from "../../typerpc/Rpc";
import { DevLoginUser, SystemApp } from "../common/SystemApp";
import { AclRequest } from "./acl/AclRequest";

import { User, UserFullName } from "./acl/User";
import { ADMIN_TOKEN, AdminAppConfig } from "./AdminAppConfig";
import { DataResolvers } from "../../typedata/DataResolvers";
import { SystemSession } from "./SystemSession";
import { UserAppConfig } from "./UserAppConfig";

declare global {
  interface TypeRefs {
    [DevLoginUser]: { fullName: string };
  }
}

export const SystemAppConfig = Resolver.consume(
  {
    userConfig: UserAppConfig,
    adminConfig: AdminAppConfig,
    aclReq: AclRequest,
    ...DataResolvers({
      users: User,
      session: [SystemSession],
    }),
  },
  c =>
    RpcConfig(SystemApp, $ => {
      return $({
        async logout() {
          await c.session.update({ user: null });
        },
        async getLoginInfo() {
          if (!c.session.user) {
            return { type: "FAILED" };
          }
          const { fullName } = await c.session.user
            .getSource()
            .pick({ fullName: UserFullName })
            .getOrFail();
          return {
            type: "SUCCESS",
            fullName,
            ...(await c.aclReq.review({ isAdmin: ADMIN_TOKEN })),
          };
        },
        user: c.userConfig,
        admin: c.adminConfig,
        devLogin: $ =>
          $({
            inputConfig: $ =>
              $({
                source: c.users.pick({
                  fullName: UserFullName,
                }),
                columns: { label: "fullName" },
              }),
            async submit(user) {
              await c.session.update({ user: user.$key });
              return { value: { helloTo: user.fullName } };
            },
          }),
      });
    })
);
