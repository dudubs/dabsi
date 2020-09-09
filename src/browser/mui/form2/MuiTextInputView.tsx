import TextField, {TextFieldProps} from "@material-ui/core/TextField";
import React, {ReactNode} from "react";
import {mergeProps} from "../../../react/utils/mergeProps";
import {TextInput} from "../../../typerpc/input/TextInput";
import {TextInputView, TextInputViewProps} from "../../../typerpc/input/TextInputView";
import {RpcConnection} from "../../../typerpc/Rpc";

export type MuiTextInputViewProps<C extends RpcConnection<TextInput>> =
    TextInputViewProps<C> & {
    label?: ReactNode
    TextFieldProps?: Partial<TextFieldProps>;

};
export function MuiTextInputView<C extends RpcConnection<TextInput>>(
    {label, TextFieldProps, ...props}: MuiTextInputViewProps<C>
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

