import { Lang } from "../../../lang/Lang";
import { MuiAdminMenu } from "../../admin/browser/MuiAdminMenu";
import { AclAdminConnection } from "../common/AclAdminRpc";
import "./_Dev";
import "./_Users";

const connections = [AclAdminConnection];

MuiAdminMenu.register({
  aclUsers: {
    connections,
    title: Lang`USERS`,
    icon: require("@material-ui/icons/People"),
  },
  aclGroups: {
    connections,
    title: Lang`GROUPS`,
    icon: require("@material-ui/icons/GroupWork"),
  },
});
