import { MuiForm, MuiFormProps } from "@dabsi/browser/mui/form";
import { Override } from "@dabsi/common/typings2/Override";
import { PartialKeys } from "@dabsi/common/typings2/PartialUndefinedKeys";
import { AnyForm } from "@dabsi/typerpc2/form/rpc";
import { FormView, FormViewProps } from "@dabsi/typerpc2/form/view";
import { mergeProps } from "@dabsi/view/react/merging/mergeProps";
import React, { ReactElement } from "react";

export type MuiFormViewProps<T extends AnyForm> = Override<
  PartialKeys<FormViewProps<T>, "children">,
  {
    disableResetButton?: boolean;
    // noDisableButtons?: boolean
    MuiFormProps?: Omit<MuiFormProps, "children">;
    variant?: "save" | "submit";
  }
>;

export const MuiFormView = <T extends AnyForm>({
  children,
  disableResetButton,
  MuiFormProps,
  variant = "submit",
  ...FormViewProps
}: MuiFormViewProps<T>): ReactElement => {
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
          onInputValue: () => {
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
            {
              children ? children(inputProps, view) : null
              // <SystemView {...(inputProps as InputViewProps<any>)} />
            }
          </MuiForm>
        );
      }}
    </FormView>
  );
};
