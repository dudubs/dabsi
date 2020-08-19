import React, {ReactElement} from "react";
import {Awaitable} from "../../common/typings";
import {Renderer} from "../../react/renderer";
import {AbstractFormFieldView} from "../AbstractFormFieldView";
import {AnyFormField, FormFieldType} from "../FormField";
import {FormFieldCheck} from "../FormFieldCheck";
import {FormFieldView, FormFieldViewProps} from "../FormFieldView";

export type FormFieldCheckViewProps<Error, Target extends AnyFormField> =
    FormFieldViewProps<FormFieldCheck<Error, Target>> & {

    renderCheckError(error: Error): ReactElement;

    renderErrorLayout?(
        props: { error: ReactElement, target: ReactElement }
    ): ReactElement;
    render: Renderer<FormFieldViewProps<Target>>;
}

export class FormFieldCheckView<Error, Target extends AnyFormField>
    extends AbstractFormFieldView<FormFieldCheck<Error, Target>,
        FormFieldCheckViewProps<Error, Target>> {

    target: FormFieldView<Target> | null = null;

    element;

    getCheckedData(): Awaitable<FormFieldType<FormFieldCheck<Error, Target>>["Data"]> {
        return this.target!.getCheckedData();
    }


    rejectError(error: FormFieldType<FormFieldCheck<Error, Target>>["Error"] | null) {
        if (error?.by === "target") {
            this.target!.rejectError(error.error);
        }
        super.rejectError(error);
    }


    renderView(): React.ReactNode {
        const target = this.props.render({
            noDefault: this.props.noDefault,
            connection: this.props.connection.remote,
            fieldRef: target => {
                this.target = target;
            },
            onChange: async data => {
                this.error = null;
                const error = await this.props.connection.check(data);
                if (error) {
                    this.rejectError(error);
                }
            }
        });
        if (this.error?.by === "host") {
            const error = this.props.renderCheckError(this.error.error);
            return this.props.renderErrorLayout ?
                this.props.renderErrorLayout?.({target, error}) :
                <>{error}{target}</>
        }
        return target;
    }

    setElement(element: FormFieldType<FormFieldCheck<Error, Target>>["Element"] | null): void {
        this.target!.setElement(element);
    }

}
