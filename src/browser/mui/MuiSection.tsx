import { Grid, Typography, TypographyProps } from "@material-ui/core";
import React from "react";

export type MuiSectionProps = {
  title: React.ReactNode;
  TitleTypograpyProps?: TypographyProps;
  sidebar?: React.ReactNode;
  children?: React.ReactNode;
  caption?: React.ReactNode;
};

export function MuiSection(p: MuiSectionProps): React.ReactElement {
  const title = (
    <Typography variant="h5" {...p.TitleTypograpyProps}>
      {p.title}
    </Typography>
  );

  return (
    <Grid container direction="column" spacing={3}>
      <Grid item container direction="column" spacing={1}>
        <Grid item>
          {p.sidebar ? (
            <Grid container>
              <Grid item xs>
                {title}
              </Grid>
              <Grid item>{p.sidebar}</Grid>
            </Grid>
          ) : (
            title
          )}
        </Grid>
        {p.caption && <Grid item>{p.caption}</Grid>}
      </Grid>
      <Grid item>{p.children}</Grid>
    </Grid>
  );
}
