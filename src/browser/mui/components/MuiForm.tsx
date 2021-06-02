import { MuiFormTheme } from "@dabsi/browser/mui/components/MuiFormTheme";
import { MuiThemeProvider } from "@dabsi/browser/mui/MuiSystem";
import Button, { ButtonProps } from "@material-ui/core/Button";
import Grid, { GridProps } from "@material-ui/core/Grid";
import React from "react";

export type MuiFormProps = {
  children: React.ReactNode;

  disableReset?: boolean;

  onSubmit?(event: React.SyntheticEvent<any>);

  onReset?(event: React.SyntheticEvent<any>);

  baseButtonProps?: ButtonProps;

  submitButtonProps?: ButtonProps;

  resetButtonProps?: ButtonProps;

  submitTitle?: React.ReactNode;
  // toolbar?

  buttonsGridProps?: GridProps;

  header?: React.ReactChild;
};

export function MuiForm(p: MuiFormProps): React.ReactElement {
  return (
    <MuiThemeProvider theme={MuiFormTheme}>
      <Grid container direction="column" spacing={1}>
        {p.header && <Grid item>{p.header}</Grid>}
        <Grid item>{p.children}</Grid>
        <Grid
          item
          container
          spacing={1}
          justify="flex-end"
          direction="row"
          {...p.buttonsGridProps}
        >
          {p.onSubmit && (
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                {...p.baseButtonProps}
                {...p.submitButtonProps}
                onClick={p.onSubmit}
              >
                {p.submitTitle || lang`SUBMIT`}
              </Button>
            </Grid>
          )}
          {!p.disableReset && p.onReset && (
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                {...p.baseButtonProps}
                {...p.resetButtonProps}
                onClick={p.onReset}
              >{lang`RESET`}</Button>
            </Grid>
          )}
        </Grid>
      </Grid>
    </MuiThemeProvider>
  );
}
