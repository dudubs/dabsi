import {ReactElement, ReactNode} from "react";
import {Timeout} from "../../common/async/Timeout";
import {Lang} from "../../localization/Lang";
import {ViewState} from "../../react/view/ViewState";
import {RpcConnection} from "../Rpc";
import {WidgetElement, WidgetType} from "../widget/Widget";
import {InputData, InputError, InputType} from "./Input";
import {InputViewError} from "./InputViewError";
import {InputView, InputViewProps} from "./InputView";
import {loadAndCheckString} from "./StringSchema";
import {TextInput} from "./TextInput";


export type TextInputViewProps<C extends RpcConnection<TextInput>> = InputViewProps<C> & {
    checkOnChange?: boolean
};


export class TextInputView<C extends RpcConnection<TextInput>>
    extends InputView<C, TextInputViewProps<C> & {
        children(field: TextInputView<C>): ReactElement;
    }> {

    protected isValidText = false;

    @ViewState() protected text: string;

    protected updateElement(element: WidgetElement<TextInput> | undefined) {
        this.setError(undefined);
        this.text = element?.default || "";
    }

    async getValidData(): Promise<InputData<TextInput>> {
        this.debounceId++;
        if (!this.isValidText) {
            await this.emit();
            if (this.error != null)
                throw new InputViewError(this.error);
        }
        return this.text;
    }

    protected debounceId = 0;

    isChanged = false;

    async emit() {
        this.debounceId++;
        if (!this.isChanged)
            return;

        const result = loadAndCheckString(this.text, this.props.connection.props);
        if ('error' in result) {
            this.setError(result.error);
            return;
        }
        this.text = result.value;

        if (this.props.checkOnChange) {
            const error = await this.props.connection.check(this.text);
            if (error) {
                this.setError(error);
                return;
            }

        }

        // this.setError(await this.props.connection.check(this.text))

        if (this.error != null) {
            this.isValidText = true;
            this.isChanged = false;
            this.props.onChange?.(this.text);
        }
    }

    async setText(text: string) {
        if (this.text === text)
            return;
        this.isChanged = true;
        const id = ++this.debounceId;
        this.text = text;
        this.isValidText = false;
        this._error = undefined;
        await Timeout(300);
        if (id !== this.debounceId)
            return;

        await this.emit();
    }

    protected renderErrorDefault(error: InputError<TextInput>): ReactNode {
        switch (error) {
            case "INVALID_PATTERN":
                return Lang`INVALID_PATTERN`;

            case "REQUIRED":
                return Lang`REQUIRED`;

            case "TOO_LONG":
                return Lang`REQUIRED_MAXIMUM_${"max"}_CHARACTERS`({
                    max: this.element?.maxLength
                });
            case "TOO_SHORT":
                return Lang`REQUIRED_MINIMUM_${"min"}_CHARACTERS`({
                    min: this.element?.minLength
                });
        }
    }

    getText(): string {
        return this.text;
    }

    renderView(): React.ReactNode {
        return this.props.children(this)
    }

}
