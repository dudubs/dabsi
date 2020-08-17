import Grid, { GridProps } from "@material-ui/core/Grid";
import TextField, {TextFieldProps} from "@material-ui/core/TextField";
import React, {ReactNode} from "react";
import {Debounce} from "../../../react/utils/hooks/useDebounce";
import {mergeProps} from "../../../react/utils/mergeProps";
import {ViewState} from "../../../react/view/ViewState";
import {AbstractFormFieldView} from "../../../rpc/AbstractFormFieldView";
import {FormTextField} from "../../../rpc/fields/FormTextField";
import {FormError, FormFieldDataOf, FormFieldElementOf} from "../../../rpc/FormField";
import {FormTextFieldViewProps} from "../../../rpc/FormTextFieldView";

export type MuiFormTextFieldViewProps = FormTextFieldViewProps & {
    label?: ReactNode
    TextFieldProps?: Partial<TextFieldProps>;
    // GridProps?: Partial<GridProps>;
};


export class MuiFormTextFieldView
    extends AbstractFormFieldView<FormTextField, MuiFormTextFieldViewProps> {

    @ViewState() text: string;

    textDebounce = Debounce();

    async getData(): Promise<FormFieldDataOf<FormTextField>> {
        this.textDebounce.resolve();
        if (this.error)
            throw new FormError(this.error);
        return this.text;
    }

    createEmptyElement(): FormFieldElementOf<FormTextField> {
        return ""
    }

    setElement(element: FormFieldElementOf<FormTextField>) {
        this.text = element || "";
    }

    renderView() : React.ReactNode {
        return <TextField
            {...mergeProps(this.props.TextFieldProps, {
                onBlur: () => this.textDebounce.resolve(),
                onChange: async event => {
                    this.text = event.target.value;
                    this.error = null;
                    await this.textDebounce.wait();

                    const checkResult = await this.props.connection.check(this.text);
                    console.log({checkResult});
                    if (checkResult.type === "invalid") {
                        this.reject(checkResult.reason)
                    } else {
                        this.props.onChange?.(this.text)
                    }
                }
            })}
            label={this.props.label}
            disabled={this.isLoading}
            error={!!this.error}
            helperText={typeof this.error === "string" ? this.error : undefined}
            value={this.text || ""}
        />;
    }

}
