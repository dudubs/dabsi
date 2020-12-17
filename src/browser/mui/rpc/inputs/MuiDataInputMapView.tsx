import Grid, { GridProps } from "@material-ui/core/Grid";
import Typography, { TypographyProps } from "@material-ui/core/Typography";
import React, { ReactNode } from "react";
import { PartialKeys } from "@dabsi/common/typings2/PartialUndefinedKeys";
import { Lang } from "@dabsi/lang/Lang";
import { SystemView } from "@dabsi/system/view/SystemView";
import { AnyDataInputMap } from "@dabsi/typerpc/input/data-input-map/DataInputMap";
import {
  DataInputMapView,
  DataInputMapViewProps,
} from "@dabsi/typerpc/input/data-input-map/DataInputMapView";
import { RpcConnection } from "@dabsi/typerpc/Rpc";

export type MuiDataInputMapViewProps<
  C extends RpcConnection<AnyDataInputMap>
> = PartialKeys<DataInputMapViewProps<C>, "renderTarget"> & {
  GridProps?: GridProps;
  ItemGridProps?: GridProps;
  noKeysText?: ReactNode;
  noKeysTypographyProps?: TypographyProps;
};

export function MuiDataInputMapView<C extends RpcConnection<AnyDataInputMap>>({
  GridProps,
  ItemGridProps,
  renderTarget = props => SystemView(props),
  noKeysText = Lang`NO_KEYS`,
  noKeysTypographyProps,
  ...props
}: MuiDataInputMapViewProps<C>) {
  return (
    <Grid {...GridProps} container>
      <DataInputMapView
        noKeys={
          <Typography {...noKeysTypographyProps}>{noKeysText}</Typography>
        }
        renderTarget={(props, itemProps) => (
          <Grid {...ItemGridProps} item key={itemProps.key}>
            {renderTarget(props, itemProps)}
          </Grid>
        )}
        {...props}
      />
    </Grid>
  );
}
