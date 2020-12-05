import * as React from "react";
import { ReactElement, ReactNode } from "react";
import { PartialKeys } from "../../../common/typings2/PartialUndefinedKeys";
import { Hook } from "../../../react/Hook";
import { useEmitter } from "../../../react/reactor/useEmitter";

import { mergeProps } from "../../../react/utils/mergeProps";
import { SystemView } from "../../../system/core/common/SystemView";
import { RpcConnection } from "../../../typerpc/Rpc";
import { AnyForm } from "../../../typerpc/widget/form/Form";
import {
  FormView,
  FormViewEvent,
  FormViewProps,
} from "../../../typerpc/widget/form/FormView";

import {
  MuiButtonProps,
  MuiResetButton,
  MuiSubmitButton,
} from "../components/MuiButton";
import { MuiGrid } from "../components/MuiGrid";
import { MuiFormViewProvider } from "./MuiFormViewProvider";

export type MuiFormViewProps<C extends RpcConnection<AnyForm>> = PartialKeys<
  FormViewProps<C>,
  "input"
> & {
  submitMuiButtonProps?: MuiButtonProps;
  resetMuiButtonProps?: MuiButtonProps;
  disableResetButton?: boolean;
  submitTitle?: ReactNode;
};

export const MuiFormView = <C extends RpcConnection<AnyForm>>(
  props: MuiFormViewProps<C>
): ReactElement => {
  return (
    <MuiFormViewProvider>
      <FormView
        {...props}
        input={props.input || SystemView}
        children={({ input }) => (
          <MuiGrid direction={"column"} spacing={2}>
            {input}
            <MuiGrid key="buttons" spacing={2}>
              <Hook
                context={() => useEmitter()}
                children={emit => (
                  <MuiGrid spacing={1}>
                    <MuiSubmitButton
                      {...mergeProps(props.submitMuiButtonProps, {
                        title: { $default: props.submitTitle },
                        onClick: () => {
                          emit(FormViewEvent, "submit");
                        },
                      })}
                    />
                    {!props.disableResetButton && (
                      <MuiResetButton
                        {...mergeProps(props.resetMuiButtonProps, {
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
    </MuiFormViewProvider>
  );
};
