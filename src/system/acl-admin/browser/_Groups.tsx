import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import CreateIcon from "@material-ui/icons/Create";
import React, { useState } from "react";
import { MuiDataTableView } from "../../../browser/mui/rpc/MuiDataTableView";
import { MuiFormView } from "../../../browser/mui/rpc/MuiFormView";
import { Lang } from "../../../lang/Lang";
import { mergeProps } from "../../../react/utils/mergeProps";
import { WidgetRouterView } from "../../../typerpc/widget/WidgetRouterView";
import { MuiWidgetMapView } from "../../core/browser/MuiWidgetMapView";
import { useSystemView } from "../../view/useSystemView";
import AclAdminRouter from "../common/AclAdminRouter";
import { AclAdminConnection } from "../common/AclAdminRpc";
import { AclBreadcrumbs } from "./AclBreadcrumbs";
import MuiSystemPage from "./MuiSystemPage";

WidgetRouterView(
  AclAdminRouter.at("groups"),
  AclAdminConnection.groupsManager.table,
  (props, { location }) => (
    <MuiDataTableView
      {...props}
      title={<Typography variant="h5">{Lang`GROUPS`}</Typography>}
      onEditClick={async event => {
        location.parent.at("editGroup", { id: event.key }).push();
      }}
      onDeleteClick={async event => {
        await AclAdminConnection.groupsManager.delete(event.key);
      }}
      toolbar={
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
      }
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
  params => AclAdminConnection.groupsManager.edit(params.id),
  props => {
    const [title, setTitle] = useState(() => {
      return props.element.elementMap.basicInfo.value?.groupName || "";
    });

    // useSystemView()

    useSystemView(
      props.connection.map.basicInfo.input.map.groupName,
      (props, InputView) => (
        <InputView
          {...mergeProps(props, {
            onChange: input => {
              setTitle(input.value || "");
            },
          })}
        />
      )
    );

    return (
      <MuiSystemPage
        title={Lang`EDIT_GROUP`}
        breadcrumbTitle={title}
        Breadcrumbs={AclBreadcrumbs.Groups}
      >
        <MuiWidgetMapView
          {...props}
          children={{
            basicInfo: props => (
              <MuiFormView {...props} submitTitle={Lang`SAVE CHANGES`} />
            ),
          }}
        />
      </MuiSystemPage>
    );
  }
);
