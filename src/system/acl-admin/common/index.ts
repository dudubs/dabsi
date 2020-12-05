import { Router } from "../../../typerouter/Router";
import { AdminRouter } from "../../admin/common";

export const AclAdminRouter = Router({
  editUser: Router(["userId"]),
  dev: Router({
    users: Router({
      edit: Router(),
    }),
  }),
});

AdminRouter.register("acl", AclAdminRouter);
