import TextField, { TextFieldProps } from "@material-ui/core/TextField";
import {
  FilledTextFieldProps,
  OutlinedTextFieldProps,
  StandardTextFieldProps,
} from "@material-ui/core/TextField/TextField";
import * as React from "react";
import { ReactNode } from "react";
import { useEmitter } from "../../../../react/reactor/useEmitter";
import { mergeProps } from "../../../../react/utils/mergeProps";
import { TextInput } from "../../../../typerpc/input/text-input/TextInput";
import {
  TextInputView,
  TextInputViewProps,
} from "../../../../typerpc/input/text-input/TextInputView";

import { RpcConnection } from "../../../../typerpc/Rpc";
import { FormViewEvent } from "../../../../typerpc/widget/form/FormView";

export type MuiTextInputViewProps<
  C extends RpcConnection<TextInput>
> = TextInputViewProps<C> & {
  title?: ReactNode;
  TextFieldProps?: Partial<TextFieldProps>;
};

export function MuiTextInputView<C extends RpcConnection<TextInput>>({
  title,
  TextFieldProps,
  ...props
}: MuiTextInputViewProps<C>) {
  const emit = useEmitter();

  return (
    <TextInputView
      {...props}
      children={view => (
        <TextField
          fullWidth
          {...mergeProps(TextFieldProps, {
            onBlur: () => view.validate(),
            onChange: event => view.setText(event.target.value),
            onKeyPress: event => {
              if (event.key === "Enter") {
                emit(new FormViewEvent("SUBMIT"));
              }
            },
          })}
          label={title}
          error={view.error != null}
          helperText={view.renderError()}
          value={view.text || ""}
        />
      )}
    />
  );
}

/*

  Key


 */
