import React, {ReactElement, ReactNode} from "react";
import {entries} from "../common/object/entries";
import {mapObjectToArray} from "../common/object/mapObjectToArray";
import {values} from "../common/object/values";
import {Renderer} from "../react/renderer";
import {AfterMountView, View} from "../react/view/View";
import {ViewState} from "../react/view/ViewState";
import {Form} from "./Form";
import {AnyFormField, AnyFormFields, FormError} from "./FormField";
import {FormFieldView, FormFieldViewProps} from "./FormFieldView";
import {RpcConnectionOf} from "./Rpc";

export type FormViewFieldProps<T extends AnyFormField, FieldProps> = Partial<FieldProps> & {
    render: Renderer<FormFieldViewProps<T> & { key: string }>
};

type RendererOrFieldProps<T extends AnyFormField, FieldProps> =
    Renderer<FormFieldViewProps<T>>
    | FormViewFieldProps<T, FieldProps>;

export type FormViewProps<F extends AnyFormFields, R, FieldProps> = {
    connection: RpcConnectionOf<Form<F, R>>;

    fields: {
        [K in keyof F]: RendererOrFieldProps<F[K], FieldProps>
    }

    noDefault?: boolean

    onSubmit?(result: R);

};

export class FormView<F extends AnyFormFields, R, FieldProps,
    P extends FormViewProps<F, R, FieldProps>> extends View<P> {

    @ViewState() error: any;

    protected _fields: Record<string, FormFieldView<any>> = {};

    get fields(): { [K in string & keyof F]?: FormFieldView<F[K]> } {
        return this._fields as any;
    }

    @AfterMountView()
    async reset() {
        if (this.props.noDefault) {
            for (let field of values(this._fields)) {
                field.reset();
            }
            return;
        }
        const element = await this.props.connection.getElement();
        for (const [key, field] of entries(this._fields)) {
            field.setElement(element[key]);
        }
    }

    async submit() {

        const data: any = {};
        let hasErrors = false;

        for (const [key, field] of entries(this._fields)) {
            try {
                data[key] = await field.getData();
            } catch (error) {
                if (error instanceof FormError) {
                    field.reject(error.reason);
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
            case "success":
                this.props.onSubmit?.(result.value);
                break;
            case "invalid":
                for (const [key, field] of entries(this._fields)) {
                    field.reject(result.reasons[key])
                }
                break;
            case "fail":
                this.error = result.reason;
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
