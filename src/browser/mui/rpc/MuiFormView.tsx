import Button, { ButtonProps } from "@material-ui/core/Button";
import * as React from "react";
import { ReactElement, ReactNode } from "react";
import { PartialKeys } from "../../../common/typings2/PartialUndefinedKeys";
import { Lang } from "../../../lang/Lang";
import { Hook } from "../../../react/Hook";
import { useEmitter } from "../../../react/reactor/useEmitter";

import { mergeProps } from "../../../react/utils/mergeProps";
import { SystemView } from "../../../system/view/SystemView";
import { RpcConnection } from "../../../typerpc/Rpc";
import { AnyForm } from "../../../typerpc/widget/form/Form";
import {
  FormView,
  FormViewEvent,
  FormViewProps,
} from "../../../typerpc/widget/form/FormView";
import { MuiGrid } from "../components/MuiGrid";
import { MuiThemeProvider } from "../MuiSystem";
import { MuiFormViewTheme } from "./MuiFormViewTheme";

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
  const { submitTitle = Lang`SUBMIT`, resetTitle = Lang`RESET` } = props;

  return (
    <MuiThemeProvider theme={MuiFormViewTheme}>
      <FormView
        {...props}
        renderInput={props.renderInput || SystemView}
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
