import {ReactNode} from "react";
import {ViewState} from "../../react/view/ViewState";
import {AnyInput, InputType} from "./Input";
import {InputView, InputViewProps} from "./InputView";
import {TextInput} from "./TextInput";

export type BaseInputViewProps<T extends AnyInput> =
    InputViewProps<T> & {

    renderError?(error: InputType<TextInput<Error>>['Error']): ReactNode;

};

export abstract class BaseInputView<T extends AnyInput, P extends BaseInputViewProps<T>>
    extends InputView<T, P> {

    @ViewState() error:
        InputType<T>['Error'] | undefined = this.props.error;

    abstract setBaseElement(element: InputType<T>['Element'] | null): void;

    setElement(element: InputType<T>["Element"] | null): void {
        this.error = null;
        return this.setBaseElement(element);
    }

    setError(error: InputType<T>["Error"] | null) {
        this.error = error;
    }

    renderBaseError?(error: InputType<T>['Error']): ReactNode ;

    renderError(): ReactNode {
        const error = this.error;
        if (error == null)
            return

        const element = this.props.renderError?.(error);
        if (element)
            return element;

        const baseError = this.renderBaseError?.(error);
        if (baseError != null)
            return baseError;

        return typeof error === "string" ? error :
            JSON.stringify({error})
    }
}
