import React from "react";
import { Lang } from "../../../lang/Lang";
import { WidgetViewFn } from "../../../typerpc/widget/WidgetViewFn";
import { MuiAccordionMapView } from "../../core/browser/MuiAccordionMapView";
import { AclEditUserWidget } from "../common/AclAdminRpc";
import { MuiEditFormView } from "./MuiEditFormView";

export default WidgetViewFn(AclEditUserWidget, props => {
  // props.connection.map.basicInfo
  // useLocationStore();
  // const store = useLocationStore(
  //   "accordion",
  //   MuiAccordionMapViewState2,
  //   s =>
  //     new MuiAccordionMapViewState2({
  //       ...s,
  //       selectedKeys: ImmutableSet(s.selectedKeys),
  //     })
  // );

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
