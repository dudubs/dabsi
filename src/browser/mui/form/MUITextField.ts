import TextField, {TextFieldProps as _TextFieldProps} from "@material-ui/core/TextField";
import {createElement, ReactElement} from "react";
import {AbstractTextField, TextFieldProps} from "../../../../common/form/AbstractTextField";
import {mergeCallback} from "../../../react/utils/mergeCallback";
import {mergeRef, Ref} from "../../../react/utils/Ref";


export type MUITextFieldProps = TextFieldProps & {
    TextFieldProps?: Partial<_TextFieldProps>;
};

export class MUITextField
    extends AbstractTextField<MUITextFieldProps> {

    input?: HTMLInputElement;

    focus(): void {
        this.input?.focus({preventScroll: true});
    }

    renderInput(): ReactElement {
        const {TextFieldProps} = this.props;
        return createElement(TextField, {
            fullWidth: true,
            ...(TextFieldProps as {}),
            label: this.props.title,
            error: !!this.error,

            helperText: this.error,

            required: this.props.required ?? false,

            value: this.text,

            onBlur: mergeCallback(TextFieldProps?.onBlur, () => this.onBlur()),

            onFocus: mergeCallback(TextFieldProps?.onFocus, () => this.onFocus()),

            onChange: mergeCallback(TextFieldProps?.onChange,
                event => this.onChangeText(event.target.value)),

            inputRef: mergeRef(TextFieldProps?.inputRef,
                Ref(this, "input"))
        });
    }
}

