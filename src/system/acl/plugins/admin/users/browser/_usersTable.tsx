import { MuiDataTableView } from "@dabsi/browser/mui/widget/MuiDataTableView";
import AclAdminRouter from "@dabsi/system/acl/plugins/admin/common/AclAdminRouter";
import { AclAdminConnection } from "@dabsi/system/acl/plugins/admin/common/AclAdminRpc";
import { WidgetRouterView } from "@dabsi/typerpc/widget/WidgetRouterView";
import React from "react";

WidgetRouterView.define(
  AclAdminRouter.at("users"),
  AclAdminConnection.usersManager.table,
  (props, { location }) => {
    return (
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
    );
  }
);

//
