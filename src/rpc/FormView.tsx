import React, {ReactElement, ReactNode} from "react";
import {entries} from "../common/object/entries";
import {mapObjectToArray} from "../common/object/mapObjectToArray";
import {values} from "../common/object/values";
import {Renderer} from "../react/renderer";
import {AfterMountView, View} from "../react/view/View";
import {ViewState} from "../react/view/ViewState";
import {Form, TForm, TFormArgs} from "./Form";
import {AnyFormField, AnyFormFields} from "./FormField";
import {FormFieldView, FormFieldViewError, FormFieldViewProps} from "./FormFieldView";
import {RpcConnectionType} from "./Rpc";

export type FormViewFieldProps<T extends AnyFormField, FieldProps> = Partial<FieldProps> & {
    render: Renderer<FormFieldViewProps<T> & { key: string }>
};

type RendererOrFieldProps<T extends AnyFormField, FieldProps> =
    Renderer<FormFieldViewProps<T>>
    | FormViewFieldProps<T, FieldProps>;

export type FormViewProps<T extends TForm, FieldProps> = {
    connection: RpcConnectionType<Form<T>>;

    fields: {
        [K in keyof T['Fields']]: RendererOrFieldProps<T['Fields'][K], FieldProps>
    }

    noDefault?: boolean

    onSubmit?(result: T['Result']);

};


export class FormView<Fields extends AnyFormFields, Result, FieldProps,
    P extends FormViewProps<TFormArgs<Fields, Result>, FieldProps>> extends View<P> {

    @ViewState() error: any;

    protected _fields: Record<string, FormFieldView<any> | null> = {};

    get fields(): { [K in string & keyof Fields]?: FormFieldView<Fields[K]> } {
        return this._fields as any;
    }

    @AfterMountView()
    async reset() {
        if (this.props.noDefault) {
            for (let field of values(this._fields)) {
                field?.reset();
            }
            return;
        }
        const element = await this.props.connection.getElement();
        for (const [key, field] of entries(this._fields)) {
            field?.setElement(element[key]);
        }
    }

    async submit() {

        const data: any = {};
        let hasErrors = false;

        for (const [key, field] of entries(this._fields)) {
            try {
                data[key] = await field?.getCheckedData();
            } catch (error) {
                if (error instanceof FormFieldViewError) {
                    hasErrors = true;
                    continue;
                }
                throw error;
            }
        }

        if (hasErrors)
            return;

        const result = await this.props.connection.submit(data);
        switch (result.type) {
            case "result":
                this.props.onSubmit?.(result.value);
                break;
            case "invalid":
                for (const [key, field] of entries(this._fields)) {
                    field?.rejectError(result.error[key])
                }
                break;
        }
    }

    renderFieldProps?(key: string, props: Partial<FieldProps>,
                      element: ReactElement): ReactNode;

    renderView(): React.ReactNode {
        return <>
            {mapObjectToArray(this.props.fields as Record<string,
                RendererOrFieldProps<any, FieldProps>>, (
                rendererOrFieldProps, key
            ) => {

                let renderer: Renderer<FormFieldViewProps<any> & { key }>;
                let fieldProps: Partial<FieldProps>;

                if (typeof rendererOrFieldProps === "function") {
                    renderer = rendererOrFieldProps;
                    fieldProps = {};
                } else {
                    renderer = rendererOrFieldProps.render;
                    fieldProps = rendererOrFieldProps;
                }


                const element = renderer({
                    key,
                    connection: this.props.connection.fields[key],
                    noDefault: true,
                    fieldRef: fieldView => {
                        this._fields[key] = fieldView;
                    }
                });

                return this.renderFieldProps ? this.renderFieldProps(key, fieldProps, element) : element;
            })}
        </>;
    }
}
