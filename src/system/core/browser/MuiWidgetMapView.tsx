import {
  AnyWidgetMapConnection,
  WidgetMapView,
} from "../../../typerpc/widget/widget-map/WidgetMapView";
import { WidgetViewProps } from "../../../typerpc/widget/WidgetView";
import {
  MuiMapChildRendererOrProps,
  MuiMapView,
  MuiMapViewProps,
} from "./MuiMapView";

export function MuiWidgetMapView<C extends AnyWidgetMapConnection>(
  props: WidgetViewProps<C> &
    MuiMapViewProps & {
      children?: {
        [K in keyof C["map"]]?: MuiMapChildRendererOrProps<
          WidgetViewProps<C["map"][K]>
        >;
      };
    }
) {
  return MuiMapView<WidgetViewProps<any>>(WidgetMapView, props);
}
