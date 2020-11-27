import React from "react";
import { MuiAdmin } from "../../browser/mui/MuiAdmin";
import { Lang } from "../../lang/Lang";
import { useEmittedState } from "../../react/reactor/useEmittedState";
import { ReactRouterView } from "../../typerouter/ReactRouterView";
import { AdminRouter } from "../common/admin/AdminRouter";
import { LoginInfoEvent } from "./LoginInfoEvent";
import { MuiAclGroupsManagerView } from "./MuiAclGroupsManagerView";
import { MuiAclUsersManagerView } from "./MuiAclUsersManagerView";

export function MuiAdminView(router: typeof AdminRouter) {
  ReactRouterView(router, {
    renderDefault(props) {
      return Lang`NO_ROUTE_${"path"}`({
        path: props.route.defaultPath,
      });
    },
    wrap({ children, location }) {
      const loginInfo = useEmittedState(LoginInfoEvent);

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

      return (
        <MuiAdmin
          menu={{
            acl: {
              // icon: require("@material-ui/icons/Home"),
              children: {
                users: {
                  icon: require("@material-ui/icons/People"),
                  onClick() {
                    location.at("acl").at("users").push();
                  },
                },
                groups: {
                  icon: require("@material-ui/icons/People"),
                  onClick() {
                    location.at("acl").at("groups").push();
                  },
                },
                addUser: { icon: require("@material-ui/icons/PersonAdd") },
                addGroup: { icon: require("@material-ui/icons/GroupAdd") },
              },
            },
          }}
        >
          {children}
        </MuiAdmin>
      );
    },
  });

  router.at("acl", router => {
    MuiAclUsersManagerView(router.at("users"));
    MuiAclGroupsManagerView(router.at("groups"));
  });
}
