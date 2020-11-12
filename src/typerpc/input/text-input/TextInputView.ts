import { ReactElement } from "react";
import { Timeout } from "../../../common/async/Timeout";
import { Awaitable } from "../../../common/typings";
import { Lang } from "../../../lang/Lang";
import { ViewState } from "../../../react/view/ViewState";
import { RpcConnection } from "../../Rpc";
import { WidgetType } from "../../widget/Widget";
import { AbstractInputView } from "../AbstractInputView";
import { InputError, InputValueElement } from "../Input";
import { InputErrorElementMap, InputViewProps } from "../InputView";
import { TextInput } from "./TextInput";
import { TextInputLoader, TextInputOptions } from "./TextInputLoader";

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

  protected _options: TextInputOptions;
  protected updateElement(element: WidgetType<C>["Element"]) {
    super.updateElement(element);
    this._options = {
      ...element,
      pattern: element.pattern ? new RegExp(element.pattern) : undefined,
    };
  }

  protected getError(): Awaitable<InputError<C> | undefined> {
    return TextInputLoader.check(this._options, this.value || "");
  }

  async setValue(value: InputValueElement<C>): Promise<void> {
    return super.setValue(TextInputLoader.load(this._options, value));
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

  protected getErrorElementMap(): InputErrorElementMap<TextInput> {
    return {
      INVALID_PATTERN: Lang`EXPECTED_TO_PATTERN_${"pattern"}`,
      REQUIRED: Lang`REQUIRED`,
      MAX_LENGTH: Lang`REQUIRED_MAXIMUM_${"maxLength"}`,
      MIN_LENGTH: Lang`REQUIRED_MINIMUM_${"minLength"}`,
    };
  }

  renderView(): React.ReactNode {
    return this.props.children(this);
  }
}
