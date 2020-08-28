import {ReactElement, ReactNode} from "react";
import {Timeout} from "../../common/async/Timeout";
import {Lang} from "../../localization/Lang";
import {ViewState} from "../../react/view/ViewState";
import {BaseInputView, BaseInputViewProps} from "./BaseInputView";
import {InputType} from "./Input";
import {InputError} from "./InputError";
import {TextInput} from "./TextInput";


export type TextInputViewProps<Error> =
    BaseInputViewProps<TextInput<Error>> & {

    renderError?(error: InputType<TextInput<Error>>['Error']): ReactNode;

    children(field: TextInputView<Error>): ReactElement;
};


export class TextInputView<Error>
    extends BaseInputView<TextInput<Error>, TextInputViewProps<Error>> {

    @ViewState() protected text: string;

    protected isValidText = false;

    resetInput() {
        this.text = this.props.element || "";
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

    setBaseElement(element: InputType<TextInput<Error>>["Element"] | null): void {
        this.text = element || "";
    }

    protected debounceId = 0;

    isChanged = false;

    async emit() {
        this.debounceId++;
        if (!this.isChanged)
            return;
        this.error = await this.props.connection.check(this.text);

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
        this.error = undefined;
        await Timeout(300);
        if (id !== this.debounceId)
            return;

        await this.emit();
    }

    renderBaseError(error: InputType<TextInput<Error>>["Error"]): ReactNode {
        switch (error) {
            case "INVALID_PATTERN":
                return Lang`INVALID_PATTERN`;

            case "TOO_LONG":
                return Lang`TOO_LONG_${"max"}`({
                    max: this.props.connection.static?.maxLength
                });
            case "TOO_SHORT":
                return Lang`TOO_SHORT_${"min"}`({
                    min: this.props.connection.static?.maxLength
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
