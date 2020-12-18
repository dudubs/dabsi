import { MuiDataInputMapView } from "@dabsi/browser/mui/rpc/inputs/MuiDataInputMapView";
import { MuiDataTableView } from "@dabsi/browser/mui/rpc/MuiDataTableView";
import { MuiEditFormView } from "@dabsi/browser/mui/rpc/MuiEditFormView";
import { Lang } from "@dabsi/lang/Lang";
import { mergeProp, mergeProps } from "@dabsi/react/utils/mergeProps";
import AclAdminRouter from "@dabsi/system/acl-admin/AclAdminRouter";
import { AclAdminConnection } from "@dabsi/system/acl-admin/AclAdminRpc";
import { AclBreadcrumbs } from "@dabsi/system/acl-admin/browser/AclBreadcrumbs";
import { AclUserGroupsForm } from "@dabsi/system/acl-admin/users/forms/GroupsForm";
import { AclUserBasicInfoInput } from "@dabsi/system/acl-admin/users/inputs/BasicInfoInput";
import { MuiAccordionMapView } from "@dabsi/system/core/browser/MuiAccordionMapView";
import { MuiGridMapView } from "@dabsi/system/core/browser/MuiGridMapView";
import MuiSystemPage from "@dabsi/system/core/browser/MuiSystemPage";
import { useMuiSystemViewTheme } from "@dabsi/system/core/browser/useMuiSystemViewTheme";
import { SystemView } from "@dabsi/system/view/SystemView";
import { useSystemView } from "@dabsi/system/view/useSystemView";
import { useSystemViewTheme } from "@dabsi/system/view/useSystemViewTheme";
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
    const [title, setTitle] = useState("");

    useSystemViewTheme(use => {
      function updateTitle({ firstName = "", lastName = "" } = {}) {
        setTitle(`${firstName} ${lastName}`);
      }

      use(Form, MuiEditFormView);

      use(AclUserBasicInfoInput, props => (
        <MuiGridMapView
          for={mergeProps(props, {
            onChange: input => {
              updateTitle(input?.value);
            },
            inputRef: input => {
              setTimeout(() => {
                updateTitle(input?.value);
              });
            },
          })}
          children={{
            firstName: { GridProps: { xs: 6 } },
            lastName: { GridProps: { xs: 6 } },
          }}
        />
      ));

      use(AclUserGroupsForm.at("input"), props => (
        <MuiDataInputMapView {...props} itemGridProps={{ xs: 4 }} />
      ));
    });

    return (
      <MuiSystemPage
        title={Lang`EDIT_USER`}
        breadcrumbTitle={title}
        Breadcrumbs={AclBreadcrumbs.Users}
      >
        <MuiAccordionMapView for={props} />
      </MuiSystemPage>
    );
  }
);
