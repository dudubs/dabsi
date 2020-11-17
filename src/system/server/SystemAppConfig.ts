import { DataResolvers } from "../../typedata/DataResolvers";
import { Resolver } from "../../typedi";
import { RpcConfig } from "../../typerpc/Rpc";
import { DevLoginUser, SystemApp } from "../common/SystemApp";
import { AclRequest } from "./acl/AclRequest";

import { User, UserFullName } from "./acl/User";
import { ADMIN_TOKEN, AdminAppConfig } from "./AdminAppConfig";
import { DevLoginConfig } from "./DevLoginConfig";
import { SystemSession } from "./SystemSession";
import { UserAppConfig } from "./UserAppConfig";

export const SystemAppConfig = Resolver.consume(
  {
    userConfig: UserAppConfig,
    adminConfig: AdminAppConfig,
    aclReq: AclRequest,
    ...DataResolvers({
      users: User,
      session: [SystemSession],
    }),
    devLoginConfig: DevLoginConfig,
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
        devLogin: c.devLoginConfig,
      });
    })
);
