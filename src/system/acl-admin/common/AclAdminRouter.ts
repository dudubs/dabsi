import { Router } from "../../../typerouter/Router";
import { AdminRouter } from "./../../admin/common/index";

export default AdminRouter.register(
  "acl",
  Router({
    editUser: Router(["userId"]),
    groups: Router(),
    users: Router(),
    createNewGroup: Router(),
    createNewUSer: Router(),
    editGroup: Router(["id"]),
    dev: Router({
      users: Router({
        edit: Router(),
        ///x
      }),
    }),
  })
);
