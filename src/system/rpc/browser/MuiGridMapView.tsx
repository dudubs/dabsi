// <MuiGridMapView for={props} />}

import { Divider } from "@material-ui/core";
import Grid, { GridProps } from "@material-ui/core/Grid";
import React, { ReactElement, ReactNode } from "react";
import {
  AnySystemMapConnection,
  AnyWidgetConnectionWithWidgetMap,
  SystemMapView,
  SystemMapViewProps,
} from "@dabsi/system/rpc/view/SystemMapView";

export function MuiGridMapView<C extends AnySystemMapConnection>({
  GridProps,
  itemGridProps,
  divider,
  ...props
}: SystemMapViewProps<
  C,
  {
    GridProps?: GridProps;
    before?: ReactNode;
    after?: ReactNode;
  }
> & {
  GridProps?: GridProps;
  itemGridProps?: GridProps;
  divider?: boolean | ReactElement;
}): ReactElement {
  if (divider === true) {
    divider = <Divider />;
  }
  return (
    <Grid spacing={3} {...GridProps} container>
      <SystemMapView
        {...props}
        between={
          divider && (
            <Grid xs={12} item>
              {divider}
            </Grid>
          )
        }
        renderItem={(
          element,
          { GridProps = itemGridProps, before, after },
          { key }
        ) => {
          element = (
            <Grid xs={12} {...GridProps} item key={key}>
              {element}
            </Grid>
          );
          if (before || after) {
            element = (
              <>
                {before}
                {element}
                {after}
              </>
            );
          }
          return element;
        }}
      />
    </Grid>
  );
}
