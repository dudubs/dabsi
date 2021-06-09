import { WeakId } from "@dabsi/common/WeakId";
import { FormView } from "@dabsi/typerpc2/form/view";
import { InputWithAnyError } from "@dabsi/typerpc2/input/InputWithCustomError";
import { TextInput } from "@dabsi/typerpc2/text-input/rpc";
import {
  TextInputView,
  TextInputViewProps,
} from "@dabsi/typerpc2/text-input/view";
import LangKey from "@dabsi/view/lang/LangKey";
import { mergeProps } from "@dabsi/view/react/merging/mergeProps";
import { ReactContext } from "@dabsi/view/react/ReactContext";
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

export function MuiTextInputView<T extends InputWithAnyError<TextInput>>({
  title,
  TextFieldProps,
  disableLangKey,
  ...props
}: MuiTextInputViewProps<T>) {
  const emit = useEmitter();
  const isChanged = useRef(false);

  const c = ReactContext.use({ form: FormView });

  return (
    <TextInputView {...props}>
      {view => (
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
              console.log({ tiId: WeakId(view) });

              isChanged.current = true;
              return view.setText(event.target.value);
            },
            onKeyPress: event => {
              if (event.key === "Enter") {
                // TODO c.form?.nextAfter(thisview)
                c.form?.submit();
              }
            },
          })}
          label={
            title ||
            (disableLangKey
              ? undefined
              : props.childKey && (
                  <LangKey token={props.childKey}>{title}</LangKey>
                ))
          }
          error={view.error != null}
          helperText={view.renderError()}
          value={view.text || ""}
        />
      )}
    </TextInputView>
  );
}

/*

  Key


 */
