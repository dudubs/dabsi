import Grid from "@material-ui/core/Grid";
import * as React from "react";
import { ReactElement } from "react";

import { mergeProps } from "../../../react/utils/mergeProps";
import { RpcConnection } from "../../../typerpc/Rpc";
import { AnyForm } from "../../../typerpc/widget/form/Form";
import {
  FormView,
  FormViewEvent,
  FormViewProps,
} from "../../../typerpc/widget/form/FormView";

import {
  MuiButton,
  MuiButtonProps,
  MuiResetButton,
  MuiSubmitButton,
} from "../components/MuiButton";
import { MuiGrid } from "../components/MuiGrid";

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
      {({ input }) => (
        <Grid container direction={"column"} spacing={2}>
          <Grid item>{input}</Grid>
          <Grid item>
            <MuiGrid spacing={2} justify={"flex-end"}>
              <MuiSubmitButton
                {...mergeProps(props.MuiSubmitButtonProps, {
                  emitOnClick: emit => {
                    emit(new FormViewEvent("SUBMIT"));
                  },
                })}
              />
              <MuiResetButton
                {...mergeProps(props.MuiResetButtonProps, {
                  emitOnClick: emit => {
                    emit(new FormViewEvent("RESET"));
                  },
                })}
              />
            </MuiGrid>
          </Grid>
        </Grid>
      )}
    </FormView>
  );
}

/*


  <ReactorProvider>

    <ReactorListener toEvent= onEvent= />


  </ReactorProvider>

 */
