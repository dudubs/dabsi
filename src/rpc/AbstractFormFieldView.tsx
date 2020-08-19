import {ReactElement, ReactNode} from "react";
import {Awaitable} from "../common/typings";
import {AfterMountView, BeforeUnmountView, View} from "../react/view/View";
import {ViewState} from "../react/view/ViewState";
import {AnyFormField, FormFieldType} from "./FormField";
import {FormFieldView, FormFieldViewProps} from "./FormFieldView";

export abstract class AbstractFormFieldView<T extends AnyFormField,
    P extends FormFieldViewProps<T>>
    extends View<P>
    implements FormFieldView<T> {

    abstract getCheckedData(): Awaitable<FormFieldType<T>['Data']>;

    @ViewState() error: FormFieldType<T>['Error'] | null = null;

    @ViewState() isLoadingElement = false;

    rejectError(error: FormFieldType<T>['Error'] | null) {
        this.error = error;
    }

    abstract setElement(element: FormFieldType<T>['Element'] | null): void;

    @AfterMountView()
    mountField() {
        this.props.fieldRef?.(this);
    }

    @BeforeUnmountView()
    unmountField() {
        this.props.fieldRef?.(null);
    }


    @AfterMountView()
    async reset() {
        if (this.props.noDefault) {
            this.setElement(null);
            return;
        }

        this.isLoadingElement = true;
        this.setElement(await this.props.connection.getElement() ?? null);
        this.isLoadingElement = false;
    }

}
