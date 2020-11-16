import React from "react";
import { Lang } from "../../../lang/Lang";
import { useEmitted } from "../../../react/reactor/useEmitted";
import { ReactRouter } from "../../../typerouter2/ReactRouter";
import { LoginInfoEvent } from "../../browser/LoginInfoEvent";
import { AdminRouter } from "./AdminRouter";
import { MuiAclUsersManagerView } from "./MuiAclUsersManagerView";

export function MuiAdminView(router: typeof AdminRouter) {
  console.log("x");

  ReactRouter(router, {
    wrap(props) {
      const loginInfo = useEmitted(LoginInfoEvent);

      if (!loginInfo) {
        return Lang`ACCESS_DENIED_BECAUSE_NO_LOGIN`;
      }
      const { success } = loginInfo;
      if (!success) {
        return Lang`ACCESS_DENIED_BECAUSE_LOGIN_IS_NOT_SUCCESS`;
      }
      if (!success.isAdmin) {
        return Lang`ACCESS_DENIED_BECAUSE_LOGIN_IS_NOT_ADMIN`;
      }

      return <>{props.children}</>;
    },
  });

  MuiAclUsersManagerView(router.at("acl").at("users"));
}
