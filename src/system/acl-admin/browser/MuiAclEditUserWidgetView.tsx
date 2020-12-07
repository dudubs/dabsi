import Divider from "@material-ui/core/Divider";
import React from "react";
import { WidgetViewRenderer } from "../../../typerpc/widget/WidgetView";
import { MuiWidgetMapView } from "../../core/browser/MuiWidgetMapView";
import { AclEditUserWidget } from "../common/AclAdminRpc";

export const MuiAclEditUserWidgetView: WidgetViewRenderer<
  typeof AclEditUserWidget
> = props => {
  return <MuiWidgetMapView {...props} divider={<Divider light />} />;
};
