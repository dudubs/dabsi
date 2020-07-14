import TextField, {StandardTextFieldProps, TextFieldProps} from "@material-ui/core/TextField";
import React, {ReactElement} from "react";
import {AbstractTextField, AbstractTextFieldProps} from "../../../../common/form/AbstractTextField";
import {mergeProps} from "../../../react/utils/mergeProps";


export type MuiTextFieldProps =
    AbstractTextFieldProps & {
    TextFieldProps?: Partial<TextFieldProps>;

};

export class MuiTextField
    extends AbstractTextField<MuiTextFieldProps> {

    input?: HTMLInputElement;

    focus(): void {
        this.input?.focus({preventScroll: true});
    }

    renderInput(): ReactElement {


        return <TextField
            fullWidth
            {...mergeProps(this.props.TextFieldProps as StandardTextFieldProps, {
                onBlur: () =>
                    this.onBlur(),
                onFocus: () =>
                    this.onFocus(),
                onChange: event =>
                    this.onChangeText(event.target.value),
                onKeyPress: event => {
                    if (event.key === "Enter") {
                        return this.onChange(this.text);
                    }
                }
            })}
            label={this.props.title}
            error={!!this.error}
            helperText={this.error}
            required={this.props.required}
            value={this.text}
        />
    }
}
