import { MuiForm, MuiFormProps } from "@dabsi/browser/mui/components/MuiForm";
import { Override } from "@dabsi/common/typings2/Override";
import { PartialKeys } from "@dabsi/common/typings2/PartialUndefinedKeys";
import { SystemView } from "@dabsi/system/core/view/SystemView";
import { AnyForm } from "@dabsi/typerpc2/form/rpc";
import { FormView, FormViewProps } from "@dabsi/typerpc2/form/view";
import { mergeProps } from "@dabsi/view/react/merging/mergeProps";
import { ButtonProps } from "@material-ui/core";
import React, { ReactElement } from "react";

export type MuiFormViewProps<T extends AnyForm> = Override<
  PartialKeys<FormViewProps<T>, "children">,
  {
    disableResetButton?: boolean;
    // noDisableButtons?: boolean
    MuiFormProps?: Omit<MuiFormProps, "children">;
    variant?: "save" | "submit";

    renderHeader?(view: FormView<T>): React.ReactElement | undefined;
  }
>;

export const MuiFormView = <T extends AnyForm>({
  children,
  disableResetButton,
  MuiFormProps,
  variant = "submit",
  renderHeader,
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
            header={renderHeader?.(view)}
            {...mergeProps(MuiFormProps, {
              submitButtonProps: {
                $merge: { disabled: { $override: disabled } },
              },
              resetButtonProps: {
                $merge: { disabled: { $override: disabled } },
              },
              submitTitle: isVariant.save && lang`SAVE_CHANGES`,
              onSubmit: () => {
                view.submit();
              },
              onReset: disableResetButton
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
              <SystemView {...inputProps} />
            )}
          </MuiForm>
        );
      }}
    </FormView>
  );
};
