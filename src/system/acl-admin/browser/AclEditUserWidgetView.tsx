import React from "react";
import { MuiEditFormView } from "../../../browser/mui/rpc/MuiEditFormView";
import { WidgetViewFn } from "../../../typerpc/widget/WidgetViewFn";
import { MuiWidgetMapView } from "../../core/browser/MuiWidgetMapView";
import { AclEditUserWidget } from "../common/AclAdminRpc";

export const AclEditUserWidgetView = WidgetViewFn(AclEditUserWidget, props => {
  return (
    <MuiWidgetMapView
      {...props}
      accordion
      children={{
        basicInfo: MuiEditFormView,
        groups: MuiEditFormView,
        contactInfo: MuiEditFormView,
      }}
    />
  );
});
