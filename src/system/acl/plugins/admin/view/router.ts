import { AdminRouter } from "@dabsi/system/admin/common/index";
import Router from "@dabsi/typerouter/router";

export const ACL_Admin_Router = AdminRouter.register(
  "acl",
  Router({
    //
    users: Router({
      edit: Router(["id"]),
    }),
    createNewUser: Router(),
    editUser: Router(["userId"]),

    //
    groups: Router(),
    createNewGroup: Router(),
    editGroup: Router(["id"]),
  })
);
