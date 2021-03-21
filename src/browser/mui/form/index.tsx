import Button, { ButtonProps } from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import React from "react";

export type MuiFormProps = {
  children?: React.ReactNode;
  onSubmitClick?(event: React.SyntheticEvent<any>);
  onResetClick?(event: React.SyntheticEvent<any>);

  submitButtonProps?: ButtonProps;
  resetButtonProps?: ButtonProps;

  submitTitle?: React.ReactNode;
  title?: React.ReactNode;
};

export function MuiForm(p: MuiFormProps): React.ReactElement {
  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>{p.children}</Grid>
      <Grid item>
        {p.onSubmitClick && (
          <Button
            {...p.submitButtonProps}
            variant="contained"
            color="primary"
            onClick={p.onSubmitClick}
          >
            {p.submitTitle || lang`SUBMIT`}
          </Button>
        )}
        {p.onResetClick && (
          <Button
            {...p.resetButtonProps}
            variant="contained"
            color="primary"
            onClick={p.onResetClick}
          >{lang`RESET`}</Button>
        )}
      </Grid>
    </Grid>
  );
}
