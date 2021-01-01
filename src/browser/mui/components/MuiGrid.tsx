import Grid, { GridProps } from "@material-ui/core/Grid";
import React from "react";
import { Children } from "react";

export type MuiGridProps = { item?: GridProps } & Omit<
  GridProps,
  "item" | "container"
>;

export default function MuiGrid({ item, children, ...props }: MuiGridProps) {
  return (
    <Grid {...props} container>
      {Children.map(children, child => {
        if (!React.isValidElement(child)) return child;

        return (
          <Grid
            {...(child.type === Grid ? { ...item, ...child.props } : item)}
            item
          >
            {child}
          </Grid>
        );
      })}
    </Grid>
  );
}
