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
        if (child.type === Grid) item = { ...item, ...child.props };
        return (
          <Grid {...item} item>
            {child}
          </Grid>
        );
      })}
    </Grid>
  );
}
