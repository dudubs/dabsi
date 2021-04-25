import { MuiDataTableView } from "@dabsi/browser/mui/widget/DataTable";
import { ACL_Admin_Connection } from "@dabsi/system/acl/admin/common/rpc";
import { ACL_AdminRouter } from "@dabsi/system/acl/admin/view/router";
import { RouterView } from "@dabsi/typerouter/view";
import { WidgetViewLoader } from "@dabsi/old-typerpc/widget/view/loader";
import React from "react";

RouterView.define(ACL_AdminRouter.at("users"), ({ location }) => (
  <WidgetViewLoader connection={ACL_Admin_Connection.usersManager.table}>
    {props => (
      <MuiDataTableView
        {...props}
        title={lang`USERS`}
        onEditRow={async event => {
          console.log({ event });
          location.parent.at("editUser", { userId: event.row.$key }).push();
        }}
        addButtonTitle={lang`ADD_NEW_USER`}
        onAddNewRow={() => {
          location.parent.at("createNewUser").push();
        }}
      />
    )}
  </WidgetViewLoader>
));

//
