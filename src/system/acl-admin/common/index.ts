import { Router } from "../../../typerouter/Router";
import { AdminRouter } from "../../admin/common";

export const AclAdminRouter = Router({
  editUser: Router(["userId"]),
  addNewGroup: Router(),
  groups: Router(),
  dev: Router({
    users: Router({
      edit: Router(),
      ///x
    }),
  }),
});

AdminRouter.register("acl", AclAdminRouter);
