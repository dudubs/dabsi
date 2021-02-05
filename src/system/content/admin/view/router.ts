import { AdminRouter } from "@dabsi/system/admin/common";
import Router from "@dabsi/typerouter/Router";

export const ContentAdminRouter = AdminRouter.register(
  "content",
  Router({
    pages: Router(),
    createPage: Router(),
  })
);
