import TextField, {TextFieldProps} from "@material-ui/core/TextField";
import React, {ReactElement, ReactNode} from "react";
import {Lang} from "../../../localization/Lang";
import {Debounce} from "../../../react/utils/hooks/useDebounce";
import {mergeProps} from "../../../react/utils/mergeProps";
import {AfterMountView} from "../../../react/view/View";
import {ViewState} from "../../../react/view/ViewState";
import {AbstractFormFieldView} from "../../../rpc/AbstractFormFieldView";
import {FormTextField} from "../../../rpc/fields/FormTextField";
import {FormFieldType} from "../../../rpc/FormField";
import {FormFieldViewError, FormFieldViewProps} from "../../../rpc/FormFieldView";

export type MuiFormTextFieldViewProps<Error> =
    FormFieldViewProps<FormTextField<Error>> & {
    label?: ReactNode
    TextFieldProps?: Partial<TextFieldProps>;
    renderError?(error: FormFieldType<FormTextField<Error>>['Error']): ReactNode;

};


export class MuiFormTextFieldView<Error>
    extends AbstractFormFieldView<FormTextField<Error>,
        MuiFormTextFieldViewProps<Error>> {

    @ViewState() text: string;

    textDebounce = Debounce();

    async getCheckedData(): Promise<FormFieldType<FormTextField<Error>>['Data']> {
        this.textDebounce.resolve();
        if (this.error)
            throw new FormFieldViewError(this.error);
        return this.text;
    }

    setElement(element: FormFieldType<FormTextField<Error>>['Element'] | null) {
        this.text = element || "";
    }

    renderTextError(error: FormFieldType<FormTextField<never>>['Error']): ReactElement {
        switch (error) {
            case "INVALID_PATTERN":
                return Lang`INVALID_PATTERN`;

            case "TOO_LONG":
                return Lang`TOO_LONG_${"max"}`({
                    max: this.props.connection.props.options?.maxLength
                });
            case "TOO_SHORT":
                return Lang`TOO_SHORT_${"min"}`({
                    min: this.props.connection.props.options?.maxLength
                });
        }
    }

    renderError(error: FormFieldType<FormTextField<Error>>["Error"]): ReactNode {

        return this.props.renderError?.(error) ?? this.renderTextError(error as any) ??
        typeof error === "string" ? error :
            JSON.stringify({error})
    }


    renderView(): React.ReactNode {
        return <TextField
            {...mergeProps(this.props.TextFieldProps, {
                onBlur: () => this.textDebounce.resolve(),
                onChange: async event => {
                    this.text = event.target.value;
                    this.error = null;
                    await this.textDebounce.wait();

                    const error = await this.props.connection.check(this.text);
                    // TODO: clientCheck
                    if (error !== undefined) {
                        this.error = error;
                    } else {
                        this.props.onChange?.(this.text);
                    }
                }
            })}
            label={this.props.label}
            error={!!this.error}
            helperText={this.error && this.renderError(this.error)}
            value={this.text || ""}
        />;
    }

}
