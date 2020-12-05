import Grid, { GridProps } from "@material-ui/core/Grid";
import React from "react";
import { mapObjectToArray } from "../../../common/object/mapObjectToArray";
import { AnyInputConnection } from "../../../typerpc/input/Input";
import {
  AnyInputMapConnection,
  InputMapView,
} from "../../../typerpc/input/input-map/InputMapView";
import { InputViewProps } from "../../../typerpc/input/InputView";
import { SystemView } from "../common/SystemView";

export type MuiInputMapViewOptions<C extends AnyInputConnection> = {
  GridProps?: GridProps;
  render?: InputViewProps<C>;
};

export function MuiInputMapView<C extends AnyInputMapConnection>(
  props: InputViewProps<C> & {
    children?: {
      [K in keyof C["map"]]?:
        | MuiInputMapViewOptions<C["map"][K]>
        | InputViewProps<C["map"][K]>;
    };
  }
) {
  return (
    <Grid container spacing={3}>
      <InputMapView
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
