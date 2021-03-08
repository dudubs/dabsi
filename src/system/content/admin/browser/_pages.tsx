import { MuiDataTableView } from "@dabsi/browser/mui/widget/MuiDataTableView";
import { ContentAdminConnection } from "@dabsi/system/content/admin/common/rpc";
import { ContentAdminRouter } from "@dabsi/system/content/admin/view/router";

import { RouterView } from "@dabsi/typerouter/view";
import { WidgetLoaderView } from "@dabsi/typerpc/widget/WidgetLoaderView";
import React from "react";

RouterView.define(ContentAdminRouter.at("pages"), ({ location }) => (
  <WidgetLoaderView connection={ContentAdminConnection.pages.table}>
    {props => (
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
    )}
  </WidgetLoaderView>
));
