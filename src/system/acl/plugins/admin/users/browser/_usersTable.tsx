import { MuiDataTableView } from "@dabsi/browser/mui/widget/MuiDataTableView";
import AclAdminRouter from "@dabsi/system/acl/plugins/admin/common/AclAdminRouter";
import { AclAdminConnection } from "@dabsi/system/acl/plugins/admin/common/AclAdminRpc";

import { RouterView } from "@dabsi/typerouter/view";
import { WidgetLoaderView } from "@dabsi/typerpc/widget/WidgetLoaderView";
import React from "react";

RouterView.define(AclAdminRouter.at("users"), ({ location }) => (
  <WidgetLoaderView connection={AclAdminConnection.usersManager.table}>
    {props => (
      <MuiDataTableView
        {...props}
        title={lang`USERS`}
        onEditClick={async event => {
          console.log({ event });
          location.parent.at("editUser", { userId: event.row.$key }).push();
        }}
        addAction={{
          title: lang`ADD_NEW_USER`,
          onClick: () => {
            location.parent.at("createNewUser").push();
          },
        }}
      />
    )}
  </WidgetLoaderView>
));

//
