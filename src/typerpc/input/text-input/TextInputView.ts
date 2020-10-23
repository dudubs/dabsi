import { ReactElement } from "react";
import { Timeout } from "../../../common/async/Timeout";
import { Awaitable } from "../../../common/typings";
import { Lang } from "../../../localization/Lang";
import { ViewState } from "../../../react/view/ViewState";
import { RpcConnection } from "../../Rpc";
import { AbstractInputView } from "../AbstractInputView";
import { InputError, InputValueElement } from "../Input";
import { InputViewProps } from "../InputView";
import { TextInput } from "./TextInput";
import { TextInputLoader } from "./TextInputLoader";

export type TextInputViewProps<
  C extends RpcConnection<TextInput>
> = InputViewProps<C>;

export class TextInputView<
  C extends RpcConnection<TextInput>
> extends AbstractInputView<
  C,
  TextInputViewProps<C> & {
    children(view: TextInputView<C>): ReactElement;
  }
> {
  @ViewState() protected _text: string;

  protected updateValue(value: InputValueElement<C> | undefined) {
    this._text = value || "";
  }

  get text() {
    return this._text;
  }

  protected debounceId = 0;

  protected getError(): Awaitable<InputError<C> | undefined> {
    return TextInputLoader.check(this.element, this.value || "");
  }

  async setValue(value: InputValueElement<C>): Promise<void> {
    return super.setValue(TextInputLoader.load(this.element, value));
  }

  inputWillValidate(): Awaitable {
    this.debounceId++;
    return this.setValue(this.text);
  }

  async setText(text: string) {
    if (this._text === text) return;
    const id = ++this.debounceId;
    this._text = text;
    this.setError(undefined);
    await Timeout(300);
    if (id !== this.debounceId) return;
    await this.setValue(text);
  }

  protected getErrorElement(error: InputError<TextInput>): ReactElement {
    switch (error) {
      case "INVALID_PATTERN":
        return Lang`INVALID_PATTERN`;
      case "REQUIRED":
        return Lang`REQUIRED`;
      case "TOO_LONG":
        return Lang`REQUIRED_MAXIMUM_${"max"}_CHARACTERS`({
          max: this.element?.maxLength,
        });
      case "TOO_SHORT":
        return Lang`REQUIRED_MINIMUM_${"min"}_CHARACTERS`({
          min: this.element?.minLength,
        });
    }
  }

  renderView(): React.ReactNode {
    return this.props.children(this);
  }
}
