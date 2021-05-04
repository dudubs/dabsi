import { FormViewEvent } from "@dabsi/typerpc2/form/view";
import { TextInput } from "@dabsi/typerpc2/text-input/rpc";
import {
  TextInputView,
  TextInputViewProps,
} from "@dabsi/typerpc2/text-input/view";
import LangKey from "@dabsi/view/lang/LangKey";

import { mergeProps } from "@dabsi/view/react/merging/mergeProps";
import { useEmitter } from "@dabsi/view/react/reactor/useEmitter";
import TextField, { TextFieldProps } from "@material-ui/core/TextField";
import React, { ReactNode, useRef } from "react";

export type MuiTextInputViewProps<
  T extends TextInput
> = TextInputViewProps<T> & {
  title?: ReactNode;
  disableLangKey?: boolean;
  TextFieldProps?: Partial<TextFieldProps>;
};

export function MuiTextInputView<T extends TextInput>({
  title,
  TextFieldProps,
  disableLangKey,
  ...props
}: MuiTextInputViewProps<T>) {
  const emit = useEmitter();
  const isChanged = useRef(false);

  return (
    <TextInputView {...props}>
      {view => {
        console.log({ view });

        return (
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
                : props.mapKey && (
                    <LangKey token={props.mapKey}>{title}</LangKey>
                  ))
            }
            error={view.error != null}
            helperText={view.renderError()}
            value={view.text || ""}
          />
        );
      }}
    </TextInputView>
  );
}

/*

  Key


 */
