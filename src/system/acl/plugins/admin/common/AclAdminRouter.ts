import Router from "@dabsi/typerouter/router";
import { AdminRouter } from "@dabsi/system/admin/common/index";

export default AdminRouter.register(
  "acl",
  Router({
    //
    users: Router(),
    createNewUser: Router(),
    editUser: Router(["userId"]),

    //
    groups: Router(),
    createNewGroup: Router(),
    editGroup: Router(["groupId"]),
  })
);
