import Router from "@dabsi/typerouter/router";
import { AdminRouter } from "@dabsi/old-system/common/admin/AdminRouter";

export const OldSystemRouter = Router({
  admin: AdminRouter,
  login: Router(),
});
