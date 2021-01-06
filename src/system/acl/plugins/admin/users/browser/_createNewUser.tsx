import { MuiFormView } from "@dabsi/browser/mui/rpc/MuiFormView";
import { AclBreadcrumbs } from "@dabsi/system/acl/plugins/admin/browser/AclBreadcrumbs";
import AclAdminRouter from "@dabsi/system/acl/plugins/admin/common/AclAdminRouter";
import { AclAdminConnection } from "@dabsi/system/acl/plugins/admin/common/AclAdminRpc";
import MuiSystemPage from "@dabsi/system/core/browser/MuiSystemPage";
import { MuiGridMapView } from "@dabsi/system/core/browser/MuiGridMapView";
import SystemView from "@dabsi/system/core/view/SystemView";
import { useSystemView } from "@dabsi/system/core/view/useSystemView";
import { WidgetRouterView } from "@dabsi/typerpc/widget/WidgetRouterView";
import React from "react";

WidgetRouterView(
  AclAdminRouter.at("createNewUser"),
  AclAdminConnection.usersManager.add,
  (props, { location }) => {
    useSystemView(props.connection.$widget, props => (
      <MuiFormView
        {...props}
        onSubmit={() => location.parent.at("users").push()}
      />
    ));

    useSystemView(props.connection.input.$widget, props => (
      <MuiGridMapView
        for={props}
        children={{
          firstName: {
            GridProps: { xs: 6 },
          },
          lastName: {
            GridProps: { xs: 6 },
          },
        }}
      />
    ));

    return (
      <MuiSystemPage
        title={lang`CREATE_NEW_USER`}
        Breadcrumbs={AclBreadcrumbs.Users}
      >
        <SystemView {...props} />
      </MuiSystemPage>
    );
  }
);
