import { MuiFormView } from "@dabsi/browser/mui/widget/MuiFormView";
import { AclBreadcrumbs } from "@dabsi/system/acl/plugins/admin/browser/AclBreadcrumbs";
import AclAdminRouter from "@dabsi/system/acl/plugins/admin/common/AclAdminRouter";
import { AclAdminConnection } from "@dabsi/system/acl/plugins/admin/common/AclAdminRpc";
import MuiSystemPage from "@dabsi/system/core/browser/MuiSystemPage";
import { RouterView } from "@dabsi/typerouter/view";
import { WidgetLoaderView } from "@dabsi/typerpc/widget/WidgetLoaderView";
import CreateIcon from "@material-ui/icons/Create";
import React from "react";

RouterView.define(AclAdminRouter.at("createNewGroup"), ({ location }) => (
  <WidgetLoaderView connection={AclAdminConnection.groupsManager.add}>
    {props => (
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
    )}
  </WidgetLoaderView>
));
