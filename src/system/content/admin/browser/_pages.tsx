import { MuiDataTableView } from "@dabsi/browser/mui/widget/DataTable";
import { ContentAdminConnection } from "@dabsi/system/content/admin/common/rpc";
import { ContentAdminRouter } from "@dabsi/system/content/admin/view/router";

import { RouterView } from "@dabsi/typerouter/view";
import { WidgetViewLoader } from "@dabsi/old-typerpc/widget/view/loader";
import React from "react";

RouterView.define(ContentAdminRouter.at("pages"), ({ location }) => (
  <WidgetViewLoader connection={ContentAdminConnection.pages.table}>
    {props => (
      <MuiDataTableView
        title={lang`CONTENT_PAGES`}
        {...props}
        onEditRow={event => {
          location.at("edit", { id: event.row.$key }).push();
        }}
        addButtonTitle={lang`CREATE_NEW_PAGE`}
        onAddNewRow={() => {
          location.at("create").push();
        }}
      />
    )}
  </WidgetViewLoader>
));
