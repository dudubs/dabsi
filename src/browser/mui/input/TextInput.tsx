import LangKey from "@dabsi/lang/LangKey";
import { TextInput } from "@dabsi/old-typerpc/input/text-input/TextInput";
import {
  TextInputView,
  TextInputViewProps,
} from "@dabsi/old-typerpc/input/text-input/TextInputView";
import { RpcConnection } from "@dabsi/old-typerpc/Rpc";
import { FormViewEvent } from "@dabsi/old-typerpc/widget/form/view";
import { mergeProps } from "@dabsi/view/react/merging/mergeProps";
import { useEmitter } from "@dabsi/view/react/reactor/useEmitter";
import TextField, { TextFieldProps } from "@material-ui/core/TextField";
import React, { ReactNode, useRef } from "react";

export type MuiTextInputViewProps<
  C extends RpcConnection<TextInput>
> = TextInputViewProps<C> & {
  title?: ReactNode;
  disableLangKey?: boolean;
  TextFieldProps?: Partial<TextFieldProps>;
};

export function MuiTextInputView<C extends RpcConnection<TextInput>>({
  title,
  TextFieldProps,
  disableLangKey,
  ...props
}: MuiTextInputViewProps<C>) {
  const emit = useEmitter();
  const isChanged = useRef(false);
  return (
    <TextInputView
      {...props}
      children={view => (
        <TextField
          fullWidth
          {...mergeProps(TextFieldProps, {
            onBlur: () => {
              if (isChanged.current) {
                isChanged.current = false;
                return view.validate();
              }
            },
            onChange(event) {
              isChanged.current = true;
              return view.setText(event.target.value);
            },
            onKeyPress: event => {
              if (event.key === "Enter") {
                emit(FormViewEvent, "submit");
              }
            },
          })}
          label={
            title ||
            (disableLangKey
              ? undefined
              : props.mapKey && <LangKey token={props.mapKey}>{title}</LangKey>)
          }
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
