import React from "react";
import { RendererOrOptions } from "../../../react/RendererOrOptions";
import {
  AnyWidgetMapConnection,
  WidgetMapView,
} from "../../../typerpc/widget/widget-map/WidgetMapView";
import { WidgetViewProps } from "../../../typerpc/widget/WidgetView";
import { MuiMapView, MuiMapViewOptions, MuiMapViewProps } from "./MuiMapView";

export function MuiWidgetMapView<C extends AnyWidgetMapConnection>(
  props: WidgetViewProps<C> &
    MuiMapViewProps & {
      children?: {
        [K in keyof C["map"]]?: RendererOrOptions<
          WidgetViewProps<C["map"][K]>,
          MuiMapViewOptions
        >;
      };
    }
) {
  return MuiMapView<WidgetViewProps<any>>(WidgetMapView, props);
}
