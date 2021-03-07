import { MuiDataTableView } from "@dabsi/browser/mui/widget/MuiDataTableView";
import AclAdminRouter from "@dabsi/system/acl/plugins/admin/common/AclAdminRouter";
import { AclAdminConnection } from "@dabsi/system/acl/plugins/admin/common/AclAdminRpc";
import { WidgetRouterView } from "@dabsi/typerpc/widget/WidgetRouterView";
import React from "react";

WidgetRouterView.define(
  AclAdminRouter.at("groups"),
  AclAdminConnection.groupsManager.table,
  (props, { location }) => (
    <MuiDataTableView
      {...props}
      title={lang`GROUPS`}
      onEditClick={async event => {
        location.parent.at("editGroup", { groupId: event.row.$key }).push();
      }}
      onDeleteClick={async event => {
        await AclAdminConnection.groupsManager.delete(event.row.$key);
      }}
      addAction={{
        title: lang`CREATE_NEW_GROUP`,
        onClick: () => {
          location.parent.at("createNewGroup").push();
        },
      }}
    />
  )
);
