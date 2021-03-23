import Button, { ButtonProps } from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import React from "react";
import Typography from "@material-ui/core/Typography";
import { MuiThemeProvider } from "@dabsi/browser/mui/MuiSystem";
import { MuiFormTheme } from "@dabsi/browser/mui/form/theme";
import MuiGrid from "@dabsi/browser/mui/components/MuiGrid";

export type MuiFormProps = {
  children: React.ReactNode;
  onSubmitClick?(event: React.SyntheticEvent<any>);
  onResetClick?(event: React.SyntheticEvent<any>);

  submitButtonProps?: ButtonProps;
  resetButtonProps?: ButtonProps;

  submitTitle?: React.ReactNode;
  // toolbar?
};

export function MuiForm(p: MuiFormProps): React.ReactElement {
  return (
    <MuiThemeProvider theme={MuiFormTheme}>
      <Grid container direction="column" spacing={2}>
        <Grid item>{p.children}</Grid>
        <Grid item container spacing={1} justify="flex-end" direction="row">
          {p.onSubmitClick && (
            <Grid item>
              <Button
                {...p.submitButtonProps}
                variant="contained"
                color="primary"
                onClick={p.onSubmitClick}
              >
                {p.submitTitle || lang`SUBMIT`}
              </Button>
            </Grid>
          )}
          {p.onResetClick && (
            <Grid item>
              <Button
                {...p.resetButtonProps}
                variant="contained"
                color="primary"
                onClick={p.onResetClick}
              >{lang`RESET`}</Button>
            </Grid>
          )}
        </Grid>
      </Grid>
    </MuiThemeProvider>
  );
}
