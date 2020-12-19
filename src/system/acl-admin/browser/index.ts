import { MuiAdminMenu } from "@dabsi/system/admin/browser/MuiAdminMenu";

import "@dabsi/system/acl-admin/browser/_Users";
import "@dabsi/system/acl-admin/browser/_Groups";
import AclAdminRouter from "@dabsi/system/acl-admin/AclAdminRouter";
import { AclAdminConnection } from "@dabsi/system/acl-admin/AclAdminRpc";

const connections = [AclAdminConnection];

MuiAdminMenu.register({
  acl: {
    router: AclAdminRouter,
    children: {
      aclUsers: {
        connections,
        title: lang`USERS`,
        icon: require("@material-ui/icons/People"),
        // mainRouter
        router: AclAdminRouter.at("users"),
        subRouters: [AclAdminRouter.at("createNewUser")],
      },
      aclGroups: {
        connections,
        title: lang`GROUPS`,
        icon: require("@material-ui/icons/GroupWork"),
        router: AclAdminRouter.at("groups"),
        subRouters: [AclAdminRouter.at("createNewGroup")],
      },
    },
  },
});
