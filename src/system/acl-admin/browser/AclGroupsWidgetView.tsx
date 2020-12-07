import { Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import React from "react";
import { MuiDataTableView } from "../../../browser/mui/rpc/MuiDataTableView";
import { Lang } from "../../../lang/Lang";
import { useRouterLocation } from "../../../typerouter/ReactRouter";
import { WidgetViewFn } from "../../../typerpc/widget/WidgetViewFn";
import { AclAdminRouter } from "../common";
import { AclGroupsWidget } from "../common/AclAdminRpc";

export const AclGroupsWidgetView = WidgetViewFn(AclGroupsWidget, props => {
  const location = useRouterLocation(AclAdminRouter);
  return (
    <>
      <MuiDataTableView
        {...props}
        title={Lang`GROUPS`}
        toolbar={
          <>
            <Button
              color="primary"
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => {
                location.at("addNewGroup").push();
              }}
            >{Lang`ADD_NEW_GROUP`}</Button>
          </>
        }
      />
    </>
  );
});
