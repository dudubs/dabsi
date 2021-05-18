import { Grid } from "@material-ui/core";
import React, { ReactElement } from "react";

export function MuiSectionList(p: {
  children?: ReactElement[];
}): React.ReactElement {
  return (
    <Grid container direction="column" spacing={3}>
      {React.Children.map(p.children, child => {
        if (React.isValidElement(child)) {
          return <Grid item>{child}</Grid>;
        }
      })}
    </Grid>
  );
}
