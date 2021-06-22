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

  renderButtons?: (props: {
    submitButton?: React.ReactElement;
    resetButton?: React.ReactElement;
  }) => React.ReactNode;
};

export function MuiForm(p: MuiFormProps): React.ReactElement {
  const submitButton = !p.onSubmit ? undefined : (
    <Button
      variant="contained"
      color="primary"
      {...p.ButtonProps}
      {...p.SubmitButtonProps}
      onClick={p.onSubmit}
    >
      {p.submitTitle || lang`SUBMIT`}
    </Button>
  );
  const resetButton = !(!p.disableReset && p.onReset) ? undefined : (
    <Button
      variant="contained"
      color="primary"
      {...p.ButtonProps}
      {...p.ResetButtonProps}
      onClick={p.onReset}
    >{lang`RESET`}</Button>
  );
  return (
    <MuiThemeProvider theme={MuiFormTheme}>
      <Grid container direction="column" spacing={2} {...p.ContainerProps}>
        {p.header && <Grid item>{p.header}</Grid>}
        <Grid item>{p.children}</Grid>
        {p.renderButtons ? (
          <Grid item>{p.renderButtons({ submitButton, resetButton })}</Grid>
        ) : (
          <Grid
            item
            container
            spacing={1}
            justify="flex-end"
            direction="row"
            {...p.ButtonsContainerProps}
          >
            {submitButton && <Grid item>{submitButton}</Grid>}
            {resetButton && <Grid item>{resetButton}</Grid>}
          </Grid>
        )}
      </Grid>
    </MuiThemeProvider>
  );
}
