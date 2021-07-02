// import { AdminRouter } from "@dabsi/system/admin/common/index";
// import Router from "@dabsi/typerouter/router";

import AdminRouter from "@dabsi/system/admin/view/AdminRouter";
import { Router, Route } from "@dabsi/typerouter";

@AdminRouter.Route("acl")
export class AclAdminRouter extends Router {
  @Route()
  users!: Router;

  @Route()
  groups!: Router;

  @Route()
  addNewUser!: Router;

  @Route()
  addNewGroup!: Router;

  @Route(() => Router, [String])
  editUser!: (userKey: string) => Router;

  @Route(() => Router, [String])
  editGroup!: (groupKey: string) => Router;
}
