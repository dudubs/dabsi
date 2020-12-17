import { MuiDataTableView } from "@dabsi/browser/mui/rpc/MuiDataTableView";
import { MuiEditFormView } from "@dabsi/browser/mui/rpc/MuiEditFormView";
import { MuiFormView } from "@dabsi/browser/mui/rpc/MuiFormView";
import { Lang } from "@dabsi/lang/Lang";
import { mergeProps } from "@dabsi/react/utils/mergeProps";
import AclAdminRouter from "@dabsi/system/acl-admin/AclAdminRouter";
import { AclAdminConnection } from "@dabsi/system/acl-admin/AclAdminRpc";
import { AclBreadcrumbs } from "@dabsi/system/acl-admin/browser/AclBreadcrumbs";
import { AclGroupBasicInfoForm } from "@dabsi/system/acl-admin/groups/edit/BasicInfoForm";
import { AclGroupBasicInfoInput } from "@dabsi/system/acl-admin/groups/input/BasicInfoInput";
import { MuiAccordionMapView } from "@dabsi/system/core/browser/MuiAccordionMapView";
import MuiSystemPage from "@dabsi/system/core/browser/MuiSystemPage";
import { useSystemView } from "@dabsi/system/view/useSystemView";
import { WidgetRouterView } from "@dabsi/typerpc/widget/WidgetRouterView";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import CreateIcon from "@material-ui/icons/Create";
import React, { useState } from "react";

WidgetRouterView(
  AclAdminRouter.at("groups"),
  AclAdminConnection.groupsManager.table,
  (props, { location }) => (
    <MuiDataTableView
      {...props}
      title={Lang`GROUPS`}
      onEditClick={async event => {
        location.parent.at("editGroup", { groupId: event.key }).push();
      }}
      onDeleteClick={async event => {
        await AclAdminConnection.groupsManager.delete(event.key);
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
            >{Lang`CREATE_NEW_GROUP`}</Button>
          </>
        ),
      }}
    />
  )
);

WidgetRouterView(
  AclAdminRouter.at("createNewGroup"),
  AclAdminConnection.groupsManager.add,
  (props, { location }) => (
    <MuiSystemPage
      title={Lang`CREATE_NEW_GROUP`}
      Breadcrumbs={AclBreadcrumbs.Groups}
    >
      <MuiFormView
        {...props}
        submitTitle={Lang`CREATE`}
        submitButtonProps={{ endIcon: <CreateIcon /> }}
        disableResetButton
        onSubmit={() => location.parent.at("groups").push()}
      />
    </MuiSystemPage>
  )
);

WidgetRouterView(
  AclAdminRouter.at("editGroup"),
  params => {
    return AclAdminConnection.groupsManager.edit(params.groupId);
  },
  props => {
    const [title, setTitle] = useState("");

    useSystemView(AclGroupBasicInfoForm, props => (
      <MuiEditFormView {...props} />
    ));

    useSystemView(AclGroupBasicInfoInput.at(":groupName"), props =>
      mergeProps(props, {
        inputRef: input => {
          setTimeout(() => {
            setTitle(input?.value || "");
          }, 0);
        },
        onChange: input => {
          setTitle(input.value || "");
        },
      })
    );

    return (
      <MuiSystemPage
        title={Lang`EDIT_GROUP`}
        breadcrumbTitle={title}
        Breadcrumbs={AclBreadcrumbs.Groups}
      >
        <MuiAccordionMapView for={props} />
      </MuiSystemPage>
    );
  }
);
