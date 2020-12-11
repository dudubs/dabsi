// <MuiGridMapView for={props} />}

import { Divider } from "@material-ui/core";
import Grid, { GridProps } from "@material-ui/core/Grid";
import React, { ReactElement, ReactNode } from "react";
import {
  AnyWidgetConnectionWithWidgetMap,
  SystemMapView,
  SystemMapViewProps,
} from "../../view/SystemMapView";

export function MuiGridMapView<C extends AnyWidgetConnectionWithWidgetMap>({
  GridProps,
  ItemGridProps,
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
  ItemGridProps?: GridProps;
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
          { GridProps = ItemGridProps, before, after },
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
