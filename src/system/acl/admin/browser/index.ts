import { ACL_AdminRouter } from "@dabsi/system/acl/admin/view/router";
import MuiAdminMenu from "@dabsi/system/admin/browser/MuiAdminMenu";

MuiAdminMenu.acl = {
  children: {
    users: {},
    groups: {
      onClick(_, { push }) {
        push(ACL_AdminRouter, r => r.groups);
      },
    },
  },
};
