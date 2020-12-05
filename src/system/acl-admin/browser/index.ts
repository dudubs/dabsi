import { MuiDataManagerView } from "../../../browser/mui/rpc/MuiDataManagerView";
import { Lang } from "../../../lang/Lang";
import { EmptyFragment } from "../../../react/utils/EmptyFragment";
import { MuiAdminMenu } from "../../admin/browser/MuiAdminMenu";
import { AclAdminRouter } from "../common";
import "./_Users";

import "./_Dev";
import { AclAdminConnection } from "../common/AclAdminRpc";
const connections = [AclAdminConnection];

MuiAdminMenu.register({
  aclUsers: {
    connections,
    title: Lang`USERS`,
    icon: require("@material-ui/icons/People"),
    router: AclAdminRouter.at("users"),
  },
  aclGroups: {
    connections,
    title: Lang`GROUPS`,
    icon: require("@material-ui/icons/GroupWork"),
  },
});
