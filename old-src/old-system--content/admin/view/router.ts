import { AdminRouter } from "@dabsi/system/admin/common/rpc";
import Router from "@dabsi/typerouter/router";

export const ContentAdminRouter = AdminRouter.register(
  "content",
  Router({
    pages: Router({
      create: Router(),
      edit: Router(["id"]),
    }),

    categories: Router({
      add: Router(),
      item: Router(["id"], {
        edit: Router(),
        add: Router({}),
      }),
    }),
  })
);
