import { MuiAdminMenu } from "@dabsi/system/admin/browser/menu";
import { ContentAdminRouter } from "@dabsi/system/content/admin/view/router";
import "./_createPage";
MuiAdminMenu.register({
  content: {
    children: {
      // title: lang`CEATE_PAGE`,
      pages: {
        icon: require("@material-ui/icons/Pages"),
        router: ContentAdminRouter.at("pages"),
      },
    },
  },
});
