import {Awaitable} from "../common/typings";
import {AfterMountView, View} from "../react/view/View";
import {ViewState} from "../react/view/ViewState";
import {AnyFormField, FormFieldDataOf, FormFieldElementOf} from "./FormField";
import {FormFieldView, FormFieldViewProps} from "./FormFieldView";

export abstract class AbstractFormFieldView<T extends AnyFormField,
    P extends FormFieldViewProps<T>>
    extends View<P>
    implements FormFieldView<T> {

    abstract getData(): Awaitable<FormFieldDataOf<T>>;

    @ViewState() error: any;

    @ViewState() isLoading = false;

    reject(error: any) {
        this.error = error;
    }

    abstract setElement(element: FormFieldElementOf<T>): void;

    abstract createEmptyElement(): FormFieldElementOf<T>;

    @AfterMountView()
    async reset() {
        if (this.props.noDefault) {
            this.setElement(this.createEmptyElement());
            return;
        }

        this.isLoading = true;
        this.setElement(await this.props.connection.getElement()
            ?? this.createEmptyElement());
        this.isLoading = false;
    }

}
