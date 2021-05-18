import { MuiDataTableView } from "@dabsi/browser/mui/views/MuiDataTableView";
import ACL_AdminRpc from "@dabsi/system/acl/admin/common/rpc";
import { ACL_AdminRouter } from "@dabsi/system/acl/admin/view/router";
import { RouterView } from "@dabsi/typerouter2/view/RouterView";
import React from "react";

RouterView.define(ACL_AdminRouter, {
  groups: [
    ({ root, history }) => (
      <MuiDataTableView
        title={lang`ACL_GROUPS`}
        connection={ACL_AdminRpc.instance.groupsTable}
        staticActions={{ add: { tooltip: lang`ADD_NEW_GROUP` } }}
        onAddRow={() => history.push(root.addNewGroup)}
      />
    ),
  ],
  editGroup: () => <>edit group</>,
  addNewGroup: () => <>add new group</>,
});
