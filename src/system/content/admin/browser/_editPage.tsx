import { MuiFormView } from "@dabsi/browser/mui/widget/MuiFormView";
import { ContentAdminConnection } from "@dabsi/system/content/admin/common/rpc";
import { ContentAdminRouter } from "@dabsi/system/content/admin/view/router";
import { WidgetRouterView } from "@dabsi/typerpc/widget/WidgetRouterView";
import React from "react";

WidgetRouterView.define(
  ContentAdminRouter.at("pages").at("edit"),
  ({ id }) => ContentAdminConnection.pages.edit(id),
  (props, { location }) => {
    //

    return (
      <MuiFormView
        {...props}
        onSubmit={() => {
          location.parent.push();
        }}
      />
    );
  }
);
