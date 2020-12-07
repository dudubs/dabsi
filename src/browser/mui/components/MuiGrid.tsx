import Grid, { GridProps } from "@material-ui/core/Grid";
import * as React from "react";
import { Children } from "react";

export type MuiGridProps = { item?: GridProps } & Omit<
  GridProps,
  "item" | "container"
>;

export function MuiGrid({ item, children, ...props }: MuiGridProps) {
  return (
    <Grid {...props} container>
      {Children.map(children, child => (
        <Grid {...item} item>
          {/* TODO: child.type===Grid & item.. */}
          {child}
        </Grid>
      ))}
    </Grid>
  );
}
