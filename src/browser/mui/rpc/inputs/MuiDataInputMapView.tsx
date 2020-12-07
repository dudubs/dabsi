import Grid, { GridProps } from "@material-ui/core/Grid";
import Typography, { TypographyProps } from "@material-ui/core/Typography";
import React, { ReactNode } from "react";
import { PartialKeys } from "../../../../common/typings2/PartialUndefinedKeys";
import { Lang } from "../../../../lang/Lang";
import { SystemView } from "../../../../system/core/common/SystemView";
import { AnyDataInputMap } from "../../../../typerpc/input/data-input-map/DataInputMap";
import {
  DataInputMapView,
  DataInputMapViewProps,
} from "../../../../typerpc/input/data-input-map/DataInputMapView";
import { InputMapView } from "../../../../typerpc/input/input-map/InputMapView";
import { InputViewProps } from "../../../../typerpc/input/InputView";
import { RpcConnection } from "../../../../typerpc/Rpc";

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
          <Grid {...ItemGridProps} item>
            {renderTarget(props, itemProps)}
          </Grid>
        )}
        {...props}
      />
    </Grid>
  );
}
