import AddIcon from "@material-ui/icons/Add";
import { MuiDataTableView } from "@dabsi/browser/mui/rpc/MuiDataTableView";
import { Lang } from "@dabsi/lang/Lang";
import AclAdminRouter from "@dabsi/system/acl-admin/AclAdminRouter";
import { AclAdminConnection } from "@dabsi/system/acl-admin/AclAdminRpc";
import { SystemView } from "@dabsi/system/view/SystemView";
import { WidgetRouterView } from "@dabsi/typerpc/widget/WidgetRouterView";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import React from "react";
import MuiSystemPage from "@dabsi/system/core/browser/MuiSystemPage";
import { useSystemView } from "@dabsi/system/view/useSystemView";
import { MuiGridMapView } from "@dabsi/system/core/browser/MuiGridMapView";
import { AclBreadcrumbs } from "@dabsi/system/acl-admin/browser/AclBreadcrumbs";
import { MuiAccordionMapView } from "@dabsi/system/core/browser/MuiAccordionMapView";
import { useSystemViewTheme } from "@dabsi/system/view/useSystemViewTheme";
import { FormView } from "@dabsi/typerpc/widget/form/FormView";
import { MuiEditFormView } from "@dabsi/browser/mui/rpc/MuiEditFormView";
import { Form } from "@dabsi/typerpc/widget/form/Form";
import { useMuiSystemViewTheme } from "@dabsi/system/core/browser/useMuiSystemViewTheme";
import { AclUserBasicInfoInput } from "@dabsi/system/acl-admin/users/inputs/BasicInfoInput";

WidgetRouterView(
  AclAdminRouter.at("users"),
  AclAdminConnection.usersManager.table,
  (props, { location }) => {
    return (
      <MuiDataTableView
        {...props}
        title={Lang`USERS`}
        onEditClick={async event => {
          location.parent.at("editUser", { userId: event.key }).push();
        }}
        MuiTableToolbarProps={{
          staticActions: (
            <>
              <Button
                endIcon={<AddIcon />}
                onClick={() => {
                  location.parent.at("createNewUser").push();
                }}
              >{Lang`CREATE_NEW_USER`}</Button>
            </>
          ),
        }}
      />
    );
  }
);

WidgetRouterView(
  AclAdminRouter.at("createNewUser"),
  AclAdminConnection.usersManager.add,
  props => {
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
        title={Lang`CREATE_NEW_USER`}
        Breadcrumbs={AclBreadcrumbs.Users}
      >
        <SystemView {...props} />
      </MuiSystemPage>
    );
  }
);
WidgetRouterView(
  AclAdminRouter.at("editUser"),
  params => AclAdminConnection.usersManager.edit(params.userId),
  props => {
    useMuiSystemViewTheme(use => {
      use(Form, MuiEditFormView);

      use(AclUserBasicInfoInput, props => (
        <MuiGridMapView
          for={props}
          children={{
            firstName: { GridProps: { xs: 6 } },
            lastName: { GridProps: { xs: 6 } },
          }}
        />
      ));
    });

    return (
      <MuiSystemPage
        title={Lang`CREATE_NEW_USER`}
        Breadcrumbs={AclBreadcrumbs.Users}
      >
        <MuiAccordionMapView for={props} />
      </MuiSystemPage>
    );
  }
);
