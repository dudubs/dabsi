import { MuiDataTableView } from "@dabsi/browser/mui/widget/MuiDataTableView";
import { ContentAdminConnection } from "@dabsi/system/content/admin/common/rpc";
import { ContentAdminRouter } from "@dabsi/system/content/admin/view/router";
import { WidgetRouterView } from "@dabsi/typerpc/widget/WidgetRouterView";
import React from "react";

WidgetRouterView.define(
  ContentAdminRouter.at("pages"),
  ContentAdminConnection.pages.table,
  (props, { location }) => {
    return (
      <MuiDataTableView
        title={lang`CONTENT_PAGES`}
        {...props}
        onEditClick={event => {
          location.at("edit", { id: event.row.$key }).push();
        }}
        addAction={{
          title: lang`CREATE_NEW_PAGE`,
          onClick: () => {
            location.at("create").push();
          },
        }}
      />
    );
  }
);
