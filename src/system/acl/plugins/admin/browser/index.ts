import { ACL_Admin_Connection } from "@dabsi/system/acl/plugins/admin/common/rpc";
// import "@dabsi/system/acl/plugins/admin/groups/browser";
// import "@dabsi/system/acl/plugins/admin/users/browser";
import { ACL_AdminRouter } from "@dabsi/system/acl/plugins/admin/view/router";
import { MuiAdminMenu } from "@dabsi/system/admin/browser/menu";

import "./users";
import "./groups";
const connections = [ACL_Admin_Connection];

MuiAdminMenu.register({
  acl: {
    router: ACL_AdminRouter,
    children: {
      aclUsers: {
        connections,
        title: lang`USERS`,
        icon: require("@material-ui/icons/People"),
        // mainRouter
        router: ACL_AdminRouter.at("users"),
        subRouters: [ACL_AdminRouter.at("createNewUser")],
      },
      aclGroups: {
        connections,
        title: lang`GROUPS`,
        icon: require("@material-ui/icons/GroupWork"),
        router: ACL_AdminRouter.at("groups"),
        subRouters: [ACL_AdminRouter.at("createNewGroup")],
      },
    },
  },
});
