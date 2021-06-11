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

  ButtonProps?: ButtonProps;

  ContainerProps?: GridProps;

  SubmitButtonProps?: ButtonProps;

  ResetButtonProps?: ButtonProps;

  submitTitle?: React.ReactNode;
  // toolbar?

  ButtonsContainerProps?: GridProps;

  header?: React.ReactChild;

  beforeSubmitButton?: React.ReactNode;
  afterSubmitButton?: React.ReactNode;

  beforeResetButton?: React.ReactNode;
  afterResetButton?: React.ReactNode;
};

export function MuiForm(p: MuiFormProps): React.ReactElement {
  return (
    <MuiThemeProvider theme={MuiFormTheme}>
      <Grid container direction="column" spacing={2} {...p.ContainerProps}>
        {p.header && <Grid item>{p.header}</Grid>}
        <Grid item>{p.children}</Grid>
        <Grid
          item
          container
          spacing={1}
          justify="flex-end"
          direction="row"
          {...p.ButtonsContainerProps}
        >
          {p.beforeSubmitButton}
          {p.onSubmit && (
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                {...p.ButtonProps}
                {...p.SubmitButtonProps}
                onClick={p.onSubmit}
              >
                {p.submitTitle || lang`SUBMIT`}
              </Button>
            </Grid>
          )}
          {p.afterSubmitButton}
          {p.beforeSubmitButton}
          {!p.disableReset && p.onReset && (
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                {...p.ButtonProps}
                {...p.ResetButtonProps}
                onClick={p.onReset}
              >{lang`RESET`}</Button>
            </Grid>
          )}
          {p.afterResetButton}
        </Grid>
      </Grid>
    </MuiThemeProvider>
  );
}
