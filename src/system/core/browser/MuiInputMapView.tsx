import {
  AnyInputMapConnection,
  InputMapView,
} from "../../../typerpc/input/input-map/InputMapView";
import { InputViewProps } from "../../../typerpc/input/InputView";
import {
  MuiMapChildRendererOrProps,
  MuiMapView,
  MuiMapViewProps,
} from "./MuiMapView";

export function MuiInputMapView<C extends AnyInputMapConnection>(
  props: InputViewProps<C> &
    MuiMapViewProps & {
      children?: {
        [K in keyof C["map"]]?: MuiMapChildRendererOrProps<
          InputViewProps<C["map"][K]>
        >;
      };
    }
) {
  return MuiMapView<InputViewProps<any>>(InputMapView, props);
}
