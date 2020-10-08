import Grid from "@material-ui/core/Grid";
import * as React from "react";
import { ReactElement } from "react";
import { MuiGrid } from "../../../../browser/src/mui/grid/MuiGrid";

import { mergeProps } from "../../../react/utils/mergeProps";
import { RpcConnection } from "../../../typerpc/Rpc";
import { AnyForm } from "../../../typerpc/widget/Form";
import { FormView, FormViewProps } from "../../../typerpc/widget/FormView";
import {
  MuiButton,
  MuiButtonProps,
  MuiResetButton,
  MuiSubmitButton,
} from "../components/MuiButton";

export type MuiFormViewProps<C extends RpcConnection<AnyForm>> = FormViewProps<
  C
> & {
  MuiSubmitButtonProps?: MuiButtonProps;
  MuiResetButtonProps?: MuiButtonProps;
};

export function MuiFormView<C extends RpcConnection<AnyForm>>(
  props: MuiFormViewProps<C>
): ReactElement {
  return (
    <FormView {...props}>
      {({ input, form }) => (
        <Grid container direction={"column"} spacing={2}>
          <Grid item>{input}</Grid>
          <Grid item>
            <MuiGrid spacing={2} justify={"flex-end"}>
              <MuiSubmitButton
                ButtonProps={{ variant: "contained" }}
                {...mergeProps(props.MuiSubmitButtonProps, {
                  onClick: () => form.submit(),
                })}
              />
              <MuiResetButton
                ButtonProps={{ variant: "contained" }}
                {...mergeProps(props.MuiResetButtonProps, {
                  onClick: () => form.reset(),
                })}
              />
            </MuiGrid>
          </Grid>
        </Grid>
      )}
    </FormView>
  );
}
