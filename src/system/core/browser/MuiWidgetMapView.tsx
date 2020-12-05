import Grid, { GridProps } from "@material-ui/core/Grid";
import React from "react";
import { mapObjectToArray } from "../../../common/object/mapObjectToArray";
import { AnyWidgetConnection } from "../../../typerpc/widget/Widget";
import {
  AnyWidgetMapConnection,
  WidgetMapView,
} from "../../../typerpc/widget/widget-map/WidgetMapView";
import { WidgetViewProps } from "../../../typerpc/widget/WidgetView";
import { SystemView } from "../common/SystemView";
import { MuiInputMapViewOptions } from "./MuiInputMapView";

export type MuiWidgetMapViewOptions<C extends AnyWidgetConnection> = {
  GridProps?: GridProps;
  render?: WidgetViewProps<C>;
};

export function MuiWidgetMapView<C extends AnyWidgetMapConnection>(
  props: WidgetViewProps<C> & {
    children?: {
      [K in keyof C["map"]]?:
        | MuiWidgetMapViewOptions<C["map"][K]>
        | WidgetViewProps<C["map"][K]>;
    };
  }
) {
  return (
    <Grid container spacing={3}>
      <WidgetMapView
        {...props}
        children={getProps =>
          mapObjectToArray(props.connection.map, (_, key) => {
            let options: MuiInputMapViewOptions<any> | undefined = props
              .children?.[key] as any;
            if (typeof options === "function") {
              options = { render: options };
            }
            return (
              <Grid item xs={12} {...options?.GridProps} key={key}>
                {SystemView(getProps(key))}
              </Grid>
            );
          })
        }
      />
    </Grid>
  );
}
