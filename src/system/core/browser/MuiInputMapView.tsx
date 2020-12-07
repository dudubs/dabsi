import Grid, { GridProps } from "@material-ui/core/Grid";
import React from "react";
import { mapObjectToArray } from "../../../common/object/mapObjectToArray";
import { RendererOrOptions } from "../../../react/RendererOrOptions";
import { AnyInputConnection } from "../../../typerpc/input/Input";
import {
  AnyInputMapConnection,
  InputMapView,
} from "../../../typerpc/input/input-map/InputMapView";
import { InputViewProps } from "../../../typerpc/input/InputView";
import { WidgetMapView } from "../../../typerpc/widget/widget-map/WidgetMapView";
import { WidgetViewProps } from "../../../typerpc/widget/WidgetView";
import { SystemView } from "../common/SystemView";
import { MuiMapView, MuiMapViewOptions, MuiMapViewProps } from "./MuiMapView";

export function MuiInputMapView<C extends AnyInputMapConnection>(
  props: InputViewProps<C> &
    MuiMapViewProps & {
      children?: {
        [K in keyof C["map"]]?: RendererOrOptions<
          InputViewProps<C["map"][K]>,
          MuiMapViewOptions
        >;
      };
    }
) {
  return MuiMapView<InputViewProps<any>>(InputMapView, props);
}
