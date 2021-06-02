import { MuiFormView } from "@dabsi/browser/mui/views/MuiFormView";
import { ContentAdminConnection } from "@dabsi/system/content/admin/common/rpc";
import { ContentAdminRouter } from "@dabsi/system/content/admin/view/router";

import { RouterView } from "@dabsi/typerouter/view";
import { WidgetViewLoader } from "@dabsi/old-typerpc/widget/view/loader";
import React from "react";

RouterView.define(ContentAdminRouter.at("pages").at("edit"), ({ location }) => (
  <WidgetViewLoader
    connection={() => ContentAdminConnection.pages.edit(location.params.id)}
    deps={[location.params.id]}
  >
    {props => (
      <MuiFormView
        {...props}
        onSubmit={() => {
          location.parent.push();
        }}
      />
    )}
  </WidgetViewLoader>
));
