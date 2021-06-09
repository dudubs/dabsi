import { Divider, Grid } from "@material-ui/core";
import React, { ReactElement } from "react";

export default function MuiSectionGroup(p: {
  children?: ReactElement[];
  header?: React.ReactElement;
  footer?: React.ReactElement;
}): React.ReactElement {
  return (
    <Grid container direction="column" spacing={3}>
      {p.header && (
        <Grid item>
          {p.header}
          <Divider />
        </Grid>
      )}
      {React.Children.map(p.children, child => {
        if (React.isValidElement(child)) {
          return <Grid item>{child}</Grid>;
        }
      })}
      {p.footer && (
        <Grid item>
          <Divider />
          {p.footer}
        </Grid>
      )}
    </Grid>
  );
}
