import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import React from "react";
import styled from "styled-components";
import { MuiGrid } from "../../../browser/mui/components/MuiGrid";
import { MuiFormView } from "../../../browser/mui/rpc/MuiFormView";
import { Lang } from "../../../lang/Lang";
import { WidgetRouterView } from "../../../typerpc/widget/WidgetRouterView";
import { UserBasicInfoInput } from "../../acl/common/UserBasicInfoInput";
import { MuiInputMapView } from "../../core/browser/MuiInputMapView";
import { SystemView } from "../../core/common/SystemView";
import { AclAdminRouter } from "../common";
import { AclAdminConnection, AclAdminRpc } from "../common/AclAdminRpc";

const UserAvatar = styled(Avatar)`
  width: 120px;
  height: 120px;
`;

// EditForm(AnyForm())
SystemView.register(
  AclAdminRpc.at("editUser").at("target").at("map").at("basicInfo"),
  props => {
    return (
      <>
        xx{" "}
        <MuiFormView
          {...props}
          disableResetButton
          submitTitle={Lang`SAVE_CHANGES`}
        />
      </>
    );
  }
);

// MuiEditFormview
//

/*

SystemView.wrap(..., (prop,snext)=>{
  return next();
})
 */

SystemView.register(UserBasicInfoInput, props => (
  <>
    <MuiGrid item={{ xs: 12, sm: 12, md: 6 }} direction={"row-reverse"}>
      <MuiGrid
        direction={"column"}
        spacing={3}
        alignItems={"center"}
        alignContent={"center"}
      >
        <UserAvatar />
        <Button startIcon={<CloudUploadIcon />}>Upload</Button>
      </MuiGrid>
      <MuiInputMapView
        {...props}
        children={{
          firstName: {
            GridProps: {
              sm: 12,
              md: 6,
              lg: 4,
            },
          },
          lastName: {
            GridProps: {
              sm: 12,
              md: 6,
              lg: 4,
            },
          },
        }}
      />
    </MuiGrid>
  </>
));

WidgetRouterView(
  AclAdminRouter.at("editUser"),
  params => AclAdminConnection.editUser(params.userId),
  SystemView
);
// MuiWidgetView connection
