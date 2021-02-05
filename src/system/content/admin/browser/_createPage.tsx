import { ContentAdminConnection } from "@dabsi/system/content/admin/common/rpc";
import { ContentAdminRouter } from "@dabsi/system/content/admin/view/router";
import SystemView from "@dabsi/system/core/view/SystemView";
import { WidgetRouterView } from "@dabsi/typerpc/widget/WidgetRouterView";

WidgetRouterView(
  ContentAdminRouter.at("createPage"),
  ContentAdminConnection.createPage,
  props => {
    return <SystemView.Component {...props} />;
  }
);
