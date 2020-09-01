import {ReactElement, ReactNode} from "react";
import {Timeout} from "../../common/async/Timeout";
import {Lang} from "../../localization/Lang";
import {ViewState} from "../../react/view/ViewState";
import {WidgetType} from "../Widget";
import {InputType} from "./Input";
import {InputError} from "./InputError";
import {InputView, InputViewProps} from "./InputView";
import {TextInput} from "./TextInput";


export type TextInputViewProps<Error> = InputViewProps<TextInput<Error>>;


export class TextInputView<Error>
    extends InputView<TextInput<Error>, TextInputViewProps<Error> & {
        children(field: TextInputView<Error>): ReactElement;
    }> {

    protected isValidText = false;

    @ViewState() protected text: string;

    protected updateElement(element: WidgetType<TextInput<Error>>["Element"] | undefined) {
        this.setError(undefined);
        this.text = element || "";
    }

    async getValidData(): Promise<InputType<TextInput<Error>>["Data"]> {
        this.debounceId++;
        if (!this.isValidText) {
            await this.emit();
            if (this.error != null)
                throw new InputError(this.error);
        }
        return this.text;
    }

    protected debounceId = 0;

    isChanged = false;

    async emit() {
        this.debounceId++;
        if (!this.isChanged)
            return;
        this.setError(await this.props.connection.check(this.text))

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

    protected renderErrorDefault(error: InputType<TextInput<Error>>["Error"]): ReactNode {
        switch (error) {
            case "INVALID_PATTERN":
                return Lang`INVALID_PATTERN`;

            case "TOO_LONG":
                return Lang`TOO_LONG_${"max"}`({
                    max: this.props.connection.props?.maxLength
                });
            case "TOO_SHORT":
                return Lang`TOO_SHORT_${"min"}`({
                    min: this.props.connection.props?.maxLength
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
