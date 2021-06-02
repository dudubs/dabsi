import { ACL_AdminRouter } from "@dabsi/system/acl/admin/view/router";
import MuiAdminMenu from "@dabsi/system/admin/browser/MuiAdminMenu";

MuiAdminMenu.acl = {
  children: {
    users: {
      onClick: ACL_AdminRouter.locate(r => r.users),
    },
    groups: {
      onClick: ACL_AdminRouter.locate(r => r.groups),
    },
  },
};
