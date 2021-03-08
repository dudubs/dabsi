import { MuiFormView } from "@dabsi/browser/mui/widget/MuiFormView";
import { ContentAdminConnection } from "@dabsi/system/content/admin/common/rpc";
import { ContentAdminRouter } from "@dabsi/system/content/admin/view/router";

import { RouterView } from "@dabsi/typerouter/view";
import { WidgetLoaderView } from "@dabsi/typerpc/widget/WidgetLoaderView";
import React from "react";

RouterView.define(ContentAdminRouter.at("pages").at("edit"), ({ location }) => (
  <WidgetLoaderView
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
  </WidgetLoaderView>
));
