import React, { createElement, Fragment } from "react";
import { Lang } from "../../../lang/Lang";
import { useEmitted } from "../../../react/useEmitted";
import { LoginInfo } from "../LoginInfo";
import { AdminRouter } from "./AdminRouter";

export const AdminRouterPlugin = AdminRouter.plugin(r => {
  r.wrap(props => {
    const loginInfo = useEmitted(LoginInfo);

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
  });
  r.render(() => createElement(Fragment, null, "hello"));
});
