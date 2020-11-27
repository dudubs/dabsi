import { DataResolvers } from "../../typedata/DataResolvers";
import { DataRow } from "../../typedata/DataRow";
import { Resolver } from "../../typedi";
import { Consumer } from "../../typedi/Consumer";
import { RpcConfig } from "../../typerpc/Rpc";
import { DevLoginUser, SystemApp } from "../common/SystemApp";
import { AclRequest } from "./acl/AclRequest";
import { Session } from "./acl/Session";

import { User, UserFullName } from "./acl/User";
import { ADMIN_TOKEN, AdminAppConfig } from "./AdminAppConfig";
import { DevLoginConfig } from "./DevLoginConfig";
import { SystemSession } from "../../system/core/SystemSession";
import { UserAppConfig } from "./UserAppConfig";

export const SystemAppConfig = Consumer(
  {
    userConfig: UserAppConfig,
    adminConfig: AdminAppConfig,
    aclReq: AclRequest,
    session: DataRow(SystemSession),
    ...DataResolvers({
      users: User,
    }),
    devLoginConfig: DevLoginConfig,
  },
  (c) =>
    RpcConfig(SystemApp, ($) => {
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
            ...(await c.aclReq.review({
              isAdmin: { $any: [ADMIN_TOKEN, "ROOT"] },
            })),
          };
        },
        user: c.userConfig,
        admin: c.adminConfig,
        devLogin: c.devLoginConfig,
      });
    })
);
