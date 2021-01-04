import { MuiFormView } from "@dabsi/browser/mui/rpc/MuiFormView";
import { AclBreadcrumbs } from "@dabsi/system/modules/acl/plugins/admin/browser/AclBreadcrumbs";
import AclAdminRouter from "@dabsi/system/modules/acl/plugins/admin/common/AclAdminRouter";
import { AclAdminConnection } from "@dabsi/system/modules/acl/plugins/admin/common/AclAdminRpc";
import MuiSystemPage from "@dabsi/system/core/browser/MuiSystemPage";
import { WidgetRouterView } from "@dabsi/typerpc/widget/WidgetRouterView";
import CreateIcon from "@material-ui/icons/Create";
import React from "react";

WidgetRouterView(
  AclAdminRouter.at("createNewGroup"),
  AclAdminConnection.groupsManager.add,
  (props, { location }) => (
    <MuiSystemPage
      title={lang`CREATE_NEW_GROUP`}
      Breadcrumbs={AclBreadcrumbs.Groups}
    >
      <MuiFormView
        {...props}
        submitTitle={lang`CREATE`}
        submitButtonProps={{ endIcon: <CreateIcon /> }}
        disableResetButton
        onSubmit={() => location.parent.at("groups").push()}
      />
    </MuiSystemPage>
  )
);
