import { MuiDataTableView } from "@dabsi/browser/mui/widget/DataTable";
import { ACL_Admin_Connection } from "@dabsi/system/acl/plugins/admin/common/rpc";
import { ACL_Admin_Router } from "@dabsi/system/acl/plugins/admin/view/router";
import { RouterView } from "@dabsi/typerouter/view";
import { WidgetViewLoader } from "@dabsi/typerpc/widget/view/loader";
import React from "react";

RouterView.define(ACL_Admin_Router.at("users"), ({ location }) => (
  <WidgetViewLoader connection={ACL_Admin_Connection.usersManager.table}>
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
  </WidgetViewLoader>
));

//
