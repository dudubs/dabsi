import { MuiDataTableView } from "@dabsi/browser/mui/widget/MuiDataTableView";
import AclAdminRouter from "@dabsi/system/acl/plugins/admin/common/AclAdminRouter";
import { AclAdminConnection } from "@dabsi/system/acl/plugins/admin/common/AclAdminRpc";

import { RouterView } from "@dabsi/typerouter/view";
import { WidgetLoaderView } from "@dabsi/typerpc/widget/WidgetLoaderView";
import React from "react";

RouterView.define(AclAdminRouter.at("groups"), ({ location }) => (
  <WidgetLoaderView connection={AclAdminConnection.groupsManager.table}>
    {props => (
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
    )}
  </WidgetLoaderView>
));
