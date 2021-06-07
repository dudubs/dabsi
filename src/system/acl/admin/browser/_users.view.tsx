import { MuiDataTableView } from "@dabsi/browser/mui/views/MuiDataTableView";
import { MuiFormView } from "@dabsi/browser/mui/views/MuiFormView";
import ACL_AdminRpc from "@dabsi/system/acl/admin/common/rpc";
import { ACL_AdminRouter } from "@dabsi/system/acl/admin/view/router";
import { RouterView } from "@dabsi/typerouter2/view";
import React from "react";
export default RouterView(ACL_AdminRouter, $ =>
  $.at("users", $ =>
    $.index(({ root, history }) => (
      <MuiDataTableView
        connection={ACL_AdminRpc.instance.usersTable}
        title={lang`ACL_USERS`}
        onEditRow={(_, row) => history.push(root.editUser(row.$key))}
        onAddRow={() => history.push(root.addNewUser)}
      />
    ))
  ).at("addNewUser", $ =>
    $.index(({ root, history }) => (
      <MuiFormView connection={ACL_AdminRpc.instance.addNewUserForm} />
    ))
  )
);
