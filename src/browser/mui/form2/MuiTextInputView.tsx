import TextField, {TextFieldProps} from "@material-ui/core/TextField";
import React, {ReactNode} from "react";
import {mergeProps} from "../../../react/utils/mergeProps";
import {InputType} from "../../../rpc/input/Input";
import {TextInput} from "../../../rpc/input/TextInput";
import {TextInputView, TextInputViewProps} from "../../../rpc/input/TextInputView";

export type MuiTextInputViewProps<Error> =
    Omit<TextInputViewProps<Error>, "children"> & {
    label?: ReactNode
    TextFieldProps?: Partial<TextFieldProps>;
    renderError?(error: InputType<TextInput<Error>>['Error']): ReactNode;

};

export function MuiTextInputView<Error>(
    {label, TextFieldProps, ...props}: MuiTextInputViewProps<Error>
) {
    return <TextInputView {...props}>{field =>
        <TextField
            fullWidth
            {...mergeProps(TextFieldProps, {
                onBlur: () => field.emit(),
                onChange: event => field.setText(event.target.value)
            })}
            label={label}
            error={field.error != null}
            helperText={field.renderError()}
            value={field.getText()}
        />
    }</TextInputView>
}
