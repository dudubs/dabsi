import { Router } from "../../../typerouter/Router";
import { AdminRouter } from "./../../admin/common/index";
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
