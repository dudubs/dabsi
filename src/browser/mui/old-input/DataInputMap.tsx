import { PartialKeys } from "@dabsi/common/typings2/PartialUndefinedKeys";
import { SystemView } from "@dabsi/system/core/old-view/SystemView";
import { AnyDataInputMap } from "@dabsi/old-typerpc/input/data-input-map/DataInputMap";
import {
  DataInputMapView,
  DataInputMapViewProps,
} from "@dabsi/old-typerpc/input/data-input-map/DataInputMapView";
import { InputViewProps } from "@dabsi/old-typerpc/input/InputView";
import { RpcConnection } from "@dabsi/old-typerpc/Rpc";
import { FormControlLabel } from "@material-ui/core";
import Grid, { GridProps } from "@material-ui/core/Grid";
import Typography, { TypographyProps } from "@material-ui/core/Typography";
import React, { ReactNode } from "react";

export type MuiDataInputMapViewProps<
  C extends RpcConnection<AnyDataInputMap>
> = PartialKeys<DataInputMapViewProps<C>, "renderTarget"> & {
  GridProps?: GridProps;
  itemGridProps?: GridProps;
  noKeysText?: ReactNode;
  noKeysTypographyProps?: TypographyProps;
};

export function MuiDataInputMapView<C extends RpcConnection<AnyDataInputMap>>({
  GridProps,
  itemGridProps,
  renderTarget = props => <SystemView {...(props as InputViewProps<any>)} />,
  noKeysText = lang`NO_KEYS`,
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
          <Grid {...itemGridProps} item key={itemProps.key}>
            <FormControlLabel
              label={itemProps.label}
              control={renderTarget(props, itemProps)}
            />
          </Grid>
        )}
        {...props}
      />
    </Grid>
  );
}
