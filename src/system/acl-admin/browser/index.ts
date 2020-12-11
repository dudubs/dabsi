import { Lang } from "../../../lang/Lang";
import { MuiAdminMenu } from "../../admin/browser/MuiAdminMenu";
import { AclAdminConnection } from "../common/AclAdminRpc";
import "./_Dev";
import "./_Users";
import "./_Groups";
import AclAdminRouter from "../common/AclAdminRouter";

const connections = [AclAdminConnection];

MuiAdminMenu.register({
  acl: {
    router: AclAdminRouter,
    children: {
      aclUsers: {
        connections,
        title: Lang`USERS`,
        icon: require("@material-ui/icons/People"),
        // mainRouter
        router: AclAdminRouter.at("users"),
        subRouters: [AclAdminRouter.at("createNewUSer")],
      },
      aclGroups: {
        connections,
        title: Lang`GROUPS`,
        icon: require("@material-ui/icons/GroupWork"),
        router: AclAdminRouter.at("groups"),
        subRouters: [AclAdminRouter.at("createNewGroup")],
      },
    },
  },
});
