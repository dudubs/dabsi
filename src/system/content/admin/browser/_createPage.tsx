import { ContentAdminConnection } from "@dabsi/system/content/admin/common/rpc";
import { ContentAdminRouter } from "@dabsi/system/content/admin/view/router";
import { SystemView } from "@dabsi/system/core/view/SystemView";
import { WidgetRouterView } from "@dabsi/typerpc/widget/WidgetRouterView";

WidgetRouterView.define(
  ContentAdminRouter.at("pages").at("create"),
  ContentAdminConnection.pages.create,
  props => {
    return <SystemView {...props} />;
  }
);
