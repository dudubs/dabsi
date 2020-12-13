import React from "react";
import { Lang } from "../../../lang/Lang";
import { WidgetViewFn } from "../../../typerpc/widget/WidgetViewFn";
import { MuiAccordionMapView } from "../../core/browser/MuiAccordionMapView";
import { AclEditUser } from "../common/AclAdminRpc";
import { MuiEditFormView } from "./MuiEditFormView";

export default WidgetViewFn(AclEditUser, props => {
  return (
    <MuiAccordionMapView
      // multiple
      for={props}
      last={["groups"]}
      // store={store}
      children={{
        basicInfo: MuiEditFormView,
        contactInfo: MuiEditFormView,
        groups: {
          render: MuiEditFormView,
          after: [
            {
              title: Lang`OPERATIONS`,
              details: <>asd</>,
            },
          ],
        },
      }}
    />
  );
});
