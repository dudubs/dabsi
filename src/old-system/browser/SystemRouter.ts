import Router from "@dabsi/typerouter/router";
import { AdminRouter } from "@dabsi/system-old/common/admin/AdminRouter";

export const SystemRouter = Router({
  admin: AdminRouter,
  login: Router(),
});
