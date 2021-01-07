import MuiGrid from "@dabsi/browser/mui/components/MuiGrid";
import { MuiThemeProvider } from "@dabsi/browser/mui/MuiSystem";
import { MuiFormViewTheme } from "@dabsi/browser/mui/rpc/MuiFormViewTheme";
import { PartialKeys } from "@dabsi/common/typings2/PartialUndefinedKeys";
import { Hook } from "@dabsi/react/Hook";
import { useEmitter } from "@dabsi/react/reactor/useEmitter";
import { mergeProps } from "@dabsi/react/utils/mergeProps";
import SystemView from "@dabsi/system/core/view/SystemView";
import { RpcConnection } from "@dabsi/typerpc/Rpc";
import { AnyForm } from "@dabsi/typerpc/widget/form/Form";
import {
  FormView,
  FormViewEvent,
  FormViewProps,
} from "@dabsi/typerpc/widget/form/FormView";
import Button, { ButtonProps } from "@material-ui/core/Button";
import React, { ReactElement, ReactNode } from "react";

export type MuiFormViewProps<C extends RpcConnection<AnyForm>> = PartialKeys<
  FormViewProps<C>,
  "renderInput"
> & {
  submitButtonProps?: ButtonProps;
  resetButtonProps?: ButtonProps;

  disableResetButton?: boolean;
  submitTitle?: ReactNode;
  resetTitle?: ReactNode;
};

export const MuiFormView = <C extends RpcConnection<AnyForm>>(
  props: MuiFormViewProps<C>
): ReactElement => {
  const { submitTitle = lang`SUBMIT`, resetTitle = lang`RESET` } = props;

  return (
    <MuiThemeProvider theme={MuiFormViewTheme}>
      <FormView
        {...props}
        renderInput={props.renderInput || SystemView.render}
        children={({ input }) => (
          <MuiGrid direction={"column"} spacing={2}>
            {input}
            <MuiGrid key="buttons" spacing={2}>
              <Hook
                context={() => useEmitter()}
                children={emit => (
                  <MuiGrid spacing={1}>
                    <Button
                      children={submitTitle}
                      {...mergeProps(props.submitButtonProps, {
                        onClick: () => {
                          emit(FormViewEvent, "submit");
                        },
                      })}
                    />
                    {!props.disableResetButton && (
                      <Button
                        children={resetTitle}
                        {...mergeProps(props.resetButtonProps, {
                          onClick: () => {
                            emit(FormViewEvent, "reset");
                          },
                        })}
                      />
                    )}
                  </MuiGrid>
                )}
              />
            </MuiGrid>
          </MuiGrid>
        )}
      />
    </MuiThemeProvider>
  );
};
