import { ContentAdminConnection } from "@dabsi/system/content/admin/common/rpc";
import { ContentAdminRouter } from "@dabsi/system/content/admin/view/router";
import { SystemView } from "@dabsi/system/core/view/SystemView";

import { RouterView } from "@dabsi/typerouter/view";
import { WidgetLoaderView } from "@dabsi/typerpc/widget/WidgetLoaderView";

RouterView.define(ContentAdminRouter.at("pages").at("create"), () => (
  <WidgetLoaderView connection={ContentAdminConnection.pages.create}>
    {props => <SystemView {...props} />}
  </WidgetLoaderView>
));
