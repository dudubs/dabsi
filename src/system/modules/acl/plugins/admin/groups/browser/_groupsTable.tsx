import { MuiDataTableView } from "@dabsi/browser/mui/rpc/MuiDataTableView";
import AclAdminRouter from "@dabsi/system/modules/acl/plugins/admin/common/AclAdminRouter";
import { AclAdminConnection } from "@dabsi/system/modules/acl/plugins/admin/common/AclAdminRpc";

import { WidgetRouterView } from "@dabsi/typerpc/widget/WidgetRouterView";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import React from "react";

WidgetRouterView(
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
      MuiTableToolbarProps={{
        staticActions: (
          <>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => {
                location.parent.at("createNewGroup").push();
              }}
            >{lang`CREATE_NEW_GROUP`}</Button>
          </>
        ),
      }}
    />
  )
);
