import { AclAdminRouter } from "@dabsi/system/acl/admin/view/router";
import MuiAdminMenu from "@dabsi/system/admin/browser/MuiAdminMenu";

MuiAdminMenu.acl = {
  children: {
    users: {
      onClick: AclAdminRouter.locate(r => r.users),
    },
    groups: {
      onClick: AclAdminRouter.locate(r => r.groups),
    },
  },
};
