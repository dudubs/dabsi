import CategoryIcon from "@material-ui/icons/Category";
import PagesIcon from "@material-ui/icons/Pages";
import { MuiAdminMenu } from "@dabsi/system/admin/browser/menu";
import { ContentAdminRouter } from "@dabsi/system/content/admin/view/router";
MuiAdminMenu.register({
  content: {
    children: {
      // title: lang`CEATE_PAGE`,
      pages: {
        icon: <PagesIcon />,
        router: ContentAdminRouter.at("pages"),
      },
      categories: {
        icon: <PagesIcon />,
        router: ContentAdminRouter.at("categories"),
      },
    },
  },
});
