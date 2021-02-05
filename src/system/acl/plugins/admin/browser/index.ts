import { MuiAdminMenu } from "@dabsi/system/admin/browser/menu";

import "@dabsi/system/acl/plugins/admin/users/browser";
import "@dabsi/system/acl/plugins/admin/groups/browser";
import AclAdminRouter from "@dabsi/system/acl/plugins/admin/common/AclAdminRouter";
import { AclAdminConnection } from "@dabsi/system/acl/plugins/admin/common/AclAdminRpc";

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
