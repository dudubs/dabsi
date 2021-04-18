import { AdminRouter } from "@dabsi/system/admin/common/index";
import Router from "@dabsi/typerouter/router";

export const ACL_AdminRouter = AdminRouter.register(
  "acl",
  Router({
    //
    users: Router({
      edit: Router(["id"]),
    }),
    createNewUser: Router(),
    editUser: Router(["id"]),

    //
    groups: Router(),
    createNewGroup: Router(),
    editGroup: Router(["id"]),
  })
);
