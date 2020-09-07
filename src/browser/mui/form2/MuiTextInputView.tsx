import TextField, {TextFieldProps} from "@material-ui/core/TextField";
import React, {ReactNode} from "react";
import {mergeProps} from "../../../react/utils/mergeProps";
import {AnyInput, Input, InputType} from "../../../rpc/input/Input";
import {TextInput} from "../../../rpc/input/TextInput";
import {TextInputView, TextInputViewProps} from "../../../rpc/input/TextInputView";
import {RpcConnection} from "../../../rpc/Rpc";

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

