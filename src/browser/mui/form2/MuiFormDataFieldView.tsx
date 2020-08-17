import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import React from "react";
import {Awaitable} from "../../../common/typings";
import {ViewState} from "../../../react/view/ViewState";
import {AbstractFormFieldView} from "../../../rpc/AbstractFormFieldView";
import {FormDataField} from "../../../rpc/fields/FormDataField";
import {FormDataFieldViewProps} from "../../../rpc/fields/FormDataFieldView";
import {FormFieldDataOf, FormFieldElementOf} from "../../../rpc/FormField";

export type MuiFormDataFieldViewProps<T> = FormDataFieldViewProps<T> & {};

export class MuiFormDataFieldView<T>
    extends AbstractFormFieldView<FormDataField<T>, MuiFormDataFieldViewProps<T>> {

    @ViewState() options: ({ label: string, $key: string })[] = [];

    @ViewState() isLoading = false;

    @ViewState() isLoaded = false;

    @ViewState() selected?: { $key: string, label: string };

    getData(): Awaitable<FormFieldDataOf<FormDataField<T>>> {
        return this.selected?.$key ?? null;
    }

    setElement(element: FormFieldElementOf<FormDataField<T>>) {
        this.selected = element.default;
        this.options = element.options;
    }

    createEmptyElement(): FormFieldElementOf<FormDataField<T>> {
        return {options: []}
    }

    renderView(): React.ReactNode {
        return <Select>
            {this.selected && <MenuItem value={this.selected.$key}>
                {this.selected.label}
            </MenuItem>}
            {this.options.map(option => {
                if (option.$key !== this.selected?.$key)
                    return <MenuItem value={option.$key} key={option.$key}>{
                        option.label
                    }</MenuItem>
            })}
        </Select>;
    }
}


/*


<MuiFormDataField.Select

    connection={AppService.MyDataField}

    default={}

 />


    Multiplexer(1000)(
        MyService
    )










 */

