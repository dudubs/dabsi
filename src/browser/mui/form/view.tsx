import { MuiForm, MuiFormProps } from "@dabsi/browser/mui/form";
import { Override } from "@dabsi/common/typings2/Override";
import { PartialKeys } from "@dabsi/common/typings2/PartialUndefinedKeys";
import { SystemView } from "@dabsi/system/core/view/SystemView";
import { InputViewProps } from "@dabsi/typerpc/input/InputView";
import { RpcConnection } from "@dabsi/typerpc/Rpc";
import { AnyForm } from "@dabsi/typerpc/widget/form/rpc";
import { FormView, FormViewProps } from "@dabsi/typerpc/widget/form/view";
import { mergeProps } from "@dabsi/view/react/merging/mergeProps";
import React, { ReactElement } from "react";

export type MuiFormViewProps<C extends RpcConnection<AnyForm>> = Override<
  PartialKeys<FormViewProps<C>, "children">,
  {
    disableResetButton?: boolean;
    // noDisableButtons?: boolean
    MuiFormProps?: Omit<MuiFormProps, "children">;
    variant?: "save" | "submit";
  }
>;

export const MuiFormView = <C extends RpcConnection<AnyForm>>({
  children,
  disableResetButton,
  MuiFormProps,
  variant = "submit",
  ...FormViewProps
}: MuiFormViewProps<C>): ReactElement => {
  // mixing

  const isVariant: { [K in typeof variant]?: true } = {
    [variant]: true,
  };

  if (disableResetButton === undefined) {
    if (isVariant.save) {
      disableResetButton = true;
    }
  }

  const defaultDisabled = !isVariant.submit;
  const [disabled, setDisabled] = React.useState(defaultDisabled);

  return (
    <FormView
      {...mergeProps(FormViewProps, {
        onSubmit: () => {
          setDisabled(defaultDisabled);
        },
      })}
    >
      {(inputProps, view) => {
        inputProps = mergeProps(inputProps, {
          onChange: () => {
            setDisabled(false);
          },
        });
        return (
          <MuiForm
            {...mergeProps(MuiFormProps, {
              submitButtonProps: {
                $merge: { disabled: { $override: disabled } },
              },
              resetButtonProps: {
                $merge: { disabled: { $override: disabled } },
              },
              submitTitle: isVariant.save && lang`SAVE_CHANGES`,
              onSubmitClick: () => {
                view.submit();
              },
              onResetClick: disableResetButton
                ? undefined
                : () => {
                    view.reset();
                    setDisabled(defaultDisabled);
                  },
            })}
          >
            {children ? (
              children(inputProps, view)
            ) : (
              <SystemView {...(inputProps as InputViewProps<any>)} />
            )}
          </MuiForm>
        );
      }}
    </FormView>
  );
};
