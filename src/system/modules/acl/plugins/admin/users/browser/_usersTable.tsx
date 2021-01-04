import { MuiDataInputMapView } from "@dabsi/browser/mui/rpc/inputs/MuiDataInputMapView";
import { MuiDataTableView } from "@dabsi/browser/mui/rpc/MuiDataTableView";
import { MuiEditFormView } from "@dabsi/browser/mui/rpc/MuiEditFormView";
import { MuiFormView } from "@dabsi/browser/mui/rpc/MuiFormView";
import { mergeProps } from "@dabsi/react/utils/mergeProps";
import AclAdminViewWrappers from "@dabsi/system/modules/acl/plugins/admin/browser/AclAdminViewWrappers";
import { AclBreadcrumbs } from "@dabsi/system/modules/acl/plugins/admin/browser/AclBreadcrumbs";
import AclAdminRouter from "@dabsi/system/modules/acl/plugins/admin/common/AclAdminRouter";
import { AclAdminConnection } from "@dabsi/system/modules/acl/plugins/admin/common/AclAdminRpc";
import AclUserBasicInfoInput from "@dabsi/system/modules/acl/plugins/admin/users/common/AclUserBasicInfoInput";
import AclUserGroupsForm from "@dabsi/system/modules/acl/plugins/admin/users/common/AclUserGroupsForm";
import MuiSystemPage from "@dabsi/system/core/browser/MuiSystemPage";
import { MuiAccordionMapView } from "@dabsi/modules/rpc/browser/MuiAccordionMapView";
import { MuiGridMapView } from "@dabsi/modules/rpc/browser/MuiGridMapView";
import { SystemView } from "@dabsi/modules/rpc/view/SystemView";
import { useSystemView } from "@dabsi/modules/rpc/view/useSystemView";
import { useSystemViewTheme } from "@dabsi/modules/rpc/view/useSystemViewTheme";
import { Form } from "@dabsi/typerpc/widget/form/Form";
import { WidgetRouterView } from "@dabsi/typerpc/widget/WidgetRouterView";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import React, { useState } from "react";

WidgetRouterView(
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
        MuiTableToolbarProps={{
          staticActions: (
            <>
              <Button
                endIcon={<AddIcon />}
                onClick={() => {
                  location.parent.at("createNewUser").push();
                }}
              >{lang`CREATE_NEW_USER`}</Button>
            </>
          ),
        }}
      />
    );
  }
);
